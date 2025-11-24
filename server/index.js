const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// --- MOCK AI ENDPOINT ---
// This mimics the AI Waste Scanner feature functionality [cite: 34]
app.post('/api/scan', (req, res) => {
    console.log("Image received! Processing...");

    // In a real app, we would process the image here.
    // For now, we return a random result to demo the UI to your teachers.
    const mockResults = [
        { type: "Plastic Bottle", category: "Recyclable", instructions: "Wash and squash before binning." },
        { type: "Banana Peel", category: "Organic", instructions: "Put in the compost bin." },
        { type: "Chips Packet", category: "Non-Recyclable", instructions: "Dispose in general trash." },
        { type: "Old Batteries", category: "E-Waste", instructions: "Drop at specialized e-waste center." }
    ];
    
    // Pick a random result
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    // Simulate a 2-second delay so it looks like AI is "thinking"
    setTimeout(() => {
        res.json(randomResult);
    }, 2000); 
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));