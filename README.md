# Shan'bot

I'm not sure how to describe it, but I know one thing for sure is that the word "duh" needs to appear somewhere.

Forked from [arnaudhuc/Erina](https://github.com/arnaudhuc/Erina).

## Installation

To install follow the steps :

Run `npm ci`

Run `cp .env .env.local`

Open .env.local and fill it

and run `npm install`

## Commands

Slash commands you can call through the discord command API. Simply type /[command name] in a channel.

List of commands:

- /prune [number] : remove the last any messages as the number you want
- /help : display all the commands available.
- /help [command] : display all the infos of a command

### Technical details

A command can include

| Field       | Description                                            |
| ----------- | ------------------------------------------------------ |
| name        | Name of your command : help, kick, my-permission, ...  |
| description | Description for the help                               |
| permission  | List of guild permissions required to run this command |
| options     | Arguments used in the execution                        |
| execute     | This is where the magic happens ...                    |

Remember you need to deploy commands if you change their arguments or name. See `package.json` for deploy scripts.

## Automations

Shan'bot's automatic behaviors. The bot can, for example, react to message with a given emoji when it's mentionned.

List of automations :

- Dual Emojis : Replies with a predeterminated quote when two users use the same emoji
- Emote on mention : Reacts with an emoji "duh" when its name is mentionned in a message
- Perceval : Sends sometimes (random determined) a Perceval quote (from Kaamelott) when someone talks in a channel
- Pingpong Emojis : Sends a predeterminated quote when two users use two different emojis that are "linked"
- Random Reactions : Reacts sometimes (random determined) with a random emoji when someone talks in a channel
- Trigger words : Sends one of the predeterminated quotes when someone uses one of the listed words
