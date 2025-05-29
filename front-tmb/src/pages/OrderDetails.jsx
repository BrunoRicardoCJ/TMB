import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder } from "../services/orderService";
import { Container, Typography, Paper, Button } from "@mui/material";

export default function OrderDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id]);

  if (!order) return <div>Carregando...</div>;

  return (
    <Container maxWidth="sm" sx={{
      mt: 4,
      mb: 4,
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start", 
      minHeight: "100vh"
    }}>
      <Paper sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        minWidth: 340,
        width: "100%",
        boxShadow: 3,
      }}>
        <Typography variant="h4" fontWeight={700} mb={3}>
          Detalhes do Pedido
        </Typography>
        <Typography sx={{ mb: 1 }}><b>ID:</b> {order.id}</Typography>
        <Typography sx={{ mb: 1 }}><b>Cliente:</b> {order.cliente}</Typography>
        <Typography sx={{ mb: 1 }}><b>Produto:</b> {order.produto}</Typography>
        <Typography sx={{ mb: 1 }}><b>Valor:</b> {order.valor}</Typography>
        <Typography sx={{ mb: 1 }}><b>Status:</b> {order.status}</Typography>
        <Typography sx={{ mb: 2 }}><b>Data de Criação:</b> {new Date(order.dataCriacao).toLocaleString()}</Typography>
        <Button variant="outlined" onClick={() => navigate(-1)} fullWidth>
          VOLTAR
        </Button>
      </Paper>
    </Container>
  );
}
