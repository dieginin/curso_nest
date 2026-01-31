import { MessagesWsGateway } from './messages-ws.gateway';
import { MessagesWsService } from './messages-ws.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
})
export class MessagesWsModule {}
