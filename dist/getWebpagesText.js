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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWebpageText = void 0;
const BrowserInfra_1 = __importDefault(require("./infra/BrowserInfra"));
const getWebpageText = (url, context) => __awaiter(void 0, void 0, void 0, function* () {
    const page = yield context.newPage();
    let text = '';
    try {
        yield page.goto(url);
        text = (yield page.locator('body').textContent()) || '';
    }
    catch (error) {
        console.error(`Error fetching webpage text for ${url}:`, error);
    }
    finally {
        yield page.close();
    }
    return text;
});
exports.getWebpageText = getWebpageText;
const getWebpagesText = (urls) => __awaiter(void 0, void 0, void 0, function* () {
    const webpagesText = [];
    const browserInfra = BrowserInfra_1.default.getInstance();
    const context = yield browserInfra.getBrowserContext();
    if (!context) {
        throw new Error('failed to initialize browser context');
    }
    try {
        const scrapingPromises = urls.map((url) => __awaiter(void 0, void 0, void 0, function* () {
            const text = yield (0, exports.getWebpageText)(url, context);
            webpagesText.push(text);
        }));
        // wait for all promises to resolve
        yield Promise.all(scrapingPromises);
    }
    catch (error) {
        console.error('error fetching webpage text:', error);
    }
    return webpagesText;
});
exports.default = getWebpagesText;
