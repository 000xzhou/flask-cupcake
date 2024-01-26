// todo: Refactor your front-end code to be object-oriented using class methods to fetchAllCupcakes and createCupcakes and instance methods for updating and deleting cupcakes as well as searching for cupcakes.
// todo: add dom-ma... atm it don't update the dom without refreshing.

// POST
const addCupcakeForm = document.getElementById("add-cupcake");

addCupcakeForm.addEventListener("submit", addcupcake);

async function addcupcake(e) {
  e.preventDefault();
  let formElements = document.getElementById("add-cupcake").elements;
  let formData = {};
  // getting cupcake data from form - formElements is all the field
  for (let i = 0; i < formElements.length; i++) {
    let element = formElements[i];
    if (
      element.tagName === "INPUT" ||
      element.tagName === "SELECT" ||
      element.tagName === "TEXTAREA"
    ) {
      if (element.value != "") {
        formData[element.name] = element.value;
      }
    }
  }

  try {
    const response = await axios.post("/api/cupcakes", formData, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    // Handle success
    console.log("Response:", response.data);
    for (let i = 0; i < formElements.length; i++) {
      formElements[i].value = "";
    }
  } catch (error) {
    // Handle error
    console.error(
      "Error Code:",
      error.code,
      "\nError Name:",
      error.name,
      "\nError Message:",
      error.message
    );
  }
}

// DELETE
deleteBtns = document.querySelectorAll(".delete-btn");

deleteBtns.forEach((btn) => {
  btn.addEventListener("click", deleteCupcake);
});
async function deleteCupcake() {
  try {
    let id = this.parentElement.dataset.id;
    const response = await axios.delete(`/api/cupcakes/${id}`);
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error Code:",
      error.code,
      "\nError Name:",
      error.name,
      "\nError Message:",
      error.message
    );
  }
}

// PATCH
editBtns = document.querySelectorAll(".edit-btn");

editBtns.forEach((btn) => {
  btn.addEventListener("click", editCupcake);
});
async function editCupcake() {
  try {
    // ? need an edit form.... or use the add form... but need to change name then. should I just add a route for it? a new html? why not?
    let id = this.parentElement.dataset.id;
    const response = await axios.patch(`/api/cupcakes/${id}`);
    console.log("Response:", response.data);
  } catch (error) {
    console.error(
      "Error Code:",
      error.code,
      "\nError Name:",
      error.name,
      "\nError Message:",
      error.message
    );
  }
}
