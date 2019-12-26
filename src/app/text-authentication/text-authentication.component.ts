import { Component, OnInit } from '@angular/core';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-text-authentication',
  templateUrl: './text-authentication.component.html',
  styleUrls: ['./text-authentication.component.css']
})
export class TextAuthenticationComponent implements OnInit {
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
    textTyped: string;
    exampleTyped = "";
    exampleUntyped = "";
    example = "Эй, цирюльникъ, ёжик выстриги, да щетину ряхи сбрей, феном вошь за печь гони! Шалящий фавн прикинул объём горячих звезд этих вьюжных царств. Пиши: зять съел яйцо, ещё чан брюквы... эх! Ждем фигу! Флегматичная эта верблюдица жует у подъезда засыхающий горький шиповник. Эх, взъярюсь, толкну флегматика: «Дал бы щец жарчайших, Пётр!» Вступив в бой с шипящими змеями — эфой и гадюкой, — маленький, цепкий, храбрый ёж съел их. Однажды съев фейхоа, я, как зацикленный, ностальгирую всё чаще и больше по этому чуду. Расчешись! Объявляю: туфли у камина, где этот хищный ёж цаплю задел. Шифровальщица попросту забыла ряд ключевых множителей и тэгов Южно-эфиопский грач увел мышь за хобот на съезд ящериц Широкая электрификация южных губерний даст мощный толчок подъёму сельского хозяйства. Здесь фабула объять не может всех эмоций — шепелявый скороход в юбке тащит горячий мёд. Художник-эксперт с компьютером всего лишь яйца в объёмный низкий ящик чохом фасовал."

    currentDownKey = null;
    currentUpKey = null;
    currentEvent = {};
    errorCount = 0;
    timeStart = null;

    testObj = { timeArray: [], keyCount: 0, betweenDownKeys: [], betweenUpKeys: [] };

    newArray = [];
    globalObject = {};
    averageGlobalObject = {};

    constructor() { }

    ngOnInit() {
        this.exampleUntyped = this.example;
    }

    onTexChange() {
        let typedCount = this.textTyped ? this.textTyped.length : 0;
        this.exampleTyped = this.example.slice(0, typedCount);
        this.exampleUntyped = this.example.slice(typedCount);
    }

    downloadFile(data: any, name: string) {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        let csv = data.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');

        var blob = new Blob([csvArray], {type: 'text/csv' })
        saveAs(blob, `${name}.csv`);
    }

    onKeyDown(value) {
        let obj = {down: value}

        this.newArray.push(obj);

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

        this.newArray.forEach((el) => {
            if(el.down.code === value.code && !el.up) {
                el.up = value;
            }
        });

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
        this.newArray.forEach((el, index) => {
            if(this.newArray.length-1 > index && this.newArray[index].up && this.newArray[index+1].up) {
                let H = this.newArray[index].up.timeStamp - this.newArray[index].down.timeStamp;
                let UD = this.newArray[index+1].down.timeStamp - this.newArray[index].up.timeStamp;
                let DD = this.newArray[index+1].down.timeStamp - this.newArray[index].down.timeStamp;
                let B = this.newArray[index+1].up.timeStamp - this.newArray[index].down.timeStamp;
                let obj = {h: H, ud: UD, dd: DD, b: B};
                if (!this.globalObject[el.down.code]){
                    this.globalObject[el.down.code] = [];
                }
                this.globalObject[el.down.code].push(obj);
            }
        });

        // this.downloadFile([this.globalObject], 'globalObject');
        console.log("TCL: AppComponent -> showData -> this.globalObject", this.globalObject)

        Object.keys(this.globalObject).forEach(el => {
            let h = this.globalObject[el].reduce((a, b) => a+b.h,0);
            let averageH = h/this.globalObject[el].length;

            let ud = this.globalObject[el].reduce((a, b) => a+b.ud,0);
            let averageUd = ud/this.globalObject[el].length;

            let dd = this.globalObject[el].reduce((a, b) => a+b.dd,0);
            let averageDd = dd/this.globalObject[el].length;

            let b = this.globalObject[el].reduce((a, b) => a+b.b,0);
            let averageB = b/this.globalObject[el].length;

            this.averageGlobalObject[el] = {h: averageH, ud: averageUd, dd: averageDd, b: averageB};

        });

        this.downloadFile([this.averageGlobalObject], 'averageGlobalObject');

        console.log("TCL: AppComponent -> showData -> this.averageGlobalObject", this.averageGlobalObject)

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

        this.downloadFile([this.results], 'results');

        // console.log("TCL: AppComponent -> showData -> this.results", this.results)

    }

}
