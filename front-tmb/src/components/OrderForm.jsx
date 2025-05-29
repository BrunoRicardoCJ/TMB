import React, { useState, useEffect } from "react";
import { Paper, TextField, Button, Typography, Box } from "@mui/material";

export default function OrderForm({ initialData, onSubmit, isEdit = false }) {
  const [cliente, setCliente] = useState(initialData?.cliente || "");
  const [produto, setProduto] = useState(initialData?.produto || "");
  const [valor, setValor] = useState(
    initialData?.valor !== undefined && initialData?.valor !== null
      ? formatValor(initialData.valor)
      : ""
  );

  useEffect(() => {
    if (isEdit && initialData) {
      setCliente(initialData.cliente || "");
      setProduto(initialData.produto || "");
      setValor(
        initialData.valor !== undefined && initialData.valor !== null
          ? formatValor(initialData.valor)
          : ""
      );
    }
  }, [initialData, isEdit]);

  function formatValor(val) {
    let num = Number(String(val).replace(",", "."));
    if (isNaN(num)) return "";
    return num.toFixed(2).replace(".", ",");
  }

  function handleValorChange(e) {
    let raw = e.target.value.replace(/[^0-9.,]/g, "");
    setValor(raw);
  }

  function handleValorBlur() {
    if (!valor) return;
    setValor(formatValor(valor));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!cliente || !produto || !valor) return;
    const valorFinal = parseFloat(valor.replace(",", "."));
    onSubmit({ cliente, produto, valor: valorFinal });
    if (!isEdit) {
      setCliente("");
      setProduto("");
      setValor("");
    }
  }

  return (
    <Box sx={{
      minHeight: "80vh",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      background: "#f8f9fa"
    }}>
      <Paper elevation={3} sx={{
        mt: 5,
        p: 4,
        minWidth: 340,
        maxWidth: 400,
        width: "100%",
        borderRadius: 3
      }}>
        <Typography variant="h5" fontWeight={700} mb={3} align="center">
          {isEdit ? "Editar Pedido" : "Novo Pedido"}
        </Typography>
        <form onSubmit={handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            label="Cliente *"
            value={cliente}
            onChange={e => setCliente(e.target.value)}
            required
            margin="normal"
            autoFocus
          />
          <TextField
            fullWidth
            label="Produto *"
            value={produto}
            onChange={e => setProduto(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Valor *"
            value={valor}
            onChange={handleValorChange}
            onBlur={handleValorBlur}
            required
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, py: 1.2, fontWeight: 600 }}
          >
            {isEdit ? "SALVAR ALTERAÇÕES" : "CRIAR PEDIDO"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
