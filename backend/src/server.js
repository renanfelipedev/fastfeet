import 'dotenv/config';
import './database';

import { createServer } from 'http';
import App from './app';

class Server {
  constructor() {
    this.webserver = createServer(App);
    this.PORT = process.env.PORT || 3333;
  }

  start() {
    this.webserver.listen(this.PORT);
  }
}

new Server().start();
