function createNewVisitor(event) {
  event.preventDefault();
  const nameFromHtml = document.getElementById("full_name").value
  const imageFromHtml = document.querySelector('input[name="image"]:checked').value
  const validateFormInputs = () => {
    let checkIfWrong= /[^a-zA-Z\s]/;
    if( checkIfWrong.test(nameFromHtml)){
      alert("invalid full name. try only letters and spaces")
      return false 
    }
    else
    {
     return true
    }
  }

  const visitorExists = (name) => {
    if (validateFormInputs() === true) {
      return animals.some((visitor) => visitor.name === name);
    }
  }

  const makeVisitor = (name) => {
    let isVisitorExist = visitorExists(name)

    if (!isVisitorExist) {
      const newVisitor = {
        name: name,
        image : imageFromHtml,
        coins: 50,
      }
      animals.push(newVisitor)
    } 
    else {
      alert("This user is already exist")
    }
  }
  makeVisitor(nameFromHtml)
  localStorage.setItem("visitors", JSON.stringify(animals))
  console.log(animals)
  window.location.href = "/login.html"
}

/**************************************
  מימשתי עבורכם את ההאזנה לאירוע שליחת טופס
  שימו לב כי האיידי של createForm
  זהה לאיידי של הטופס בעמוד signup.html
  אין לשנות אותו */
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}


