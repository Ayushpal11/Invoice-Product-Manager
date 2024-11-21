const express = require("express");
const multer = require("multer");
const fs = require("fs");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { GoogleAIFileManager } = require("@google/generative-ai/server");
require("dotenv").config();

const app = express();
const port = 5000;

// Enable CORS
var cors = require("cors");
app.use(cors());

// Configure multer for file uploads
const upload = multer({ dest: "uploads/" });

// Initialize Google Generative AI and FileManager
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const fileManager = new GoogleAIFileManager(process.env.GOOGLE_API_KEY);

// Retry Function
const retryRequest = async (fn, retries = 3, delay = 2000) => {
    for (let i = 0; i < retries; i++) {
        try {
            return await fn();
        } catch (error) {
            if (i < retries - 1 && error.status === 503) {
                console.warn(`Retrying... (${i + 1}/${retries})`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            } else {
                throw error;
            }
        }
    }
};

// Endpoint to handle file upload and processing
app.post("/upload-and-parse", upload.single("file"), async (req, res) => {
    try {
        const { file } = req;
        if (!file) {
            return res.status(400).json({ error: "No file uploaded." });
        }

        console.log(`File received: ${file.originalname}`);

        // Upload the file to Google Generative AI
        const uploadResponse = await fileManager.uploadFile(file.path, {
            mimeType: file.mimetype,
            displayName: file.originalname,
        });

        console.log(`Uploaded file to Google AI: ${uploadResponse.file.uri}`);

        // Use the Gemini model to extract invoice details with retry logic
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await retryRequest(() =>
            model.generateContent([
                {
                    fileData: {
                        mimeType: uploadResponse.file.mimeType,
                        fileUri: uploadResponse.file.uri,
                    },
                },
                { text: "Extract invoice details such as Invoice, Products, and Customer." },
            ])
        );

        console.log("Extracted details:", result.response.text);

        // Cleanup: Delete the file from the server
        fs.unlinkSync(file.path);

        // Send the extracted details to the frontend
        res.json({ details: result.response.text });
    } catch (error) {
        console.error("Error processing invoice:", error);

        // Cleanup: Ensure file is removed in case of error
        if (req.file && fs.existsSync(req.file.path)) {
            fs.unlinkSync(req.file.path);
        }

        // Handle specific 503 error
        if (error.status === 503) {
            return res
                .status(503)
                .json({ error: "Service temporarily unavailable. Please try again later." });
        }

        res.status(500).json({ error: "Failed to process the invoice." });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
