"use strict"

const express = require('express')
const router = express.Router()
router.use('/', require('./movies'))

module.exports = router
