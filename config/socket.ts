import { Manager, io } from 'socket.io-client';
import { SOCKET_CONNECT_URL } from './constants';

const manager = new Manager(SOCKET_CONNECT_URL, {
    path: '/ssi1-socket',
    forceNew: true,
    transports: ['websocket']
  })

export const socketMessage = manager.socket('/sockets/message')

// Old version
// export const socket = io(SOCKET_CONNECT_URL, { transports : ['websocket'] });