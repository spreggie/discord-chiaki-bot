const Discord = require('discord.js');
const client = new Discord.Client();

// Here we load the config.json file that contains our token and our prefix values.
const config = require("./config.json");
// config.prefix contains the message prefix.

client.on('ready', () => {
        client.user.setStatus('dnd')
        client.user.setGame('🚂🚂🚂 dej +rep redžímu, protože je to šéf', 'https://www.twitch.tv/acidcat_', 1);
});
  // client.user.setPresence({ game: { name: 'Ameliho vlaky🚂🚂', type: 3 } });
  // client.user.setGame(`something ( ͡° ͜ʖ ͡°) || Jsem na ${client.guilds.size} serverech`, 'https://www.twitch.tv/logout', 1)

// Create an event listener for new guild members
 client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'boti-a-hudba');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
   channel.send(`<@!323182446835269633> :---)))`);
 });

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  if(message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command.
  // e.g. if we have the message "+say Is this the real life?" , we'll get the following:
  // command = say
  // args = ["Is", "this", "the", "real", "life?"]
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // Let's go with a few common example commands! Feel free to delete or change those.

  if(command === "ping") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! :ping_pong: Latence = **${m.createdTimestamp - message.createdTimestamp}ms** || API Latence = **${Math.round(client.ping)}ms**`);
  }

   if(command === "avatar") {
    // Send the user's avatar URL
    message.reply(message.author.avatarURL);
  }

  if(command === "say") {
    // makes the bot say something and delete the message. As an example, it's open to anyone to use.
    // To get the "message" itself we join the `args` back into a string with spaces:
    const sayMessage = args.join(" ");
    // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
    message.delete().catch(o_O=>{});
    // And we get the bot to say the thing:
    message.channel.send(sayMessage);
  }

  if(command === "kick") {
    // This command must be limited to mods and admins. In this example we just hardcode the role names.
    // Please read on Array.some() to understand this bit:
    // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/some?
    if(!message.member.roles.some(r=>["Rozšířené pravomoci", "Zakladatelé", "Discord Admin", "Server Admin"].includes(r.name)) )
      return message.reply("promiň, na tohle nemáš dostatečné pravomoce :no_entry:");

    // Let's first check if we have a member and if we can kick them!
    // message.mentions.members is a collection of people that have been mentioned, as GuildMembers.
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("zadej prosím nick člena tohoto serveru, jinak nic nevykonám :unamused:");
    if(!member.kickable)
      return message.reply("tenhle uživatel nelze vyhodit! Má buď vyšší roli, je admin a nebo nemám pravomoce na vyhazov :smirk:");

    // slice(1) removes the first part, which here should be the user mention!
    let reason = args.slice(1).join(' ');
    if(!reason)
      return message.reply("uveď prosím důvod k vyhození :thinking:");

    // Now, time for a swift kick in the nuts!
    await member.kick(reason)
      .catch(error => message.reply(`promiň ${message.author}, nastala chyba: ${error}`));
    message.channel.send(`:wave: **${member.user.tag}** *byl vyhozen administrátorem* **${message.author.tag}** *z důvodu:* **${reason}**`);

  }

  if(command === "ban") {
    // Most of this command is identical to kick, except that here we'll only let admins do it.
    // In the real world mods could ban too, but this is just an example, right? ;)
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

  if(command === "purge") {
    // This command removes all messages from all users in the channel, up to 100.

    // get the delete count, as an actual number.
    const deleteCount = parseInt(args[0], 10);

    // Ooooh nice, combined conditions. <3
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply(":do_not_litter: Prosím napiš, kolik zpráv chceš smazat, minimálně však od **2-100**");

    // So we get our messages, and delete them. Simple enough, right?
    const fetched = await message.channel.fetchMessages({count: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`:warning: **Žádná zpráva nebyla smazána kvůli ${error}**`));
  }

   // First, we need to make sure that it isn't reading a message that the bot is sending.
   if (sender.id === '392489298240471072') { // Checks if the ID of the sender is the same ID as the bot
       return; // Cancels the rest of the listener Event.

  }

  // You can also do this for other words, in all of the channels.
  if (msg.includes('PÍČA')) { // Checks if the word is included in the message
      message.delete(); // Deletes the message
      message.author.send('Slovo **Píča** je zde zakázáno, nepiš ho prosím.') // This private messages the author that what they posted had a banned word.
  }
});

// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
