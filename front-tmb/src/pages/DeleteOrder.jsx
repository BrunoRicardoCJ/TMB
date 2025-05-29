import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getOrder, deleteOrder } from "../services/orderService";
import { Container, Typography, Paper, Button } from "@mui/material";

export default function DeleteOrder() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder(id).then(setOrder);
  }, [id]);

  const handleDelete = async () => {
    await deleteOrder(id);
    navigate("/");
  };

  if (!order) return <div>Carregando...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 6 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Excluir Pedido
        </Typography>
        <Typography>Tem certeza que deseja excluir o pedido <b>{order.id}</b>?</Typography>
        <Button variant="contained" color="error" onClick={handleDelete} sx={{ mt: 2, mr: 2 }}>
          Excluir
        </Button>
        <Button variant="outlined" onClick={() => navigate(-1)} sx={{ mt: 2 }}>
          Cancelar
        </Button>
      </Paper>
    </Container>
  );
}
