// pages/api/upload-bill.js
import { createWorker } from 'tesseract.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import fs from 'fs';
import multer from 'multer';

export const config = {
    api: {
        bodyParser: false, // Disable the default body parser
    },
};

const upload = multer({ dest: 'uploads/' });

export default async function handler(req, res) {
    upload.single('bill')(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ error: 'File upload failed' });
        }

        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Extract text using Tesseract.js
        const worker = createWorker();
        await worker.load();
        await worker.loadLanguage('eng');
        await worker.initialize('eng');

        const { data: { text } } = await worker.recognize(req.file.path);
        await worker.terminate();

        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);

        // Initialize Gemini AI
        const genAI = new GoogleGenerativeAI(process.env.AIzaSyBMz9xcPFzioy1i_4QwWeBm9g--T_I3hbg
        );
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        try {
            // Generate personalized suggestions
            const prompt = `Analyze the following bill and provide personalized suggestions to optimize it:\n\n${text}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const suggestions = response.text();

            res.status(200).json({ text, suggestions });
        } catch (error) {
            console.error('Error generating suggestions with Gemini AI:', error);
            res.status(500).json({ error: 'Failed to generate suggestions', details: error.message });
        }
    });
}