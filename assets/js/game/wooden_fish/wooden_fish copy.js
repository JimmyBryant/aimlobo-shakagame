const keyName_1_00 = 'game_wooden_fish';


// Initialize game state from localStorage
function initializeGameState() {
  const today = new Date();
  const savedState = JSON.parse(readFromLocalStorage("game_wooden_fish")) || {};

  if (!savedState.lastReset || new Date(savedState.lastReset).getDate() !== today.getDate()) {
      savedState.lastReset = today;
      savedState.clickCount = 0;
      savedState.lastExecutedCount = 0;
  }

  writeToLocalStorage("game_wooden_fish", JSON.stringify(savedState));
  return savedState;
}

// Save game state to localStorage
function saveGameState(state) {
  writeToLocalStorage("game_wooden_fish", JSON.stringify(state));
}


// Initialize game
function initializeGame() {
  let blessContent = "🥰 + 1, 😭 - 1";
  const sound = new Howl({ src: ["/audio/game/wooden_fish/sound.mp3"] });
  const bgm = new Howl({
      src: ["/audio/game/wooden_fish/1721013450.mp3"],
      html5: true,
      loop: true,
      volume: 0.3,
  });

  let ringId = 0;
  let count = 0;
  let autoClick = false;
  let autoClickInterval = null;
  let clickTimes = [];
  let lastClickTime = new Date().getTime(); // Initialize the last click time
  const speedDisplay = document.querySelector('.var-speed');
  const countElement = document.querySelector(".count");
  const woodenFishElement = document.querySelector(".woodenFish");
  const centerElement = document.querySelector(".center");

  const gameState = initializeGameState();
  count = gameState.clickCount;
  countElement.innerHTML = String(count);

  function startAnimate(message) {
      countElement.style.transform = "scale(1.2)";
      woodenFishElement.style.transform = "scale(.95)";
      const div = document.createElement("div");
      div.classList.add("subtitleCountTip");
      div.innerText = message;
      centerElement.appendChild(div);
      setTimeout(() => {
          div.remove();
      }, 1000);
  }

  function initAnimate() {
      countElement.style.transform = "scale(1)";
      woodenFishElement.style.transform = "scale(1)";
  }

  function counter(message = blessContent) {
      count++;
      countElement.innerHTML = String(count);
      startAnimate(message);
      if (ringId !== 0) {
          if (sound.playing()) {
              sound.stop(ringId);
          }
          sound.play(ringId);
      } else {
          ringId = sound.play();
      }

      gameState.clickCount = count;
      
      // Check if the click count is a multiple of 100 and update game state accordingly -- 每满100次点击给一个幸运值，并增加一次游戏次数；
      if (count % 100 === 0 && count > gameState.lastExecutedCount) {
          updateTotalLuckyPoint(1);
          writeEventLogLuckyPoint('wooden fish click 100', 1);
          updateGameTime(1);
          writeEventLogGameTime('wooden fish', 1);
          gameState.lastExecutedCount = count;
      }

      saveGameState(gameState);

      // Record click time
      const now = new Date().getTime();
      lastClickTime = now; // Update the last click time
      clickTimes.push(now);

      // Maintain click times list length to 5
      if (clickTimes.length > 5) {
          clickTimes.shift();
      }

      // Calculate speed
      if (clickTimes.length === 5) {
          const duration = (clickTimes[4] - clickTimes[0]) / 1000; // Total time for 5 clicks in seconds
          const clicksPerMinute = (4 / duration) * 60; // Clicks per minute
          speedDisplay.innerHTML = clicksPerMinute.toFixed(0); // Update speed display
      }
  }

  // Update speed display every second
  setInterval(() => {
      const now = new Date().getTime();
      const timeSinceLastClick = (now - lastClickTime) / 1000; // Time since last click in seconds

      if (timeSinceLastClick > 5) {
          speedDisplay.innerHTML = "0"; // Display 0 if more than 5 seconds since last click
      } else if (clickTimes.length === 5) {
          const duration = (clickTimes[4] - clickTimes[0]) / 1000; // Total time for 5 clicks in seconds
          const clicksPerMinute = (4 / duration) * 60; // Clicks per minute
          speedDisplay.innerHTML = clicksPerMinute.toFixed(0); // Update speed display
      } else {
          speedDisplay.innerHTML = "0"; // Display 0 if fewer than 5 clicks
      }
  }, 1000);

  woodenFishElement.addEventListener("mouseover", () => {
      woodenFishElement.style.cursor = "url('/image/game/wooden_fish/cursor.cur'), auto";
  });

  woodenFishElement.addEventListener("mouseout", () => {
      woodenFishElement.style.cursor = "auto";
  });

  woodenFishElement.addEventListener("mouseup", () => {
      counter();
  });

  woodenFishElement.addEventListener("mousedown", () => {
      setTimeout(initAnimate, 200);
  });

  const autoCheckbox = document.querySelector('input[name="auto"]');
  const bgmCheckbox = document.querySelector('input[name="bgm"]');

  autoCheckbox.addEventListener("change", () => {
      if (autoCheckbox.checked) {
          autoClick = true;
          // 开启自动敲击消耗0.5个幸运值；
          updateTotalLuckyPoint(-0.5);
          writeEventLogLuckyPoint('wooden fish auto click', -0.5);
          autoClickInterval = setInterval(() => {
              counter();
              setTimeout(initAnimate, 200);
          }, 1000);
      } else {
          autoClick = false;
          clearInterval(autoClickInterval);
      }
  });

  bgmCheckbox.addEventListener("change", () => {
      if (bgmCheckbox.checked) {
          if (bgm.state() !== "loaded") {
              bgm.load();
          }
          bgm.play();
      } else {
          bgm.pause();
      }
  });

  // Edit prayer
  const popupFormPrayer = document.querySelector('.popup-form-prayer');
  const prayerCustomizeInput = document.getElementById('prayer_customize_input');
  const formPrayer = document.querySelector('.form-prayer');

  clickDisplayFlex(countElement, popupFormPrayer);

  formPrayer.addEventListener('change', (event) => {
      if (event.target.name === 'prayer') {
          if (event.target.id === 'prayer_customize') {
              prayerCustomizeInput.classList.remove('hide');
          } else {
              prayerCustomizeInput.classList.add('hide');
          }
      }
  });

  formPrayer.addEventListener('submit', (event) => {
      event.preventDefault();
      const selectedPrayerElement = document.querySelector('input[name="prayer"]:checked');
      let selectedPrayer = selectedPrayerElement.value;
      blessContent = selectedPrayer;
      if (selectedPrayer === 'prayer_customize') {
          blessContent = prayerCustomizeInput.value;
      }
      hide(popupFormPrayer);
  });

  formPrayer.addEventListener('reset', () => {
      formPrayer.reset();
      hide(popupFormPrayer);
  });

  // Edit game title
  const gameTitle = document.querySelector('.game-title .title');
  const popupFormGameTitle = document.querySelector('.popup-form-game-title');
  const formGameTitle = document.querySelector('.form-game-title');

  clickDisplayFlex(gameTitle, popupFormGameTitle);

  formGameTitle.addEventListener('submit', (event) => {
      event.preventDefault();
      const gameTitleInput = document.querySelector('.game-title-input').value;
      gameTitle.innerHTML = gameTitleInput;
      hide(popupFormGameTitle);
  });

  formGameTitle.addEventListener('reset', () => {
      formGameTitle.reset();
      hide(popupFormGameTitle);
  });
}

// Initialize the game when the script is loaded
initializeGame();
