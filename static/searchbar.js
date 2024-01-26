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
      const cupcakeList = document.getElementById("list-of-cupcakes");
      if (response.data.length == 0) {
        cupcakeList.innerText = "No cupcake found";
      }
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
