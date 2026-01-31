import "./style.css"

import { connectToServer } from "./socket-client"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h2>Websocket - Client </h2>

   <input id="jwt-token" placeholder="Json Web Token" />
   <button id="btn-connect">Connect</button>

   <br />
   <span id="server-status">Offline</span>
   
   <ul id="clients-ul"></ul>

   <form id="message-form">
    <input id="message-input" placeholder="message" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
  </div>
`

// connectToServer()

const jwtToken = document.querySelector<HTMLInputElement>("#jwt-token")!
const btnConnect = document.querySelector<HTMLButtonElement>("#btn-connect")!

btnConnect.addEventListener("click", () => {
  const jwtValue = jwtToken.value.trim()
  if (!jwtValue) return alert("Enter a valid JWT")
  connectToServer(jwtValue)
})
