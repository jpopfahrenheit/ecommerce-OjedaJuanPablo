import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Card, Row, Col } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { getFirestore, getDoc, doc } from "firebase/firestore";
import { ItemsContext } from "../../contexts/ItemsContext";
import { ItemCount } from "../ItemCount/ItemCount";
import Swal from 'sweetalert2'
import './ItemDetailContainer.css';

export const ItemDetailContainer = () => {
    const [item, setItem] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const { id } = useParams();

    const { addItem } = useContext(ItemsContext);

    const onAdd = (count) => {
        addItem({ ...item, quantity: count });
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto en el carrito!",
            showConfirmButton: false,
            timer: 2000
          });
    };

    useEffect(() => {
        const db = getFirestore();

        const refDoc = doc(db, "items", id);

        getDoc(refDoc)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    setItem({ id: snapshot.id, ...snapshot.data() });
                } else {
                    navigate("/error-url");
                }
            })
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <Container className="mt-4">Wait..</Container>

    return (
        <Container className="mt-4">
            <Card className="bg-warning">
                <Card.Body>
                    <Row>
                        <Col className="descripcion bg-warning col-8">
                            <Card.Title>{item.nombre}</Card.Title>
                            <Card.Img src={item.rutaImagen} className="tarjetaImg" />
                            <Card.Text>{item.detalle}</Card.Text>
                        </Col>
                        <Col xs={3} className="precio">
                            <Card.Title>
                                Precio: ${item.precio}
                            </Card.Title>
                            <card-subtitle>
                                <ItemCount stock={item.stock} onAdd={onAdd} />
                            </card-subtitle>
                            <Card.Text>Stock disponible: {item.stock} unidades</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </Container>
    );
};


