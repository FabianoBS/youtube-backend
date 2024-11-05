import { pool } from '../../../mysql.js';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

class VideoRepository {
    create(req: Request, res: Response) {
        const { title, description, user_id } = req.body;
        pool.getConnection((err: any, connection: any) => { 
            connection.query(       
                'INSERT INTO videos (video_id, user_id, title, description) VALUES (?,?,?,?)',
                [uuidv4(), user_id, title, description],
                (error: any, result: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return res.status(400).json(error)
                    }
                    return res.status(200).json({ message: 'Vídeo criado com sucesso' });
                }
            )
        })
    }

    getVideos(req: Request, res: Response) {
        const { user_id } = req.body;
        pool.getConnection((err: any, connection: any) => { 
            connection.query(       
                'SELECT * FROM videos WHERE user_id = ?',
                [user_id],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return res.status(400).json({ error: 'Erro ao buscar vídeos!' })
                    }
                    return res.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
                }
            )
        })
    }

    searchVideos(req: Request, res: Response) {
        const { search } = req.query;
        pool.getConnection((err: any, connection: any) => { 
            connection.query(       
                'SELECT * FROM videos WHERE title LIKE ?',
                [`%${search}%`],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return res.status(400).json({ error: 'Erro ao buscar vídeos!' })
                    }
                    return res.status(200).json({ message: 'Vídeos retornados com sucesso', videos: results });
                }
            )
        })
    }
}

export { VideoRepository };