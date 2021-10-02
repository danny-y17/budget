const express = require('express'); //requirement for express
const app = express();  //call express
const database = require('./database');
const {getEnvelopeByID,updater,validated_data} = require('./helper')
//const bodyParser = require('body-parser');  **depreciated**
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

// Retrieve envelope information or return 404
app.param('id', (req, res, next, id) => {
    id = Number(id)
    if (typeof id !== 'number') {
        res.status(404).send();
    } 
    else {
        const envelope_id = getEnvelopeByID(id);
        if (envelope_id == '') {
            res.status(404).send();
        } 
        else { next(); }
    }
});

// default home page
app.get('',(req,res,next) => {
    res.json({'message':'Home Page'})
});
// retreive all envelopes
app.get('/users',(req,res,next) => {
    res.send(database.envelope.slice(0));
});
// get envelope by ID
app.get('/users/:id', (req, res, next) => {
        const envelope = getEnvelopeByID(req.params.id)
        res.send(envelope);
});

// create envelope
app.post('/add-users',validated_data, (req,res) => {
    //console.log(req.body)
    database.envelope.push(req.body)
    res.status(201).send(req.body)
});

// update envelope
app.put('/users/:id', (req, res, next) => {
    const update_env = updater(req.params.id, req.body)
    if(update_env) {
        res.status(201).send(update_env);
    }
    else {
        res.status(400).send();
    }
});

// delete envelope
app.delete('/users/:id', (req,res,next) => {
    const envelope = getEnvelopeByID(req.params.id)
    const find = database.envelope.indexOf(envelope)
    if(index !== -1) {
        database.envelope.splice(find,1)
        res.status(204).send('ID deleted successfully')
    }
    else {
        res.status(404).send('404 ERROR')
    }
});

app.listen(port);









