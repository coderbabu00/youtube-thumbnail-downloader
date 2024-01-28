const express = require('express');
const axios = require('axios');

const cors = require('cors');
const app = express();

// Cors middleware ka istemal karo
app.use(cors());

// JSON requests ko parse karne ke liye express.json() middleware ka istemal karo
app.use(express.json());

// Server ko 5009 port par run karo
const PORT = 5009;

// "/getThumbnail" endpoint par POST request ko handle karo
app.post("/getThumbnail", async (req, res) => {
    try {
        // Request se aayi video URL ko extract karo
        const videoUrl = req.body.videoUrl;

        // Video ID ko extract karne ke liye URL object banao
        const videoId = new URL(videoUrl).searchParams.get('v');

        // Various resolutions ke liye thumbnail URLs tayar karo
        const thumbnailUrls = {
            default: `https://img.youtube.com/vi/${videoId}/default.jpg`,
            medium: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
            high: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
            standard: `https://img.youtube.com/vi/${videoId}/sddefault.jpg`,
            max: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };

        // Thumbnail URLs ko JSON response ke roop mein bhejo
        res.json(thumbnailUrls);
    } catch (err) {
        // Agar koi error aata hai toh use console par log karo
        console.error(err);

        // Internal Server Error ka response bhejo
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Server ko specified PORT par listen karo
app.listen(PORT, () => {
    console.log(`Server port ${PORT} par chal raha hai`);
});
