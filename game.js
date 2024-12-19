const fruits = ['🍒', '🍓', '🍇', '🍎', '🍉', '🍑', '🍊', '🍋', '🍍', '🍌', '🥑', '🍈', '🍐', '🥝', '🥭', '🥥', '🫐'];
const fruitScores = {
  '🍒': 10,
  '🍓': 15,
  '🍇': 20,
  '🍎': 25,
  '🍉': 30,
  '🍑': 35,
  '🍊': 40,
  '🍋': 45,
  '🍍': 50,
  '🍌': 55,
  '🥑': 60,
  '🍈': 65,
  '🍐': 70,
  '🥝': 75,
  '🥭': 80,
  '🥥': 85,
  '🫐': 90
};

let score = 0;
let basket = document.getElementById('basket');
let gameArea = document.getElementById('gameArea');
let backgroundMusic = document.getElementById('backgroundMusic');
let catchSound = document.getElementById('catchSound');

// 控制🧺移動
let basketX = gameArea.offsetWidth / 2 - basket.offsetWidth / 2;

document.addEventListener('mousemove', (e) => {
  basketX = e.clientX - basket.offsetWidth / 2;
  if (basketX < 0) basketX = 0;
  if (basketX > gameArea.offsetWidth - basket.offsetWidth) basketX = gameArea.offsetWidth - basket.offsetWidth;
  basket.style.left = basketX + 'px';
});

// 隨機生成水果並掉落
function generateFruit() {
  const fruit = fruits[Math.floor(Math.random() * fruits.length)];
  const fruitElement = document.createElement('div');
  fruitElement.classList.add('fruit');
  fruitElement.textContent = fruit;
  fruitElement.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';
  fruitElement.style.top = '0px';
  gameArea.appendChild(fruitElement);
  dropFruit(fruitElement, fruit);
}

// 水果掉落邏輯
function dropFruit(fruitElement, fruit) {
  let fruitY = 0;
  let dropSpeed = 5 + Math.floor(score / 50);  // 隨著分數增加，水果掉落速度加快
  const interval = setInterval(() => {
    fruitY += dropSpeed;
    fruitElement.style.top = fruitY + 'px';

    // 檢查水果是否被🧺接住
    if (fruitY > gameArea.offsetHeight - 80 && Math.abs(parseInt(fruitElement.style.left) - basketX) < 50) {
      score += fruitScores[fruit];
      catchSound.play();  // 播放音效
      fruitElement.remove();
      updateScore();
    }

    // 如果水果掉到屏幕底部，並且沒被接住
    if (fruitY > gameArea.offsetHeight) {
      fruitElement.remove();
    }
  }, 20);
}

// 更新分數顯示
function updateScore() {
  document.title = 分數: ${score};
}

setInterval(generateFruit, 1000);  // 每隔1秒掉落一個水果

// 開始背景音樂
backgroundMusic.play();
