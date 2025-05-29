import React from "react";

export default function OrderRow({ order }) {
  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.status}</td>
      <td>{new Date(order.dataCriacao).toLocaleString("pt-BR")}</td>
    </tr>
  );
}
