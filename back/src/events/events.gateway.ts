import {
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Logger } from '@nestjs/common'

@WebSocketGateway({
  cors: {
    origin: '*'
  },
  namespace: 'chat'
})
export class EventsGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  private static readonly logger = new Logger(EventsGateway.name)

  @WebSocketServer()
  server: Server

  afterInit() {
    EventsGateway.logger.debug(`Socket Server Init Complete`)
  }

  handleConnection(client: Socket) {
    EventsGateway.logger.debug(
      `${client.id}(${client.handshake.query['username']}) is connected!`
    )

    this.server.emit('msgToClient', {
      name: `admin`,
      text: `join chat.`
    })
  }

  handleDisconnect(client: Socket) {
    EventsGateway.logger.debug(`${client.id} is disconnected...`)
  }

  @SubscribeMessage('msgToServer')
  handleMessage(client: Socket, payload: { name: string; text: string }): void {
    EventsGateway.logger.debug(`${client.id}  msg:${payload}`)
    this.server.emit('msgToClient', payload)
  }
}
