import { pool } from '../../../mysql.js';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { Request, Response } from 'express';

class UserRepository {
    create(req: Request, res: Response) {
        const { name, email, password } = req.body;
        pool.getConnection((err: any, connection: any) => { 
            if (err) {
                return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
            }
            hash(password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json(err);
                }

                connection.query(       
                    'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                    [uuidv4(), name, email, hash],
                    (error: any, result: any, fields: any) => {
                        connection.release();
                        if (error) {
                            return res.status(400).json(error);
                        }
                        return res.status(200).json({ message: 'Usuário criado com sucesso' });
                    }
                );
            });
        });
    }

    login(req: Request, res: Response) {
        const { email, password } = req.body;
        pool.getConnection((err: any, connection: any) => { 
            if (err) {
                return res.status(500).json({ error: 'Erro ao conectar ao banco de dados' });
            }

            connection.query(       
                'SELECT * FROM users WHERE email = ?',
                [email],
                (error: any, results: any, fields: any) => {
                    connection.release();
                    if (error) {
                        return res.status(400).json({ error: "Erro na sua autenticação" });
                    }

                    if (results.length === 0) {
                        return res.status(404).json({ error: "Usuário não encontrado" });
                    }

                    compare(password, results[0].password, (err: any, result: any) => {
                        if (err) {
                            return res.status(400).json({ error: "Erro na sua autenticação" });
                        }

                        if (result) {
                            // jsonwebtoken
                            const token = sign(
                                {
                                    id: results[0].user_id,
                                    email: results[0].email
                                }, process.env.SECRET as string, { expiresIn: '1d' }
                            );
                            return res.status(200).json({ token: token, message: 'Autenticado com sucesso' });
                        } else {
                            return res.status(400).json({ error: 'Senha incorreta' });
                        }
                    });
                }
            );
        });
    }
}

export { UserRepository };
