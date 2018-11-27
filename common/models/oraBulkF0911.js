'use strict';

const copyData = require('../../server/apiWorld/apiFunctions.js').copyData;
var winston = require('../utils/logger.js').logger;
var moment = require('moment');

module.exports=function(oraBulkF0911) {
        // this is the implementation of the remote method
        oraBulkF0911.moveData = function(targetApi,chunkSize, cb) {
           winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Target API: (${targetApi}) with chunksize ${chunkSize}`);
           copyData('oraBulkF0911', targetApi, chunkSize)
            .then(jsonData => {
                winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Back from copyData function after (${jsonData.length}) iterations in chunks of ${chunkSize}`);
                for (var i = 0; i < jsonData.length; i++) {
                  winston.info(`[${moment().format('YYYY-MM-DD HH:mm:ss.SSSS')}] Iteration ${i} over ${jsonData[i].limitApi} moved ${jsonData[i].recordCount} records.`);                
                }
              })
            cb(null, {"targetApi": targetApi,
                      "chunkSize": chunkSize});
        };
        // this is the definition of the remote method
        oraBulkF0911.remoteMethod('moveData', {
            description: "Moves all data from one api endpoint to another api endpoint",
            accepts: [{arg: "targetAPI", 
                       description: "The name of the API where the data will be moved to",
                       type: "String", 
                       required: true
                      },
                      {arg: "chunkSize",
                       description: "The amount of rows that will be processed in one transaction (max 1000 rows)", 
                       type: "Number", 
                       required: true,
                      }
                    ],
            http: {
                path: "/moveAllData",
                verb: "get"
            },
            returns: { arg: "TotalRows", type: "Number"}
        });
};