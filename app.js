const express = require('express');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/text-to-speech', async (request, resp) => {
    const { text } = request.body;

    if (!text) {
        return resp.status(400).json({ error: 'Text is required!' });
    }

    try {
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${process.env.ELEVENLABS_VOICE_ID}`, {
            method: 'POST',
            headers: {
                'xi-api-key': process.env.ELEVENLABS_API_KEY,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text: text })
        });

        if (response.ok) {
            const audioBuffer = await response.arrayBuffer();
            resp.status(200);
            resp.set('Content-Type', 'audio/mpeg');
            resp.send(Buffer.from(audioBuffer));
        } else {
            resp.status(500);
            resp.json({ error: 'FError generating audio', details: response.statusText });
            console.error('Error generating audio:', response.statusText);
        }


    } catch (err) {
        resp.status(500);
        resp.json({ error: 'Error generating audio', details: err.message });
        console.error('Error generating audio:', err);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
