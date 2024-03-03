const selectedAnimalName = localStorage.getItem('selectedAnimal');
const selectedAnimal = animals.filter(animal => animal.name == selectedAnimalName)[0];



function renderAnimal() {
  const visited = history.find(a => a.name == selectedAnimalName);
  visited.visited++
  localStorage.setItem('history', JSON.stringify(history));

  document.getElementById('name').innerHTML = selectedAnimal.name
  document.getElementById('color').innerHTML = selectedAnimal.color
  document.getElementById('weight').innerHTML = selectedAnimal.weight
  document.getElementById('height').innerHTML = selectedAnimal.height
  document.getElementById('habitat').innerHTML = selectedAnimal.habitat
  document.getElementById('isPredator').innerHTML = selectedAnimal.isPredator
}
window.addEventListener('load', renderAnimal)
const currentVisitorName = localStorage.getItem('loggedInAs');
const currentVisitor = visitors.filter(visitor => visitor.name == currentVisitorName)[0];

function renderRelatedAnimals() {

  const relatedElement = document.getElementById('related-animals');
  const relatedAnimals = animals.filter(animal => animal.habitat == selectedAnimal.habitat
    && animal.name != selectedAnimalName);
  (relatedAnimals.map(animal => {
    const template = `
  <div>
    <img class="image-login" src="./images/${animal.image}.png" alt="${animal.name}"/>
    <div>
      <p>${animal.name}</p>
    </div>
  </div>
  `
    const wrapper = document.createElement("div");
    wrapper.className = "animal-card";
    wrapper.innerHTML = template;

    relatedElement.appendChild(wrapper)
  }))
}
renderRelatedAnimals()

const getCloseButtonHTML = (buttonMessage, buttonFunction) => {
  const closeButton = document.createElement('button');

  closeButton.innerText = buttonMessage


  closeButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop event propagation

    buttonFunction();
  })
  return closeButton;
}



const buttonFeedMe = document.querySelector("#feed-animal")
const dialog = document.createElement("dialog");
dialog.id = "feed-me-dialog"



function closeDialog() {
  dialog.close()
}

dialog.innerHTML = "<h1>Thank You For Feeding Me</h1>"
dialog.append(getCloseButtonHTML("Close", closeDialog));
buttonFeedMe.insertAdjacentElement("afterbegin", dialog);



function visitorGotEaten() {

  visitors = visitors.filter(visitor => visitor.name != currentVisitorName)
  localStorage.setItem('visitors', JSON.stringify(visitors));
  localStorage.setItem("loggedInAs", "");
}

function animalEscaped() {

  animals = animals.filter(animal => animal.name != selectedAnimalName)
  localStorage.setItem('animals', JSON.stringify(animals));
  localStorage.setItem("selectedAnimal", "");
}

function feedAnimal() {

  if (currentVisitor.coins >= 2) {
    currentVisitor.coins -= 2;
    localStorage.setItem('visitors', JSON.stringify(visitors))
    const feeded = history.find(a => a.name == selectedAnimalName);
    feeded.feeded++;
    localStorage.setItem('history', JSON.stringify(history))
    updateUserInfo()
    showModal();
  } else {
    if (selectedAnimal.isPredator) {
      showModal(`You got eaten by ${selectedAnimalName}!`)
      dialog.append(getCloseButtonHTML("Back to Login", () => window.location.href = "./login.html"));
      visitorGotEaten()
    } else {
      showModal(`The ${selectedAnimalName} has esacped!`)
      dialog.append(getCloseButtonHTML("Back to Zoo", () => window.location.href = "./zoo.html"));
      animalEscaped()
    }
  }

}

function showModal(message) {
  if (message)
    dialog.innerHTML = `<h1>${message}</h1>`
  dialog.showModal();
}

buttonFeedMe.addEventListener("click", (e) => {
  if (!currentVisitor) {
    alert("You need to log in to feed the animal")
  } else {
    feedAnimal()
  }
});

showNavBar();

