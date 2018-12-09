import path from 'path';
import express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import apiRoutes from './api';
import staticResources from './routes/staticResources'
import notFound from './routes/notFound';
import reactRender from './routes/reactRender';


export default class Connect {
  // Create Express App
  app = express()
  constructor() {
    // Attach Middleware
    this.middleware();
    // Attach Routes
    this.routes();
  }


  /**
   * Server Middleware
   */
  middleware() {
    // Basic Web Security
    // (https://helmetjs.github.io/docs/)
    this.app.use(helmet());

    // GZIP Compression for assets
    this.app.use(compression());

    // Run Webpack build config for Development Builds
    if (process.env.NODE_ENV !== 'production') {
      // Changed to inline require because babel-minify isn't
      // removing with dead code elimination
      const webpackMiddleware = require('@zelz/crank/webpack/middleware');
      const browserConfig = require('../../webpack/browserConfig');

      this.app.use(webpackMiddleware({
        ...browserConfig,
        rootPath: path.join(__dirname, '..'),
      }));
    }
  }

  /**
   * App Routes
   */
  routes() {
    // Route for api requests
    this.app.use('/api', apiRoutes);

    // Route for Static Assets
    this.app.use(staticResources);

    // Forward Everything else to React SSR
    this.app.use(reactRender);

    // Pass any other catch requests to not found route.
    this.app.use(notFound);
  }
}
