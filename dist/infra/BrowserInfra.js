"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
class BrowserInfra {
    constructor() {
        this.browser = null;
        this.context = null;
    }
    closeBrowser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.browser) {
                yield this.browser.close();
                this.browser = null;
                this.context = null;
            }
        });
    }
    getBrowserContext() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.browser) {
                this.browser = yield test_1.chromium.launch({
                    headless: true
                });
                this.context = yield this.browser.newContext();
            }
            return this.context;
        });
    }
    static getInstance() {
        if (!BrowserInfra.instance) {
            BrowserInfra.instance = new BrowserInfra();
        }
        return BrowserInfra.instance;
    }
}
exports.default = BrowserInfra;
