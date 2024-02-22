function createNewVisitor(event) {
  event.preventDefault();
  let name = document.getElementById("full_name").value
  const validateFormInputs = () => {
    if (name !== 0) { return true }
    else {
      return false
    }
  }

  const visitorExists = (name) => {
    visitors.forEach((visitor) => {
      if (validateFormInputs() === true) {
        if (name === visitor) {
          return true
        }
        else {
          return false
        }
      }
    })
  }

  const makeVisitor = (name) => {
    visitors.forEach((visitor) => {
      if (visitorExists() === false) {
        const newVisitor = {
          name: name,
          coins: 50,
        }
        visitors.push(newVisitor)
        return newVisitor
      }
      else {
        return alert("this user allready exist")
      }
    })
  }
  makeVisitor()
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


