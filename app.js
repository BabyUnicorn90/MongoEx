//Express 모듈
const express = require("express");    //미들웨어
const http = require('http');          //실제 http기능 수행

//몽고DB 모듈
const {MongoClient} = require("mongodb")

//body-parser 등록
const bodyParser = require("body-parser")

//express 객체 생성하기
const app = express();

//set메서드: express내부에 여러 값 설정. 주로 세팅값.
app.set('port', 3000);  //port키로 3000사용

//정적 파일의 제공
//Express의 static을 앱의 미들웨엉로 등록하기
app.use(express.static(__dirname + "/public"))   // public디렉터리를 정적파일 저장소로 활용

//body-parser
app.use(bodyParser.urlencoded({ extended: false}))

//뷰엔진 설정
app.set("view engine", "ejs");  //뷰 엔진 설정
app.set("views", __dirname + "/views")  //템플릿 위치 설정


//요청 처리
app.get("/", (req, resp) => {
    console.log("[GET] / : ")
    //http모듈의 전송방식
    /*
    resp.writeHead(200, 
        {"Content-Type": 'text/html;charset-UTF8'})
    resp.write("Express Welcomes You!")    
    resp.end();      //응답전송
    */

    //express의 응답방식 --조금 더 유연!
    resp.status(200)  //상태코드 전송
        .header("Content-Type", "text/html;charset=UTF8")   //헤더 전송
        .send("Express Welcomes You!")
})


//Get 요청 파라미터의 처리: URL Query String 처리
//url?key1=val1&key2=val2
app.get("/query", (req, resp) => {
    console.log("[GET] /query : ", req.query)
    //name 파라미터 수신
    let name = req.query.name;

    if(name === undefined || name.length == 0) {
        //에러출력
        resp.status(404) //= Not Found
            .contentType("text/plain;charset=UTF8")
            .send("이름을 확인할 수 없습니다.")
    } else {
        resp.status(200)
            .contentType("text/plain;charset=UTF8")
            .send("Name: " + name);
    }
})

//URL 파라미터의 처리 (=Face URL, Pretty URL)
//요청 데이터를 query가 아닌 url path의 일부로 전송하는 방식
// /url/param/이름 --이름 뽑아내기
app.get("/urlparam/:name", (req, resp) => {
    console.log(req.params)

    if (req.params.name != undefined) {
    // resp.status(200)
    //     .contentType("text/html;charset=UTF8")
    //     .send("<h1>Name: " + req.params.name + "</h1>")
    //     .send("<p>URL 파라미터로 전달받았습니다.</p>")
    resp.writeHead(200, {"Content-Type":"text/html;charset=UTF8"})
    resp.write("<h1>Name: " + req.params.name + "</h1>")
    resp.write("<p>URL 파라미터로 전달받았습니다.</p>")
    resp.send();
    } else {
        resp.status(404) //= Not Found
            .contentType("text/plain;charset=UTF8")
            .send("<p>URL 파라미터로 전달받을 수 없습니다.</p>")
    }
})

//뷰 엔진을 이용한 템플릿 렌더링
app.get("/render", (req, resp) => {
    resp.status(200)
        .contentType("text/html;chrset=UTF8")
        .render("render")   //render.ejs 템플릿을 렌더링
})

//router 등록 (미들웨어)
const webRouter = require("./router/web")(app);
app.use("/web", webRouter)     //요청이 /web* --> router가 처리하도록 함





function startExpress() {
    //실제 실행은 express가 아니라 http모듈이 실행
    http.createServer(app).listen(app.get("port"), () => {
        console.log("Web Server is running on port",
            app.get("port"));
    });

}
//startExpress();

function startServer () {
    //데이터베이스 연결
    const url = "mongodb://192.168.1.107:27017"

    MongoClient.connect(url, {useUnifiedTopology: true})
        .then(client => {
            const db = client.db("mydb")
            console.log("db", db)
            //express app에 mongodb 커넥션 세팅
            app.set("db", db)

            startExpress()
            }).catch(err => {
                console.error(err);
            })
}
startServer();