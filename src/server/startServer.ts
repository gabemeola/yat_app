import http from 'http';
import socket from 'socket.io';
import Connect from './Connect';
import { isDevelopment } from './constants';


const env = isDevelopment === true ? 'Development Server' : 'Production Server';

export default function startServer(port: number) {
  // Get Express App
  const { app } = new Connect();

  const server = http.createServer(app);

  // Set up Socket.io
  const ws = socket(server);
  app.set('ws', ws)
  // Track how many user are connected
  let currentUsers = 0;
  ws.on('connection', (socket) => {
    ws.volatile.emit('users', ++currentUsers);
    socket.on('checkusers', (fn) => {
      fn(currentUsers);
    })
    socket.on('disconnect', () => {
      ws.volatile.emit('users', --currentUsers);
    })
  })

  // Boot Up Server at {PORT}
  server.listen(port, (err: Error) => {
    if (err) throw err;
    // In Dev Mode, set keepAliveTimeout to 0 for HMR
    isDevelopment && (server.keepAliveTimeout = 0);
    // Log out that the Server is Coming Alive
    console.log(`Server Booting at http://localhost:${port}\nServer is starting in "${env}" mode.`);
  });

  if (process.env.NODE_ENV !== 'production') {
    // Hot Module Replacement
    // @ts-ignore
    if (module.hot) {
      let currentApp = app;
      // @ts-ignore
      module.hot.accept('./Connect', () => {
        server.removeListener('request', currentApp);
        import('./Connect')
          .then(({ default: NextApp }) => {
            currentApp = new NextApp().app;
            server.on('request', currentApp);
            console.log('Server reloaded!');
          })
          .catch((err) => console.error(err));
      });

      // For reload main module (self). It will be restart http-server.
      // @ts-ignore
      module.hot.accept((err) => console.error(err));
      // @ts-ignore
      module.hot.dispose(() => {
        console.log('Disposing entry module.\nRestart Server.');
        server.close();
      });
    }
  }

  return server;
}
