import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import Header from './common/header/Header';
import EventPage from './pages/EventPage';
import OrderDetailPage from './pages/Order/OrderDetailPage';

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/event" element={<EventPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
