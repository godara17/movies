const moviesSchema = mongoose.Schema({
        name: {type: String},
        desc: {type: String},
        release_year: {type: Number},
        directors: {type: Array},
        cast: {type: Array},
        poster: {type: String},
        id: {type: String},
        create_ts: {type: Date},
        update_ts: {type: Date}
    }, {strict:false})


function getMoviesCollection() {
  const col = null
  try {
    const movie_con={
      // "uri":`mongodb://kagzat:${encodeURIComponent("q0xoFtVOc2FzefbcZx9m5yzWNp49tsOH0GNAnQHD1Be1C2h/6eVE/XkW1eqqGnB8")}@13.233.89.112:30006/scraping?authSource=admin`,
      "uri":`mongodb://localhost:27017/golbol`,
      "options" : {
        "useNewUrlParser": true,
        "keepAlive": 30000,
        "bufferMaxEntries": 0,
        "connectTimeoutMS": 45000, // Give up initial connection after 10 seconds
        "socketTimeoutMS": 60000, // Close sockets after 45 seconds of inactivity
        "family": 4,
        "reconnectTries": 30,
        "reconnectInterval": 5000
      },
    }
    const conn = mongoose.createConnection(movie_con.uri, movie_con.options)
    col = conn.model('movies', moviesSchema, 'movies')
  } catch (error) {
    console.log("Error while getting connection")
  }
  return col
}
