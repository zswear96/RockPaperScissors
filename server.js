const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const figlet = require("figlet");

const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == "/") {
    fs.readFile("index.html", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/winpage.html') {
    fs.readFile('winpage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
  else if (page == '/losepage.html') {
    fs.readFile('losepage.html', function(err, data) {
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  } else if (page == "/api") {
    if ("userChoice" in params) {
      if (params["userChoice"] == "rock" || "paper" || "scissors") {
        res.writeHead(200, { "Content-Type": "application/json" });

        let userChoice = params["userChoice"];
        let botChoice;
        let winner;

        let num = Math.ceil(Math.random() * 3); //Random number calculation to set the botChoice

        num <= 1
          ? (botChoice = "rock")
          : num <= 2
          ? (botChoice = "paper")
          : (botChoice = "scissors"); //Assigns the bot's choice based on the random number calculation above

        userChoice == botChoice
          ? (winner = "NOBODY")
          : (userChoice == "rock" && botChoice == "paper") ||
            (userChoice == "paper" && botChoice == "scissors") ||
            (userChoice == "scissors" && botChoice == "rock")
          ? (winner = botChoice)
          : (winner = userChoice);
        //This will produce the winner and assign winner the value of either usersChoice, botsChoice, or 'NOBODY'

        let returnObj = {
          //This object will be JSON stringified and then sent to the main.js for intepretation
          winner: winner,
          userChoice: userChoice,
          botChoice: botChoice,
        };
        res.end(JSON.stringify(returnObj)); //Object stringified and sent as JSON back to main.js
      } else if (params["userChoice"] != "rock" || "paper" || "scissors") {
        res.writeHead(200, { "Content-Type": "application/json" });
        const objToJson = {
          botChoice: "unknown", //ah ok
        };
        res.end(JSON.stringify(objToJson));
      } //student != leon
    } //student if
  } //else if
  else if (page == "/css/style.css") {
    fs.readFile("css/style.css", function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == "/js/main.js") {
    fs.readFile("js/main.js", function (err, data) {
      res.writeHead(200, { "Content-Type": "text/javascript" });
      res.write(data);
      res.end();
    });
  } else {
    figlet("404!!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);
