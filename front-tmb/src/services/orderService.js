const API_URL = "http://localhost:5122/orders";

export async function getOrders() {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar pedidos");
  return res.json();
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/${id}`);
  if (!res.ok) throw new Error("Erro ao buscar pedido");
  return res.json();
}

export async function createOrder(order) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) throw new Error("Erro ao criar pedido");
  return res.json();
}

export async function updateOrder(id, order) {
  const res = await fetch(`http://localhost:5122/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
  });
  if (!res.ok) {
    throw new Error("Erro ao editar pedido");
  }
  try {
    return await res.json();
  } catch {
    return true;
  }
}


export async function deleteOrder(id) {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Erro ao remover pedido");
  return res.json();
}
