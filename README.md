# Shan'bot

A duh bot that makes nothing usefull and is actually pretty dumb.

Forked from [arnaudhuc/Erina](https://github.com/arnaudhuc/Erina).

## Installation

To install follow the steps :

Run `npm ci`

Run `cp .env .env.local`

Open .env.local and fill it

and run `npm install`

# TODO : update this readme, you doofus

## Commands

List of commands:

- !prune <number> : remove the last any messages as the number you want
- !help : display all the commands available.
- !help <command> : display all the infos of a command
- !reload <command> : reload a command
- !server : display some server info
- !userInfo : display user info
- !avatar : display the link of yout avatar
- !avatar <user> : display the link of the user
- !myPermission : display all of the permissions you have on the server

## How to

List of how to :

### Commands

This is how a command is written

- name: String
- description: String
- permission?: Boolean
- usage?: String
- args?: true
- aliases?: Array<string>
- cooldown?: Integer
- guildOnly: boolean
- execute(message, args){}

Explanation

_name_ is the name of your command : help, kick, my-permission, ...

_description_ is the description for the help

_permission_ (optional) is a boolean. If set to true, you must have permission to kick, ban, manage message to run this command

_usage_ (optional) is a description of how to use the command

_args_ (optional) is a boolean. If set to true, the command must have an arg to run : kick

_aliases_ is an array of strings. It's a list of alias for your command : avatar

_cooldown_ is a number (in sec) for preventing spam. It set to 3 secondes by default

_guildOnly_ is a boolean. If true the command must be send on a channel and not in DM

_execute_ is where the magic happen ...
