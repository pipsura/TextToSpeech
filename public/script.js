async function generateAudio(text) {
    
    const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    });
    
    if (response.ok) {
        
        const audioBuffer = await response.arrayBuffer();
        const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);

        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = audioUrl;
        audioPlayer.style.display = 'block';

    } else {
        console.error('Error generating audio:', response.statusText);
    }
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const text = document.getElementById('textInput').value;
    generateAudio(text);
});
