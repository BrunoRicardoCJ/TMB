// src/services/api.js
const API_BASE_URL = "http://localhost:5122"; // Coloque a porta correta do seu backend

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/orders`);
  if (!response.ok) throw new Error("Erro ao buscar pedidos");
  return response.json();
}

export async function createOrder(order) {
  const response = await fetch(`${API_BASE_URL}/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!response.ok) throw new Error("Erro ao criar pedido");
  return response.json();
}
