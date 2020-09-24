//router 요청
const express = require("express")
const router = express.Router();

//router 모듈 내보내기
module.exports = (app) => {
    //내부 라우트 처리
    router.get(["/friends/list", "/friends/"], (req, resp) => {      //배열로 전달시 or
        // resp.status(200)
        //     .send("<h1>Friends List</h1>");

        //freinds 컬랙션 list 받아보기
        let db = app.get("db")
        db.collection("friends")
          .find()
          .toArray()
          .then(result => {
                //console.log(result)
                //EJS 템플릿을 이용하여 렌더링
                resp.render("friends_list",    //탬플릿파일명
                    { friends: result}         //탬플릿에 friends 이름으로 전달
                )
          }).catch (err => {
              resp.status(500) //서버에러
                  .send("Error: 목록을 받아오지 못했습니다.")
          })
    })  


    //작성 폼 페이지
    router.get("/friends/new", (req, resp) => {
        resp.status(200)
            .render("friends_insert_form")
    })

    //전송기능
    //라우터등록
    router.post("/friends/save", (req, resp) => {
        //post전송된 데이터는 req.body에서 확인할 수 있다.
        //console.log("전송된 Body: ", req.body)
        let document = req.body
        let db = app.get("db")

        db.collection("friends").insertOne(document)
            .then(result => {
                console.log(result)
                resp.redirect("/web/friends/list")   //강제 url 점검
            }).catch(err => {
                resp.status(500)
                    .send("ERROR: 친구를 추가하지 못했습니다.")
            })
    })



    return router
}