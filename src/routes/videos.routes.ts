import { Router } from "express";
import { VideoRepository } from "../modules/videos/repositories/VideosRepository.js";
import { login } from '../middleware/login.js';

const videosRoutes = Router();
const videoRepository = new VideoRepository();

videosRoutes.post('/create-video', login, (req, res) => {
    videoRepository.create(req, res);
});

videosRoutes.get('/get-videos', login, (req, res) => {
    videoRepository.getVideos(req, res);
});

videosRoutes.get('/search', (req, res) => {
    videoRepository.searchVideos(req, res);
});

export { videosRoutes };