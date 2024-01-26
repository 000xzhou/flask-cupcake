import { deleteCupcake } from "./deleteCupcakeEvent.js";

export function createCupcakeHTML(flavor, size, rating, image, id) {
  const cupcakeList = document.getElementById("list-of-cupcakes");
  // creating elements
  const cupcake = document.createElement("div");
  const cupcakeFlavor = document.createElement("p");
  const cupcakeSize = document.createElement("p");
  const cupcakeRating = document.createElement("p");
  const cupcakeImage = document.createElement("img");
  const editLink = document.createElement("a");
  const deleteLink = document.createElement("button");

  // element detailing
  cupcake.classList.add("cupcake");
  cupcake.setAttribute("data-id", id);
  cupcakeFlavor.textContent = flavor;
  cupcakeSize.textContent = size;
  cupcakeRating.textContent = rating;
  cupcakeImage.setAttribute("src", image);
  cupcakeImage.setAttribute("alt", "image of cupcake");
  cupcakeImage.setAttribute("width", "200");
  cupcakeImage.setAttribute("height", "300");
  editLink.setAttribute("href", `/cupcakes/${id}`);
  editLink.textContent = "Edit";
  deleteLink.classList.add("delete-btn");
  deleteLink.textContent = "Delete";

  // appending
  cupcakeList.appendChild(cupcake);
  cupcake.appendChild(cupcakeFlavor);
  cupcake.appendChild(cupcakeSize);
  cupcake.appendChild(cupcakeRating);
  cupcake.appendChild(cupcakeImage);
  cupcake.appendChild(editLink);
  cupcake.appendChild(deleteLink);

  // refresh the delete btn eventlistener
  deleteCupcake();
}
export function editCupcakeHTML() {
  // Don't need this since it's a redirect
}

export function deleteCupcakeHTML(cupcake) {
  // don't need since it's just 1 line. added in deletecupcakeevent
}
export function filterCupcakesHTML() {
  createCupcakeHTML();
}
/* <div class="flex" id="list-of-cupcakes">
  {% for cupcake in results %}
  <div class="cupcake" data-id="{{cupcake.id}}">
    <p>{{cupcake.flavor}}</p>
    <p>{{cupcake.size}}</p>
    <p>{{cupcake.rating}}</p>
    <img
      src="{{cupcake.image}}"
      alt="image of cupcake"
      width="200"
      height="300"
    />
    <a href="/cupcakes/{{cupcake.id}}">Edit</a>
    <button class="delete-btn">Delete</button>
  </div> */
