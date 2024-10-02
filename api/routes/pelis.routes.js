import { Router } from "express";

import {
    getPelis,
    getPeli,
    createPeli,
    updatePeli,
    deletePeli
} from '../controllers/pelis.controller.js'

const router = Router()

router.get('/peliculas', getPelis)
router.get('/pelicula/:id', getPeli)
router.post('/pelicula', createPeli)
router.put('/pelicula/:id', updatePeli)
router.delete('/pelicula/:id', deletePeli)

export default router