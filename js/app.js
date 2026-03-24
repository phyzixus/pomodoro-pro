let data = JSON.parse(localStorage.getItem("data")) || {
  days: {}
};

let chart;

function todayKey() {
  return new Date().toISOString().split("T")[0];
}

document.getElementById("startBtn").addEventListener("click", startTimer);
document.getElementById("resetBtn").addEventListener("click", resetTimer);

updateDisplay();
updateStats();
updateChart();
updateDailyBreakdown();
calculateStreak();
