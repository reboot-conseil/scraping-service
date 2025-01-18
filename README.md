# scraping service

## pre requisites

- having Docker installed
- [having installed Playwright](http://playwright.dev/docs/intro#installing-playwright)

## Docker local setup

```bash
docker build -t scraping-service .
docker run -p 6003:6003 scraping-service
```

## CI/CD

- we deploy the service to Google Cloud Run via Github Actions
