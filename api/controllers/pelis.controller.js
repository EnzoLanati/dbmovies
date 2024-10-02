import {pool} from "../db.js"

export const getPelis = async (req, res) => {
    try{
        const[result] = await pool.query('SELECT * FROM peliculas ORDER BY created_at ASC')
        res.json(result)
    }catch(error){
        res.status(500).json({message: 'Internal server error'})
    }
}

export const getPeli = async (req, res) => {
    try{
        const[result] = await pool.query('SELECT * FROM peliculas WHERE id=?', [req.params.id])
        if(result.length === 0) return res.status(404).json({message: 'Movie not found'})
        res.json(result[0])
    }catch(error){
        res.status(500).json({message: 'Internal server error'})
    }
}

export const createPeli = async (req, res) => {
    try{
        const {titulo, descripcion, duracion, genero_id, fecha_lanzamiento, portada, actor_id} = req.body
        const[result] = await pool.query('INSERT INTO peliculas(titulo, descripcion, duracion, genero_id, fecha_lanzamiento, portada, actor_id) VALUES (?,?,?,?,?,?,?)',
            [titulo, descripcion, duracion, genero_id, fecha_lanzamiento, portada, actor_id])
        res.send ({
            id : result.insertId,
            titulo,
            descripcion,
            duracion,
            genero_id, 
            fecha_lanzamiento, 
            portada, 
            actor_id
        })
    }catch(error){
        res.status(500).json({message: 'Internal server error'})
    }
}

export const updatePeli = async (req, res) => {
    try{
        const {titulo, descripcion, duracion, genero_id, fecha_lanzamiento, portada, actor_id} = req.body

        const [existingPeli] = await pool.query('SELECT * FROM peliculas WHERE id = ? AND enabled = true',[req.params.id])

        if(existingPeli.length === 0) return res.status(404).json({message: 'Movie not found'})
        
        const[result] = await pool.query('UPDATE peliculas SET ? WHERE id = ? ',[
            {titulo, descripcion, duracion, genero_id, fecha_lanzamiento, portada, actor_id},
            req.params.id
        ]) 
        if (result.affectedRows === 0){
            return res.status(404).json({message: 'Movie not found'})   
        }
        const[updatePeli] = await pool.query('SELECT * FROM peliculas WHERE id = ?',[req.params.id])
        res.json(updatePeli[0])
    }catch(error){
        res.status(500).json({message: 'Internal server error'})
    }

}


export const deletePeli = async (req, res) =>{
    try{
        const[result] = await pool.query('SELECT * FROM peliculas WHERE id = ? AND enabled = true',[req.params.id])
        if(result.length === 0) return res.status(404).json({message: 'Movie not found'})
        await pool.query('UPDATE peliculas SET enabled = false WHERE id = ?',[req.params.id])
        res.json({message: `Movie ${result[0].id} deleted successfuly`})
    }catch(error){
        res.status(500).json({message: 'Internal server error'}) 
    }
}