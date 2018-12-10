import socket from 'socket.io-client';

export function createSocket(namespace: string = '/') {
  return socket(namespace)
}

export default createSocket('/');
