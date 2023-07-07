'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
const mongoose_1 = __importDefault(require('mongoose'));
const app_1 = __importDefault(require('./app'));
const config_1 = __importDefault(require('./config'));
process.on('uncaughtException', error => {
  // eslint-disable-next-line no-console
  // console.log('Uncaught exception is detected💀. Process is killed immediately')
  console.log(error);
  process.exit(1);
});
let server;
function dbconnect() {
  return __awaiter(this, void 0, void 0, function* () {
    try {
      yield mongoose_1.default.connect(config_1.default.database_url);
      console.log('Database connected');
      server = app_1.default.listen(config_1.default.port, () => {
        console.log(`Example app listening on port ${config_1.default.port}`);
      });
    } catch (err) {
      console.log('failed to connect', err);
    }
    // gracefully shutdown server : unhandled promise rejection
    process.on('unhandledRejection', error => {
      // যদি সার্ভার এর মধ্যে কোন কাজ হতে থাকে তাহলে আগে সার্ভার
      // ক্লোজ করতে হবে তারপর error টা logger দিয়ে log ফাইল তৈরি করা তারপর process.exit(1) করা ।
      // eslint-disable-next-line no-console
      // console.log(
      //   'Unhandled rejection is detected 💀, we are closing our server...'
      // )
      if (server) {
        server.close(() => {
          console.log(error);
          process.exit(1);
        });
      } else {
        // যদি সার্ভার এ কোন কাজ না হতে থাকে তাহলে সরাসরি অফ করে দিবে ।
        process.exit(1);
      }
    });
  });
}
dbconnect();
process.on('SIGTERM', () => {
  console.log('SIGTERM is received');
  if (server) {
    server.close();
  }
});
