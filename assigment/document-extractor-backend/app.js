const express = require('express');
const multer = require('multer');
const tesseract = require('tesseract.js');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Directory to store uploaded files

// Enable CORS
app.use(cors());

// Function to extract details from text
function extractDetails(text) {
    const nameMatch = text.match(/Name:\s*([A-Za-z\s]+)/);
    const documentNumberMatch = text.match(/Document Number:\s*([A-Za-z0-9]+)/);
    const expirationDateMatch = text.match(/Expiration Date:\s*([0-9]{2}\/[0-9]{2}\/[0-9]{4})/);

    return {
        name: nameMatch ? nameMatch[1] : null,
        document_number: documentNumberMatch ? documentNumberMatch[1] : null,
        expiration_date: expirationDateMatch ? expirationDateMatch[1] : null,
    };
}

// Upload endpoint
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }

    // Perform OCR on the uploaded image
    tesseract
        .recognize(req.file.path, 'eng')
        .then(({ data: { text } }) => {
            const details = extractDetails(text);
            res.json(details);
        })
        .catch((error) => {
            console.error('Error during OCR:', error);
            res.status(500).json({ error: 'Error processing the image' });
        });
});

// Start the server
const PORT =  5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});