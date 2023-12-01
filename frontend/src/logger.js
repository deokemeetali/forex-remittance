const logger = {
  log: (message) => {
    console.log(`[LOG] ${message}`);
  },
  warn: (message) => {
    console.warn(`[WARN] ${message}`);
  },
  error: (message) => {
    console.error(`[ERROR] ${message}`);
  },
};

export default logger;
