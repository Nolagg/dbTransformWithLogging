'use strict';

var winston = require('../../common/utils/logger.js').logger;

const myLoopback = require('../httpWorld/httpCommon').myLoopback;
const loopbackBaseURL = require('../config/config').loopbackBaseURL;
const throttledQueue = require('throttled-queue');

var moment = require('moment');

let throttle = throttledQueue(5, 1000, true); // 5 times per second - the true parameter means space out

// This is a generic GET using an Axios HTTP instance defined in httpCommpon
// All 'GETS' can be routed through getLoopback
let getLoopback = (resourceURL) => {
  return new Promise((resolve, reject) => {
    myLoopback.get(resourceURL)
            .then(response => { 
              console.log(resourceURL);
              if (resourceURL.indexOf('count') > -1 ) {
                winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Got: ${response.data.count} count from ${resourceURL}.`);
              }
              else {
                winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Got: ${response.data.length} records from ${resourceURL}.`);
              }
              resolve(response.data);
            })
            .catch((error) => {
              winston.error(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Error picked up from ${resourceURL} GET: ${error}`);
              // reject(error);
            });
  });
};

// This is a generic POST using an Axios HTTP instance defined in httpCommpon
// All 'POSTS' can be routed through postLoopback
let postLoopback = (resourceURL, bodyData) => {
  return new Promise((resolve, reject) => {
    myLoopback.post(resourceURL, bodyData)
              .then(response => {
                //winston.info(`Got response (${response.data}) from post to ${resourceURL}`);
                winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Posted: ${response.data.length} records to ${resourceURL}`);                
                resolve(response.data);
              })
              .catch((error) => {
                // console.log('Error picked up on Post' + error);
                winston.error(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Error generated posting records to ${resourceURL}: (${error})`);
                // reject(error);
              });
  });
};

// Get the count of all records first then post the data to the target API
let copyData = (srcApiURL, trgApiURL, chunkSize) => {
  return new Promise((resolve, reject) => {
    getLoopback(srcApiURL + '/count')
            .then(countData => {
              processAll(srcApiURL, countData.count, chunkSize, trgApiURL)
                .then(arrayOfCalls => {
                  resolve(arrayOfCalls);
                }) // end of then from getAndPost
            }); //end of then from getLoopback
  });
};

let processAll = (srcApiURL, rowCount, chunkSize, trgApiURL ) => {
  var apiObjs = [];
  var currentPos = 0;
  var getURL = '';
  var postCount = 0;  
  return new Promise((resolve, reject) => {
    winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Source api: ${srcApiURL}, count ${rowCount}.`);
    for (var i = 0; i < rowCount / chunkSize; i++) {
      throttle(function(){
        getURL = srcApiURL + '?filter[limit]=' + chunkSize + '&filter[skip]=' + currentPos;
        winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Using API ${getURL} to grab next chunk.`);
        getAndPost(getURL, trgApiURL)
           .then(apiObj => {
               postCount += parseFloat(apiObj.recordCount);
               apiObjs.push(apiObj); 
               // Check for last getAndPost and chorus
               if (postCount >= rowCount) {
                 resolve(apiObjs);
               };                 
           });
        currentPos = currentPos + parseFloat(chunkSize);
      }); // end of throttle
    } // end of for loop
  });
};

let getAndPost = (srcApiURL, trgApiURL ) => {
  var apiObj = {};
  return new Promise((resolve, reject) => {
        getLoopback(srcApiURL)
          .then((getData) => {
            postLoopback(trgApiURL, getData)
              .then((postData) => {
                apiObj = {limitApi: srcApiURL, trgApi: trgApiURL, recordCount: postData.length};
                resolve(apiObj);               
              })
              .catch((error) => {
                winston.error(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Error (${error}) copying records to ${resourceURL}`);
              }); // end of .then/catch on postLoopback
            }); // end of then from getLoopback
  });  // end of promise definition
};

// Get the count of all records first then post the data to the target API
let copyDataOrig = (srcApiURL, trgApiURL, chunkSize) => {
  return new Promise((resolve, reject) => {
    var apiObj = {};
    var apiObjs = [];
    var currentPos = 0;
    var postCount = 0;
    getLoopback(srcApiURL + '/count')
            .then(countData => {
              winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Source api: ${srcApiURL}, count ${countData.count}.`);
              for (var i = 0; i < countData.count / chunkSize; i++) {
                throttle(function(){
                  getLoopback(srcApiURL + '?filter[limit]=' + chunkSize + '&filter[skip]=' + currentPos)
                     .then(getData => {
                         postLoopback(trgApiURL, getData)
                           .then(postData => {
                             console.log(`Posted ${postData.length} records to ${trgApiURL}`);
                             postCount += parseFloat(postData.length);
                             apiObj = {'api': srcApiURL, 'count': postData.length};
                             apiObjs.push(apiObj);
                            //  currentPos = currentPos + parseFloat(chunkSize);
                           })
                           .catch((error) => {
                            //  console.log('Error picked up copying' + error);
                             winston.error(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Error (${error}) copying records to ${resourceURL}`);
                        });
                     });
                 currentPos = currentPos + parseFloat(chunkSize);
                });
                // currentPos = currentPos + parseFloat(chunkSize);
                //if (postCount >= countData.count) {
                  
                //}
              } // end of for loop
              resolve(apiObjs);
            });
  });
};


module.exports = {
  copyData: copyData};
