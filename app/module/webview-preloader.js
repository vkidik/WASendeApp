let {ipcRenderer} = require("electron");
function loop(){
    if(document.querySelector("button.tvf2evcx.oq44ahr5.lb5m6g5c.svlsagor.p2rjqpw5.epia9gcq")){
        document.querySelector("button.tvf2evcx.oq44ahr5.lb5m6g5c.svlsagor.p2rjqpw5.epia9gcq").click();
        ipcRenderer.send("next_user");
        window.cancelAnimationFrame(loop)
    }
    window.requestAnimationFrame(loop)
}
if(window.location.search){
    loop()
}
console.log("webview preloader");