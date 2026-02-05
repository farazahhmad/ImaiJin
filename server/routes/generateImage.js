import express from "express"

import { generateImage } from "../controllers/generateAIImages.js";

const generateImageRouter = express.Router();

generateImageRouter.post("/", generateImage);


export default generateImageRouter