const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
        client.user.setPresence({ game: { name: '//help', type: 3 }, status: 'dnd' });
        // client.user.setPresence({ game: { type: 'LISTENING', name: 'paštika' }, status: 'dnd' })
        // client.user.setStatus('dnd')
        // client.user.setGame('paštika', 'https://www.twitch.tv/acidcat_', 1);
});
  // client.user.setPresence({ game: { name: 'Ameliho vlaky🚂🚂', type: 3 } });
  // client.user.setGame(`something ( ͡° ͜ʖ ͡°) || Jsem na ${client.guilds.size} serverech`, 'https://www.twitch.tv/logout', 1)

 client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find('name', 'boti-a-hudba');
  if (!channel) return;
   channel.send(`<@!323182446835269633> debílek`);
 });

 client.on("message", async message => {

  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;
         
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "ping") {
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latence = **${m.createdTimestamp - message.createdTimestamp}ms** || API Latence = **${Math.round(client.ping)}ms**`);
  }

   if(command === "avatar") {
    message.reply(message.author.avatarURL);
  }

  if(command === "say") {
    const sayMessage = args.join(" ");
    message.delete().catch(o_O=>{});
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    if(!message.member.roles.some(r=>["Rozšířené pravomoci", "Zakladatelé", "Discord Admin", "Server Admin"].includes(r.name)) )
      return message.reply("promiň, na tohle nemáš dostatečné pravomoce :no_entry:");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("zadej prosím nick člena tohoto serveru, jinak nic nevykonám :unamused:");
    if(!member.kickable)
      return message.reply("tenhle uživatel nelze vyhodit! Má buď vyšší roli, je admin a nebo nemám pravomoce na vyhazov :smirk:");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("uveď prosím důvod k vyhození :thinking:");

    await member.kick(reason)
      .catch(error => message.reply(`promiň ${message.author}, nastala chyba: ${error}`));
    message.channel.send(`:wave: **${member.user.tag}** *byl vyhozen administrátorem* **${message.author.tag}** *z důvodu:* **${reason}**`);

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["Administrator", "Discord Admin", "Server Admin"].includes(r.name)) )
      return message.reply("promiň, na tohle nemáš dostatečné pravomoce :no_entry:");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("zadej prosím nick člena tohoto serveru, jinak nic nevykonám :unamused:");
    if(!member.bannable)
      return message.reply("tenhle uživatel nelze zabanovat! Má buď vyšší roli, je admin a nebo nemám pravomoce na banování :smirk:");

    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("uveď prosím důvod k zabanování :thinking:");

    await member.ban(reason)
      .catch(error => message.reply(`promiň ${message.author}, nastala chyba: ${error}`));
    message.channel.send(`:wave: **${member.user.tag}** *byl zabanován administrátorem* **${message.author.tag}** *z důvodu:* **${reason}**`);
  }

  if(command === "help") {
    message.channel.send(`🎬 Obyčejné příkazy 🎬
      **//avatar** - přímý odkaz na tvůj avatar
      **//ping** - spočítá ping bota mezi odeslanou zprávou a její následnou úpravou
      **//help** - zobrazí tuhle nápovědu
      **//say** - zopakuje odeslanou zprávu

      💻 Administrátorské příkazy 💻
      **//kick** - vyhodí uživatele ze serveru
      **//ban** - permanentně zabanuje uživatele`);
  }
});

client.on("message", (message) => {
  if(message.content === "cs") {
    message.channel.send("cs :)");
  } else
  if(message.content === "Cs") {
    message.channel.send("Cs :)");
  } else
  if(message.content === "čau") {
    message.channel.send("nazdar");
  } else
  if(message.content === "Čau") {
    message.channel.send("Nazdar");
  } else 
  if(message.content === "jj") {
    message.channel.send("nn");
  } else
  if(message.content === "nn") {
    message.channel.send("jj :D");
  } else
  if(message.content === "coze") {
    message.channel.send("lol coje");
  } else
  if(message.content === "🤔") {
    message.channel.send("👌🏻");
  } else
  if(message.content === "drz hubu") {
    message.channel.send("nn ty xDDD :DDddd");
  } else
  if(message.content === "jn") {
    message.channel.send("ne no");
  } else
  if(message.content === "jn") {
    message.channel.send("ne no");
  } else
  if(message.content === "dik") {
    message.channel.send("nz");
  } else
  if(message.content === "dík") {
    message.channel.send("nz brácho");
  } else
  if(message.content === "ban") {
    message.channel.send("dostanes no");
  } else
  if(message.content === "ses no") {
    message.channel.send("ty ses");
  } else
  if(message.content === "cS") {
    message.channel.send("cS :DDD");
  } else
  if(message.content === "haha") {
    message.channel.send("HAHAHA");
  } else
  if(message.content === "CS") {
    message.channel.send("CS ;)");
  } else
  if(message.content === "debilku") {
    message.channel.send("sam ses debilek :P");
  } else
  if(message.content === "debílku") {
    message.channel.send("sám seš debílek :P");
  } else
  if(message.content === "zabij se") {
    message.channel.send("nn ty");
  } else
  if(message.content === "Debilku") {
    message.channel.send("Sam ses debilek :P");
  } else
  if(message.content === "Debílku") {
    message.channel.send("Sám seš debílek :P");
  } else
  if(message.content === "reggie") {
    message.channel.send("co chces hajzle");
  } else
  if(message.content === "Reggie") {
    message.channel.send("moje laska");
  } else
  if(message.content === "reggi") {
    message.channel.send("toho miluju");
  } else
  if(message.content === "Reggi") {
    message.channel.send("neotravuj ho");
  } else
  if(message.content === "Ameli") {
    message.channel.send("gej");
  } else
  if(message.content === "ameli") {
    message.channel.send("smrdi");
  } else
  if(message.content === "co") {
    message.channel.send("cozeco debilku");
  } else
  if(message.content === "ahoj") {
    message.channel.send("brej");
  } else
  if(message.content === "Ahoj") {
    message.channel.send("bry den");
  } else
  if(message.content === "čus") {
    message.channel.send("bambus");
  } else
});

client.login(process.env.BOT_TOKEN);
