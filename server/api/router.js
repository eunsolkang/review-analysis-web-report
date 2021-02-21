const router = require('express').Router()

const product = require('./product').product
const reviewAnalysis = require('./reviewAnalysis').reviewAnalysis
const trendAnalysis = require('./trendAnalysis').trendAnalysis
const relevantReviews = require('./relevantReviews').relevantReviews

router.post('/product', product)
router.get('/reviewAnalysis', reviewAnalysis)
router.get('/trendAnalysis', trendAnalysis)
router.get('/relevantReviews', relevantReviews)


module.exports = router

