let time = 1500;
let timer = null;
let isBreak = false;

function updateDisplay() {
  let m = Math.floor(time / 60);
  let s = time % 60;

  document.getElementById("timer").innerText =
    `${m}:${s < 10 ? '0' : ''}${s}`;
}

function startTimer() {
  if (timer) return;

  let study = document.getElementById("study").value || 25;
  let brk = document.getElementById("break").value || 5;

  time = isBreak ? brk * 60 : study * 60;

  timer = setInterval(() => {
    time--;
    updateDisplay();

    if (time <= 0) {
      clearInterval(timer);
      timer = null;

      if (!isBreak) addStudyTime(parseInt(study));

      isBreak = !isBreak;
      startTimer();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  timer = null;
  isBreak = false;
  time = 1500;
  updateDisplay();
}
