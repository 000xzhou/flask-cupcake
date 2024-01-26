// POST
import { createCupcakeHTML, formErrorMessage } from "./domChanges.js";

export function addCupcakeEvent() {
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
      )
        if (element.value != "") {
          formData[element.name] = element.value;
        }
    }
    if (formData.rating > 10 || formData.rating < 0) {
      // add error
      formErrorMessage("Rating have to be between 0 and 10");
    } else if (isNaN(parseFloat(formData.rating))) {
      formErrorMessage("Rating have to be a number");
    } else {
      try {
        const response = await axios.post("/api/cupcakes", formData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        // Handle success
        // console.log("Response:", response.data);
        let data = response.data;
        createCupcakeHTML(
          data.flavor,
          data.size,
          data.rating,
          data.image,
          data.id
        );
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
  }
}
