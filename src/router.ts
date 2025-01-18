import { Router } from "express";

import ApiResponseInfra from "./infra/ApiResponseInfra";
import getWebpagesText, { getWebpageText } from "./getWebpagesText";
import BrowserInfra from "./infra/BrowserInfra";

const router = Router();

router.get('/', (req, res) => {
    res.json(new ApiResponseInfra("scraping service is running", null));
});

router.post('/scrape-multiple', async (req, res) => {
    const { urls } = req.body;

    const webpagesText = await getWebpagesText(urls);
    res.json(new ApiResponseInfra("webpages scraped successfully", webpagesText));
});

router.post('/scrape-single', async (req, res) => {
    const { url } = req.body;

    if(!url) {
       res.status(400).json(new ApiResponseInfra("url is required", null));
       return;
    }

    const context = await BrowserInfra.getInstance().getBrowserContext();

    if(!context) {
        res.status(500).json(new ApiResponseInfra("internal server error", null));
        return;
    }

    const webpageText = await getWebpageText(url, context);
    res.json(new ApiResponseInfra("webpage scraped successfully", webpageText));
});

export default router;
