import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ItemsContext } from "../../contexts/ItemsContext";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Cart.css';

export const Cart = () => {
    const { reset, removeItem, items } = useContext(ItemsContext);
    const navigate = useNavigate();

    const total = items.reduce((acc, act) => acc + act.precio * act.quantity, 0);

    const handleCheckout = () => {
        navigate("/checkout");
    };

    if (!items.length) return (
        <Container>
            <h1 className="text-center">El carrito está vacío</h1>
        </Container>
    );

    return (
        <Container>
            <Row>
                <Col>
                    {items.map((i) => (
                        <Row key={i.id} className="g-4 m-4 itemCart">
                            <Col>
                                <img src={i.rutaImagen} height={200} alt={i.nombre} />
                            </Col>
                            <Col>
                                <h3>{i.nombre}</h3>
                            </Col>
                            <Col>
                                <h5>Precio unidad: ${i.precio}</h5>
                            </Col>
                            <Col>
                                <h5>Cantidad: {i.quantity}</h5>
                            </Col>
                            <Col>
                                <h5>Total: ${i.quantity * i.precio}</h5>
                            </Col>
                            <Col>
                                <button onClick={() => removeItem(i.id)}>X</button>
                            </Col>
                        </Row>
                    ))}
                </Col>

                <Col className="col-3">
                    <h3>Total: ${total}</h3>
                    <button onClick={reset}>Vaciar</button>
                    <button onClick={handleCheckout}>Ir a Checkout</button>
                </Col>
            </Row>
        </Container>
    );
};
