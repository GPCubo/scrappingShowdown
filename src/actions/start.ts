import { Server } from "../classes/server";
import * as dotEnv from 'dotenv';

dotEnv.config();

const server = new Server();
server.onInit();

