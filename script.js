document.addEventListener('DOMContentLoaded', () => {
  // State variables
  let movies = [];
  let filteredMovies = [];
  
  // DOM Elements
  const movieCarousel = document.getElementById('movie-carousel');
  const moviesContainer = document.querySelector('.movies-container');
  const videoOverlay = document.getElementById('video-overlay');
  const moviePlayer = document.getElementById('movie-player');
  const closeVideoBtn = document.getElementById('close-video');
  const fullscreenToggle = document.getElementById('fullscreen-toggle');
  const videoTitle = document.getElementById('video-title');
  const videoDescription = document.getElementById('video-description');
  const searchInput = document.getElementById('search-input');
  const genreFilter = document.getElementById('genre-filter');
  
  // Fetch movie data from JSON file
  async function fetchMovies() {
      try {
          const response = await fetch('movies.json');
          const data = await response.json();
          movies = data.movies;
          filteredMovies = [...movies];
          
          // Populate the UI with fetched movies
          renderMovies();
          populateGenreFilter();
      } catch (error) {
          console.error('Error fetching movies:', error);
      }
  }
  
  // Render movies in carousel and grid
  function renderMovies() {
      renderCarousel();
      renderMovieGrid();
  }
  
  // Render movie carousel
  function renderCarousel() {
      movieCarousel.innerHTML = '';
      
      movies.forEach(movie => {
          const carouselItem = document.createElement('div');
          carouselItem.className = 'carousel-item';
          carouselItem.dataset.id = movie.id;
          
          carouselItem.innerHTML = `
              <img src="${movie.posterUrl}" alt="${movie.title}">
          `;
          
          carouselItem.addEventListener('click', () => playMovie(movie));
          
          movieCarousel.appendChild(carouselItem);
      });
  }
  
  // Render movie grid
  function renderMovieGrid() {
      moviesContainer.innerHTML = '';
      
      filteredMovies.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.className = 'movie-card';
          movieCard.dataset.id = movie.id;
          
          movieCard.innerHTML = `
              <div class="movie-backdrop">
                  <img src="${movie.backdropUrl}" alt="${movie.title} backdrop">
              </div>
              <div class="movie-poster">
                  <img src="${movie.posterUrl}" alt="${movie.title}">
              </div>
              <div class="movie-info">
                  <h3 class="movie-title">${movie.title}</h3>
                  <div class="movie-details">
                      <span>${movie.releaseYear}</span> • 
                      <span>${movie.rating}/10</span> • 
                      <span>${movie.duration}</span>
                  </div>
                  <p class="movie-description">${movie.description}</p>
              </div>
          `;
          
          movieCard.addEventListener('click', () => playMovie(movie));
          
          moviesContainer.appendChild(movieCard);
      });
  }
  
  // Populate genre filter dropdown
  function populateGenreFilter() {
      // Get all unique genres
      const allGenres = new Set();
      
      movies.forEach(movie => {
          movie.genre.forEach(genre => allGenres.add(genre));
      });
      
      // Sort genres alphabetically
      const sortedGenres = Array.from(allGenres).sort();
      
      // Add genre options to select element
      sortedGenres.forEach(genre => {
          const option = document.createElement('option');
          option.value = genre;
          option.textContent = genre;
          genreFilter.appendChild(option);
      });
  }
  
  // Play selected movie
  function playMovie(movie) {
      // Set video source
      moviePlayer.src = movie.videoUrl;
      
      // Set video info
      videoTitle.textContent = movie.title;
      videoDescription.textContent = movie.description;
      
      // Show overlay
      videoOverlay.classList.remove('hidden');
      
      // Play video
      moviePlayer.play();
  }
  
  // Filter movies by search term and genre
  function filterMovies() {
      const searchTerm = searchInput.value.toLowerCase();
      const selectedGenre = genreFilter.value;
      
      filteredMovies = movies.filter(movie => {
          // Check if movie title matches search term
          const titleMatch = movie.title.toLowerCase().includes(searchTerm);
          
          // Check if movie has selected genre or if "all" is selected
          const genreMatch = selectedGenre === 'all' || movie.genre.includes(selectedGenre);
          
          return titleMatch && genreMatch;
      });
      
      renderMovieGrid();
  }
  
  // Event Listeners
  
  // 1. Close video when close button is clicked
  closeVideoBtn.addEventListener('click', () => {
      moviePlayer.pause();
      videoOverlay.classList.add('hidden');
  });
  
  // 2. Toggle fullscreen for video
  fullscreenToggle.addEventListener('click', () => {
      if (document.fullscreenElement) {
          document.exitFullscreen();
      } else {
          moviePlayer.requestFullscreen();
      }
  });
  
  // 3. Search input event
  searchInput.addEventListener('input', filterMovies);
  
  // 4. Genre filter change event
  genreFilter.addEventListener('change', filterMovies);
  
  // 5. Scroll event for page transitions
  window.addEventListener('scroll', () => {
      const landingPage = document.getElementById('landing-page');
      const scrollPosition = window.scrollY;
      
      // Adjust opacity of landing page based on scroll position
      if (scrollPosition < window.innerHeight) {
          const opacity = 1 - (scrollPosition / window.innerHeight);
          landingPage.style.opacity = Math.max(opacity, 0);
      }
  });
  
  // Initialize application
  fetchMovies();
});