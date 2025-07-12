// 獲取畫布和上下文
const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');

// 獲取音效元素
const eatSound = document.getElementById('eat-sound');
const gameOverSound = document.getElementById('game-over-sound');
const buttonClickSound = document.getElementById('button-click-sound');

// 遊戲設置
const gridSize = 20; // 網格大小
const tileCount = canvas.width / gridSize; // 網格數量
let speed = 7; // 遊戲速度

// 蛇的初始位置和速度
let snake = [
    { x: 10, y: 10 }, // 頭部
];
let velocityX = 0;
let velocityY = 0;

// 食物位置
let foodX;
let foodY;

// 遊戲狀態
let gameRunning = false;
let gameOver = false;
let score = 0;

// 按鈕元素
const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');
const scoreElement = document.getElementById('score');

// 初始化遊戲
function initGame() {
    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;
    score = 0;
    scoreElement.textContent = score;
    gameOver = false;
    placeFood();
}

// 隨機放置食物
function placeFood() {
    // 生成隨機坐標
    foodX = Math.floor(Math.random() * tileCount);
    foodY = Math.floor(Math.random() * tileCount);

    // 確保食物不會出現在蛇身上
    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === foodX && snake[i].y === foodY) {
            placeFood(); // 如果食物出現在蛇身上，重新放置
            return;
        }
    }
}

// 播放音效函數
function playSound(sound) {
    // 重置音效，以便可以連續播放
    sound.currentTime = 0;
    sound.play().catch(error => {
        // 處理瀏覽器可能阻止自動播放的情況
        console.log("音效播放失敗:", error);
    });
}

// 繪製遊戲
function drawGame() {
    // 清空畫布
    ctx.fillStyle = '#eee';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (gameOver) {
        drawGameOver();
        return;
    }

    if (!gameRunning) {
        drawStartScreen();
        return;
    }

    // 移動蛇
    moveSnake();

    // 檢查碰撞
    checkCollision();

    // 繪製食物
    drawFood();

    // 繪製蛇
    drawSnake();

    // 設置下一幀
    setTimeout(drawGame, 1000 / speed);
}

// 繪製開始畫面
function drawStartScreen() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('按下開始遊戲按鈕開始', canvas.width / 2, canvas.height / 2);
}

// 繪製遊戲結束畫面
function drawGameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('遊戲結束!', canvas.width / 2, canvas.height / 2 - 30);
    ctx.font = '20px Arial';
    ctx.fillText('最終分數: ' + score, canvas.width / 2, canvas.height / 2 + 10);
    ctx.fillText('按下重新開始按鈕再玩一次', canvas.width / 2, canvas.height / 2 + 50);
}

// 繪製食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc((foodX * gridSize) + gridSize / 2, (foodY * gridSize) + gridSize / 2, gridSize / 2, 0, Math.PI * 2);
    ctx.fill();
}

