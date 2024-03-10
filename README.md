# Installation

```bash
npm install @lacunahub/logger
```

# Usage

```js
import { Logger, TelegramLogger } from '@lacunahub/logger'

const logger = new Logger(),
    telegramLogger = new TelegramLogger({
        botToken: 'YOUR_BOT_TOKEN',
        chatId: 'YOUR_CHAT_ID'
    })

logger.info('Hello world!')
telegramLogger.info('Hello world!')
```

[How to get Telegram chat ID](https://docs.lacunabot.com/guides/identifiers/telegram)

# License

This project is licensed under the [MIT License](https://github.com/LacunaHub/lavaluna.js/blob/master/LICENSE)
