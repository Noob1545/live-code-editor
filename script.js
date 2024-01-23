function inputing(){
    const HTMLValue = editor.getValue()
    const CSSValue = editor1.getValue()
    const JSValue = editor2.getValue()
    console.log(HTMLValue);
    document.getElementsByTagName("iframe")[0].contentDocument.body.innerHTML = `${HTMLValue} <style>${CSSValue}</style> `
    try{
        document.getElementsByTagName("iframe")[0].contentWindow.eval(JSValue)
        document.getElementsByTagName("span")[0].textContent = ""
    document.getElementsByTagName("iframe")[0].contentWindow.console.log = function(message) {
        document.getElementsByTagName("span")[0].textContent = "console output: "+message
    };
    }
    catch(error){
        document.getElementsByTagName("span")[0].innerHTML = `<font color='red'>${error}</font>`
    }
}

window.addEventListener("keydown",function(event){
    if(event.ctrlKey && event.key == "s"){
        event.preventDefault()
        inputing()
    }
    else if(event.altKey && event.key === "s"){
        event.preventDefault()
        download()
    }
})


function download(){
    const HTMLValue = editor.getValue()
    const CSSValue = editor1.getValue()
    const JSValue = editor2.getValue()
    const innerHTML = `${HTMLValue} <style>${CSSValue}</style> <script>${JSValue}</script>`
    console.log(innerHTML);
    const blob = new Blob([innerHTML],{type:'text/html'})
    const reeder = new FileReader()
    reeder.onload = function(){
        const create = document.createElement("a")
        create.href = this.result
        create.download = "live-code-file.html"
        create.click()
    }
    reeder.readAsDataURL(blob)
}

const area = document.getElementsByTagName("textarea")[0]
const area1 = document.getElementsByTagName("textarea")[1]
const area2 = document.getElementsByTagName("textarea")[2]

let editor = ace.edit(area);
editor.setTheme("ace/theme/cobalt");
editor.session.setMode('ace/mode/html');

editor.container.style.width = "525px";
editor.container.style.height = "310px";
editor.container.style.marginTop = "0px"

let editor1 = ace.edit(area1)
editor1.setTheme("ace/theme/cobalt")
editor1.session.setMode('ace/mode/css');

editor1.container.style.width = "525px";
editor1.container.style.height = "310px";
editor1.container.style.marginTop = "0px"

let editor2 = ace.edit(area2)
editor2.setTheme("ace/theme/cobalt")
editor2.session.setMode('ace/mode/javascript');

editor2.container.style.width = "525px";
editor2.container.style.height = "310px";
editor2.container.style.marginTop = "0px"

let islem = false
document.getElementById("scrool").addEventListener("mousedown", function (event) {
    islem = true;
    document.body.style.cursor = "n-resize"
    window.addEventListener("mousemove", downing);
  });

  window.addEventListener("mouseup", function () {
    islem = false;
    document.body.style.cursor = "default"
    window.removeEventListener("mousemove", downing);
  });


function downing(event){
    if(islem){
        document.getElementById("scrool").style.top = event.clientY+ -20 +"px"
        document.getElementById("outputdiv").style.height = event.clientY+ -20 +"px"
        document.getElementById("anadiv").style.height = event.clientY+ -20 +"px"
        console.log("downing!");
    }
}