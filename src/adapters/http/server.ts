import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { Scalar } from '@scalar/hono-api-reference'
import { userApp } from './routes/user/user-routes';

// Hono API
const app = new OpenAPIHono();

// OpenAPI Documentation
const openApiDoc = {
  openapi: '3.0.0',
  path: "/documentation",
  version: "0.1.0",
  info: {
    title: 'Global news activity report users service',
    version: '0.1.0',
    description: 'This is the most completed documentation of this users service.',
    contact: {
      name: "Alejandro Mateus Martinez",
      url: "https://github.com/RMdavidmatheus/",
      email: "david.5.12@hotmail.com",
    },
    license: {
      name: "MIT",
      url: "https://opensource.org/licenses/MIT",
    },
    servers: [{ url: "http://localhost:3000" }],
  },
}

// Logger
app.use(logger())

// CORS
app.use(cors({
  origin: '*',
  allowHeaders: ['Content-Type', 'Authorization'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  exposeHeaders: ['Content-Type', 'Authorization'],
  maxAge: 86400,
  credentials: true,
}))

// OpenAPI Documentation Endpoints
app.doc('/doc', openApiDoc);

// Scalar Documentation
app.get('/documentation', Scalar({url: '/doc'}))

// Routes
app.route('/users', userApp)

// Start Server
export default {
  port: process.env.PORT_APP || 3000,
  fetch: app.fetch,
}