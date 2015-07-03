// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');
var CronJob = require('cron').CronJob;
new CronJob('*/10 * * * * *', function () {
  console.log('I am Cron. I run!');
  archive.readListOfUrls(archive.downloadUrls);
});

// var crontab = require('node-crontab');



// //Every (interval) seconds:
// exports.checkQueue = crontab.scheduleJob('*/10 * * * * *', function() {
//   console.log('checking queue ...');
// });
  //check to see if there are any urls waiting in the queue array
    //if so, downloadUrls for the first (oldest) element in the array
        //send get request to foreign server
        //call downloadUrls on first element
          //^^^ handles reading / writing files
        //shift url array (dequeue)

