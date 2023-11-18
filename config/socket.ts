import { io } from 'socket.io-client';
import { SOCKET_CONNECT_URL } from './constants';

export const socket = io(SOCKET_CONNECT_URL, { transports : ['websocket'] });