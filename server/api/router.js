const router = require('express').Router()

const product = require('./product').product
const reviewAnalysis = require('./reviewAnalysis').reviewAnalysis
const trendAnalysis = require('./trendAnalysis').trendAnalysis

router.get('/product', product)
router.get('/reviewAnalysis', reviewAnalysis)
router.get('/trendAnalysis', trendAnalysis)


module.exports = router

