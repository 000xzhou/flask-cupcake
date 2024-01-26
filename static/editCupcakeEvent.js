// PATCH
const editCupcakeForm = document.getElementById("edit-cupcake");

editCupcakeForm.addEventListener("submit", editCupcake);

async function editCupcake(e) {
  e.preventDefault();
  let formElements = document.getElementById("edit-cupcake").elements;
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
    let id = this.parentElement.dataset.id;
    // const response = await axios.patch(`/api/cupcakes/${id}`);
    const response = await axios.patch(
      `/api/cupcakes/${document.getElementById("id").value}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("Response:", response.data);
    // redirect back to home after suessful edit
    window.location.href = "/";
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
