
let searchVisitors = [...visitors]


const dadGoToZoo = document.getElementById("wrap-zoo")
const goToZoo = document.createElement("BUTTON")
dadGoToZoo.appendChild(goToZoo)
goToZoo.innerText="Go To Zoo"
goToZoo.className= "button"

goToZoo.addEventListener("click",()=>
{
window.location.href="../animals/zoo.html"
})



const removeLoggedInClassFromVisitors = () => {
  [...document.getElementById("cards").children].forEach(element => {
    element.classList.remove("logged-in");
  });
}

if (localStorage.getItem("loggedInAs")) {
logout();
removeLoggedInClassFromVisitors();

}



const getVisitorHtmlCard = (visitor) => {
  const template = `
  <div class = "card">
  <img class="image-login" src="./images/${visitor.image}.png" alt="${visitor.name}"/>
  <div class="text">
  <p>${visitor.name}</p>
  <p> coins: ${visitor.coins}</p>
  </div>
  </div>
  `
  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = template;


  if (localStorage.getItem("loggedInAs") == visitor.name) {
    wrapper.classList.add('logged-in');
  }

  wrapper.addEventListener("click", (e) => {
    loginAsVisitor(visitor.name);
    if (localStorage.getItem("loggedInAs") == visitor.name) {

      removeLoggedInClassFromVisitors();


      wrapper.classList.add('logged-in');
    }
  })

  return wrapper
}

const renderVisitors = () => {
  const visitorCards = searchVisitors.map(getVisitorHtmlCard);
  const visitorsPlaceHolder = document.getElementById("cards")
  visitorsPlaceHolder.innerHTML = "";

  if (!visitorCards.length) {
    visitorsPlaceHolder.appendChild(getEmptycards());
  }
  else {
    visitorsPlaceHolder.append(...visitorCards)
  }


}

window.addEventListener("load", renderVisitors)

const searchBox = () => {
  const queryinput = document.getElementById("search-box");
  queryinput.placeholder = "search visitor..."

  queryinput.oninput = (e) => {
    searchVisitors = visitors.filter((visitor) =>
      visitor.name.includes(e.target.value)
    );
    renderVisitors();
  };
  return queryinput;
};

searchBox();

const getEmptycards = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template = `
  <h2> The Name of the visitor you search , is not on the visitors list . </h2>`;

  templateWrapper.innerHTML = template;

  return templateWrapper;
}




function loginAsVisitor(visitorName) {
  localStorage.setItem("loggedInAs", (visitorName));

}

