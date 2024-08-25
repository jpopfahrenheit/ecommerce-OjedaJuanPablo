import { Link } from "react-router-dom";
import changuito from '../../assets/cart.png';
import { useContext } from "react";
import { ItemsContext } from "../../contexts/ItemsContext";

export const CartWidget = () => {
    const { items } = useContext(ItemsContext);

    const totalQuantity = items.reduce((total, item) => total + item.quantity, 0);

    return (
        <Link to="/cart">
            <img src={changuito} alt="Cart" />
            {totalQuantity > 0 && <span>{totalQuantity}</span>}
        </Link>
    );
};
