async function searchMovie() {
    let movieName = document.getElementById("movieInput").value;
    let container = document.getElementById("movieContainer");
    let loader = document.getElementById("loader");

    if (movieName === "") {
        alert("Enter a movie name!");
        return;
    }

    container.innerHTML = "";
    loader.classList.remove("hidden");

    try {
        let response = await fetch(`https://www.omdbapi.com/?apikey=81486f64&s=${movieName}`);
        let data = await response.json();

        console.log(data); // DEBUG

        loader.classList.add("hidden");

        if (data.Response === "True") {
            data.Search.forEach(movie => {
                let div = document.createElement("div");
                div.className = "movie";

                div.innerHTML = `
                    <img src="${movie.Poster}">
                    <h3>${movie.Title}</h3>
                `;

                div.onclick = () => getMovieDetails(movie.imdbID);

                container.appendChild(div);
            });
        } else {
            container.innerHTML = `<p>${data.Error}</p>`;
        }

    } catch (error) {
        loader.classList.add("hidden");
        container.innerHTML = "<p>Error fetching data ⚠️</p>";
    }
}