function srpGame(yourChoice) {
    var humanChoice = yourChoice.id;
    var random = Math.floor(Math.random() * 3);
    var botChoice = numberToChoice(random);
    var result = decideWinner(humanChoice, botChoice);
    var message = finalMessage(result);
    rpsFrontEnd(humanChoice, botChoice, message);
}

function numberToChoice(number) {
    return ['scissors', 'rock', 'paper'][number];
}

function decideWinner(yourChoice, computerChoice) {
    var rpsDatabase = {
        'scissors': {'scissors': 0.5, 'rock': 0, 'paper': 1},
        'rock': {'scissors': 1, 'rock': 0.5, 'paper': 0},
        'paper': {'scissors': 0, 'rock': 1, 'paper': 0.5}
    };
    var yourScore = rpsDatabase[yourChoice][computerChoice];
    var computerScore = rpsDatabase[computerChoice][yourChoice];
    return [yourScore, computerScore];
}

function finalMessage([yourScore, computerScore]) {
    if (yourScore === 0) {
        return {'message': 'Bạn thua !', 'color': 'red'};
    } else if (yourScore === 0.5) {
        return {'message': 'Hòa rồi !', 'color': '#d4ac0d'};
    } else {
        return {'message': 'Bạn thắng !', 'color': 'blue'};
    }
}

function rpsFrontEnd(humanImageChoice, botImageChoice, finalMessage) {
    var imagesDatabase = {
        'scissors': document.getElementById('scissors').src,
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src
    };


    // 1. Ẩn giao diện chọn đi
    document.getElementById('game-row').style.display = 'none';

    // 2. Lấy thẻ div chứa kết quả
    var resultRow = document.getElementById('result-row');
    
    // Xóa nội dung cũ (nếu có) để đảm bảo sạch sẽ
    resultRow.innerHTML = ''; 

    // 3. Tạo các thẻ div kết quả mới
    var humanDiv = document.createElement('div');
    var botDiv = document.createElement('div');
    var messageDiv = document.createElement('div');

    humanDiv.className = "col-human";
    messageDiv.className = "col-message";
    botDiv.className = "col-bot";

    // 4. Điền nội dung vào các thẻ div
    humanDiv.innerHTML = "<img src='" + imagesDatabase[humanImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(37, 50, 233, 1);'>";
    
    messageDiv.innerHTML = 
        "<h1 style='color: " + finalMessage['color'] + "; padding: 10px; margin: 0;'>" + finalMessage['message'] + "</h1>" +
        "<button class='btn-retry' onclick='location.reload()'>Chơi lại</button>";
    
    botDiv.innerHTML = "<img src='" + imagesDatabase[botImageChoice] + "' style='box-shadow: 0px 10px 50px rgba(243, 38, 24, 1);'>";

    // 5. Thêm các div vào khu vực kết quả
    resultRow.appendChild(humanDiv);
    resultRow.appendChild(messageDiv);
    resultRow.appendChild(botDiv);

    // 6. Hiển thị khu vực kết quả (sử dụng flex để nó nhận style canh giữa của class .row)
    resultRow.style.display = 'flex';
}