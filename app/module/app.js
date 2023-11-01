class MainApp{
    constructor(){
        this.base
        this.countMsg
        this.file
        this.msg
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
            this.base = document.querySelector("#base").files[0]
            this.countMsg = document.querySelector("#count-msg").value
            this.msg = document.querySelector("#msg").value
            if(document.querySelector("#file").length != 0) this.file = document.querySelector("#file").files[0]

            console.log(this.base, this.countMsg, this.msg, this.file);
        } else{
            alert("Не все обязательные поля заполнены")
        }
    }
}

const app = new MainApp()