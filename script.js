const submitButton = document.getElementById('submitGuess');
const guessInput = document.getElementById('guess');
const feedback = document.getElementById('feedback');
const attemptsDisplay = document.getElementById('attempts');
const historyDisplay = document.getElementById('history');
let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let startTime = new Date();
let history = [];

submitButton.addEventListener('click', function() {
    const userGuess = parseInt(guessInput.value);
    const difference = Math.abs(randomNumber - userGuess);
    attempts++;

    if (userGuess === randomNumber) {
        const endTime = new Date();
        const playTime = ((endTime - startTime) / 1000).toFixed(2);
        feedback.textContent = `正解です！おめでとうございます！プレイ時間: ${playTime}秒, ヒント使用回数: ${attempts}`;
        history.push({ time: playTime, attempts });
        updateHistory();
        resetGame();
    } else if (difference < 5) {
        feedback.textContent = 'とても近いです！';
    } else if (difference < 10) {
        feedback.textContent = '近いです！';
    } else if (difference < 20) {
        feedback.textContent = '少し離れています。';
    } else {
        feedback.textContent = '遠いです。';
    }
    attemptsDisplay.textContent = `ヒント使用回数: ${attempts}`;
});

function resetGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    startTime = new Date();
    guessInput.value = '';
    feedback.textContent = '';
    attemptsDisplay.textContent = 'ヒント使用回数: 0';
}

function updateHistory() {
    historyDisplay.innerHTML = history
        .sort((a, b) => a.attempts - b.attempts || a.time - b.time)
        .map(record => `時間: ${record.time}秒, ヒント使用回数: ${record.attempts}`)
        .join('<br>');
}
