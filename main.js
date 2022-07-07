// Board Settings

const canvas=document.getElementById('canvas');
canvas.width= window.innerWidth -60;
canvas.height= 500;

let context= canvas.getContext('2d');
let startBackgroundColor= "white";

context.fillStyle= startBackgroundColor;
context.fillRect(0, 0, canvas.width, canvas.height);

// Pen settings

let drawColor= "black";
let drawWidth= "6";
let isDrawing= false;

// Actions settings

let restoreArray= [];
let index= -1;

function changeColor(element){
    drawColor=element.style.background;
}

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", draw, false);
canvas.addEventListener("touchend", stop, false);

canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", draw, false);
canvas.addEventListener("mouseout", stop, false);

function start(event){
    isDrawing= true;
    context.beginPath()
    context.moveTo(event.clientX - canvas.offsetLeft, 
                    event.clientY - canvas.offsetTop);
    event.preventDefault()
}

function draw(event){
    if (isDrawing){
        context.lineTo(event.clientX - canvas.offsetLeft, 
            event.clientY - canvas.offsetTop);
        context.strokeStyle = drawColor;
        context.lineWidth= drawWidth;
        context.lineCap= "round";
        context.lineJoin= "round";
        context.stroke();
    }
    event.preventDefault();
}

function stop(event){
    if(isDrawing){
        context.stroke();
        context.closePath();
        isDrawing= false;
    }
    event.preventDefault();
    if(event.type != "mouseout");
    restoreArray.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index +=1;
}

function clearCanvas(){
    context.fillStyle= startBackgroundColor;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillRect(0, 0, canvas.width, canvas.height);
}

function undoLast(){
    if(index<=0){
        clearCanvas();
    }else{
        index-=1;
        restoreArray.pop();
        context.putImageData(restoreArray[index], 0, 0)
    }

}


document.querySelector("#btn-add-A").addEventListener('click', addPointA)
let totalA=0;

function addPointA() {
    totalA= totalA + 1;
    document.querySelector("#scoreA").innerText = totalA;
};

document.querySelector("#btn-add-B").addEventListener('click', addPointB)
let totalB=0;
function addPointB() {
    totalB= totalB + 1;
  document.querySelector("#scoreB").innerText = totalB;
};