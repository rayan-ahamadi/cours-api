function getOmdbDataByID(imdbID) {
  return fetch(
    `http://www.omdbapi.com/?i=${encodeURIComponent(imdbID)}&apikey=${
      process.env.OMDB_API_KEY
    }`
  ).then((response) => response.json());
}

function getOmdbDataBySearch(name) {
  return fetch(
    `http://www.omdbapi.com/?s=${encodeURIComponent(name)}&apikey=${
      process.env.OMDB_API_KEY
    }`
  ).then((response) => response.json());
}

module.exports = {
  getOmdbDataByID,
  getOmdbDataBySearch,
};
