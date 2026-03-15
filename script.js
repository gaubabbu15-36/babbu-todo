let gameData = JSON.parse(localStorage.getItem('babbuData')) || { pointsP: 0, pointsL: 0, level: 1 };

function updateUI() {
    document.getElementById("pointsP").innerText = gameData.pointsP;
    document.getElementById("exp").innerText = gameData.pointsL % 100;
    document.getElementById("level").innerText = gameData.level;
    localStorage.setItem('babbuData', JSON.stringify(gameData));
}

function addTask() {
    let input = document.getElementById("taskInput");
    if (!input.value) return;
    let li = document.createElement("li");
    li.innerHTML = `${input.value} <button onclick="this.parentElement.remove(); gameData.pointsP+=5; updateUI();">Done</button>`;
    document.getElementById("taskList").appendChild(li);
    input.value = "";
}

function feed(type) {
    let cost = (type === 'sausage') ? 2 : 1;
    let gain = (type === 'sausage') ? 12 : 5;
    if (gameData.pointsP >= cost) {
        gameData.pointsP -= cost;
        gameData.pointsL += gain;
        gameData.level = Math.floor(gameData.pointsL / 100) + 1;
        updateUI();
    } else {
        alert("Không đủ điểm P!");
    }
}

function resetApp() {
    if(confirm("Xóa hết dữ liệu?")) {
        gameData = { pointsP: 0, pointsL: 0, level: 1 };
        document.getElementById("taskList").innerHTML = "";
        updateUI();
    }
}

updateUI();