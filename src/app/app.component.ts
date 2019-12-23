import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent {
    title = 'key-app';
    submited = false;
    results = {
        totalPressTime: null,
        averagePressTime: null,
        averagebetweenDownTime: null,
        averagebetweenUpTime: null,
        keyCount: null,
        averageSpeed: null,
        errorCount: null

    };
    example = "Они уважают человеческую личность, всегда снисходительны, мягкие, вежливые, уступчивые"
    example1 = "Они не унижают себя с тою целью, чтобы вызвать в другом сочувствие"
    example2 = "Если имеют в себе талант, то уважают его… Они жертвуют для него всем"
    example3 = "Тут нужны беспрерывные дневной и ночной труд, вечное чтение, воля… Тут дорог каждый час"

    currentDownKey = null;
    currentUpKey = null;
    currentEvent = {};
    errorCount = 0;
    timeStart = null;

    testObj = {timeArray: [], keyCount: 0, betweenDownKeys: [], betweenUpKeys: []};

    onKeyDown(value) {
    console.log("TCL: AppComponent -> onKeyDown -> value", value)

        if(!this.timeStart) this.timeStart = new Date().getTime();

        if(!Object.keys(this.currentEvent).some(x => x === value.code)) {
            if(this.currentDownKey) {
                this.testObj.betweenDownKeys.push(value.timeStamp - this.currentDownKey.timeStamp);
            }
            this.currentDownKey = value;
            this.currentEvent[value.code] = value.timeStamp;
        }
    }

    onKeyUp(value) {
        if(value.code === "Backspace" || value.code === "Delete") this.errorCount++;
        if(Object.keys(this.currentEvent).some(x => x === "ShiftLeft") && (value.code === "ArrowLeft" || value.code === "ArrowRight")) this.errorCount++;
        if(Object.keys(this.currentEvent).some(x => x === "ControlLeft") && value.code === "KeyA") this.errorCount++;
        if(Object.keys(this.currentEvent).some(x => x === value.code)) {
            if(this.currentUpKey) {
                this.testObj.betweenUpKeys.push(value.timeStamp - this.currentUpKey.timeStamp);
            }
            this.currentUpKey = value;
            this.testObj.timeArray.push(value.timeStamp - this.currentEvent[value.code]);
            this.testObj.keyCount++;
            delete this.currentEvent[value.code];
        } else {
            delete this.currentEvent[value.code];
        }
    }

    showData() {
        this.submited = true;
        let averageSpeed = this.testObj.keyCount / (new Date().getTime() - this.timeStart) * 1000;

        let totalPressTime = this.testObj.timeArray.reduce((x, y) => x+y)/1000;
        let averagePressTime = totalPressTime/this.testObj.keyCount;

        let betweenDownTime = this.testObj.betweenDownKeys.reduce((x, y) => x+y)/1000;
        let averagebetweenDownTime = betweenDownTime/this.testObj.keyCount;

        let betweenUpTime = this.testObj.betweenUpKeys.reduce((x, y) => x+y)/1000;
        let averagebetweenUpTime = betweenUpTime/this.testObj.keyCount;


        this.results.totalPressTime = totalPressTime;
        this.results.averagePressTime = averagePressTime;
        this.results.averagebetweenDownTime = averagebetweenDownTime;
        this.results.averagebetweenUpTime = averagebetweenUpTime;
        this.results.keyCount = this.testObj.keyCount;
        this.results.averageSpeed = averageSpeed;
        this.results.errorCount = this.errorCount;
        console.log("TCL: AppComponent -> showData -> this.results", this.results)

        console.log('TOTAL PRESS TIME: ', totalPressTime, ' s')

        console.log('AVERAGE PRESS TIME: ', averagePressTime, ' s')
        console.log('BETWEEN DOWN: ', averagebetweenDownTime, ' s')
        console.log('BETWEEN UP: ', averagebetweenUpTime, ' s')

        console.log('KEYS COUNT: ', this.testObj.keyCount, ' keys')

        console.log('SPEED: ', averageSpeed, ' key/s')
    }
}
