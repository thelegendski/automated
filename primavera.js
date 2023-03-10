const https = require('https')
const fs = require('fs')
const { Client } = require("@bhavjit/khan-api")
const client = new Client()

async function main() {
    const replies = await client.getAllMessageReplies("ag5zfmtoYW4tYWNhZGVteXJBCxIIVXNlckRhdGEiHmthaWRfMTAzNzkwNDA4MTM5MTE4NzA4MDQ5ODUwNwwLEghGZWVkYmFjaxiAgJOjuLmJCww")
    const contestants = [], blacklist = [], regex = /\$\[\s*("|')[a-zA-Z0-9 ]+("|')\s*,\s*[0-9]\s*,\s*("|')[A-Za-z0-9 ]+("|')\s*\]\$/
    let comments = ''
    replies.forEach(reply => {
        let string
        try {
            if(!blacklist.includes(reply.author.kaid)){
                if(regex.test(reply.text)) string = JSON.parse(reply.text.match(/\[.+\]/))
                else comments += `//WARNING! join failed: ${reply.author.nickname} | ${reply.author.kaid}\n`
            }
            else comments += `//WARNING! blacklisted user attempted to join: ${reply.author.nickname} | ${reply.author.kaid}\n`
        }
        catch (e) { 
            comments += `//ERROR! join failed: ${reply.author.nickname} | ${reply.author.kaid}\n`
            console.error(e) 
        }
        if (string) {
            contestants.push(`"${string[0]}"`)
            console.log(`${reply.author.nickname} joined successfully.`)
        }
    })
    fs.writeFile('./primaveraContestants.js', `var contestants = [${contestants}]\n${comments}`, err => {
        if (err) console.error(err)
    })
    https.get("https://purge.jsdelivr.net/gh/thelegendski/automated@master/primaveraContestants.js");
}
main()
