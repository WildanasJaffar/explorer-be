import { Elysia } from "elysia";
import { folderRoutes } from './routes/folder.routes'
import dotenv from 'dotenv'
import { cors } from '@elysiajs/cors'

dotenv.config()

const app = new Elysia();
app.group('/api/v1', (group) => group.use(folderRoutes)).use(cors())

app.listen(process.env.PORT || 3000)

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);