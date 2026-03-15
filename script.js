let gameData = JSON.parse(localStorage.getItem('babbuData')) || { pointsP: 0, pointsL: 0, level: 1 };
let countdown;

function updateUI() {
    let babbuIcon = "🦊"; // Mặc định là cáo nhỏ
    
    // Logic tiến hóa của Babbu
    if (gameData.level >= 10) {
        babbuIcon = "🦁"; // Chú cáo đã trở thành "sư tử" Babbu
    } else if (gameData.level >= 5) {
        babbuIcon = "🐺"; // Chú cáo lớn hơn (chó sói)
    }

    document.getElementById("pointsP").innerText = gameData.pointsP;
    document.getElementById("exp").innerText = gameData.pointsL % 100;
    document.getElementById("level").innerText = gameData.level;
    
    // Cập nhật icon vào thẻ HTML
    document.getElementById("babbuIcon").innerText = babbuIcon;
    
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
        alert("Không đủ điểm P rồi!");
    }
}

function takeBreak() {
    if (gameData.pointsP >= 1) {
        gameData.pointsP -= 1;
        updateUI();
        
        let seconds = 60;
        clearInterval(countdown);
        
        countdown = setInterval(() => {
            seconds--;
            document.getElementById("timerDisplay").innerText = `Đang nghỉ: ${seconds} giây`;
            if (seconds <= 0) {
                clearInterval(countdown);
                document.getElementById("timerDisplay").innerText = "Hết giờ nghỉ! 🐾";
            }
        }, 1000);
    } else {
        alert("Bạn cần ít nhất 1 điểm P để nghỉ ngơi!");
    }
}

function resetApp() {
    if(confirm("Bạn có chắc muốn xóa hết danh sách việc và điểm P không? (Level và EXP của Babbu sẽ được giữ nguyên)")) {
        // Chỉ reset những thứ này
        gameData.pointsP = 0; 
        
        // Giữ nguyên gameData.pointsL và gameData.level
        
        // Xóa danh sách việc trên giao diện và trong bộ nhớ
        document.getElementById("taskList").innerHTML = "";
        
        // Dừng đếm ngược nếu đang chạy
        clearInterval(countdown);
        document.getElementById("timerDisplay").innerText = "";
        
        // Cập nhật lại giao diện
        updateUI();
    }
}

updateUI();
