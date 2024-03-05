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
    image: "Lion",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image: 'elephant',
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "giraffe"
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "tiger",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "monkey",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "kangaroo",

  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    image: "penguin",

  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "zebra",

  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "cheeta",

  },
];

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
  navbar.className="nav"
  const visitorsDropDownOptions = visitors.map(visitor => `<option value="${visitor.name}" ${visitor.name == currentVisitorName ? "selected" : ""} >${visitor.name}</option>`)

  navbar.innerHTML = `
<div id="user-info"></div>
<div class="navigations">
<button class ="nav-btn" id ="button-zoo"> Go to Zoo</button>
<button class ="nav-btn" id ="button-login">Log in Page</button>
<button class ="nav-btn" id ="button-signUp">Sign Up Page</button>
<button class ="nav-btn" id ="button-dashboard">dashboard Page</button>

</div>
<div><button class ="nav-btn" id="reset">reset local storage</button></div>
<div>
<select class ="nav-btn" name="visitors" id="visitors-select">
${visitorsDropDownOptions}
</select>
</div>
`;
  document.body.appendChild(navbar)
  document.getElementById('reset').addEventListener("click",resetLocalStorage)
  document.getElementById('button-zoo').addEventListener('click',()=>window.location.href="../animals/zoo.html" );
  document.getElementById('button-login').addEventListener('click', ()=>window.location.href="../animals/login.html");
  document.getElementById('button-signUp').addEventListener('click', ()=>window.location.href="../animals/signup.html");
  document.getElementById('button-dashboard').addEventListener('click', ()=>window.location.href="../animals/dashboard.html");
  
 
  updateUserInfo()

  document.getElementById("visitors-select").addEventListener("change",(e)=>
  { 
    localStorage.setItem("loggedInAs",e.target.value)
   updateUserInfo()
   location.reload()
    
  })
}

function resetLocalStorage() {
  localStorage.clear()
  window.location.href = "../animals/login.html"
}