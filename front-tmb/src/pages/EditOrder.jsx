import React, { useEffect, useState } from "react";
import { getOrder, updateOrder } from "../services/orderService";
import { useParams, useNavigate } from "react-router-dom";
import OrderForm from "../components/OrderForm";

export default function EditOrder() {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchOrder() {
      try {
        const order = await getOrder(id);
        setInitialData(order);
      } catch (err) {
        setError("Erro ao carregar pedido.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

	async function handleEdit(data) {
	  try {
		setLoading(true);
		// Mantenha TODOS os campos originais, só altere os editáveis
		await updateOrder(id, { ...initialData, ...data, id }); 
		navigate("/");
	  } catch (err) {
		setError("Erro ao editar pedido");
	  } finally {
		setLoading(false);
	  }
	}


  if (loading) return <div>Carregando...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;

  return (
    <div style={{ padding: "4rem" }}>
      <OrderForm
        initialData={initialData}
        onSubmit={handleEdit}
        loading={loading}
        isEdit={true}
      />
    </div>
  );
}
