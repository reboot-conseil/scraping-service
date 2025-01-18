"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const BrowserInfra_1 = __importDefault(require("./infra/BrowserInfra"));
process.on('beforeExit', () => {
    console.log('beforeExit, closing browser');
    BrowserInfra_1.default.getInstance().closeBrowser();
    process.exit(0);
});
process.on('exit', () => {
    console.log('exiting, closing browser');
    BrowserInfra_1.default.getInstance().closeBrowser();
});
process.on('SIGINT', () => {
    console.log('SIGINT received, closing browser');
    BrowserInfra_1.default.getInstance().closeBrowser();
    process.exit(0);
});
process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing browser');
    BrowserInfra_1.default.getInstance().closeBrowser();
    process.exit(0);
});
app_1.default.listen(process.env.PORT || 6003, () => {
    console.log(`Server is running on port ${process.env.PORT || 6003}`);
});
