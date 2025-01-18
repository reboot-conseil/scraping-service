"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const express_1 = require("express");
const ApiResponseInfra_1 = __importDefault(require("./infra/ApiResponseInfra"));
const getWebpagesText_1 = __importStar(require("./getWebpagesText"));
const BrowserInfra_1 = __importDefault(require("./infra/BrowserInfra"));
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.json(new ApiResponseInfra_1.default("scraping service is running", null));
});
router.post('/scrape-multiple', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { urls } = req.body;
    const webpagesText = yield (0, getWebpagesText_1.default)(urls);
    res.json(new ApiResponseInfra_1.default("webpages scraped successfully", webpagesText));
}));
router.post('/scrape-single', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { url } = req.body;
    if (!url) {
        res.status(400).json(new ApiResponseInfra_1.default("url is required", null));
        return;
    }
    const context = yield BrowserInfra_1.default.getInstance().getBrowserContext();
    if (!context) {
        res.status(500).json(new ApiResponseInfra_1.default("internal server error", null));
        return;
    }
    const webpageText = yield (0, getWebpagesText_1.getWebpageText)(url, context);
    res.json(new ApiResponseInfra_1.default("webpage scraped successfully", webpageText));
}));
exports.default = router;
