import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { errorlogger, logger } from './shared/logger'

async function dbconnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected')

    app.listen(config.port, () => {
      logger.info(`Example app listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error('failed to connect', err)
  }
}

dbconnect()
