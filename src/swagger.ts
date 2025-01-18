import { SwaggerOptions } from 'swagger-ui-express';

const swaggerDocument: SwaggerOptions = {
  openapi: '3.0.0',
  info: {
    title: 'Scraping Service API',
    version: '1.0.0',
    description: 'An HTTP-based scraping service using Playwright'
  },
  components: {
    securitySchemes: {
      ApiKeyAuth: {
        type: 'apiKey',
        in: 'header',
        name: 'x-scraping-service-key'
      }
    }
  },
  security: [
    {
      ApiKeyAuth: []
    }
  ],
  servers: [
    {
      url: 'http://localhost:6003',
      description: 'Local development server'
    }
  ],
  paths: {
    '/api': {
      get: {
        summary: 'Health check endpoint',
        responses: {
          '200': {
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/scrape-single': {
      post: {
        summary: 'scrape text content from a single webpage',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  url: {
                    type: 'string',
                    description: 'URL of the webpage to scrape'
                  }
                },
                required: ['url']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'webpage scraped successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    },
                    data: {
                      type: 'string',
                      description: 'scraped text content from the webpage'
                    }
                  }
                }
              }
            }
          },
          '400': {
            description: 'URL is required',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Invalid or missing API key',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    '/api/scrape-multiple': {
      post: {
        summary: 'scrape text content from multiple webpages',
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  urls: {
                    type: 'array',
                    items: {
                      type: 'string'
                    },
                    description: 'array of URLs to scrape'
                  }
                },
                required: ['urls']
              }
            }
          }
        },
        responses: {
          '200': {
            description: 'webpages scraped successfully',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    },
                    data: {
                      type: 'array',
                      items: {
                        type: 'string',
                        description: 'scraped text content from each webpage'
                      },
                      description: 'array of scraped text content, one string per URL, in the same order as the input'
                    }
                  }
                }
              }
            }
          },
          '401': {
            description: 'Unauthorized - Invalid or missing API key',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    msg: {
                      type: 'string'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
};

export default swaggerDocument;
