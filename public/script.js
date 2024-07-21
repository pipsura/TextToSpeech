async function generateAudio(text) {

    const response = await fetch('/api/text-to-speech', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text })
    })

    if (response.ok) {

        //Hide error message
        const error = document.getElementById("error-message");
        error.style.display = 'none';

        //Display audio player
        const audioBuffer = await response.arrayBuffer();
        const blob = new Blob([audioBuffer], { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(blob);

        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.src = audioUrl;
        audioPlayer.style.display = 'block';

    } else {
        console.error('Error generating audio:', response.statusText);

        //Display error message
        const message = await response.json();
        const error = document.getElementById("error-message");
        error.innerHTML =  `${response.statusText}: ${message.error}`;
        error.style.display = 'block';

        //Hide audio player
        const audioPlayer = document.getElementById('audio-player');
        audioPlayer.style.display = 'none';
    }
}

document.getElementById('submitBtn').addEventListener('click', () => {
    const text = document.getElementById('textInput').value;
    generateAudio(text);
});
