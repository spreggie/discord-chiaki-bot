const Discord = require('discord.js');
const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
        console.log("PREPARE, GET SET, GO --- READY BOI :))");
        client.user.setPresence({ game: { name: '//help', type: 3 }, status: 'dnd' });
        // client.user.setPresence({ game: { type: 'LISTENING', name: 'paštika' }, status: 'dnd' })
        // client.user.setStatus('dnd')
        // client.user.setGame('paštika', 'https://www.twitch.tv/acidcat_', 1);
});
  // client.user.setPresence({ game: { name: 'Ameliho vlaky🚂🚂', type: 3 } });
  // client.user.setGame(`something ( ͡° ͜ʖ ͡°) || Jsem na ${client.guilds.size} serverech`, 'https://www.twitch.tv/logout', 1)

 // client.on('guildMemberAdd', member => {
 // const channel = member.guild.channels.find('name', 'boti-a-hudba');
 // if (!channel) return;
  // channel.send(`<@!323182446835269633> debílek`);
 // });

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
    const embed = new Discord.RichEmbed()
      /*
       * Alternatively, use "#00AE86", [0, 174, 134] or an integer number.
       */
      .setColor("#FF0000")
      .setFooter("© AcidCat", "https://cdn.discordapp.com/avatars/323182446835269633/eff8f4195a37e453f3cd8b119ea2887f.png")
      /*
       * Takes a Date object, defaults to current date.
       */
      .setTimestamp()
      .setURL("https://discord.js.org/#/docs/main/indev/class/RichEmbed")
      .addField("🎬 Základní příkazy 🎬", "**//avatar** - přímý odkaz na tvůj avatar                                                                                                  **//ping** - spočítá ping bota mezi odeslanou zprávou a její následnou úpravou                                                                    **//help** - zobrazí tuhle nápovědu                                                                                                                          **//say** - zopakuje odeslanou zprávu")
      .addField("💻 Administrátorské příkazy 💻", "**//kick** - vyhodí uživatele ze serveru                                                                                                                        **//ban** - permanentně zabanuje uživatele", true)
      .addField("⠀", "*... more coming soon*", true);

      message.channel.send({embed});

    }
  });

client.on("message", (message) => {
  if(message.content === "cs") {
    message.channel.send("cs :)");
  }
  if(message.content === "Cs") {
    message.channel.send("Cs :)");
  }
  if(message.content === "čau") {
    message.channel.send("nazdar");
  }
  if(message.content === "Čau") {
    message.channel.send("Nazdar");
  }
  if(message.content === "jj") {
    message.channel.send("nn :D");
  }
  if(message.content === "nn") {
    message.channel.send("jj :D");
  }
  if(message.content === "coze") {
    message.channel.send("lol coje");
  }
  if(message.content === "🤔") {
    message.channel.send("👌🏻");
  }
  if(message.content === "drz hubu") {
    message.channel.send("nn ty xDDD :DDddd");
  }
  if(message.content === "jn") {
    message.channel.send("ne no");
  }
  if(message.content === "jn") {
    message.channel.send("ne no");
  }
  if(message.content === "dik") {
    message.channel.send("nz");
  }
  if(message.content === "dík") {
    message.channel.send("nz brácho");
  }
  if(message.content === "ban") {
    message.channel.send("dostanes no");
  }
  if(message.content === "ses no") {
    message.channel.send("ty ses");
  }
  if(message.content === "cS") {
    message.channel.send("cS :DDD");
  }
  if(message.content === "haha") {
    message.channel.send("HAHAHA");
  }
  if(message.content === "CS") {
    message.channel.send("CS ;)");
  }
  if(message.content === "debilku") {
    message.channel.send("sam ses debilek :P");
  }
  if(message.content === "debílku") {
    message.channel.send("sám seš debílek :P");
  }
  if(message.content === "zabij se") {
    message.channel.send("nn ty");
  }
  if(message.content === "Debilku") {
    message.channel.send("Sam ses debilek :P");
  }
  if(message.content === "Debílku") {
    message.channel.send("Sám seš debílek :P");
  }
  if(message.content === "reggie") {
    message.channel.send("co chces hajzle");
  }
  if(message.content === "Reggie") {
    message.channel.send("moje laska");
  }
  if(message.content === "reggi") {
    message.channel.send("toho miluju");
  }
  if(message.content === "Reggi") {
    message.channel.send("neotravuj ho");
  }
  if(message.content === "Ameli") {
    message.channel.send("gej");
  }
  if(message.content === "ameli") {
    message.channel.send("smrdi");
  }
  if(message.content === "co") {
    message.channel.send("cozeco debilku");
  }
  if(message.content === "ahoj") {
    message.channel.send("brej");
  }
  if(message.content === "Ahoj") {
    message.channel.send("bry den");
  }
  if(message.content === "čus") {
    message.channel.send("bambus");
  }
  if(message.content === "cus") {
    message.channel.send("aHoj");
  }
  if(message.content === "ty me nezdrav") {
    message.channel.send("nebo co :P");
  }
  if(message.content === "ty mě nezdrav") {
    message.channel.send("nn budu xDD");
  }
});

client.login(process.env.BOT_TOKEN);
