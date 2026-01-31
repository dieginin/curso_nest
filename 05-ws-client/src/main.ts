import "./style.css"

import { connectToServer } from "./socket-client"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
   <h1>Websocket - Client </h1>
   <span>Offline</span>
  </div>
`
connectToServer()
