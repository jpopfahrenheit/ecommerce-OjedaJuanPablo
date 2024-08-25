import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavBar } from "./components/NavBar/NavBar";
import { ItemListContainer } from "./components/ItemListContainer/ItemListContainer";
import { ItemDetailContainer } from "./components/ItemDetailContainer/ItemDetailContainer";
import { ErrorURL } from "./components/ErrorURL/ErrorURL";
import { Cart } from "./components/Cart/Cart";
import { Provider } from "./contexts/ItemsContext";
import { Checkout } from './components/Checkout/Checkout';

function App() {
    return (
        <Provider>
            <BrowserRouter>
                <NavBar />
                <Routes>
                    <Route path="/error-url" element={<ErrorURL />} />
                    <Route path="/" element={<ItemListContainer />} />
                    <Route path="/categoria/:id" element={<ItemListContainer />} />
                    <Route path="/genero/:id" element={<ItemListContainer />} />
                    <Route path="/item/:id" element={<ItemDetailContainer />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="*" element={<ErrorURL />} />
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App
