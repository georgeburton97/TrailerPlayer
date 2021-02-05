
const apiKey = 'ba8b1e29d42df1c1972348fd0c3495e2';
const form = document.querySelector('form');
const searchMovie = document.querySelector('#searchMovie')

const monitor = document.querySelector('#monitorscreen')
let iframe = document.createElement("iframe");
let erorrtext = document.querySelector('.innertext');


// User searches for film
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movie = searchMovie.value.trim()


    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`)
    .then(res => res.json())
    // .then(data => console.log(data.results[0].id))
    .then(data => fetch(`http://api.themoviedb.org/3/movie/${data.results[0].id}/videos?api_key=ba8b1e29d42df1c1972348fd0c3495e2`))
    .then(res => res.json())
    .then(data => {
        trailer = data.results[0].key;
        iframe.setAttribute("src", `https://www.youtube.com/embed/${trailer}?autoplay=1`);
        monitor.appendChild(iframe);
    })
    .catch(err => {
        if(err){
            erorrtext.innerHTML = 'Invalid film, please enter a different title';
            setTimeout(() => {
                erorrtext.innerHTML = ""
            }, 2000)
        }
    })
      
});