"use strict"

const mongoose = require("mongoose")


class Movies {
  constructor() {
    this.movieSchema = this.getMovieSchema()
    this.movieCol = this.getMoviesCollection()
  }

  getMovieSchema() {
    const movieSchema = mongoose.Schema({
        name: {type: String, required: true},
        desc: {type: String, required: true},
        release_year: {type: Number, required: true},
        directors: {type: Array, required: true},
        cast: {type: Array, required: true},
        poster: {type: String},
        id: {type: String, required: true, unique: true},
        create_ts: {type: Date, required: true},
        update_ts: {type: Date, required: true}
    }, {strict:false})
    return movieSchema
  }

  getMoviesCollection() {
    let col = null
    try {
      const movieCon={
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
      const conn = mongoose.createConnection(movieCon.uri, movieCon.options)
      col = conn.model('movies', this.movieSchema, 'movies')
    } catch (error) {
      console.log("Error while getting connection")
      console.log(error)
    }
    return col
  }

  ensureIndexes() {
  }

  insertMovie(movie) {
    return new Promise((resolve, reject) => {
      try {
        this.movieCol.create(movie, ((err, resp) => {
          if (err) resolve({"err": err})
          resolve({id: movie["id"]})
        }))
      } catch (error) {
        console.log("error")
        console.log(error)
        resolve({"err": error})
      }
    })
  }

  getMovie(id) {
    return new Promise((resolve, reject) => {
      try {
        this.movieCol.findOne({"id": id}, ((err, resp) => {
          // if (err) return this.handleError(err)
          if (err) resolve({"err": err})
          resolve({movieDetail: resp})
        }))
      } catch (error) {
        console.log("error")
        console.log(error)
        resolve({"err": error})
      }
    })
  }

  loadMovies() {
    return new Promise((resolve, reject) => {
      try {
        this.movieCol.find(
          {}, {"id": 1, "name": 1, "release_year": 1},
          ((err, data) => {
            if (err) resolve({"err": err})
            resolve({movies: data})
        }))
      } catch (error) {
        console.log("error")
        console.log(error)
        resolve({"err": error})
      }
    })
  }

  updateMovie(id, info) {
    this.movieCol.find(
      {}, {"id": 1, "name": 1, "desc": 1, "release_year": 1},
      ((err, data) => {
        if (err) throw new Error(err)
        return data
    }))
  }

  deleteMovie(id) {
    this.movieCol.delete(
      {"id": id}, ((err, data) => {
        if (err) throw new Error(err)
        return data
    }))
  }

  // handleError(err) {
  //   return {status: "ERROR", msg: err}
  // }

}

const movies = new Movies()
module.exports = movies
