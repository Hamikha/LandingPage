const inputText = document.getElementById('inputText');
const convertButton = document.getElementById('convertButton');
const outputAudio = document.getElementById('outputAudio');

async function convertToSpeech() {
    const text = inputText.value;
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/facebook/mms-tts-eng', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: text })
        });

        if (response.ok) {
            const result = await response.blob();
            const audioUrl = URL.createObjectURL(result);
            outputAudio.src = audioUrl;
        } else {
            console.error('Error converting text to speech:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error converting text to speech:', error);
    }
}

convertButton.addEventListener('click', convertToSpeech);
