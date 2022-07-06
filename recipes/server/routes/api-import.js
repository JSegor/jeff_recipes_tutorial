'use strict'

const express = require('express');
const fs = require('fs');
const router = express.Router();

// These two statements allow parsing of body correctly when
// getting a POST request (otherwise req.body may equal undefined)
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

function setCORSHeader(res) {
    res.setHeader('Content-Type', 'application/json');
    // res.setHeader('Access-Control-Allow-Origin', 'http://192.168.1.203:98);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');


};

var recipeIDs = [];
recipeIDs.push('baby-carrots.json');
recipeIDs.push('beef-stroganoff.json');
recipeIDs.push('creamy-beef-pasta.json');
recipeIDs.push('crispy-chicken.json');
recipeIDs.push('egg-bites.json');
recipeIDs.push('frozen-beef-burgers.json');
recipeIDs.push('oatmeal.json');
recipeIDs.push('pot-roast.json');
recipeIDs.push('sloppy-joe.json');


const { Client } = require('@elastic/elasticsearch')
const client = new Client({
    node: `https://${process.env.SERVER_IP}:${process.env.ES_PORT}`,
    auth: {
        username: process.env.ES_USER_ID,
        password: process.env.ES_USER_KEY

    },
    tls: {
        ca: fs.readFileSync('server/http_ca.crt'),
        rejectUnauthorized: true
    }
})


router.post('/factory', (req, res) => {


    async function run() {

        for (var i = 0; i < recipeIDs.length; i++) {
            var data = fs.readFileSync('./data/' + recipeIDs[i]);
            var recipe = JSON.parse(data);
            var result = await client.index({
                index: 'recipe',
                body: recipe
            })
        }


        // here we are forcing an index refresh, otherwise we will not
        // get any result in the consequent search
        await client.indices.refresh({ index: 'recipe' })

        // Let's search!
        result = await client.search({
            index: 'recipe',
            query: {
                "match_all": {}
            }
        })

        console.log(result.hits.hits)
        res.status(201).send(result.hits.hits);
    }

    run().catch(

        function (error) {
            console.log("-------ERROR-----------");
            console.log(JSON.stringify(error));
            if (error.meta === undefined){
                res.status(500).send(error + "(Programming Error)");
                return;
            }
            if (error.meta.body !== undefined) {
                console.log(error.meta.body.error.reason);
                console.log(error.meta.body.status);
                console.log(error.meta);
                res.status(error.meta.body.status).send(error.meta.body.error.reason);
            } else {
                res.status(500).send(error.name + "(Database on server may be down or application certification is not valid)");
            }
        }

    )
});

router.post('/inventory', (req, res) => {


    async function run() {


        var data = fs.readFileSync('./data/inventory.json');
        var inventory = JSON.parse(data);
        var result = await client.bulk({
            index: 'inventory',
            body: inventory
        })


        console.log("import complete");
        // We must return JSON response to avoid parsing errors
        res.status(201).send({"msg":"import complete"});
    }

    run().catch(

        function (error) {
            console.log("-------ERROR-----------");
            console.log(JSON.stringify(error));
            if (error.meta === undefined){
                res.status(500).send(error + "(Programming Error)");
                return;
            }
            if (error.meta.body !== undefined) {
                console.log(error.meta.body.error.reason);
                console.log(error.meta.body.status);
                console.log(error.meta);
                res.status(error.meta.body.status).send(error.meta.body.error.reason);
            } else {
                res.status(500).send(error.name + "(Database on server may be down or application certification is not valid)");
            }
        }

    )
});


module.exports = router;