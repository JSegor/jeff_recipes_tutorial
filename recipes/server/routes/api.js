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

// Set up Elasticsearch database/query platform
const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  node: `https://${process.env.SERVER_IP}:${process.env.ES_PORT}`,
  auth: {
    username: process.env.ES_USER_ID,
    password: process.env.ES_USER_KEY
    // password: "jeff"
  },
  tls: {
    ca: fs.readFileSync('server/http_ca.crt'),
    rejectUnauthorized: true
  }
})


// Get an individual recipe based on identifier
router.get('/:id', (req, res) => {

  console.log("======== PARAMS ============");
  console.log(req.params.id);

  setCORSHeader(res);

  async function run() {

    var qryObj = {
      match: {
        "identifier": req.params.id
      }
    };



    var result = await client.search({
      index: 'recipe',
      _source: true,
      query: qryObj
    })
    console.log(result.hits.hits[0]._source);
    res.status(200).send(result.hits.hits[0]._source);
  }

  run().catch(

    function (error) {

      console.log("-------ERROR-----------");
      console.log(JSON.stringify(error));
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

// Get all recipes
router.get('/recipes/all-recipes', (req, res) => {
  setCORSHeader(res);

  async function run() {

    var qryObj = {
      from: 0, size: 100,
      query: {
        match_all: {}
      }
    };


    var result = await client.search({
      index: 'recipe',
      _source: true,
      body: qryObj
    })
    console.log("Getting all Recipes");
    console.log("total number of hits: " + result.hits.hits.length);
    var returned = [];
    for (var i = 0; i < result.hits.hits.length; i++) {
      returned.push(result.hits.hits[i]._source);
    }
    res.status(200).send(returned);
  }

  run().catch(

    function (error) {

      console.log("-------ERROR-----------");
      console.log(JSON.stringify(error));
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


// Get all items in stock (inventory)
router.get('/inventory/:category', (req, res) => {
  setCORSHeader(res);

  async function run() {


    var qryObj = {
      from: 0, size: 100,
      query: {
        match: { category: req.params.category }
      }
    };




    var result = await client.search({
      index: 'inventory',
      _source: true,
      body: qryObj
    })
    console.log("Getting all Recipes");
    console.log("total number of hits: " + result.hits.hits.length);
    var returned = [];
    for (var i = 0; i < result.hits.hits.length; i++) {
      returned.push(result.hits.hits[i]._source);
    }
    res.status(200).send(returned);
  }

  run().catch(

    function (error) {

      console.log("-------ERROR-----------");
      console.log(JSON.stringify(error));
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