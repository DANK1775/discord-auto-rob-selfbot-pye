require('dotenv').config()
const { Client, MessageEmbed } = require('discord.js-selfbot-v13');
const client = new Client();
const { getIdCash } = require('./automaticR')

let condicion = false
let intervalo = 16 * 60 * 1000  // 16 mins
function resetInterval() {
    if (condicion === false) {
        let randomI = Math.floor(Math.random() * 5 + 17)
        intervalo = randomI * 60 * 1000
        console.log(`siguente ataque en ${randomI} minutos`)
}

}


client.on('ready', async () => {
    console.log(`${client.user.username} is ready!`);

    setInterval(() => {
        const channel = client.channels.cache.get('973425187301261393') // remplazar id con el id del canal

        if (channel && condicion === false) {
            condicion = true
            channel.send(`!top cash`)
        }
    }, intervalo);


})
client.on('messageCreate', async (msg) => {
    //lee unicamente los mensajes del bot si condicion es true
    if (msg.channelId === '973425187301261393' && msg.author.id === '922991830776291438' && condicion === true && msg.embeds.length > 0) {
        // veridica si el embed es de lb cash o top cash
        if (msg.embeds[0].title === 'Top Monedas') {
            let topCashId = await getIdCash(msg.embeds[0].description)

            setTimeout(() => msg.channel.send(`!rob ${topCashId}`),8000);
            setTimeout(() => msg.channel.send(`!deposit all`),16000);
            setTimeout(() => condicion = false,8000);
            setTimeout(() => resetInterval(),8000);
            console.log(`user: ${topCashId} robado`)
        }
    }
})

// client.on('messageUpdate', async (msg) => {
//         if (msg.channelId === '942143672928071782') {
//         console.log(msg.content)
//     }
// })

// client.on('messageDelete', async (msg) => {
//     try {
//         if (msg.guildId === '942143672928071780' && msg.author.bot === false && msg.content.length < 4000) {
//             let mensaje = msg.content
//             mensaje = mensaje.split(' ')
//             if(mensaje[0] === '>') return;
//             console.log(mensaje)

//             let f = ('`')

//             msg.channel.send(`
//             > **Mensaje capturado**
//             > **Contenido**: ${msg.content.toString()}
//             > ${f}${f}${f}By: ${msg.author.username} ${f}${f}${f}
//             `)

//         }
//     } catch (error) {
//         console.log(error)
//     }
// })

client.login(process.env.TOKEN);