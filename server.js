import express from 'express';
import bodyParser from 'body-parser';
import fs from 'fs';
import { search } from './lib/idioms';


const app = express();

const idioms = JSON.parse(
  fs.readFileSync('./lib/idioms.json')
).idioms;

app.set('view engine', 'ejs');
app.set('view options', { layout: false });
app.use('/public', express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.render('index', { pattern: null });
});

app.post('/search', function (req, res) {
  res.render('result', {
    idioms: search(req.body.pattern, idioms).result,
    pattern: req.body.pattern
  });
});

app.listen(process.env.PORT || 3000);

console.log('Listening on port: ' + (process.env.PORT || 3000));
