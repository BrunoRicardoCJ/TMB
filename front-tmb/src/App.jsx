import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListOrders from "./pages/ListOrders";
import CreateOrder from "./pages/CreateOrder";
import EditOrder from "./pages/EditOrder";
import DeleteOrder from "./pages/DeleteOrder";
import OrderDetails from "./pages/OrderDetails";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListOrders />} />
        <Route path="/create" element={<CreateOrder />} />
        <Route path="/edit/:id" element={<EditOrder />} />
        <Route path="/delete/:id" element={<DeleteOrder />} />
        <Route path="/details/:id" element={<OrderDetails />} />
      </Routes>
    </Router>
  );
}
