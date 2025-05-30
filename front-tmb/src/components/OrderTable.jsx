import React from "react";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";

export default function OrderTable({ orders, onDelete }) {
  const navigate = useNavigate();

  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 1,
        boxShadow: 2,
        width: "100%",
        maxWidth: "100vw",
        overflowX: "auto"
      }}
    >
      <Table sx={{ minWidth: 1100 }}>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Cliente</TableCell>
            <TableCell>Produto</TableCell>
            <TableCell>Valor</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell sx={{ maxWidth: 210, overflow: "hidden", textOverflow: "ellipsis" }}>{order.id}</TableCell>
              <TableCell>{order.cliente}</TableCell>
              <TableCell>{order.produto}</TableCell>
              <TableCell>
                {Number(order.valor).toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL"
                })}
              </TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>
                {order.dataCriacao
                  ? new Date(order.dataCriacao).toLocaleString("pt-BR")
                  : ""}
              </TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => navigate(`/details/${order.id}`)}>
                  <VisibilityIcon />
                </IconButton>
                <IconButton color="secondary" onClick={() => navigate(`/edit/${order.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => onDelete(order.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
