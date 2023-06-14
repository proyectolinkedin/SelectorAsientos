const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count")
const total = document.getElementById("total")
const movieSelect = document.getElementById("movie")

populateUI()

let ticketPrice =  +movieSelect.value;

function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("SelectedMovieIndex", movieIndex)
    localStorage.setItem("SelectedMoviePrice", moviePrice)
}

function updateSeselectedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map((seat) =>
    [...seats].indexOf(seat))

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));



    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice;
}

function populateUI(params) {
    const selectedSeats = JSON.parse(localStorage.getItem("SelectedSeats"));

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
                
            }
        });
    } 
    const SelectedMovieIndex = localStorage.getItem("SelectedMovieIndex");
    
    if(SelectedMovieIndex !== null){
        movieSelect.selectecIndex = SelectedMovieIndex
    }
}
movieSelect.addEventListener("change", (e) => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectecIndex, e.target.value)
    
    updateSeselectedCount()
})


container.addEventListener("click", (e) => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected")
        
    }
    updateSeselectedCount()
})

updateSeselectedCount()