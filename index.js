const makeWASocket = require("@whiskeysockets/baileys").default
const qrcode = require("qrcode-terminal")
const fs = require('fs')
const pino = require('pino')
const axios = require("axios")
const { delay, useMultiFileAuthState, BufferJSON, fetchLatestBaileysVersion, PHONENUMBER_MCC, DisconnectReason, makeInMemoryStore, jidNormalizedUser, makeCacheableSignalKeyStore } = require("@whiskeysockets/baileys")
const Pino = require("pino")
const NodeCache = require("node-cache")
const chalk = require("chalk")
const PastebinAPI = require('pastebin-js'),
pastebin = new PastebinAPI('EMWTMkQAVfJa9kM-MRUrxd5Oku1U7pgL')
const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")


let phoneNumber = "94786802371"

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))


  async function qr() {
//------------------------------------------------------
let { version, isLatest } = await fetchLatestBaileysVersion()
const {  state, saveCreds } =await useMultiFileAuthState(`./sessions`)
    const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"
    const XeonBotInc = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: !pairingCode, // popping up QR in terminal log
      mobile: useMobile, // mobile api (prone to bans)
      browser: ['Chrome (Linux)', '', ''], 
     auth: {
         creds: state.creds,
         keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
      },
      browser: ['Chrome (Linux)', '', ''], 
      markOnlineOnConnect: true, 
      generateHighQualityLinkPreview: true, 
      getMessage: async (key) => {
         let jid = jidNormalizedUser(key.remoteJid)
         let msg = await store.loadMessage(jid, key.id)

         return msg?.message || ""
      },
      msgRetryCounterCache, 
      defaultQueryTimeoutMs: undefined, 
   })



   if (pairingCode && !XeonBotInc.authState.creds.registered) {
      if (useMobile) throw new Error('Cannot use pairing code with mobile api')

      let phoneNumber
      if (!!phoneNumber) {
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("❄ꜱᴛᴀʀᴛ ᴡɪᴛʜ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ ᴏꜰ ʏᴏᴜʀ ᴡʜᴀᴛꜱᴀᴘᴘ ɴᴜᴍʙᴇʀ❄(ᴇxᴀᴍᴘʟᴇ)= +94774041805 ")))
            process.exit(0)
         }
      } else {
         phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`💝PLEASE TYPE YOUR WHATSAPP NUMBER 💝\nFOR EXAMPLE🩷 = +94774071805  : `)))
         phoneNumber = phoneNumber.replace(/[^0-9]/g, '')

         // Ask again when entering the wrong number
         if (!Object.keys(PHONENUMBER_MCC).some(v => phoneNumber.startsWith(v))) {
            console.log(chalk.bgBlack(chalk.redBright("❄ꜱᴛᴀʀᴛ ᴡɪᴛʜ ᴄᴏᴜɴᴛʀʏ ᴄᴏᴅᴇ ᴏꜰ ʏᴏᴜʀ ᴡʜᴀᴛꜱᴀᴘᴘ ɴᴜᴍʙᴇʀ❄(ᴇxᴀᴍᴘʟᴇ)= +94774041805 ")))

            phoneNumber = await question(chalk.bgBlack(chalk.greenBright(`💝PLEASE TYPE YOUR WHATSAPP NUMBER 💝\nFOR EXAMPLE🩷 = +94774071805  :`)))
            phoneNumber = phoneNumber.replace(/[^0-9]/g, '')
            rl.close()
         }
      }

      setTimeout(async () => {
         let code = await XeonBotInc.requestPairingCode(phoneNumber)
         code = code?.match(/.{1,4}/g)?.join("-") || code
         console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
      }, 3000)
   }
//------------------------------------------------------
    XeonBotInc.ev.on("connection.update",async  (s) => {
        const { connection, lastDisconnect } = s
        if (connection == "open") {
            await delay(1000 * 10)

            let sessionXeon = fs.readFileSync('./sessions/creds.json');
            await delay(1000 * 2) 


           await delay(800)
          const output = await axios.post('http://paste.c-net.org/',`${btoa(sessionXeon)}`, {headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
          let c = output.data.split('/')[3]
           await XeonBotInc.sendMessage(XeonBotInc.user.id, {text: 'DarkNero;;;'+c});	
          let cc = `⚠⃟⃪⃬⃖⛩ᴅᴏ ɴᴏᴛ ꜱʜᴀʀᴇ ᴛʜɪꜱ ᴄᴏᴅᴇ ᴡɪᴛʜ ᴀɴʏᴏɴᴇ ᴘʟᴇᴀꜱᴇ ᴅᴏɴᴛ ꜱʜᴀʀᴇ.⛩⃟⃪⃬⃖⚠
          _____________
          
          🎀ᴛʜᴀɴᴋꜱ ꜰʀᴏᴍ ᴜꜱɪɴɢ ᴏᴜʀ ᴘᴜʙʟɪᴄ ʙᴏᴛ ꜱᴇʀᴠɪᴄᴇ🎀
          _____________
          
          ʏᴏᴜʀ Qʀ ꜱᴄᴀɴɴᴇᴅ ꜱᴜᴄᴄᴇꜱꜱꜰᴜʟʟʏ✅
          _____________
          
          💝ᴅᴀʀᴋ ɴᴇʀᴏ ᴠ9 ꜱᴜᴘᴘᴏʀᴛ ɢʀᴏᴜᴘ .ᴘʟᴇᴀꜱᴇ ᴄᴏᴍᴇ ᴛᴏ ᴛʜᴇ ᴅᴀʀᴋ ɴᴇʀᴏ ᴜᴘᴅᴀᴛᴇ ᴅᴇᴛᴀɪʟꜱ💝=https://chat.whatsapp.com/K7i6DvdR8u34WCFuASM26a
          _____________
          
          ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴄʏʙᴇʀ ʏᴀᴋᴜᴢᴀ ᴛᴇᴀᴍ💎
          _____________
          ©ᴅᴀʀᴋ ɴᴇʀᴏ ᴠ9🎀
          `
          await XeonBotInc.sendMessage(XeonBotInc.user.id, {text: cc});


              await delay(1000 * 2) 
              process.exit(0)
        }
        if (
            connection === "close" &&
            lastDisconnect &&
            lastDisconnect.error &&
            lastDisconnect.error.output.statusCode != 401
        ) {
            qr()
        }
    })
    XeonBotInc.ev.on('creds.update', saveCreds)
    XeonBotInc.ev.on("messages.upsert",  () => { })
}
qr()

process.on('uncaughtException', function (err) {
let e = String(err)
if (e.includes("Socket connection timeout")) return
if (e.includes("rate-overlimit")) return
if (e.includes("Connection Closed")) return
if (e.includes("Timed Out")) return
if (e.includes("Value not found")) return
console.log('Caught exception: ', err)
})
