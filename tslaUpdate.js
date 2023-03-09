const https = require('node:https')
const fs = require('fs')

const URL = "https://finnhub.io/api/v1/quote?symbol=TSLA&token=cfgk7khr01qlga2ufnb0cfgk7khr01qlga2ufnbg"

https.get(URL, res => {
  let data = '';
  res.on('data', chunk => data += chunk)
  res.on('end', () => {
    const json = JSON.parse(data)
    fs.writeFile('./tslaPrice.js', `var price = "$${json.c}"`, err => {
      if(err) console.log(err)
      else console.log("done")
    })
  })
})
