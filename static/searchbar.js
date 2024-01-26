import { filterCupcakesHTML } from "./domChanges.js";
// GET
export function searchForFlavor() {
  const searchCupcake = document.getElementById("search-cupcake");

  searchCupcake.addEventListener("submit", searchCupcakeBar);

  async function searchCupcakeBar(e) {
    e.preventDefault();
    let searchInput = document.getElementById("searchFlavor").value;

    if (searchInput != "") {
      try {
        const response = await axios.get(`/api/search?flavor=${searchInput}`);
        // Handle success
        const cupcakeList = document.getElementById("list-of-cupcakes");
        if (response.data.length == 0) {
          cupcakeList.innerText = "No cupcake found";
        }
        // Handle the response and update the search results container
        filterCupcakesHTML(response.data);

        // searchInput = "";  better to let them keep what they look for
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
