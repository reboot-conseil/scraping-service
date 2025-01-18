import { NextFunction, Request, Response } from "express";
import ApiResponseInfra from "./infra/ApiResponseInfra";

const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const apiKey = req.headers['x-scraping-service-key'];
    if (apiKey !== process.env.SCRAPING_SERVICE_KEY) {
        res.status(401).json(new ApiResponseInfra("unauthorized", null));
        return;
    }
    next();
};

export default apiKeyMiddleware;