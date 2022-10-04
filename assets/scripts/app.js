const addMovieModal = document.getElementById("add-modal")
const startAddMovieButton = document.querySelector("header button")
//alt const startAddMovieButton = document.querySelector('header').lastElementChild
const backdrop = document.getElementById("backdrop")
//alt const backdrop = document.body.firstElementChild
const cancelAddMovieButton =
  addMovieModal.querySelector(".btn--passive")
const confirmAddMovieButton = cancelAddMovieButton.nextElementSibling
const userInputs = addMovieModal.querySelectorAll("input")
const entryTextSection = document.getElementById("entry-text")
const deleteMovieModal = document.getElementById("delete-modal")

const movies = []

//button to switch the background class to gray
const toggleBackDrop = () => {
  backdrop.classList.toggle("visible")
}

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block"
  } else {
    entryTextSection.style.display = "none"
  }
}

const closeMovieDeletionModal = () => {
  toggleBackDrop()
  deleteMovieModal.classList.remove("visible")
}

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0
  for (const movie of movies) {
    if (movie.id === movieId) {
      break
    }
    movieIndex += 1
  }
  movies.splice(movieIndex, 1)
  const listRoot = document.getElementById("movie-list")
  listRoot.children[movieIndex].remove()
  // listRoot.removeChild(listRoot.children[movieIndex])

  closeMovieDeletionModal()
}

const startDeleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add("visible")
  toggleBackDrop()

  const cancelDeletionButton =
    deleteMovieModal.querySelector(".btn--passive")
  let confirmDeletionButton =
    deleteMovieModal.querySelector(".btn--danger")

      //hacky-- need to get rid of the event listeners since you keep createing them each button click on Delete
      //this makes a deep clone
      //try display to modal hidden add hidden display none.
  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true))
  confirmDeletionButton = deleteMovieModal.querySelector(".btn--danger")

  // confirmDeletionButton.removeEventListener('click', deleteMovieHandler.bind(null, movieId))
  cancelDeletionButton.removeEventListener(
    "click",
    closeMovieDeletionModal
  )

  
  cancelDeletionButton.addEventListener(
    "click",
    closeMovieDeletionModal
  )
  confirmDeletionButton.addEventListener(
    "click",
    deleteMovieHandler.bind(null, movieId)
  )
  
}

const renderNewMovieElement = (id, title, imageUrl, rating) => {
  let newMovieElement = document.createElement("li")
  newMovieElement.className = "movie-element"
  newMovieElement.innerHTML = `
  <div class='movie-element__image'>
  <img src="${imageUrl}" alt="${title}">

  </div>
  <div class="movie-element__info">
  <h2>${title}</h2>
  <p>${rating}/5 Stars </p>
  </div>
  `

  newMovieElement.addEventListener(
    "click",
    startDeleteMovieHandler.bind(null, id)
  )
  // console.log(newMovieElement.innerHTML)
  const listRoot = document.getElementById("movie-list")
  listRoot.append(newMovieElement)
}

const closeMovieModal = () => {
  addMovieModal.classList.remove("visible")
}

//button with function to make modal visible
const showMovieModal = () => {
  addMovieModal.classList.add("visible")
  toggleBackDrop()
}

const clearMovieInputs = () => {
  userInputs.forEach((usrInput) => (usrInput.value = ""))
}

const cancelAddMovieHandler = () => {
  closeMovieModal()
  toggleBackDrop()
  clearMovieInputs()
}

const addMovieHandlder = () => {
  const titleValue = userInputs[0].value
  const imageUrlValue = userInputs[1].value
  const ratingValue = userInputs[2].value

  if (
    titleValue.trim() === "" ||
    imageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5")
    return
  }
  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: imageUrlValue,
    rating: ratingValue,
  }

  movies.push(newMovie)
  console.log(movies)
  closeMovieModal()
  toggleBackDrop()
  clearMovieInputs()
  renderNewMovieElement(
    newMovie.id,
    newMovie.title,
    newMovie.image,
    newMovie.rating
  )
  updateUI()
}

const backdropClickHandler = () => {
  closeMovieModal()
  closeMovieDeletionModal()
  clearMovieInputs()
}

startAddMovieButton.addEventListener("click", showMovieModal)
backdrop.addEventListener("click", backdropClickHandler)
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler)
confirmAddMovieButton.addEventListener("click", addMovieHandlder)
