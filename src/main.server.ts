const fs = require('fs');
const path = require('path');
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModule } from './app/server-app.module';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { ROUTES } from './routes';
import { App } from './api/app';
import { enableProdMode } from '@angular/core';
import colors from 'colors';
enableProdMode();
const app = express();
const api = new App();
const port = 8000;
const baseUrl = `http://localhost:${port}`;
import glob from 'glob';

app.engine('html', ngExpressEngine({
  bootstrap: ServerAppModule
}));

app.set('view engine', 'html');
app.set('views', 'src');

app.use('/', express.static('dist', {index: false}));
app.use('/static', express.static('dist/static', {index: false}));

ROUTES.forEach(route => {
  app.get(route, (req, res) => {
    console.log('-------------', req.originalUrl)
    console.time(`GET: ${req.originalUrl}`);
    if (/.html$/.test(req.originalUrl)) {
      app.render('../dist/index', {
        req: req,
        res: res
      }, function(err, html) {
        console.log(colors.green(html));

        fs.writeFileSync(path.join(
          '/Users/chchen/MY-PROJECT/nobbb/build',
          req.originalUrl
        ), html)
      });
    }
    res.render('../dist/index', {
      req: req,
      res: res
    });
    console.timeEnd(`GET: ${req.originalUrl}`);
  });
});


app.get('/data', (req, res) => {
  console.time(`GET: ${req.originalUrl}`);
  res.json(api.getData());
  console.timeEnd(`GET: ${req.originalUrl}`);
});

app.listen(8000,() => {
  console.log(`Listening at ${baseUrl}`);
  const buildedPath = '/Users/chchen/MY-PROJECT/nobbb/build';
  glob('/Users/chchen/MY-PROJECT/nobbb/build/**/*.html', function (err, files) {
    files.forEach(file => {
      const url = file.split(buildedPath)[1];
      app.render('../dist/index', {
        req: {originalUrl: url},
        res: {}
      }, function(err, html) {
        fs.writeFileSync(path.join(
          buildedPath,
          url
        ), html)
      });
    });
  })

});
