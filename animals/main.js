// מערכים גלובלים שישמשו אותנו בכל העמודים

let visitors = [
  {
    name: "John Smith",
    coins: 50,
    image: 'dad'

  },
  {
    name: "Emily Johnson",
    coins: 50,
    image: 'mom'
  },
  {
    name: "Michael Williams",
    coins: 50,
    image: 'boy'
  },

  {
    name: "Jessica Brown",
    coins: 50,
    image: 'girl'
  },

];


let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
];


// פונקציה זו טוענת עבורכם את המידע ההתחלתי של האפליקציה, במידה וקיים מידע בלוקל סטורג׳, היא תקח אותו משם
// אל תשנו את הקוד בפונקציה הזו כדי לשמור על תקינות הטמפלייט
function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}
generateDataset();

let history = [...animals.map(animal => { return { name: animal.name, visited: 0, feeded: 0 } })]

if (localStorage.getItem("history")) {
  history = JSON.parse(localStorage.getItem("history"));
} else {
  localStorage.setItem("history", JSON.stringify(history));
}


//********************** */
function logout() {
  //ממשו את הלוגיקה שמתנתקת מאורח מחובר
  // שימו לב לנקות את השדה המתאים בלוקל סטורג'
  const wantToLogOut = confirm("You are already logged in, do you want to switch?")
  if (wantToLogOut) {
    localStorage.setItem("loggedInAs", '');

  }
}

function updateUserInfo() {
  document.getElementById('user-info').innerText = currentVisitor ? `Hey ${currentVisitor.name}, coins: ${currentVisitor.coins}` : "Hey Guest!"
}

function showNavBar() {
  const navbar = document.createElement('nav');
  navbar.style.position = "fixed";
  navbar.style.display = "flex";
  navbar.style.top = '0';
  navbar.style.width = '100%';
  navbar.style.justifyContent = 'space-evenly';
  //TODO: move to global css with a class
  // TODO: set loggedAs on change user
  const visitorsDropDownOptions = visitors.map(visitor => `<option value="${visitor.name}" ${visitor.name == currentVisitorName ? "selected" : ""} >${visitor.name}</option>`)

  navbar.innerHTML = `
<div id="user-info"></div>
<div>navigations</div>
<div><button id="reset">reset local storage</button></div>
<div>
<select  name="visitors" id="visitors-select">
${visitorsDropDownOptions}
</select>
</div>
`;
  document.body.appendChild(navbar)
  document.getElementById('reset').addEventListener('click', resetLocalStorage);
  updateUserInfo()
}

function resetLocalStorage() {
  localStorage.clear()
  window.location.href = "./login.html"
}