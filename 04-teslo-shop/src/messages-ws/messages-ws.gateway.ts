import { MessagesWsService } from './messages-ws.service';
import { WebSocketGateway } from '@nestjs/websockets';

@WebSocketGateway({ cors: true })
export class MessagesWsGateway {
  constructor(private readonly messagesWsService: MessagesWsService) {}
}
