// GET
export function searchForFlavor() {
  const searchCupcake = document.getElementById("search-cupcake");

  searchCupcake.addEventListener("submit", addcupcake);

  async function addcupcake(e) {
    e.preventDefault();
    let searchInput = document.getElementById("searchFlavor").value;
    try {
      const response = await axios.get(`/api/search?flavor=${searchInput}`);
      // Handle success
      console.log(response);
      let cupcakeList = document.getElementById("list-of-cupcakes");
      // Handle the response and update the search results container
      searchInput = "";
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
