import { HubConnectionBuilder } from "@microsoft/signalr";

const URL = "http://localhost:PORT/pedidoHub"; 

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
