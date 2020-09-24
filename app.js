//Express 모듈
const express = require("express");    //미들웨어
const http = require('http');          //실제 http기능 수행



//express 객체 생성하기
const app = express();

//set메서드: express내부에 여러 값 설정. 주로 세팅값.
app.set('port', 3000);  //port키로 3000사용

function startExpress() {
    //실제 실행은 express가 아니라 http모듈이 실행
    http.createServer(app).listen(app.get("port"), () => {
        console.log("Web Server is running on port",
            app.get("port"));
    });

}
startExpress();