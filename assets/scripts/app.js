const addMovieModal = document.getElementById("add-modal")

const startAddMovieButton = document.querySelector("header button")
// const startAddMovieButton = document.querySelector('header').lastElementChild
const backdrop = document.getElementById('backdrop')
//alt const backdrop = document.body.firstElementChild
const cancelAddMovieButton = addMovieModal.querySelector('.btn--passive')

//button to switch the background class to gray
const toggleBackDrop = () => {
    backdrop.classList.toggle('visible')
}

//button with function to make modal visible
const toggleVisibleMovieModal = () => {
  addMovieModal.classList.toggle("visible")
  toggleBackDrop()
}

const backdropClickHandler = () => {
    toggleVisibleMovieModal()
 }

 const cancelAddMovie = () => {
    toggleVisibleMovieModal()
 }

startAddMovieButton.addEventListener("click", toggleVisibleMovieModal)
backdrop.addEventListener('click',backdropClickHandler)
cancelAddMovieButton.addEventListener('click', cancelAddMovie)