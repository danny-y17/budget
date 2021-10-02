const database = require('./database')
const getEnvelopeByID = (id) => {
    const filter = database.envelope.filter(envelopes=>envelopes.id == id)[0]
    if (filter) {
        return filter;
    } else {
        return ''
    }
}

const updater = (id,value) => {
    const envelope_type = value.type
    const price_ = value.price
    for(let i=0; i< database.envelope.length; i++) {
        if((database.envelope[i].type == envelope_type)) {
            return false
        }
        else{ continue; }
    }
    if(typeof envelope_type !== "string" || typeof price_ !== "number") {
        return false
    }
    const envelope = getEnvelopeByID(id);
    envelope['type'] = value.type
    envelope['price'] = value.price
    return envelope
}

// check if right format
const validated_data = (req,res,next) => {
     const envelope_id = req.body.id
     const envelope_type = req.body.type;
     const price_ = req.body.price;
     for(let i=0; i< database.envelope.length; i++) {
        if((database.envelope[i].id == envelope_id) || (database.envelope[i].type == envelope_type)) {
            return res.status(409).send("id already exsists");
        }
        else{ continue; }
     }
     if(typeof envelope_id !== "number" || typeof envelope_type !== "string" || typeof price_ !== "number") {
        return res.sendStatus(400);
     }
     else { next();}
}

module.exports = {getEnvelopeByID,updater,validated_data}