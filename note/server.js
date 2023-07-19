require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const logger = require("morgan");
const PORT = 3000;
const _path = path.join(__dirname, "/");

console.log(_path);
app.use("/", express.static(_path));
app.use(logger("tiny"));
const client_id = process.env.naverClientID;
const client_secret = process.env.naverClientSecret;
let sou = "ko";
let tar = "en";
app.get("/", function (req, res) {
    res.sendFile(_path + "/p076_mobilenet_1.html");
});
app.post("/trans", function (req, res) {
    let { transLang } = req.query;
    console.log(req.body);
    // const api_url = "https://openapi.naver.com/v1/papago/n2mt";
    // const request = require("request");
    // const options = {
    //   url: api_url,
    //   form: { source: sou, target: tar, text: transLang },
    //   headers: {
    //     "X-Naver-Client-Id": client_id,
    //     "X-Naver-Client-Secret": client_secret,
    //   },
    // };
    // request.post(options, function (error, response, body) {
    //   if (!error && response.statusCode == 200) {
    //     console.log(response);
    //     res.writeHead(200, { "Content-Type": "text/json;charset=utf-8" });
    //     const trans = JSON.parse(body);
    //     console.log(trans.message.result.translatedText);
    //     res.end(trans.message.result.translatedText);
    //   } else {
    //     res.status(response.statusCode).end();
    //     console.log("error = " + response.statusCode);
    //   }
    // });
});
app.listen(PORT, function () {
    console.log(`http://127.0.0.1 :${PORT}/ app listening on port ${PORT}!`);
});
