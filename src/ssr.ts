const fs = require('fs');
const path = require('path');
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import 'rxjs/Rx';
import * as express from 'express';
import { platformServer, renderModuleFactory } from '@angular/platform-server';
import { ServerAppModuleNgFactory } from './ngfactory/app/server-app.module.ngfactory';
import { ngExpressEngine } from '@nguniversal/express-engine';

import { enableProdMode } from '@angular/core';
import colors from 'colors';
enableProdMode();
const app = express();
import glob from 'glob';

app.engine(
  'html',
  ngExpressEngine({
    bootstrap: ServerAppModuleNgFactory
  })
);

app.set('view engine', 'html');

const buildedPath = '/Users/chchen/MY-PROJECT/nobbb/build';
glob('/Users/chchen/MY-PROJECT/nobbb/build/**/*.html', function(err, files) {
  files.forEach(file => {
    const url = file.split(buildedPath)[1];

    app.render(
      '../dist/index',
      {
        req: { originalUrl: url },
        res: {}
      },
      function(err, html) {
        fs.writeFileSync(path.join(buildedPath, url), html);
      }
    );
  });
});
