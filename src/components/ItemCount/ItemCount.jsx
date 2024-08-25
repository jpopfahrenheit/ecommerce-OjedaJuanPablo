import { useState } from "react";
import './ItemCount.css';


export const ItemCount = ({ stock, onAdd }) => {
    const [count, setCount] = useState(1)

    const handleIncrease = () => {
        if (count < stock) {
            setCount(prev => prev + 1);
        };
    };

    const handleDecrease = () => {
        if (count > 1) {
            setCount(prev => prev - 1);
        };
    };

    const handleAdd = () => {
        onAdd(count);
        setCount(1);
    };

    return (
        <div className="m-2">
            {stock > 0 && (
                <div>
                    <button className="ButtonIncDec" onClick={handleIncrease}>+</button>
                    <span className="m-2">{count}</span>
                    <button className="ButtonIncDec" onClick={handleDecrease}>-</button>
                    <button className="ButtonAddCart m-3" onClick={handleAdd}>Agregar al carrito</button>
                </div>
            )}
            {stock === 0 && <span>Sin stock</span>}
        </div>

    );
};