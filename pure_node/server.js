import { readFileSync } from "node:fs";
import http from "node:http";

const server = http.createServer((req, res) => {
  const { url, method } = req;
  console.log(req);

  switch (url) {
    case "/about":
      switch (method) {
        case "GET":
          const htmlFile = readFileSync("index.html", "utf-8");
          const cssFile = readFileSync('style.css', 'utf-8')
          res.write(htmlFile);
          res.write(`<style>${cssFile}</style>`);
        res.end()
        default:
          res.end("Method Not Allowed");
      }
      case '/style':
       switch(method){
        case 'GET':
          const cssFile = readFileSync('style.css', 'utf-8')
          res.end(cssFile);
         
          
       }
    case "/users":
      switch (method) {
        case "GET":
          const htmlFile = readFileSync("users.json", "utf-8");
          res.end(htmlFile);
      }

    default:
      res.end("Not Found");
  }
});

server.listen(1234, () => {
  console.log("server listen in port 1234");
});
