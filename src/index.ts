export class Logger {
    constructor(public options: LoggerOptions) {
        if (options.dateFormat && typeof options.dateFormat !== 'function')
            throw new TypeError('[Logger] "dateFormat" must be a function')
    }

    public formatDate() {
        if (this.options.dateFormat) return this.options.dateFormat()
        else return new Date().toISOString().split('T')[1]
    }

    public log(...args: any[]) {
        console.log(`[${this.formatDate()}] LOG:`, ...args)
    }

    public debug(...args: any[]) {
        console.debug(`[${this.formatDate()}] DEBUG:`, ...args)
    }

    public info(...args: any[]) {
        console.info(`[${this.formatDate()}] INFO:`, ...args)
    }

    public warn(...args: any[]) {
        console.warn(`[${this.formatDate()}] WARN:`, ...args)
    }

    public error(...args: any[]) {
        console.error(`[${this.formatDate()}] ERROR:`, ...args)
    }
}

export class TelegramLogger {
    public apiURL = 'https://api.telegram.org/bot'

    public sendMessageURL: string

    constructor(public options: TelegramLoggerOptions) {
        if (!options.botToken) throw new Error('[TelegramLogger] Bot token is required')
        if (!options.chatId) throw new Error('[TelegramLogger] Chat id is required')

        this.sendMessageURL = `${this.apiURL}${options.botToken}/sendMessage`
    }

    public async sendMessage(level: LogLevel, message: string) {
        const response = await fetch(this.sendMessageURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: this.options.chatId,
                text: `*[${level}]* ${message}`,
                disable_notification: !['warn', 'error'].includes(level)
            })
        })

        if (response.ok) {
            return await response.json()
        }

        throw new Error(`[TelegramLogger] Request failed with status code ${response.status}`)
    }

    public async log(...args: any[]) {
        return await this.sendMessage('log', args.join(' '))
    }

    public async debug(...args: any[]) {
        return await this.sendMessage('debug', args.join(' '))
    }

    public async info(...args: any[]) {
        return await this.sendMessage('info', args.join(' '))
    }

    public async warn(...args: any[]) {
        return await this.sendMessage('warn', args.join(' '))
    }

    public async error(...args: any[]) {
        return await this.sendMessage('error', args.join(' '))
    }
}

export type LogLevel = 'log' | 'debug' | 'info' | 'warn' | 'error'

export interface LoggerOptions {
    dateFormat?: () => string
}

export interface TelegramLoggerOptions {
    botToken: string
    chatId: number
}
