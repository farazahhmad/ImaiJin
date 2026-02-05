ImaiJin

AI Image Generation & Sharing Platform

Create AI is a full-stack web application that allows users to generate images from text prompts using AI, preview them instantly, and share them as posts.
The project focuses on a modern UI, a clean backend architecture, and real-world AI integration.

🚀 Features
🧠 Generate images from text prompts using AI
🖼️ Live preview of generated images
✍️ Add author name and prompt
📤 Post generated images to a public feed
🔍 Explore posts created by others
📱 Fully responsive (desktop & mobile)
⚡ Fast and modern UI with dark theme


🛠️ Tech Stack

🌐 Frontend
React.js
Styled Components
Material UI Icons
Axios
Lazy Load Images

🧪 Backend
Node.js
Express.js
MongoDB
Mongoose
Cloudinary
dotenv
CORS

🤖 AI Technology
Replicate AI
Uses Stable Diffusion models
Converts text prompts into images
Returns generated image URLs
Images are converted to Base64 for frontend display



🧠 How the Project Works

1️⃣ Image Generation Flow
User enters:
Name
Text prompt
Frontend sends the prompt to the backend
Backend calls Replicate AI
Replicate generates the image using a Stable Diffusion model
Image URL is returned to backend
Backend converts the image to Base64
Frontend displays the generated image instantly

2️⃣ Posting Images
After generating an image, user clicks Post
Backend uploads image to Cloudinary
Image URL, author, and prompt are saved in MongoDB
Post becomes visible on the home page

3️⃣ Exploring Posts
Posts are fetched from MongoDB
Displayed in a responsive masonry-style grid
Hover effects show prompt and author
Lazy loading improves performance




