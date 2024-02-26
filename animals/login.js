
let searchVisitors = [...visitors]



const getVisitorHtmlCard = (visitor) => {
  const template = `
  <div>
  <img src="./images/${visitor.image}.png" alt="${visitor.name}"/>
   <div>
    <p>${visitor.name}</p>
    <p>${visitor.coins}</p>
   </div>
  </div>
  `
  const wrapper = document.createElement("div");
  wrapper.className = "visitor-card";
  wrapper.innerHTML = template;

  return wrapper 
}

const renderVisitors = () =>{
  const visitorCards =  searchVisitors.map(getVisitorHtmlCard);
  const visitorsPlaceHolder = document.getElementById("cards")
  visitorsPlaceHolder.innerHTML ="";

  if (!visitorCards.length)
  {
    visitorsPlaceHolder.appendChild(getEmptycards());
  }
  else{
  visitorsPlaceHolder.append(...visitorCards)
  }

  
}

window.addEventListener("load",renderVisitors)

const searchBox = () => {
  const queryinput =  document.getElementById("search-box");
  queryinput.placeholder= "search visitor..."

  queryinput.oninput = (e) => {
    searchVisitors = visitors.filter((visitor) => 
      visitor.name.includes(e.target.value)
    );
    renderVisitors();
  };
  return queryinput ; 
};

searchBox(); 

const getEmptycards = () => {
  const templateWrapper = document.createElement("div");
  templateWrapper.className = "empty-result";

  const template =`
  <h2> The Name of the visitor you search , is not on the visitors list . </h2>`;

  templateWrapper.innerHTML = template;

  return templateWrapper;
}


function loginAsVisitor(visitorName) {
  // תממשו את הלוגיקה של בחירת אורח שנכנס לגן החיות
  // שמרו את האורח שבחרתם, בלוקל סטורג' כך שבכל העמודים נדע מי האורח הנוכחי
}

