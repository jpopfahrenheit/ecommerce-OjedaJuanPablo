import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ItemsContext } from "../../contexts/ItemsContext";
import Container from "react-bootstrap/Container";
import { Form as BootstrapForm, Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formatISO, format } from 'date-fns';
import './Checkout.css';

export const Checkout = () => {
    const { items, reset } = useContext(ItemsContext);
    const navigate = useNavigate();

    const total = items.reduce((acc, act) => acc + act.precio * act.quantity, 0);

    const validationSchema = Yup.object({
        name: Yup.string().required("El nombre es requerido"),
        email: Yup.string()
            .email("Email inválido")
            .required("El email es requerido"),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref('email'), null], "Los emails deben coincidir")
            .required("Por favor confirme su email"),
        phone: Yup.string()
            .matches(/^\d+$/, "El teléfono solo debe contener números")
            .required("El teléfono es requerido"),
    });

    const handleOrder = (values) => {
        const now = new Date();
        const formattedDate = format(now, "dd/MM/yyyy HH:mm:ss");
        const order = {
            buyer: values,
            items,
            total,
            date: formatISO(now),
        };

        const db = getFirestore();
        const orderCollection = collection(db, "orders");

        addDoc(orderCollection, order).then(({ id }) => {
            if (id) {
                Swal.fire({
                    title: "Felicitaciones por su compra!",
                    text: "Su número de orden es: " + id,
                    footer: "Fecha de compra: " + formattedDate,
                    icon: "success"
                });
        reset();
        navigate('/');
    }
});
    };

return (
    <Container className="d-flex justify-content-center mt-4">
        <div className="checkout-form">
            <h1 className="text-center mb-4">Formulario de Compra</h1>
            <Formik
                initialValues={{ name: "", email: "", confirmEmail: "", phone: "" }}
                validationSchema={validationSchema}
                onSubmit={handleOrder}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <BootstrapForm.Group controlId="formName" className="mb-3">
                            <BootstrapForm.Label>Nombre</BootstrapForm.Label>
                            <Field
                                name="name"
                                type="text"
                                as={BootstrapForm.Control}
                                placeholder="Ingresa tu nombre"
                            />
                            <ErrorMessage name="name" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formEmail" className="mb-3">
                            <BootstrapForm.Label>Email</BootstrapForm.Label>
                            <Field
                                name="email"
                                type="email"
                                as={BootstrapForm.Control}
                                placeholder="Ingresa tu email"
                            />
                            <ErrorMessage name="email" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formConfirmEmail" className="mb-3">
                            <BootstrapForm.Label>Confirmar Email</BootstrapForm.Label>
                            <Field
                                name="confirmEmail"
                                type="email"
                                as={BootstrapForm.Control}
                                placeholder="Confirma tu email"
                            />
                            <ErrorMessage name="confirmEmail" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <BootstrapForm.Group controlId="formPhone" className="mb-3">
                            <BootstrapForm.Label>Teléfono</BootstrapForm.Label>
                            <Field
                                name="phone"
                                type="text"
                                as={BootstrapForm.Control}
                                placeholder="Ingresa tu teléfono"
                            />
                            <ErrorMessage name="phone" component="div" className="text-danger" />
                        </BootstrapForm.Group>

                        <h3 className="text-center mb-4">Total: ${total}</h3>

                        <div className="d-flex justify-content-center">
                            <Button variant="primary" type="submit">
                                Comprar
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    </Container>
);
};
