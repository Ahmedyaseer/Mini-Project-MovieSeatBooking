// all seat div
const allSeat = document.querySelector(".all-seats");

// na seats
const naSeat = document.querySelectorAll(".na-seat");

// selected seats
const seatSelected = document.querySelectorAll(".seat-selected");

// occuoied seats
const seatOccupied = document.querySelectorAll(".seat-occupied");

// count in the span
const count = document.querySelector(".count");

//  total in the span
const total = document.querySelector(".total");

const movieSelect = document.getElementById("movie-name");

let ticketPrice = +movieSelect.value;

// Local Storage for select Element (selectedIndex) and the price (.value) Save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

const calcuCountandTotal = function () {
  // Calculate the lenght of the selected seats via querySelectorAll
  // you shpuld add class of the div .row then class na-seat and then class seat-occupied in the defination leh lsa msh 3arf
  const calcuSelectedSeats = document.querySelectorAll(
    ".row .na-seat.seat-selected"
  );

  // Local Storage
  // 1. Take a copy from Node List
  // 2. Loop over the array above
  const seatsIndex = [...calcuSelectedSeats].map((seat) =>
    [...calcuSelectedSeats].indexOf(seat)
  );
  // 3. Set a local storage by converting the array above to string by using JSON.Stringfy
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const calcuSelectedSeatsCount = calcuSelectedSeats.length;

  count.innerText = calcuSelectedSeatsCount;
  total.innerText = calcuSelectedSeatsCount * ticketPrice;
};

// Change the movie
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;

  setMovieData(e.target.selectedIndex, e.target.value); // selectedIndex de Property we can use it on select Element in HTML and i called the function here because it is run when i change the movie in selected Elements
  calcuCountandTotal();
});

function populateUI() {
  // Get the Data from Local Storage
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    allSeat.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
}
populateUI();

// Event listener when you click on a na-seat
allSeat.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("na-seat") &&
    !e.target.classList.contains("seat-occupied")
  ) {
    e.target.classList.toggle("seat-selected");

    calcuCountandTotal();
  }
});
