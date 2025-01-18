import cors from 'cors';
import express from 'express';
import swaggerUi from 'swagger-ui-express';

import router from './router';
import swaggerDocument from './swagger';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api', router);

// Swagger documentation
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export default app;