// Simple version for testing
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, fetching movies...');
    
    fetch('http://localhost:3000/movies')
      .then(function (response) {
        console.log(response.status)
        return response.json()
      })
      .then((data)=>{
        if (data){console.log(".........loading movies...");
        }
        data.forEach(movie => {
            console.log(movie.title);
            
            const body = document.querySelector("body");
            const container = document.createElement("div");
            const frame = document.createElement("div")
            const movieCarousel = document.querySelector('.movie-carousel');
            //create containers for each movie
            container.className = `container`;
            container.id = `container-${movie.id}`;
            container.style.backgroundImage = `Url(${movie.backdropUrl})`;
            container.style.backgroundSize = `cover`;
            container.style.backgroundRepeat = `no-repeat`;
            container.style.width = `100%`
            container.style.height = `100vh`
            //create frame containers for each movie
            frame.className = `frame`;
            frame.style.backgroundImage = `url(${movie.posterUrl})`;
            frame.backgroundSize = `cover`;
            
            
            const movieCard = document.createElement("div");
            movieCard.className = `movie-card`;
            movieCard.style.backgroundImage = `url(${movie.posterUrl})`;
            movieCard.style.backgroundSize = `cover`


            body.appendChild(container)
            container.appendChild(frame)
            movieCarousel.appendChild(movieCard)
            
        });
      })


  });