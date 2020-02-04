const fs = require('fs');

function deleteFolderRecursive(path) {
  if (fs.existsSync(path) && fs.lstatSync(path).isDirectory()) {
    fs.readdirSync(path).forEach((file, index) => {
      const curPath = `${path}/${file}`;

      if (fs.lstatSync(curPath).isDirectory()) { // recurse
        deleteFolderRecursive(curPath);
      } else { // delete file
        fs.unlinkSync(curPath);
      }
    });

    console.log(`Deleting directory "${path}"...`);
    fs.rmdirSync(path);
  }
  console.log(`Recreating directory "${path}"...`);
  fs.mkdirSync(path);
}

console.log('Cleaning working tree...');

deleteFolderRecursive('./cypress/reports');
deleteFolderRecursive('./cypress/videos');
deleteFolderRecursive('./cypress/screenshots');

console.log('Successfully cleaned working tree!');
