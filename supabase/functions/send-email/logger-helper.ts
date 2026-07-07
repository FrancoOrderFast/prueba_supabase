export class LoggerHelper {
  static info(message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    console.log(`[INFO] [${timestamp}] ${message}`);
    if (data) {
      console.log(JSON.stringify(data, null, 2));
    }
  }

  static error(message: string, error?: unknown) {
    const timestamp = new Date().toISOString();
    console.error(`[ERROR] [${timestamp}] ${message}`);
    if (error) {
      console.error(JSON.stringify(error, null, 2));
    }
  }

  static warn(message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    console.warn(`[WARN] [${timestamp}] ${message}`);
    if (data) {
      console.warn(JSON.stringify(data, null, 2));
    }
  }

  static debug(message: string, data?: unknown) {
    const timestamp = new Date().toISOString();
    console.debug(`[DEBUG] [${timestamp}] ${message}`);
    if (data) {
      console.debug(JSON.stringify(data, null, 2));
    }
  }
}
