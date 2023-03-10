const fs = require('fs')
const { Client } = require("@bhavjit/khan-api")
const client = new Client()

async function main () {
  const replies = await client.getAllMessageReplies("ag5zfmtoYW4tYWNhZGVteXJBCxIIVXNlckRhdGEiHmthaWRfMTAzNzkwNDA4MTM5MTE4NzA4MDQ5ODUwNwwLEghGZWVkYmFjaxiAgJOjuLmJCww")
  const contestants = []
  replies.forEach(reply => {
    let string
    try {
      string = JSON.parse(reply.text.match(/\[.+\]/))
    }
    catch(e){}
    if(string)contestants.push(`"${string[0]}"`)
  })
  fs.writeFile('./primaveraContestants.js', `var contestants = [${contestants}]`, err => {
    if(err) console.error(err)
    else console.log("file has been updated.")
  })
}
main()
