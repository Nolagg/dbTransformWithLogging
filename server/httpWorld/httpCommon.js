'use strict';

//
// Axios is a HTTP client, is promise-based and also allows requests to be intercepted.
//
const loopbackBaseURL = require('../config/config').loopbackBaseURL;
const axios = require('axios');
// This myLoopback instance uses the axios http client to access the LoopbackAPI.
// Several APIs could be set up as instances like below and the baseURLs could be retrieved from the config file.
const myLoopback = axios.create({
  baseURL: loopbackBaseURL, // this is the baseURL used to build up an endpoint URL
  // agentOptions: {ciphers: 'DES-CBC3-SHA'},
  headers: {
  //   'ciphers': 'DES-CBC3-SHA',
  //   'User-Agent': 'Chrome/59.0.3071.115',
  //   'content-type': 'application/json;charset=UTF-8',
    'keep-alive': 'false'},
  responseType: 'json',
  // transformResponse: [function (data) {
  //   var jsonData = JSON.parse(data);
    // console.log(data.error.details.03.stack);
    // for (var key in jsonData) {
    //   if (jsonData.hasOwnProperty(key)) {
    //     console.log(key + "1 -> " + jsonData[key]);
    //   }
    // }
    // return JSON.parse(data);
    // }]
});

module.exports = {
  myLoopback: myLoopback};

