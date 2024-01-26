// DELETE
export function deleteCupcake() {
  let deleteBtns = document.querySelectorAll(".delete-btn");

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
}
