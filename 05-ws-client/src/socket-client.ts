import { Manager, Socket } from "socket.io-client"

export const connectToServer = () => {
  const manager = new Manager("localhost:3000/socket.io/socket.io.js")

  const socket = manager.socket("/")
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const serverStatusLabel = document.querySelector("#server-status")!
  const clientsUl = document.querySelector("#clients-ul")!
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!
  const messageInput = document.querySelector<HTMLInputElement>("#message-input")!

  socket.on("connect", () => (serverStatusLabel.innerHTML = "Online"))
  socket.on("disconnect", () => (serverStatusLabel.innerHTML = "Offline"))

  socket.on("clients-updated", (clients: string[]) => {
    clientsUl.innerHTML = ""
    clients.forEach(client => {
      const li = document.createElement("li")
      li.innerText = client
      clientsUl.appendChild(li)
    })

    messageForm.addEventListener("submit", event => {
      event.preventDefault()
      if (messageInput.value.trim().length <= 0) return

      socket.emit("message-form-client", { id: "yo", message: messageInput.value }, (messageInput.value = ""))
    })
  })
}
