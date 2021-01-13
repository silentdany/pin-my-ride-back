const options = {
  info: {
    version: '1.0.0',
    title: 'Pin My Ride Express API documentation',
    description:
      'How to use and test CRUD routes for Users, Rides and Pins datas',
    license: {
      name: 'MIT',
    },
  },
  security: {
    BasicAuth: {
      type: 'http',
      scheme: 'basic',
    },
  },
  filesPattern: './**/*.js', // Glob pattern to find your jsdoc files (it supports arrays too ['./**/*.controller.js', './**/*.route.js'])
  swaggerUIPath: '/api-docs', // SwaggerUI will be render in this url. Default: '/api-docs'
  baseDir: __dirname,
  exposeSwaggerUI: true, // Expose OpenAPI UI. Default true
  exposeApiDocs: false, // Expose Open API JSON Docs documentation in `apiDocsPath` path. Default false.
  apiDocsPath: '/v3/api-docs', // Open API JSON Docs endpoint. Default value '/v3/api-docs'.
};

module.exports = options;
