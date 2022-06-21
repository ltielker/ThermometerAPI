const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => console.log(`ThermometerAPI verfügbar unter http://localhost:${port}!`));

app.get('/', (req, res) => res.send(
    [
        {
            path: '/',
            method: 'GET',
            description: 'Liefert eine Liste aller verfügbaren Routen',
            requiredParameters: {},
            requiredBody: {}
        },
        {
            path: '/temperature',
            method: 'GET',
            description: 'Liefert die aktuelle Temperatur',
            requiredParameters: {},
            requiredBody: {}
        },
        {
            path: '/newThermometer/:id',
            method: 'POST',
            description: 'Erstellt einen neuen Thermometer und gibt die ID zurück',
            requiredParameters: {},
            requiredBody: { name: "string", seriennummer: "number" }
        }
    ]
));

app.get('/temperature', (req, res) => {
    res.send({
        timestamp: new Date().toISOString(),
        temperature: (Math.random() * 100).toFixed(4),
        unit: '°C'
    });
});

app.post('/newThermometer', (req, res) => {
    const name = req.body.name;
    const seriennummer = req.body.seriennummer;
    const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    if (!name) {
        res.status(418).send('Name muss angegeben werden! + name: ' + name);
    }

    if (!seriennummer) {
        res.status(418).send('Seriennummer muss angegeben werden!');
    }

    if (!name && !seriennummer) {
        res.status(418).send('Name und Seriennummer müssen angegeben werden!');
    }

    console.log(req.body);

    res.send({
        timestamp: (new Date(Date.now())).toUTCString(),
        id: id,
        seriennummer: seriennummer,
        name: name,
        temperature: (Math.random() * 100).toFixed(2),
        unit: '°C'
    });
});