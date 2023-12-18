const request = require('request');

const apiKey = 'efa0d3f71b0785351d8771dacd26db14'

const movies = (movieTitle, callback) => {
const url = 'https://api.themoviedb.org/3/search/movie?query=' + movieTitle + '&api_key=' + apiKey

    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to movie services', undefined)
        } else if (res.body.results.length === 0) {
            callback('Unable to find movie. Try new search term.', undefined)
        } else {
            callback(undefined, {
                movieId: res.body.results[0].id
        })
            }         
        }
    )}

const similarMovies = (movieId, callback) => {
    const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/similar?api_key=' + apiKey

    request({url, json: true}, (err, res) => {
        if (err) {
            callback('Unable to connect to similar movie service', undefined)
        } else {
            callback(res.body.results)
        }
    })
}

movies('castaway', (error, result) => {

    similarMovies(result.movieId, (error, result) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Similar Movies:', result);
        }
    });
});








// fetch('https://api.themoviedb.org/3/search/movie?query=Jack+Reacher&api_key=efa0d3f71b0785351d8771dacd26db14').then((response) => {
//     response.json().then((data) => {
// console.log(data)
//     })
// })




// movies('the notebook', (err, res) => 
// {
//     similarMovies(res.movieId, (err, res) => {
//         console.log(res.siMovies)
//     })
// })



// const movieForm = document.querySelector('form')
// const input = document.querySelector('input')
// const messageOne = document.getElementById('messageOne')
// const messageTwo = document.getElementById('messageTwo')


// movieForm.addEventListener('submit', (e) => {
//     e.preventDefault()
//     const search = input.value
//     messageOne.textContent = ''
//     messageTwo.textContent = ''

//     if (movieForm) {
//         movies('https://api.themoviedb.org/3/search/movie?query=' + search + '&api_key=efa0d3f71b0785351d8771dacd26db14')
//         messageOne.innerHTML = movieForm
//     }
//     })

// app.get('/movies', (req,res) => {

//     if(!req.query.movie) {
//         return res.send({
//            error: 'You must provide a movie name!'
//         })
//     } else {
//         movies(req.query.movie, (error, data) => {
//             if(error){
//                 return res.send({error});
//             }
//             console.log('Data', data);
//             similarMovies(data.id, (error, similarData) => {
//                 if (error){
//                     return res.send({error});
//                 }
//                 res.send({
//                     data,
//                     similarData,
//                 })
//             })
//         })
//     }
// })