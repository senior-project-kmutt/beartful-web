import { Manager, io } from 'socket.io-client';

const manager = new Manager(process.env.NEXT_PUBLIC_SOCKET_CONNECT_URL, {
  path: '/ssi1-socket',
  forceNew: true,
  transports: ['websocket']
})

export const socketMessage = manager.socket('/sockets/message')

// Old version
// export const socket = io(SOCKET_CONNECT_URL, { transports : ['websocket'] });