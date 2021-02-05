
const apiKey = 'ba8b1e29d42df1c1972348fd0c3495e2';
const form = document.querySelector('form');
const searchMovie = document.querySelector('#searchMovie')

const monitor = document.querySelector('#monitorscreen')
let iframe = document.createElement("iframe");
let erorrtext = document.querySelector('.innertext');

let random = document.querySelector('.randomBtn');


// Gets searched film
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const movie = searchMovie.value.trim()


    fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${movie}`)
    .then(res => res.json())
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

// Get Random Date
// ========================================================
function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

let newdateOne = randomDate(new Date(1980, 0, 1), new Date())
let newdateTwo = randomDate(new Date(1980, 0, 1), new Date())

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
 
let dateOne = formatDate(newdateOne);
let dateTwo = formatDate(newdateTwo);

let finalDateOne = undefined
let finalDateTwo = undefined

if(dateOne > dateTwo){
    finalDateOne = dateTwo;
    finalDateTwo = dateOne;
} else {
    finalDateOne = dateOne;
    finalDateTwo = dateTwo;
}


// Get Random Trailer
random.addEventListener('click', e => {
    callback()
})



let callback = () => {
    fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=release_date.desc&page=1&release_date.gte=${finalDateOne}&release_date.lte=${finalDateTwo}&with_genres=16%2C35`)
    .then(response => response.json())
    .then(data => {
        let randomArray = data.results
        let i = Math.floor(Math.random() * (randomArray.length -1));
        let randomFilm = randomArray[i];
        return randomFilm
    })
    .then(data => fetch(`http://api.themoviedb.org/3/movie/${data.id}/videos?api_key=ba8b1e29d42df1c1972348fd0c3495e2`))
    .then(response => response.json())
    .then(data => {
        let randomTrailer = data.results[0];
        if(randomTrailer.hasOwnProperty('key')){
            iframe.setAttribute("src", `https://www.youtube.com/embed/${randomTrailer.key}?autoplay=1`);
            monitor.appendChild(iframe);
        } else {
            callback();
        }
    })
    .catch(err => {
        callback();
        return console.log(err);
    })
}
