const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        console.log(data);
      });
}

async function webCat(path){
  try {
    let response = await axios.get(path);
    console.log(response.data);
  } catch {
    console.error(err);
    process.exit(1);
  }
}

let path = process.argv[2];
if(path.includes('http')) 
  webCat(path);
else
  cat(path);