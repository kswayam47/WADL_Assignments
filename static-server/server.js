
const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

const mimeType = {
  '.ico': 'image/x-icon',
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.wav': 'audio/wav',
  '.mp3': 'audio/mpeg',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt'
};


http.createServer((req, res) => {

  
  const parsedUrl = url.parse(req.url);

  if (parsedUrl.pathname === "/") {

    let filesLink = "<ul>";
    res.setHeader('Content-Type', 'text/html');

    
    const filesList = fs.readdirSync("./");

    filesList.forEach(file => {
      if (fs.statSync("./" + file).isFile()) {
        filesLink += `<li><a href="./${file}">${file}</a></li>`;
      }
    });

    filesLink += "</ul>";

    res.end("<h1>List of Files:</h1>" + filesLink);
  }
  else {

    
    const sanitizePath = path.normalize(parsedUrl.pathname)
                              .replace(/^(\.\.[\/\\])+/, '');

    const pathname = path.join(__dirname, sanitizePath);

  
    if (!fs.existsSync(pathname)) {
      res.statusCode = 404;
      res.end("File not found!");
    }
    else {

      
      fs.readFile(pathname, (err, data) => {
        if (err) {
          res.statusCode = 500;
          res.end("Error reading file.");
        }
        else {
          const ext = path.parse(pathname).ext;
          res.setHeader('Content-Type', mimeType[ext] || 'text/plain');
          res.end(data);
        }
      });

    }
  }

}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});