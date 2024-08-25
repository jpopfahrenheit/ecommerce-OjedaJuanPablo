import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ItemsContext } from "../../contexts/ItemsContext";
import Container from "react-bootstrap/Container";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { formatISO } from 'date-fns';

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
        phone: Yup.string().matches(/^\d+$/, "El teléfono solo debe contener números").required("El teléfono es requerido"),
    });

    const handleOrder = (values) => {
        const now = new Date();
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
                    icon: "success"
                });
                reset();
                navigate('/');
            }
        });
    };

    return (
        <Container>
            <h1>Formulario de Compra</h1>
            <Formik
                initialValues={{ name: "", email: "", confirmEmail: "", phone: "" }}
                validationSchema={validationSchema}
                onSubmit={handleOrder}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit}>
                        <div>
                            <label>Nombre</label>
                            <Field name="name" />
                            <ErrorMessage name="name" component="p" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label>Email</label>
                            <Field name="email" />
                            <ErrorMessage name="email" component="p" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label>Confirmar Email</label>
                            <Field name="confirmEmail" />
                            <ErrorMessage name="confirmEmail" component="p" style={{ color: 'red' }} />
                        </div>
                        <div>
                            <label>Teléfono</label>
                            <Field name="phone" />
                            <ErrorMessage name="phone" component="p" style={{ color: 'red' }} />
                        </div>
                        <h3>Total: ${total}</h3>
                        <button type="submit">Comprar</button>
                    </Form>
                )}
            </Formik>
        </Container>
    );
};
