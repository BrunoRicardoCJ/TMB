import React from "react";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/orderService";
import OrderForm from "../components/OrderForm";
import { Container, Typography, Paper } from "@mui/material";

export default function CreateOrder() {
  const navigate = useNavigate();

  const handleCreate = async (order) => {
    await createOrder(order);
    navigate("/");
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Novo Pedido
        </Typography>
        <OrderForm onSubmit={handleCreate} />
      </Paper>
    </Container>
  );
}
