import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [result, setResult] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('http://localhost:5000/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setResult(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <div>
            <h1>Document Information Extractor</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} accept="image/*" required />
                <button type="submit">Upload</button>
            </form>
            {result && (
                <div>
                    <h2>Extracted Information:</h2>
                    <p>Name: {result.name}</p>
                    <p>Document Number: {result.document_number}</p>
                    <p>Expiration Date: {result.expiration_date}</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;