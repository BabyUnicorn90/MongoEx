//비동기 처리방식
//general_example

const util = require("util");
const { EventEmitter } = require("events");  //--프로토타입에 밀어넣어줘야함: util의 도움받기

let ticker_target = null;
let ticker = null;

//이벤트 수신기(on), 전송기(emit) 사용위해 EventEmitter을 상속
const Ticker = function(target) {    //객체 생성자 격이다! 
    ticker_target = target

    //이벤트 수신기
    this.on("stop", () => {
        clearInterval(ticker);
    })
}

//프로토타입 영역에 공용 메서드 작성
Ticker.prototype.start = () => {
    //setInterval(함수, ms);  --ms마다 함수 실행
        // -> clearInterval(타이머); :타이머리셋
    //setTimeouot(정수, ms);  --ms이후에 함수 실행
    ticker = setInterval(() => {
        //1초마다 ticker_target으로 tick메시지 전송
        ticker_target.emit("tick");
    }, 1000);
}

//Node의 util패키지로 EventEmitter의 prototype 상속받기
util.inherits(Ticker, EventEmitter);

//Ticker 모듈 내보내기
module.exports = Ticker;