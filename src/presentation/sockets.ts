import { Socket } from 'socket.io'; 
import { JwtAdapter } from '../config';
import { userConnected, userDisconnected } from '../infrastructure/sockets/users.envent';

export class Sockets {
  public static instance: Sockets;
  public readonly io: any;

  public constructor(io: any) {
    this.io = io;
  }

  public static getInstance(io?: any): Sockets {
    if (!Sockets.instance && io) {
      Sockets.instance = new Sockets(io);
    }
    return Sockets.instance;
  }

  handleEvents() {
    // Evento principal de conexión
    this.io.on('connection', async (socket: Socket) => {
      console.log('Socket connected, verifying token...');

      try {
        const token =
          socket.handshake.query.Authorization?.toString().replace("Bearer ", "") ||
          socket.handshake.auth?.token;

        if (!token) {
          console.warn("No token provided, disconnecting socket.");
          console.log("Detalles del socket en ausencia de token:", {
            handshakeQuery: socket.handshake.query,
            handshakeAuth: socket.handshake.auth,
          });
          return socket.disconnect();
        }


        // Extendemos el payload para incluir entity y profileId
        const payload = await JwtAdapter.validateToken<{ uid: string, entity: string, profileId?: string }>(token);

        if (!payload) {
          console.log('Invalid token');
          return socket.disconnect();
        }

        // Usamos profileId si existe; de lo contrario, usamos uid
        socket.join(payload.uid);
        console.log('Cliente conectado', payload.uid);
        await userConnected(payload.uid);




        socket.on("disconnect", async (reason) => {
          console.log('Cliente desconectado', { reason, socketId: socket.id });
          console.log("Salas antes de desconectar:", Array.from(socket.rooms));
          await userDisconnected(payload.uid);
        });

        socket.on("error", (error) => {
          console.error("⚠️ Error en el socket:", error);
        });


      } catch (error) {
        console.error('Token validation error:', error);
        socket.disconnect();
      }
    });

  }



}
