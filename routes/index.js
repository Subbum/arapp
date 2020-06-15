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
router.get('/locations', function(req, res, next) {
  res.sendFile(path.join(dir + '/map/index.html'));
});
router.get('/selector', function(req, res, next) {
  res.sendFile(path.join(dir + '/map/selector.html'));
});
router.get('/singleloc', function(req, res, next) {
  res.sendFile(path.join(dir + '/map/displayloc.html'));
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

router.get('/',function(req, res, next) {
  res.sendFile(path.join(dir + '/index.html'));
})

router.get('/card',(req,res,next) => {
  res.sendFile(path.join(dir + '/user/card.html'));
})

router.get('/card/menu',(req,res,next) => {
  res.sendFile(path.join(dir + '/user/menu.html'));
})

router.get('/card/statement', (req,res,next) => {
  res.sendFile(path.join(dir + '/user/creditstatement.html'));
})

router.get('/card/details', (req,res,next) => {
  var cardno = req.query.cno;
  if(cardno == 1234567890){
    return res.json({
      name: 'Jane Doe',
      cno: '1234567890',
      ano: '12121211',
      transactions: [`
      Date: 11/06/2020
      Amount Paid: Rs 20000
      `,`
      Date: 5/06/2020
      Amount Paid: Rs 200
      `,`
      Date: 1/06/2020
      Amount Recieved: Rs 10000
      `]
    })
  }
  else{
    return res.json('Incorrect details')
  }
})

router.post('/card', (req,res,next) => {
  const cardno = req.body.cno;
  if(cardno == 1234567890){
    res.redirect('/card/menu');
  }
  else{
    res.redirect('/card')
  }
})

module.exports = router;
