import express from 'express'

import { PORT } from './config.js';

import indexRoutes from './routes/index.routes.js';

import pelisRouters from './routes/pelis.routes.js';

const app = express()
app.use(express.json())
app.use('/api', indexRoutes)
app.use('/api', pelisRouters)
app.listen(PORT)

console.log(`Serve Running on PORT: ${PORT}`)
