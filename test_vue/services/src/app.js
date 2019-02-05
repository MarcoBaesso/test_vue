import express from 'express'

const app = express()
const parse = require('csv-parse')
const stringify = require('csv-stringify')
const fs = require('fs')
const cors = require('cors')

const cols = ["num", "quintet", "jersey", "player", "pos", "ht", "wt", "birthdate", "nat", "exp", "college"]
const delimeter = ","

const stringifyOptions = {
    delimiter: delimeter,
    columns: cols.map(col => { return {key: col, header: col}}),
    trim: true,
}

const output = [];

const parser = parse({
    delimiter: delimeter,
    cast: true,
    cast_date: true,
    columns: cols,
    trim: true,
    quote: true,
    relax_column_count: true
})

const manageError = (err) => res.status(500).send(err)
const sendSuccess = (res, body) => res.status(200).send(
    {
        success: 'true',
        message: 'success',
        content: body
    });

const stringifyCallback = (err, out, res) => {
    if (err) res.status(500).send(err)
    fs.writeFileSync('./lakers.csv', out, manageError)
    sendSuccess(output.filter(isQuintet))
}

const isTrue = (s) => String(s) === 'true' 
const isFalse = (s) => String(s) === 'false' 
const invert = function (s) { return isFalse(s) ? 'true' : 'false' }

const isQuintet = (player) =>  isTrue(player.quintet)
const isBenchwarmer = (player) =>  isFalse(player.quintet)

const findPlayer = (player, num, quintet) => {
    let _quintet = quintet ? isQuintet(player) : isBenchwarmer(player);
    return Number(player.num) === Number(num) && _quintet;
}

const swapPlayers = (req, res) => {
    let p1 = output.find(p => findPlayer(p, req.query.pull, true));
    let p2 = output.find(p => findPlayer(p, req.query.push, false));
    if (Boolean(p1) && Boolean(p2)) {
        p1.quintet = invert(p1.quintet);
        p2.quintet = invert(p2.quintet);
        stringify(output, stringifyOptions, (err, out) => stringifyCallback(err, out, res));
    } else {
        res.status(404).send();
    }
}

parser.on('readable', function () {
    let record
    while (record = parser.read()) {
        output.push(record)
    }
});

parser.on('error', (err) => {throw err });

app.use(cors());

app.get('/api/roster', (req, res) => sendSuccess(res, req.query.bench ? output.filter(p => isTrue(req.query.bench) ? isBenchwarmer(p) : isQuintet(p)) : output))
app.get('/api/player/:num', (req, res) => sendSuccess(res, output.find(player => Number(player.num) === Number(req.params.num))))
app.put('/api/player/quintet', swapPlayers)

const PORT = 5000;

fs.createReadStream('./lakers.csv').pipe(parser);
app.listen(PORT, () => { console.log('server running on port ' + PORT) });
