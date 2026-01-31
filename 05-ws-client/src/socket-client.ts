import { Manager, Socket } from "socket.io-client"

export const connectToServer = (token: string) => {
  const manager = new Manager("localhost:3000/socket.io/socket.io.js", { extraHeaders: { hola: "mundo", authentication: token } })

  const socket = manager.socket("/")
  addListeners(socket)
}

const addListeners = (socket: Socket) => {
  const clientsUl = document.querySelector<HTMLUListElement>("#clients-ul")!
  const messageForm = document.querySelector<HTMLFormElement>("#message-form")!
  const messageInput = document.querySelector<HTMLInputElement>("#message-input")!
  const messagesUl = document.querySelector<HTMLUListElement>("#messages-ul")!
  const serverStatusLabel = document.querySelector("#server-status")!

  socket.on("connect", () => (serverStatusLabel.innerHTML = "Online"))
  socket.on("disconnect", () => (serverStatusLabel.innerHTML = "Offline"))

  socket.on("clients-updated", (clients: string[]) => {
    clientsUl.innerHTML = ""
    clients.forEach(client => {
      const li = document.createElement("li")
      li.innerText = client
      clientsUl.append(li)
    })

    messageForm.addEventListener("submit", event => {
      event.preventDefault()
      if (messageInput.value.trim().length <= 0) return

      socket.emit("message-form-client", { id: "yo", message: messageInput.value }, (messageInput.value = ""))
    })

    socket.on("message-from-server", (payload: { fullName: string; message: string }) => {
      const li = document.createElement("li")
      const strong = document.createElement("strong")
      const span = document.createElement("span")

      strong.innerText = payload.fullName
      span.innerText = `: ${payload.message}`
      li.append(strong)
      li.append(span)
      messagesUl.append(li)
    })
  })
}
