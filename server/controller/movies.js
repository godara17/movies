"use strict"

const express = require("express")
const crypto = require("crypto")

const movies = require("../models/movies")

const router = express.Router()


router.use("/", (req, res, next) => {
    if (movies == null) {
      res.status = 404
      res.send("movies not found")
    } else {
      next()
    }
})


// get movies here
router.get("/movies", (req, res, next)=>{
  movies.loadMovies().then((data, err) => {
    if(err) next(err)
    else {
      data["status"] = "SUCCESS"
      res.json(data)
    }
  })
})


// create movie here
router.post("/movie", (req, res, next)=>{
  let data = req.body
  data["id"] = crypto.createHash("md5").update(JSON.stringify(data)).digest("hex")
  data["create_ts"] = new Date(new Date().toUTCString())
  data["update_ts"] = new Date(new Date().toUTCString())
  movies.insertMovie(data).then((data, err) => {
    if (err) next(err)
    else {
      if ("id" in data) {
        data["status"] = "SUCCESS"
        res.json(data)
      } else {
        data["status"] = "ERROR"
        res.json(data)
      }
    }
  })
})


// get movie here
router.get("/movie/:id", (req, res, next)=>{
  movies.getMovie(req.params.id).then((data, err) => {
    if (err) next(err)
    else {
      if (data == null) res.json({status: "ERROR", movieDetail: null})
      else {
        data["status"] = "SUCCESS"
        res.json(data)
      }
    }
  })
})


// update movie detail here
router.put("/movie/:id", (req, res, next)=>{
  movies.findOne(
    {
      "id":  req.params.id
    }, ((err, data) => {
    if(err)
      next(err)
    else
    {
      if(data !== null) {
        res.json(data)
      } else {
        res.json({})
      }
    }
  }))
})


// delete movie detail here
router.delete("/movie/:id",(req, res, next)=>{
})


module.exports=router
