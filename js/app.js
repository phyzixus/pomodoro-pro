document.addEventListener("DOMContentLoaded", () => {

  let data = JSON.parse(localStorage.getItem("data")) || {
    days: {}
  };

  window.data = data; // make global
  window.chart = null;

  function todayKey() {
    return new Date().toISOString().split("T")[0];
  }

  window.todayKey = todayKey;

  document.getElementById("startBtn").addEventListener("click", startTimer);
  document.getElementById("resetBtn").addEventListener("click", resetTimer);

  updateDisplay();
  updateStats();
  updateChart();
  updateDailyBreakdown();
  calculateStreak();

});
