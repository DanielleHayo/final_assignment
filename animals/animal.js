const selectedAnimalName = localStorage.getItem('selectedAnimal');
const selectedAnimal = animals.filter(animal => animal.name == selectedAnimalName)[0];

function renderAnimal() {
  //הציגו את החיה שאליה עברתם מעמוד גן החיות ששמורה בלוקל סטורג'
  // רנדרו את פרטי החיה לתוך האלמנטים המתאימים בהתאם לשדה הספציפי

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
  // ממשו את הלוגיקה שמרנדרת כרטיסיות של החיות ששדה ההאביטט שלהם זהה לחיה שמוצגת
  // רנדרו אותן לתוך הדיב שמיועד להן עם האיידי related-animals
  // ממשו את אותה לוגיקה של כרטיסיית חיה כמו בכרטיסיות בעמוד zoo.html
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

const getCloseButtonHTML = () => {
  const closeButton = document.createElement('button');

  closeButton.innerText = "Close";


  closeButton.addEventListener('click', (e) => {
    e.stopPropagation(); // Stop event propagation

    const d = document.getElementById('feed-me-dialog');

    d.close();
  })
  return closeButton;
}


const buttonFeedMe = document.querySelector("#feed-animal")
const dialog = document.createElement("dialog");
dialog.id = "feed-me-dialog"


dialog.innerHTML = "<h1>Thank You For Feeding Me</h1>"
dialog.append(getCloseButtonHTML())

buttonFeedMe.insertAdjacentElement("afterbegin", dialog);


function visitorGotEaten() {
  // ממשו את הלוגיקה של חיה שטורפת אורח
  visitors = visitors.filter(visitor => visitor.name != selectedVisitorName)
}

function animalEscaped() {
  //ממשו את הלוגיקה של חיה שבורחת מגן החיות
  animals = animals.filter(animal => animal.name != selectedAnimalName)

}

function feedAnimal() {
  // ממשו את הלוגיקה של האכלת חיה
  // במידה ואין מספיק מטבעות, טפלו בהתאם להנחיות במטלה

  //TODO: add coin logic

  if (currentVisitor.coins >= 2) {
    currentVisitor.coins -= 2;
    showModal();
  } else {
    if (selectedAnimal.isPredator) {
      showModal(`You got eaten by ${selectedAnimalName}!`)
      visitorGotEaten()
    } else {
      showModal(`The ${selectedAnimalName} has esacped!`)
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
  feedAnimal()
});



