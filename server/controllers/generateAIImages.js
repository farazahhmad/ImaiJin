import dotenv from "dotenv";
import fetch from "node-fetch";
import { createError } from "../error.js";

dotenv.config();

const MODEL_VERSION =
  "runwayml/stable-diffusion-v1-5:6e5b7c5c4c8e5d7a9a8f3c8d0a1c2e3f4b5a6d7c8e9f0a1b2c3d4e5f";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return next(createError(400, "Prompt is required"));
    }

    const startResponse = await fetch(
      "https://api.replicate.com/v1/predictions",
      {
        method: "POST",
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          version: MODEL_VERSION,
          input: {
            prompt,
            width: 512,
            height: 512,
          },
        }),
      }
    );

    

    const prediction = await startResponse.json();

    if (!startResponse.ok) {
      return next(
        createError(startResponse.status, JSON.stringify(prediction))
      );
    }

    let result = prediction;

    while (
      result.status !== "succeeded" &&
      result.status !== "failed"
    ) {
      await new Promise((r) => setTimeout(r, 2000));

      const pollResponse = await fetch(result.urls.get, {
        headers: {
          Authorization: `Token ${process.env.REPLICATE_API_TOKEN}`,
        },
      });

      result = await pollResponse.json();
    }

    if (result.status === "failed") {
      return next(createError(500, "Image generation failed"));
    }

    const imageUrl = result.output[0];
    const imageResponse = await fetch(imageUrl);
    const buffer = await imageResponse.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");

    res.status(200).json({
      success: true,
      photo: base64Image,
    });
  } catch (err) {
    next(createError(500, err.message || "Generation failed"));
  }
};




