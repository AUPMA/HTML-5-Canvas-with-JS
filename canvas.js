var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ballCount =document.getElementById('ballCount');
var maxBallSize =document.getElementById('maxBallSize');
var minBallSize =document.getElementById('minBallSize');
var mouseRadiouss = document.getElementById('mouseRadious')


var c = canvas.getContext('2d'); // var c stands for Context

function getRoundNumber(number){
    return Math.round(
        Number(number)
    );
}

function getRandomNumber(){
    return Math.random();
}

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadious = maxBallSize.value;
var minRadious = minBallSize.value;
var mouseRadious =mouseRadiouss.value ;
var spawnRadious = 3;
var ballCount = ballCount.value;

function reload(){
  location.reload(false);
}

function reset(){
    location.reload(true);
}




window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    //console.log(mouse);
})

var colorArray = [
    '#D36135',
    '#7FB069',
    '#5386E4',
    '#301935',
    '#5E0B15',
];




function Particle(spawnX, spawnY, xVelocity, yVelocity, radious){
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    this.radious = radious;
    this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
    

    this.draw =function() {

        
        c.beginPath();
        c.arc(this.spawnX, this.spawnY, this.radious, 0, Math.PI * 2, false);
        c.fillStyle = '#568851';
        //c.strokeStyle = '#000000'
        //c.stroke();
        c.fillStyle = this.color;
        c.fill();


    }

    this.update = function() {
        
        if(this.spawnX + this.radious > innerWidth  || this.spawnX - this.radious < 0){
            this.xVelocity = -this.xVelocity;
        }
    
        if(this.spawnY + this.radious > innerHeight || this.spawnY - this.radious < 0){
            this.yVelocity = -this.yVelocity;
        }
    
        this.spawnX += this.xVelocity;
        this. spawnY += this.yVelocity;

        //Interact with mouse

        if(mouse.x - this.spawnX < mouseRadious 
            && mouse.x - this.spawnX > -mouseRadious 
                && mouse.y - this.spawnY < mouseRadious 
                    && mouse.y - this.spawnY > -mouseRadious){
            
                        if(this.radious < maxRadious){
                            this.radious += 1;
                        }
        }else if (this.radious>minRadious){
            this.radious -= 1;
        }

        this.draw();

        
        

    }
}

var particleArray = [];
var particle = new Particle();

for (var i=0;i<ballCount;i++){
    var radious = spawnRadious;
    var spawnX = getRoundNumber(getRandomNumber() * innerWidth);
    var spawnY = getRoundNumber(getRandomNumber() * innerHeight);
    var xVelocity = ((getRandomNumber() -0.5) * 6);
    var yVelocity = ((getRandomNumber() -0.5) * 6) ;
    

    particleArray.push(new Particle(spawnX, spawnY, xVelocity, yVelocity, radious));
    
}




function updateAll() {
	c.clearRect(0,0, innerWidth, innerHeight);
	particle.update();
	for (var i = 0; i < particleArray.length; i++) {
			particleArray[i].update();
		}
	window.requestAnimationFrame(updateAll);
}

updateAll();








