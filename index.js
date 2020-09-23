const express = require('express')
const app = express()
const port = 420;
const fs = require('fs');

app.use(express.json());

app.get('/info', (req, res) => {
    fs.readFile('./data.json', (err, data) => {
        if(err) return res.send({ error: true, msg: err });
        return res.send({ error: false, msg: JSON.parse(data.toString())});
    });
})

app.post('/info', (req, res) => {
    try {
        if(!req.body)
            return res.send({ error: true, msg: "No Data" });
        
        const j = JSON.stringify(req.body, null, 2)
        console.log(j);
        fs.writeFile('./data.json', j, (err, data) => {
            if(err) return res.send({ error: true, msg: err });
            return res.send({ error: false, msg: "Success" });
        });
    } catch(e) {
        console.log(e);
        return res.send({ error: true, msg: "Wrong format" });
    }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})