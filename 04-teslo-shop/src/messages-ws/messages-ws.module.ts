import { AuthModule } from 'src/auth/auth.module';
import { MessagesWsGateway } from './messages-ws.gateway';
import { MessagesWsService } from './messages-ws.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [MessagesWsGateway, MessagesWsService],
  imports: [AuthModule],
})
export class MessagesWsModule {}
