var http = require("http")
var url = require("url")
var mysql = require('mysql');
var fs = require("fs")
const con = require("./connection");


var server = http.createServer(function (request, response) {
    
    var urlObject = url.parse(request.url)
    if (urlObject.pathname == '/Tahmin') 
        fs.createReadStream('Tahmin.html').pipe(response)
        
    
        else if (urlObject.pathname == '/kayit') 
        {
        fs.createReadStream('kayit.html').pipe(response)
        }
         else  (urlObject.pathname == '/login') 
        {
        fs.createReadStream('login.html').pipe(response)
        }
      
})

  
server.listen(3000)
console.log("Server Başlatıldı. Tarayıcı üzerinden http://localhost:3000"
           +" adresinden ulaşabilirsiniz.")
           