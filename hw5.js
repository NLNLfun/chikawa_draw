// 載入字典（這裡你可以用字典檔案替換或手動設置）
let words = []; // 存放讀取到的單字列表
let answer = ""; // 遊戲的隨機答案

// 從 .txt 檔案中讀取單字列表
async function loadWords() {
  try {
    const response = await fetch("dictionary.txt"); // 確保 dictionary.txt 與 HTML 在同一資料夾
    if (!response.ok) {
      throw new Error("Failed to fetch dictionary.txt");
    }
    const text = await response.text();
    words = text.split("\n").map((word) => word.trim()).filter((word) => word.length === 5); // 只保留 5 字母單字
    answer = words[Math.floor(Math.random() * words.length)]; // 隨機選擇答案
    console.log("Game initialized with answer:", answer); // 測試用
    initGrid(); // 初始化遊戲格子
    initKeyboard(); // 初始化鍵盤
  } catch (error) {
    console.error("Error loading words:", error);
    alert("Failed to load dictionary. Please check the file.");
  }
}

// 初始化遊戲
loadWords();

// 初始化遊戲狀態
let currentRow = 0;
let currentCol = 0;
let currentGuess = "";

// 建立畫面
function initGrid() {
  const grid = document.getElementById("grid");
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 5; j++) {
      const cell = document.createElement("div");
      cell.classList.add("grid-cell");
      cell.id = `cell-${i}-${j}`;
      grid.appendChild(cell);
    }
  }
}

function initKeyboard() {
  const keyboard = document.getElementById("keyboard");
  const row1 = [..."qwertyuiop".split(""), "Del"];
  const row2 = [ ..."asdfghjkl".split(""), "Enter",];
  const row3 = "zxcvbnm".split("");

  // 第一行鍵盤
  const row1Container = document.createElement("div");
  row1Container.classList.add("keyboard-row");
  row1.forEach((key) => createKey(key, row1Container));
  keyboard.appendChild(row1Container);

  // 第二行鍵盤
  const row2Container = document.createElement("div");
  row2Container.classList.add("keyboard-row");
  row2.forEach((key) => createKey(key, row2Container));
  keyboard.appendChild(row2Container);

  // 第三行鍵盤
  const row3Container = document.createElement("div");
  row3Container.classList.add("keyboard-row");
  row3.forEach((key) => createKey(key, row3Container));
  keyboard.appendChild(row3Container);
}

function createKey(key, rowContainer) {
  const keyButton = document.createElement("button");
  keyButton.textContent = key;
  keyButton.classList.add("key");
  keyButton.addEventListener("click", () => handleKeyPress(key));
  rowContainer.appendChild(keyButton);
}

// 處理按鍵事件
function handleKeyPress(key) {
  if (key === "Enter") {
    handleEnter();
  } else if (key === "Del") {
    handleDelete();
  } else if (currentCol < 5) {
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    cell.textContent = key;
    currentGuess += key;
    currentCol++;
  }
}

function handleDelete() {
  if (currentCol > 0) {
    currentCol--;
    const cell = document.getElementById(`cell-${currentRow}-${currentCol}`);
    cell.textContent = "";
    currentGuess = currentGuess.slice(0, -1);
  }
}

function handleEnter() {
  if (currentGuess.length === 5) {
    // 檢查答案並更新行的顯示
    checkGuess();
    if (currentGuess === answer) {
      return; // 猜對則直接結束
    }
    currentRow++;
    currentCol = 0;
    currentGuess = "";

    // 若超過最大行數
    if (currentRow === 6) {
      alert(`Game over! The word was: ${answer}`);
    }
  } else {
    alert("Word must be 5 letters!");
  }
}


function checkGuess() {
  const guess = currentGuess.split("");
  const answerArray = answer.split("");

  guess.forEach((letter, index) => {
    const cell = document.getElementById(`cell-${currentRow}-${index}`);
    const key = Array.from(document.querySelectorAll(".key")).find(
      (key) => key.textContent.toLowerCase() === letter.toLowerCase()
    );

    if (letter === answerArray[index]) {
      // 字母和位置都正確
      cell.classList.add("correct");
      if (key) key.classList.add("correct");
    } else if (answerArray.includes(letter)) {
      // 字母正確但位置錯誤
      cell.classList.add("present");
      if (key) key.classList.add("present");
    } else {
      // 字母不存在
      cell.classList.add("absent");
      if (key) key.classList.add("absent");
    }
  });

  // 如果猜中答案
  if (currentGuess === answer) {
    alert("Congratulations! You guessed the word!");
  }
}


// 初始化遊戲
initGrid();
initKeyboard();
