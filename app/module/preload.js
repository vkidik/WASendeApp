let { ipcRenderer } = require('electron')
const { XLSX } = require('xlsx');
const fs = require('fs');

const splitString = str => {
    if (str.includes('-')) {
        const [start, end] = str.split('-').map(Number);
        return [start, end];
    } else {
        return [Number(str)];
    }
}

class MainApp{
    constructor(){
        this.window = document.querySelector(".window")
        this.base
        this.countMsg
        this.file
        this.msg
        this.count
        this.btnStart = document.querySelector("#start")
  
        this.innerStart()
    }
  
    innerStart(){
        this.btnStart.addEventListener('click', event => {
            event.preventDefault()
            this.chechValues()
        })
    }
  
    chechValues(){
        if( document.querySelector("#base").length != 0 && 
            document.querySelector("#count-msg").value != '' &&
            document.querySelector("#msg").value
        ){
            this.startSend()
        } else{
            alert("Не все обязательные поля заполнены")
        }
    }
  
    startSend(){
        this.btnStart.disabled = true
  
        this.base = document.querySelector("#base").files[0]
        this.countMsg = document.querySelector("#count-msg").value
        this.msg = document.querySelector("#msg").value
        document.querySelector('#count').style.display = "block"
        if(document.querySelector("#file").length != 0){
            this.file = document.querySelector("#file").files[0]
            window.sender = new Sender([this.base, this.countMsg, this.msg, this.file])
        } else{
            window.sender = new Sender([this.base, this.countMsg, this.msg])
        }
    }
}

class Sender{
    constructor(array){
        this.base = array[0]
        this.countMsg = array[1]
        this.msg = array[2]
        this.endBase
        this.counter
        if(array.length == 4) this.file = array[3]

        // console.log(this.countMsg, this.msg);
        this.handleBase(this.base)
    }

    handleBase(base){
        // const file = base;
        // const reader = new FileReader();
        // const ref = this
    
        // reader.onload = function(event) {
        //     const data = event.target.result;
        //     const workbook = XLSX.read(data, { type: 'array' });
        
        //     // Теперь можно работать с данными из файла Excel
        //     const sheetName = workbook.SheetNames[0];
        //     const worksheet = workbook.Sheets[sheetName];
        //     const excelData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        //     this.base = excelData.slice(1)
        //     // Делайте что-то с данными, например, выведите их в консоль
        //     // console.log(this.base);
        //     ref.checkCountMsg(this.base)
        // };
    
        // reader.readAsArrayBuffer(file);


        // Загрузите файл Excel (XLSX) с диска
        const workbook = XLSX.readFile(base);

        // Выберите лист из книги
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        // Преобразуйте данные из листа в объект JSON
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        // Выведите данные в консоль
        console.log(jsonData);
        // this.checkCountMsg(jsonData)
    }

    checkCountMsg(base){
        this.endBase = base
        this.countMsg = splitString(this.countMsg)

        if(this.countMsg.length == 1){
            this.counter = 0
            this.countMsg = this.countMsg[0] - 2
            this.startSender()
        } else{
            this.counter = this.countMsg[0] - 2
            this.countMsg = this.countMsg[1] - 2
            this.startSender()
        }
    }

    async startSender(){
        if(this.counter <= this.countMsg){
            const base = this.endBase[this.counter]
            const phone = base[0]
            const name = base[1]
            const male = base[2]
            const url = `https://web.whatsapp.com/send/?phone=${phone}&text=${this.msg}`

            const webview = document.querySelector('.window')
            webview.src = url
            this.counter++
            ipcRenderer.on("next_suka_user",()=>{
                alert("Следующий пользователь")
            })
            // await webview.addEventListener('dom-ready', () => {
            //     webview.executeJavaScript(`
            //         (async () => {
            //             await document.querySelector("button.tvf2evcx.oq44ahr5.lb5m6g5c.svlsagor.p2rjqpw5.epia9gcq").click()
            //         })()
            //     `);
            // });
            // this.startSender()
              
            // document.querySelector('.window').addEventListener('dom-ready', ()=>{
                // if(!document.querySelector("._3XAyL._3xLrC")){}
                // await document.querySelector('.window').querySelector("button.tvf2evcx.oq44ahr5.lb5m6g5c.svlsagor.p2rjqpw5.epia9gcq").click()
                // this.counter++
                // this.startSender('once', bases)
            // })
            // webview.addEventListener('dom-ready', async ()=> {
            //     // await webview.webContents.executeJavaScript(`document.querySelector("button.tvf2evcx.oq44ahr5.lb5m6g5c.svlsagor.p2rjqpw5.epia9gcq").click()`);
            //     // this.counter++;
            //     // this.startSender('once');
            //     // try {
            //     //     eval(console.log(webview.querySelector("._3XAyL._3xLrC")))
            //     // } catch (error) {
            //     //     console.log(error);
            //     // }
            // })
        }
    }
}

window.addEventListener('DOMContentLoaded', () => {
    console.log("Developed by Vkidik https://t.me/vkidik");
    const logWebVersions = (selector, text) => console.log(selector, text)
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      logWebVersions(`${dependency}-version`, process.versions[dependency])
    }

    window.app = new MainApp()
})