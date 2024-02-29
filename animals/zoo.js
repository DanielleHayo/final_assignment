
searchAnimals = [...animals]

const getAnimalHtmlCard = (animal) => {
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
  <h2> The Name of the visitor you search , is not on the visitors list . </h2>`;

  templateWrapper.innerHTML = template;

  return templateWrapper;
}

function renderAvailableAnimals() {
  // ממשו את הלוגיקה שמרנדרת את החיות לתוך הדיב עם האיידי animal-cards
  // וודאו שאתם מציגים אך ורק את החיות שעומדות בפילטורים הנוכחיים
  // במידה ואין פילטרים מסומנים, הציגו את כל החיות

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
  // ממשו את הלוגיקה של מעבר לעמוד חיה עבור החיה הספציפית שנבחרה
  // שמרו בלוקל סטורג' את החיה שנבחרה, כך שבעמוד החיה נוכל לשלוף אותה מהסטורג' ולהציגה בהתאם
  localStorage.setItem("selectedAnimal", animalName);
  window.location.href="animal.html"
}

const colorHtmls = document.querySelectorAll('a[name="color"]');
colorHtmls.forEach(colorElement => colorElement.addEventListener("click", (e) => setFilter('color', colorElement.innerHTML)))

// TODO: add weigth, habitat (and also in html!!!)
const heigthHtmls = document.querySelectorAll('a[name="height"]');
heigthHtmls.forEach(colorElement => colorElement.addEventListener("click", (e) => setFilter('height', colorElement.innerHTML)))

function setFilter(filterKey, filterValue) {
  /**
   * ממשו את הלוגיקה של השמת פילטר
   * הפילטרים הקיימים הם
   * isPredator: true | false
   * habitat: "land" | "sea"
   * weight: value > user selected weight
   * height: value > user selected height
   * color: dropdown of all available colors
   */
  // ודאו כי אתם שומרים את הפילטרים שהיוזר בחר בלוקל סטורג׳ וטוענים אותם בהתאם
  // רנדרו רק את החיות שעומדות בתנאים של הפילטרים

  console.log(filterKey, filterValue);
  searchAnimals = searchAnimals.filter(animal => animal[filterKey] == filterValue);
  renderAvailableAnimals();
  localStorage.setItem(`${filterKey}Filter`, filterValue)
}


window.addEventListener("load", filterOnLoad)

const searchBox = () => {
  const queryinput = document.getElementById("search-box");
  queryinput.placeholder = "search visitor..."

  queryinput.oninput = (e) => {
    searchAnimals = animals.filter(((animal) =>
      animal.name.toLowerCase().includes(e.target.value)
    ));
    renderAvailableAnimals();
  };
  return queryinput;
};

searchBox();