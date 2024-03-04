const colorHtmls = document.querySelectorAll('a[name="color"]');
colorHtmls.forEach(colorElement => colorElement.addEventListener("click", (e) => setFilter('color', colorElement.innerHTML)))

const weigthhHtmls = document.querySelectorAll('a[name="weigth"]');
weigthhHtmls.forEach(weigthElement => weigthElement.addEventListener("click", (e) => setFilter('weigth', weigthElement.innerHTML)))

const heightHtmls = document.querySelectorAll('a[name="height"]');
heightHtmls.forEach(heightElement => heightElement.addEventListener("click", (e) => setFilter('height', heightElement.innerHTML)))

const habitatHtmls = document.querySelectorAll('a[name="habitat"]');
habitatHtmls.forEach(habitatElement => habitatElement.addEventListener("click", (e) => setFilter('habitat', habitatElement.innerHTML)))

searchAnimals = [...animals]



const Filters= document.getElementById("allFilters")
const resetFilter = document.createElement("BUTTON")
Filters.appendChild(resetFilter)
resetFilter.innerText="reset filters"
resetFilter.addEventListener("click",()=>
{
  searchAnimals = [...animals]
  renderAvailableAnimals()

  localStorage.removeItem("habitatFilter")
  localStorage.removeItem("weigthFilter")
  localStorage.removeItem("colorFilter")
  localStorage.removeItem("heightFilter")
 
  const colorButton = document.getElementById("dropdownMenuButtonColor")
  colorButton.innerText="color"
  colorButton.classList.remove("active");

  const weigthButton = document.getElementById("dropdownMenuButtonWeight")
  weigthButton.innerText="weigth"
  weigthButton.classList.remove("active");


  const heightButton = document.getElementById("dropdownMenuButtonHeight")
  heightButton.innerText="height"
  heightButton.classList.remove("active");


  const habitatButton = document.getElementById("dropdownMenuButtonHabitat")
  habitatButton.innerText="habitat"
  habitatButton.classList.remove("active");

})



const getAnimalHtmlCard = (animal) => {
  const template = `
  <div>
  <img class="image-animal" src="./images/${animal.image}.png" alt="${animal.name}"/>
  <div>
  <p>${animal.name}</p>   
  </div>
  </div>
  `
;
  
  const wrapper = document.createElement("div");
  wrapper.className = "animal-card";
  wrapper.innerHTML = template;
  wrapper.addEventListener('click',(e)=>visitAnimal(animal.name))

  return wrapper
}

function filterOnLoad() {
  const filterKeys = ['color', 'weigth', 'height', 'habitat']
  filterKeys.forEach(filterKey => {
    const filterValue = localStorage.getItem(`${filterKey}Filter`);
    if (filterValue)
      searchAnimals = searchAnimals.filter(animal => animal[filterKey] == filterValue);

  })

  renderAvailableAnimals()
}

const getEmptycards = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
  <h2> The Name of the animal you search , is not on the animals list . </h2>`;

  templateWrapper.innerHTML = template;

  return templateWrapper;
}

function renderAvailableAnimals() {
  const animalCards = searchAnimals.map(getAnimalHtmlCard);
  const animalsPlaceHolder = document.getElementById("animal-cards")
  animalsPlaceHolder.innerHTML = "";

  if (!animalCards.length) {
    animalsPlaceHolder.appendChild(getEmptycards());
  }
  else {
    animalsPlaceHolder.append(...animalCards)
  }


}


function visitAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  window.location.href="../animal/animal.html"
}


function setFilter(filterKey, filterValue) {
  console.log(filterKey, filterValue);
  searchAnimals = searchAnimals.filter(animal => animal[filterKey] == filterValue);
  renderAvailableAnimals();
  localStorage.setItem(`${filterKey}Filter`, filterValue)
}


window.addEventListener("load", filterOnLoad)

const searchBox = () => {
  const queryinput = document.getElementById("search-box");
  queryinput.placeholder = "search animal..."

  queryinput.oninput = (e) => {
    searchAnimals = animals.filter(((animal) =>
      animal.name.toLowerCase().includes(e.target.value)
    ));
    renderAvailableAnimals();
  };
  return queryinput;
};

searchBox();
const currentVisitorName = localStorage.getItem('loggedInAs');
const currentVisitor = visitors.filter(visitor => visitor.name == currentVisitorName)[0];
showNavBar();


function changeDropdownText(selectedOption, buttonId) {
  const dropdownButton = document.getElementById(buttonId);
  dropdownButton.innerText = selectedOption.innerText;
  dropdownButton.classList.add("active");
}