// 繪製蛇
function drawSnake() {
    // 繪製蛇身
    for (let i = 0; i < snake.length; i++) {
        // 不同顏色區分蛇頭和蛇身
        if (i === 0) {
            ctx.fillStyle = '#006400'; // 深綠色蛇頭
        } else {
            ctx.fillStyle = '#32CD32'; // 淺綠色蛇身
        }
        
        ctx.fillRect(snake[i].x * gridSize, snake[i].y * gridSize, gridSize - 1, gridSize - 1);
        
        // 添加蛇眼睛（如果是蛇頭）
        if (i === 0) {
            ctx.fillStyle = 'white';
            // 根據移動方向調整眼睛位置
            let eyeX1, eyeY1, eyeX2, eyeY2;
            const eyeSize = gridSize / 5;
            
            if (velocityX === 1) { // 向右
                eyeX1 = eyeX2 = snake[i].x * gridSize + gridSize * 3/4;
                eyeY1 = snake[i].y * gridSize + gridSize * 1/4;
                eyeY2 = snake[i].y * gridSize + gridSize * 3/4;
            } else if (velocityX === -1) { // 向左
                eyeX1 = eyeX2 = snake[i].x * gridSize + gridSize * 1/4;
                eyeY1 = snake[i].y * gridSize + gridSize * 1/4;
                eyeY2 = snake[i].y * gridSize + gridSize * 3/4;
            } else if (velocityY === 1) { // 向下
                eyeX1 = snake[i].x * gridSize + gridSize * 1/4;
                eyeX2 = snake[i].x * gridSize + gridSize * 3/4;
                eyeY1 = eyeY2 = snake[i].y * gridSize + gridSize * 3/4;
            } else { // 向上或靜止
                eyeX1 = snake[i].x * gridSize + gridSize * 1/4;
                eyeX2 = snake[i].x * gridSize + gridSize * 3/4;
                eyeY1 = eyeY2 = snake[i].y * gridSize + gridSize * 1/4;
            }
            
            ctx.beginPath();
            ctx.arc(eyeX1, eyeY1, eyeSize, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(eyeX2, eyeY2, eyeSize, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}

// 移動蛇
function moveSnake() {
    // 創建新的蛇頭
    const head = { x: snake[0].x + velocityX, y: snake[0].y + velocityY };
    
    // 將新的頭部添加到蛇的前面
    snake.unshift(head);
    
    // 檢查是否吃到食物
    if (head.x === foodX && head.y === foodY) {
        // 播放吃食物的音效
        playSound(eatSound);
        
        // 增加分數
        score += 10;
        scoreElement.textContent = score;
        
        // 每得100分增加速度
        if (score % 100 === 0 && speed < 15) {
            speed += 1;
        }
        
        // 放置新的食物
        placeFood();
    } else {
        // 如果沒有吃到食物，移除尾部
        snake.pop();
    }
}

// 檢查碰撞
function checkCollision() {
    const head = snake[0];
    
    // 檢查是否撞到牆壁
    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver = true;
        gameRunning = false;
        // 播放遊戲結束音效
        playSound(gameOverSound);
        return;
    }
    
    // 檢查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver = true;
            gameRunning = false;
            // 播放遊戲結束音效
            playSound(gameOverSound);
            return;
        }
    }
}

// 按鍵事件處理
document.addEventListener('keydown', function(event) {
    if (!gameRunning) return;
    
    // 方向鍵控制
    switch(event.key) {
        case 'ArrowUp':
            if (velocityY !== 1) { // 防止直接反向移動
                velocityX = 0;
                velocityY = -1;
            }
            break;
        case 'ArrowDown':
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;
        case 'ArrowLeft':
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;
        case 'ArrowRight':
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

// 按鈕事件處理
startBtn.addEventListener('click', function() {
    // 播放按鈕點擊音效
    playSound(buttonClickSound);
    
    if (!gameRunning && !gameOver) {
        gameRunning = true;
        // 初始設置蛇向右移動
        velocityX = 1;
        velocityY = 0;
        drawGame();
    }
});

restartBtn.addEventListener('click', function() {
    // 播放按鈕點擊音效
    playSound(buttonClickSound);
    
    initGame();
    gameRunning = true;
    // 初始設置蛇向右移動
    velocityX = 1;
    velocityY = 0;
    drawGame();
});

// 為移動設備添加觸控控制
let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', function(e) {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchmove', function(e) {
    if (!gameRunning) return;
    
    e.preventDefault();
    
    const touchEndX = e.touches[0].clientX;
    const touchEndY = e.touches[0].clientY;
    
    const diffX = touchEndX - touchStartX;
    const diffY = touchEndY - touchStartY;
    
    // 檢測滑動方向
    if (Math.abs(diffX) > Math.abs(diffY)) {
        // 水平滑動
        if (diffX > 0 && velocityX !== -1) {
            // 向右滑動
            velocityX = 1;
            velocityY = 0;
        } else if (diffX < 0 && velocityX !== 1) {
            // 向左滑動
            velocityX = -1;
            velocityY = 0;
        }
    } else {
        // 垂直滑動
        if (diffY > 0 && velocityY !== -1) {
            // 向下滑動
            velocityX = 0;
            velocityY = 1;
        } else if (diffY < 0 && velocityY !== 1) {
            // 向上滑動
            velocityX = 0;
            velocityY = -1;
        }
    }
    
    // 更新起始位置
    touchStartX = touchEndX;
    touchStartY = touchEndY;
});

// 初始化遊戲
initGame();
drawGame(); 