const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");

const rows = 24; // Número de filas
const seatsPerRow = 6; // Número de asientos por fila

// Crear filas y asientos dinámicamente
for (let i = 0; i < rows; i++) {
  let row = document.createElement("div");
  row.className = "row";

  for (let j = 0; j < seatsPerRow; j++) {
    let seat = document.createElement("div");
    seat.className = "seat";
    row.appendChild(seat);
  }

  container.appendChild(row);
}

populateUI();

let ticketPrice = +movieSelect.value;

// Guardar la película seleccionada y su precio en el almacenamiento local
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("SelectedMovieIndex", movieIndex);
  localStorage.setItem("SelectedMoviePrice", moviePrice);
}

// Actualizar el contador de asientos seleccionados y el precio total
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");

  const selectedSeatsCount = selectedSeats.length;

  const seatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

// Rellenar la interfaz de usuario con los asientos seleccionados y la película almacenada en el almacenamiento local
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("SelectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

// Manejar el evento de cambio de selección de película
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

// Manejar el evento de clic en los asientos
container.addEventListener("click", (e) => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
  }
  updateSelectedCount();
});

// Actualizar el contador de asientos seleccionados y el precio total inicialmente
updateSelectedCount();

// Mostrar el número de asiento al pasar el cursor sobre él
seats.forEach((seat, index) => {
  seat.addEventListener("mouseenter", () => {
    seat.setAttribute("title", `Asiento ${index + 1}`);
  });
});
