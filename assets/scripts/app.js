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
const deleteMovieModal = document.getElementById('delete-modal')

const movies = []

const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block"
  } else {
    entryTextSection.style.display = "none"
  }
}

const deleteMovie = (movieId) => {
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
}

const closeMovieDeletionModal = () => {
  toggleBackDrop()
  deleteMovieModal.classList.remove('visible')
}

const deleteMovieHandler = (movieId) => {
  deleteMovieModal.classList.add('visible')
  toggleBackDrop()
  // deleteMovie(movieId)
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

  newMovieElement.addEventListener( "click", deleteMovieHandler.bind(null, id))
  // console.log(newMovieElement.innerHTML)
  const listRoot = document.getElementById("movie-list")
  listRoot.append(newMovieElement)

}

//button to switch the background class to gray
const toggleBackDrop = () => {
  backdrop.classList.toggle("visible")
}

const closeMovieModal = () => {
addMovieModal.classList.remove('visible')
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
}

startAddMovieButton.addEventListener("click", showMovieModal)
backdrop.addEventListener("click", backdropClickHandler)
cancelAddMovieButton.addEventListener("click", cancelAddMovieHandler)
confirmAddMovieButton.addEventListener("click", addMovieHandlder)
