const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  swaggerDefinition: {
    info: {
      title: 'AVERIN TEKNOLOGI INFORMATIKA',
      version: '1.0.0',
      description: 'Tes Masuk PT Averin Teknologi Informatika',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./src/routes.js'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;