function updateChart() {
  let labels = Object.keys(data.days).slice(-30);

  let studyData = labels.map(d => (data.days[d]?.studyMinutes || 0) / 60);

  let otherData = labels.map(d => {
    let day = data.days[d] || {};

    let study = (day.studyMinutes || 0) / 60;
    let sleep = day.sleep || 0;
    let screen = day.screen || 0;

    let other = 24 - (study + sleep + screen);
    return other > 0 ? other : 0;
  });

  if (chart) chart.destroy();

  chart = new Chart(document.getElementById("chart"), {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Study Hours',
          data: studyData,
          tension: 0.4
        },
        {
          label: 'Other Hours',
          data: otherData,
          tension: 0.4
        }
      ]
    }
  });
}
