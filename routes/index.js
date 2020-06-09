var express = require('express');
var router = express.Router();
var path = require("path");
var dir = `${__dirname}/../views/`
var Tesseract = require('tesseract.js')
var request = require('request')
var fs = require('fs')
var url = 'http://tesseract.projectnaptha.com/img/eng_bw.png'
var filename = './card.png'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.join(dir + '/index.html'));
});
router.get('/selector', function(req, res, next) {
  res.sendFile(path.join(dir + '/selector.html'));
});
router.get('/singleloc', function(req, res, next) {
  res.sendFile(path.join(dir + '/displayloc.html'));
});
router.get('/card/data', function(req,res,next){
  var url = req.query.url;
  Tesseract.recognize(
  url,
  'eng',
  { logger: m => console.log(m) }
  ).then(({ data: { text } }) => {
    console.log(text);
    res.json({data: text});
  })
})

router.get('/card',(req,res,next) => {
  res.sendFile(path.join(dir + '/card.html'));
})

module.exports = router;
