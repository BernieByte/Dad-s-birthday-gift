const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let pieces = [];

function createConfetti(){

for(let i=0;i<120;i++){

pieces.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,

size:Math.random()*6+4,

speedY:Math.random()*3+2

});

}

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

pieces.forEach(p=>{

ctx.fillStyle="cyan";

ctx.fillRect(p.x,p.y,p.size,p.size);

p.y += p.speedY;

if(p.y > canvas.height){
p.y = 0;
}

});

requestAnimationFrame(update);

}

createConfetti();
update();
