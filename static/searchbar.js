import { filterCupcakesHTML } from "./domChanges.js";
// GET
export function searchForFlavor() {
  const searchCupcake = document.getElementById("search-cupcake");
  const sizeFilter = document.getElementById("filter-size");

  // searchCupcake.addEventListener("submit", searchCupcakeBar);
  searchCupcake.addEventListener("submit", function (e) {
    e.preventDefault();
    searchCupcakeBar();
  });

  sizeFilter.addEventListener("change", () => {
    searchCupcakeBar(); // Trigger search when sizeFilter changes
  });

  async function searchCupcakeBar(e) {
    let searchInput = document.getElementById("searchFlavor").value;

    try {
      let response;

      if (searchInput && sizeFilter.value !== "any") {
        // Search with both flavor and size filter
        response = await axios.get(
          `/api/search?flavor=${searchInput}&size=${sizeFilter.value}`
        );
      } else if (searchInput) {
        // Search with only flavor filter
        response = await axios.get(`/api/search?flavor=${searchInput}`);
      } else if (sizeFilter.value !== "any") {
        // Filter with only size filter
        response = await axios.get(`/api/search?size=${sizeFilter.value}`);
      } else {
        // No search or filter, get all cupcakes
        response = await axios.get(`/api/search`);
      }
      // Handle success
      const cupcakeList = document.getElementById("list-of-cupcakes");
      if (response.data.length == 0) {
        cupcakeList.textContent = "No cupcake found";
      } else {
        // Handle the response and update the search results container
        filterCupcakesHTML(response.data);
      }

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
