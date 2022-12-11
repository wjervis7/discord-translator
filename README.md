# discord-translator
[![PR Validator](https://github.com/wjervis7/discord-translator/actions/workflows/pr-validation.yml/badge.svg)](https://github.com/wjervis7/discord-translator/actions/workflows/pr-validation.yml)

[![Publish Docker Image](https://github.com/wjervis7/discord-translator/actions/workflows/docker-push.yml/badge.svg)](https://github.com/wjervis7/discord-translator/actions/workflows/docker-push.yml)

## How to run locally
- Pre-Reqs:
    - Node.js 19.x
    - Discord App with Bot set up:
        1. Create a Discord App, in the [Discord Developer Portal][1].
        1. Add a Bot, to the App you created.
        1. Reset Token, and copy the token. You will need this token, later.
        1. In the Bot settings, under **Privileged Gateway Intents**, enable **Message Content Intent**.
        1. In the OAuth2 settings, go to the URL Generator. Select the following scopes:
            - bot (needed to add the bot to the server)
            - applications.commands (needed to add the translation slash commands to the server)
        1. Select the following bot permissions:
            - Read Messages/View Channels (needed to view messages for reaction translations)
            - Send Messages (needed to send translations in channels)
            - Send Messages in Threads (needed to send translations in threads)
            - Manage Messages (needed to remove reactions from messages)
        1. Use the generated URL, to add the bot to your server.
        
 1. Clone repo
 1. Copy sample.env, renaming it as `.env`.
 1. Set the value of `DISCORD_TOKEN`, to the token you got from resetting the Discord Bot token, above.
 1. Run `npm ci && npm run build`, to build the `dist` folder.
 1. Run `npm start`



 [1]:https://discord.com/developers/applications "Discord Developer Portal"