const fs = require('fs');
const process = require('process');
const axios = require('axios');

function cat(path, output){
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
          console.error(err);
          process.exit(1);
        }
        handleOutput(data, output);
      });
}

async function webCat(path, output){
  try {
    let response = await axios.get(path);
    handleOutput(response.data, output);
  } catch {
    console.error(err);
    process.exit(1);
  }
}

function handleOutput(text, output){
  if(output){
    fs.writeFile(output, text, 'utf8', (err) => {if(err){
      console.error(err);
      process.exit(1);
    }});
  } else { 
    console.log(text);
  }
}

let path;
let output;
if(process.argv[2] == "--out"){
  output = process.argv[3];
  path = process.argv[4];
} else {
  path = process.argv[2];
}
if(path.includes('http')) 
  webCat(path, output);
else
  cat(path,output);