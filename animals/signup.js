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
      return visitors.some((visitor) => visitor.name === name);
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
      visitors.push(newVisitor)
    } 
    else {
      alert("This user is already exist")
    }
  }
  makeVisitor(nameFromHtml)
  localStorage.setItem("visitors", JSON.stringify(visitors))
  console.log(visitors)
  window.location.href = "../animals/login.html"
}


const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}


