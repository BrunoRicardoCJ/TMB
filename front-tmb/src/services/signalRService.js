import { HubConnectionBuilder } from "@microsoft/signalr";

const URL = "http://localhost:PORT/pedidoHub"; // Coloque aqui a porta do backend (.NET)

export function connectToSignalR(onPedidoAtualizado) {
  const connection = new HubConnectionBuilder()
    .withUrl(URL)
    .withAutomaticReconnect()
    .build();

  connection.on("PedidoAtualizado", (pedido) => {
    onPedidoAtualizado(pedido);
  });

  connection.start().catch(console.error);

  return connection;
}
