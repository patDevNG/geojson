import { config } from 'dotenv';
import 'reflect-metadata';
import { InversifyExpressServer } from 'inversify-express-utils'
import { container } from './container';
import app from './app';
import './controller';

config();

const server = new InversifyExpressServer(container, null, null, app);


const normalizePort = (val: string | undefined): number => {
  if (!val) return 5000;
  const port = parseInt(val)

  if (isNaN(port)) {
    return 5000
  } 
  return port;
}

const PORT:number = normalizePort(process.env.PORT);

const startServer = server.build();

startServer.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});