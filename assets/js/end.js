const username = document.getElementById("username");
const saveScore = document.getElementById("saveScore");
const finalScore = document.getElementById("finalScore");
const mostRecentScore = localStorage.getItem("mostRecentScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const highScoresList = document.getElementById("highScoresList");

const MAX_HIGH_SCORES = 5;

finalScore.innerText = mostRecentScore ;



username.addEventListener("keyup", () => {
    saveScore.disabled = !username.value;
    console.log(username.value);
});
saveHighScore = e => {
    console.log("clicked the save button!");
    e.preventDefault();
    const score = {
        score: Math.floor(Math.random() * 10),
        name: username.value
    };
    highScores.push(score);
    highScores.sort((a,b) => b.score - a.score);
    highScores.splice(5);
    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("game.html");
}

saveScore.addEventListener("click", saveHighScore);

highScoresList.innerHTML = highScores.map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}
).join("");
