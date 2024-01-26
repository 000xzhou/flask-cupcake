// todo: Refactor your front-end code to be object-oriented using class methods to fetchAllCupcakes and createCupcakes and instance methods for updating and deleting cupcakes as well as searching for cupcakes.
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
