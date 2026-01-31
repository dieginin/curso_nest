import "./style.css"

import { connectToServer } from "./socket-client"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <span id="server-status">Offline</span>
   
   <ul id="clients-ul"></ul>

   <form id="message-form">
    <input id="message-input" placeholder="message" />
   </form>

   <h3>Messages</h3>
   <ul id="messages-ul"></ul>
  </div>
`

connectToServer()
