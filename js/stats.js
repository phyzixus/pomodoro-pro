function addStudyTime(minutes) {
  let key = todayKey();

  if (!data.days[key]) {
    data.days[key] = { studyMinutes: 0 };
  }

  data.days[key].studyMinutes += minutes;

  localStorage.setItem("data", JSON.stringify(data));

  updateStats();
  updateChart();
  updateDailyBreakdown();
  calculateStreak();
}

function updateStats() {
  let key = todayKey();

  let todayMinutes = data.days[key]?.studyMinutes || 0;

  let totalMinutes = Object.values(data.days)
    .reduce((sum, d) => sum + (d.studyMinutes || 0), 0);

  let totalHours = (totalMinutes / 60).toFixed(2);

  document.getElementById("todayMinutes").innerText = todayMinutes;
  document.getElementById("totalHours").innerText = totalHours;
}

function calculateStreak() {
  let dates = Object.keys(data.days).sort().reverse();

  let streak = 0;
  let today = new Date();

  for (let i = 0; i < dates.length; i++) {
    let d = new Date(dates[i]);

    let diff = (today - d) / (1000 * 60 * 60 * 24);

    if (diff <= 1 && (data.days[dates[i]].studyMinutes || 0) > 0) {
      streak++;
      today = d;
    } else {
      break;
    }
  }

  document.getElementById("streak").innerText = streak;
}

function saveDailyData() {
  let key = todayKey();

  if (!data.days[key]) {
    data.days[key] = { studyMinutes: 0 };
  }

  data.days[key].sleep =
    parseFloat(document.getElementById("sleep").value) || 0;

  data.days[key].screen =
    parseFloat(document.getElementById("screen").value) || 0;

  localStorage.setItem("data", JSON.stringify(data));

  updateDailyBreakdown();
  updateChart();
}

function updateDailyBreakdown() {
  let key = todayKey();
  let d = data.days[key] || {};

  let study = (d.studyMinutes || 0) / 60;
  let sleep = d.sleep || 0;
  let screen = d.screen || 0;

  let other = 24 - (study + sleep + screen);
  if (other < 0) other = 0;

  document.getElementById("studyHours").innerText = study.toFixed(1);
  document.getElementById("sleepHours").innerText = sleep;
  document.getElementById("screenHours").innerText = screen;
  document.getElementById("otherHours").innerText = other.toFixed(1);
}
