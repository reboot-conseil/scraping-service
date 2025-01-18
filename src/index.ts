require('dotenv').config();

import app from "./app";
import BrowserInfra from "./infra/BrowserInfra";

process.on('beforeExit', () => {
    console.log('beforeExit, closing browser');
    BrowserInfra.getInstance().closeBrowser();
    process.exit(0);
});

process.on('exit', () => {
    console.log('exiting, closing browser');
    BrowserInfra.getInstance().closeBrowser();
});

process.on('SIGINT', () => {
    console.log('SIGINT received, closing browser');
    BrowserInfra.getInstance().closeBrowser();
    process.exit(0);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM received, closing browser');
    BrowserInfra.getInstance().closeBrowser();
    process.exit(0);
});

app.listen(process.env.PORT || 6003, () => {
    console.log(`Server is running on port ${process.env.PORT || 6003}`);
});
