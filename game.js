let inputVector = {x:0,y:0};
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
let x = 100;
let y = 100;
let acc = 0.001;
let speed = 0;
let maxSpeed = 0.2;
let previousT = 0; 					
let deltaT = 0;	
let rotation = 0;
let rotSpeed = 0.05;
let size = 10;

function drawShip(x,y,size,color){  
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "black";

    ctx.beginPath();
    ctx.moveTo(x+size/2  , y);
    ctx.lineTo(x-size/2, y + size/2 );
    ctx.lineTo(x-size/2, y -size/2 );
    ctx.lineTo(x+size/2  , y);
    ctx.stroke();
    ctx.fill();
}


document.addEventListener("keydown", (event)=>{
    if(event.key == "w"){
        inputVector.y = 1;
        console.log(inputVector)
    }
    else if(event.key == "s"){
        inputVector.y = -1;
    }
    else if(event.key == "a"){
        
        inputVector.x = -1;
    }
    else if(event.key == "d"){
        inputVector.x = 1;
    }
});
document.addEventListener("keyup", (event)=>{
    if(event.key == "w" || event.key =="s"){
        inputVector.y = 0;
    }
    else if(event.key == "a" || event.key == "d"){
        inputVector.x = 0;
    }
});

function update(time){    
    if(previousT != 0){
        deltaT = time - previousT;	
    }  
    ctx.clearRect(0,0,canvas.width, canvas.height);
    if(x > canvas.width+size) x = -size;  
    if(x < -size) x = canvas.width + size;
    if(y > canvas.height+size) y = -size;
    if(y < -size) y = canvas.height + size;

    
    if(speed < maxSpeed)speed += (inputVector.y) * acc; 		
    if(speed < -0.2)speed = 0;			
    if(speed > 0 && inputVector.y == 0) speed-=0.001;		
    console.log(rotation);

    rotation += rotSpeed * inputVector.x;

    x += Math.cos(rotation)*speed*deltaT;
    y += Math.sin(rotation)*speed*deltaT;
    
    ctx.translate(x,y); 
    ctx.rotate(rotation);
    drawShip(0,0,size,"green");
    ctx.resetTransform(); 
    previousT = time;
    window.requestAnimationFrame(update);
}

window.requestAnimationFrame(update);



