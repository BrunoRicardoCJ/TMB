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
    <TableContainer component={Paper} sx={{ mt: 1, boxShadow: 2 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell align="right">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{new Date(order.dataCriacao).toLocaleString()}</TableCell>
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
