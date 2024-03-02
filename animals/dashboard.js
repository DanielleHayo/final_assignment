function showVisitedAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי ביקר בהן
  const visitedCanvas = document.createElement('canvas');;
  visitedCanvas.id = 'visitedChart';

  visitedCanvas.height = 100;
  new Chart(visitedCanvas, {
    type: 'bar',
    responsive: true,
    data: {
      labels: history.filter(a => a.visited > 0).map(a => a.name),
      datasets: [{
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1, label: "# of visits",
        data: history.filter(a => a.visited > 0).map(a => a.visited)
      }]
    },
    options: {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  })
  document.getElementById('visited-animals').appendChild(visitedCanvas);
}
showVisitedAnimals();
function showFeededAnimals() {
  //ממשו את הלוגיקה שמציגה את החיות שהאורח הנוכחי האכיל אותן

  const feedCanvas = document.createElement('canvas');;
  feedCanvas.id = 'feedChart';

  feedCanvas.height = 100;
  new Chart(feedCanvas, {
    type: 'bar',
    responsive: true,
    data: {
      labels: history.filter(a => a.feeded > 0).map(a => a.name),
      datasets: [{
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)'
        ],
        borderWidth: 1, label: "# of fed",
        data: history.filter(a => a.feeded > 0).map(a => a.feeded),

      }]
    },
    options: {
      scales: {
        yAxes: [{
          display: true,
          ticks: {
            max:25,
            beginAtZero: true
          }
        }]
      }
    }
  })
  document.getElementById('feeded-animals').appendChild(feedCanvas);
}
showFeededAnimals();
function showFavoriteAnimal() {
  //ממשו את הלוגיקה שמציגה את החיה שהאורח ביקר הכי הרבה פעמים אצלה
  let maxVisited = 0;
  let favAnimalName = "";
  for (let index = 0; index < history.length; index++) {
    if (history[index].visited > maxVisited) {
      maxVisited = history[index].visited;
      favAnimalName = history[index].name;
    }
  }
  document.getElementById('favorite-animal').innerHTML = `<h1>Your Favorite Animal is ${favAnimalName}!</h1>`;

}
showFavoriteAnimal();