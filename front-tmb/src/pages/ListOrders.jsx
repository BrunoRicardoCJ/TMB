import React, { useEffect, useState } from "react";
import OrderTable from "../components/OrderTable";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { getOrders, deleteOrder } from "../services/orderService";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Snackbar, Alert } from "@mui/material";
import * as signalR from "@microsoft/signalr";

export default function ListOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [snack, setSnack] = useState({ open: false, msg: "", severity: "success" });
  const navigate = useNavigate();

  async function fetchOrders() {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (err) {
      setError("Erro ao carregar pedidos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, []);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5122/pedidosHub", { withCredentials: true }) // ajuste a porta se necessário
      .withAutomaticReconnect()
      .build();

    connection.on("PedidoAtualizado", () => {
      fetchOrders();
    });

    connection.start()
      .then(() => console.log("Conectado ao SignalR!"))
      .catch(err => console.error("Erro ao conectar SignalR:", err));

    return () => {
      connection.stop();
    };
  }, []);

  async function handleDelete(id) {
    try {
      await deleteOrder(id);
      setOrders(orders.filter(o => o.id !== id));
      setSnack({ open: true, msg: "Pedido removido com sucesso!", severity: "success" });
    } catch {
      setSnack({ open: true, msg: "Erro ao remover pedido.", severity: "error" });
    }
  }

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <div style={{ marginTop: 30, marginBottom: 20 }}>
        <Typography variant="h3" fontWeight={700} mb={2}>
          Pedidos
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/create")}
          sx={{ mb: 2 }}
        >
          Novo Pedido
        </Button>
      </div>
      <OrderTable orders={orders} onDelete={handleDelete} />
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.msg}</Alert>
      </Snackbar>
    </Container>
  );
}
