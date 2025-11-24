const express = require('express');
const cors = require('cors');
const multer = require('multer');
const app = express();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

app.use(cors());
app.use(express.json());

// --- MOCK AI ENDPOINT ---
// This mimics the AI Waste Scanner feature functionality
app.post('/api/scan', upload.single('image'), (req, res) => {
    console.log("Image received! Processing...");

    // Mock AI results with detailed information matching frontend expectations
    const mockResults = [
        {
            itemType: "Plastic Bottle (PET)",
            disposalMethod: "Recycle",
            instructions: "Rinse the bottle thoroughly, remove the cap and label if possible. Crush the bottle to save space and place it in the recycling bin designated for plastics.",
            additionalInfo: "PET (Polyethylene Terephthalate) is highly recyclable and can be made into new bottles, clothing fibers, or carpets.",
            impact: "Recycling one plastic bottle saves enough energy to power a laptop for 3 hours and reduces CO2 emissions!"
        },
        {
            itemType: "Banana Peel",
            disposalMethod: "Compost",
            instructions: "Add to your compost bin or community compost collection. Banana peels decompose quickly and are rich in potassium, making them excellent for composting.",
            additionalInfo: "Fruit and vegetable scraps make up about 30% of household waste. Composting them reduces landfill waste significantly.",
            impact: "Composting organic waste reduces methane emissions from landfills and creates nutrient-rich soil for gardens!"
        },
        {
            itemType: "Cardboard Box",
            disposalMethod: "Recycle",
            instructions: "Flatten the cardboard box to save space. Remove any plastic tape, labels, or staples. Place in the paper/cardboard recycling bin.",
            additionalInfo: "Cardboard is one of the most recycled materials worldwide. It can be recycled up to 5-7 times before the fibers become too short.",
            impact: "Recycling one ton of cardboard saves 46 gallons of oil and 9 cubic yards of landfill space!"
        },
        {
            itemType: "Old Batteries",
            disposalMethod: "E-Waste",
            instructions: "Never throw batteries in regular trash! Take them to a designated e-waste collection center. Batteries contain harmful chemicals that can leak into soil and water.",
            additionalInfo: "Many stores and community centers have battery recycling drop-off points. Check our map for the nearest location.",
            impact: "Proper battery disposal prevents soil and water contamination and allows valuable materials like zinc and manganese to be recovered!"
        },
        {
            itemType: "Glass Jar",
            disposalMethod: "Recycle",
            instructions: "Rinse the jar thoroughly and remove the lid. Glass can be recycled indefinitely without losing quality. Place in glass recycling bin.",
            additionalInfo: "Clear, green, and brown glass are all recyclable. Make sure to separate by color if required in your area.",
            impact: "Recycling glass saves 30% of the energy needed to make new glass and reduces air pollution by 20%!"
        },
        {
            itemType: "Styrofoam Container",
            disposalMethod: "Trash",
            instructions: "Unfortunately, most recycling facilities cannot process styrofoam. Dispose in general waste bin. Consider using reusable containers in the future.",
            additionalInfo: "Styrofoam takes over 500 years to decompose and is harmful to marine life. Avoid single-use styrofoam products when possible.",
            impact: "While this item can't be recycled, choosing reusable alternatives next time can make a huge difference!"
        },
        {
            itemType: "Aluminum Can",
            disposalMethod: "Recycle",
            instructions: "Rinse the can and crush it to save space. Place in metal recycling bin. Aluminum is infinitely recyclable!",
            additionalInfo: "Recycling aluminum cans saves 95% of the energy needed to make new cans from raw materials.",
            impact: "One recycled aluminum can saves enough energy to run a TV for 3 hours!"
        },
        {
            itemType: "Old Mobile Phone",
            disposalMethod: "E-Waste",
            instructions: "Take to an e-waste collection center. Remove personal data first. Many phones contain precious metals and can be refurbished or recycled.",
            additionalInfo: "E-waste is the fastest-growing waste stream globally. Proper disposal prevents toxic materials from entering the environment.",
            impact: "Recycling one million phones recovers 35,000 pounds of copper, 772 pounds of silver, and 75 pounds of gold!"
        }
    ];
    
    // Pick a random result to simulate AI identification
    const randomResult = mockResults[Math.floor(Math.random() * mockResults.length)];
    
    // Simulate a 2-second delay so it looks like AI is "thinking"
    setTimeout(() => {
        console.log("Returning result:", randomResult.itemType);
        res.json(randomResult);
    }, 2000); 
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'EcoSort API is running!' });
});

// Mock endpoint for future features (you can expand these)
app.get('/api/centers', (req, res) => {
    res.json({ message: 'Recycling centers endpoint - coming soon!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 EcoSort Server running on port ${PORT}`);
    console.log(`📡 Mock AI endpoint ready at http://localhost:${PORT}/api/scan`);
});