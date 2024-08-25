import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './ItemListContainer.css';
import { getFirestore, getDocs, where, query, collection } from "firebase/firestore";

export const ItemListContainer = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const path = window.location.pathname;

    useEffect(() => {
        const db = getFirestore();

        let refCollection;

        if (!id) {
            refCollection = collection(db, "items");
        } else if (path.includes('/categoria/')) {
            refCollection = query(collection(db, "items"), where("categoria", "==", id));
        } else if (path.includes('/genero/')) {
            refCollection = query(collection(db, "items"), where("genero", "==", id));
        }

        if (refCollection) {
            getDocs(refCollection)
                .then((snapshot) => {
                    setItems(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
                })
                .catch((error) => {
                    console.error("Error fetching documents: ", error);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [id, path]);

    if (loading) return <Container className="mt-4">Wait..</Container>;

    if (items.length === 0) return <Container className="mt-4">No hay productos para la selección realizada</Container>;

    return (
        <Container className="mt-4">
            <h1 className="titulo text-center">Zapatillas {id && `- ${id}`}</h1>
            <Row className="g-4">
                {items.map((i) => (
                    <Col key={i.id} className="d-flex">
                        <Card className="bg-warning">
                            <Card.Body className="d-flex flex-column tarjeta">
                                <Card.Img variant="top" src={i.rutaImagen} className="tarjetaImg" />
                                <Card.Title className="tarjetaTitulo mt-2">{i.marca}</Card.Title>
                                <Card.Text className="mt-2">
                                    {`${i.nombre} ${i.genero} ${i.categoria}`}
                                </Card.Text>
                                <Card.Text className="mt-2">
                                    {`Precio: $${i.precio}`}
                                </Card.Text>
                                <Card.Text className="mt-2">
                                    {`Stock disponible: ${i.stock} unidades`}
                                </Card.Text>
                                <Link to={`/item/${i.id}`} className="mt-auto">
                                    <Button variant="primary">Ver producto</Button>
                                </Link>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};
