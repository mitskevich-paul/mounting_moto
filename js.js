let checkMute = document.querySelector("#mute");
let muteLabel = document.querySelector(".mute");
let tracker = document.querySelector(".checked");
let mute = false;
let mobile = false;
muteLabel.addEventListener("click", () => {
    if (checkMute.checked === true) {
        tracker.style.background = `url("./soundOn.png")`;
        tracker.style.transform = "translateX(50px)";
        tracker.style.backgroundSize = "cover";
        tracker.style.border = "3px solid green"
        mute = true;
    } else if (checkMute.checked === false) {
        tracker.style.transform = "translateX(0px)"
        tracker.style.background = `url("./soundOff.png")`;
        tracker.style.backgroundSize = "cover";
        tracker.style.border = "3px solid red"
        mute = false;
    }
})
let start = document.querySelector('.start');
start.addEventListener('click',() => {
    start.setAttribute("disabled", "true");
    if (mute === true) {
        let startEnineGame = new Audio('1.mp3')
        startEnineGame.play();
    }
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    document.body.appendChild(c);
    window.addEventListener('resize', () => {
        c.width = window.innerWidth;
        c.height = window.innerHeight;
    });
    rain = function() {
        let accelleration = .099;
        let size = 0.8;
        let occupation = 5;
        let dots = [];
        let dotsVel = [];
    
        for(let i = 0; i < c.width; ++i){
            dots[i] = c.height;
            dotsVel[i] = 100;
        }
    
        function anim(){
            requestAnimationFrame(anim);
            
            for(let i = 0; i < c.width; ++i){
                let currentY = dots[i] - 1;
                dots[i] += dotsVel[i] += accelleration;
                
                ctx.fillStyle = 'rgb(255,255,255)';
                ctx.fillRect(occupation * i, currentY, size, dotsVel[i] + 10);
                
                if(dots[i] > c.height && Math.random() < .01){
                dots[i] = dotsVel[i] = 0;
                }
            }
        }
        anim();
    }
    
    let ground = [];
    while (ground.length < 255) {
        while (ground.includes(val = Math.floor(Math.random()*255)));
        ground.push(val);
    }

    let wavesHight;
    let cxParameter;
    let cyParameter;
    let cxHeightParameter;
    let cyHeightParameter;
    if (window.innerWidth > 1200) {
        wavesHight = (a, b, t) => 2 * a + (2 * b - 2 * a) * (1 - Math.cos(t * Math.PI)) / 2;
        cxParameter = -70;
        cyParameter = -70;
        cxHeightParameter = 100;
        cyHeightParameter = 100;
    } else if (window.innerWidth > 720) {
        mobile = true;
        wavesHight = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
        cxParameter = -30;
        cyParameter = -30;
        cxHeightParameter = 60;
        cyHeightParameter = 60;
    } else if (window.innerWidth < 720) {
        mobile = true;
        wavesHight = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
        cxParameter = -10;
        cyParameter = -10;
        cxHeightParameter = 40;
        cyHeightParameter = 40;
        let controlsButtons = document.querySelectorAll('.controlButton');
        for (let i = 0; i < controlsButtons.length; i++) {
            controlsButtons[i].classList.remove('displayNone');
        }
    }
    if (mobile === true) {
        document.querySelector('.controlPhone').classList.remove('displayNone')
    }
    let waves = x => {
        x = x * 0.005 % 255;
        return wavesHight(ground[Math.floor(x)], ground[Math.ceil(x)], x - Math.floor(x));
    }
    let cloudsHight = (a, b, t) => a + (b - a) * (1 - Math.cos(t * Math.PI)) / 2;
        let cloudsWaves = x => {
            x = x * 0.002 % 255;
            return cloudsHight(ground[Math.floor(x)], ground[Math.ceil(x)], x - Math.floor(x));
        }

    let player = new function() {
        this.x = c.width / 3;
        this.y = c.height * 0,2;
        this.ySpeed = 0;
        this.rotated = 0;
        this.rSpeed = 0;
        window.addEventListener('resize', () => {
            this.y = c.height * 0,2;
        });

        this.img = new Image();
        this.img.src = './1.png';

        this.draw = function() {
            let p1 = c.height - waves(acceleration + this.x) * 0.55; 
            let p2 = c.height - waves(acceleration + 3 + this.x) * 0.55; 
            let grounded = 0;
    
            if (p1 - 15 > this.y) {
                this.ySpeed += 0.25; 
            } else {
                this.ySpeed -= this.y - (p1 - 15);
                this.y = p1 - 15;
                grounded = 1;
            }
            if (!playing || grounded && Math.abs(this.rotated) > Math.PI * 0.5) {
                playing = false;
                this.rSpeed = 5;
                k.ArrowUp = 1;
                this.x -= speed * 5;
                if (mute === true) {
                    let audio = new Audio('5.mp3');
                    audio.play();
                }
                speed = 666;
                document.querySelector('.control').classList.add('displayNone');
                document.querySelector('.controlPhone').classList.add('displayNone');
                document.querySelector('canvas').parentNode.removeChild(document.querySelector('canvas'));
                document.querySelector('.score').style.display = "flex";
                let restart = document.querySelector('.restart');
                restart.addEventListener('click',() => {
                    location.reload()
                });
            } 
            let angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x)
            this.y += this.ySpeed;

            if (!grounded && playing) {
                score += 1;
                document.querySelector('.scoreMenu').value = score;
            }
            if (grounded && playing) {
                this.rotated -= (this.rotated - angle) * 0.5;
                this.rSpeed = this.rSpeed - (angle - this.rotated);
            }
            this.rSpeed += (k.ArrowLeft - k.ArrowRight) * 0.05;
            this.rotated -= this.rSpeed * 0.1;
    
            if (this.rotated > Math.PI) {
                this.rotated = -Math.PI;
            } else if (this.rotated < -Math.PI) {
                this.rotated = Math.PI;
            }
            if (mobile === true) {
                let buttonRight = document.querySelector(".buttonRight");
                let buttonLeft = document.querySelector(".buttonLeft");
                buttonRight.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    k.ArrowRight = 1;
        
                    e.target.addEventListener("touchend", () => {
                        k.ArrowRight = 0;
                    });
                });
                buttonLeft.addEventListener("touchstart", (e) => {
                    e.preventDefault();
                    k.ArrowLeft = 1;
        
                    e.target.addEventListener("touchend", () => {
                        k.ArrowLeft = 0;
                    });
                });
            }
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotated)
            ctx.drawImage(this.img, cxParameter, cyParameter, cxHeightParameter, cyHeightParameter);
            ctx.restore();
        }
    }
    function drawClouds() {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.beginPath();
        ctx.moveTo(c.width, 0);
        ctx.lineTo(0, 0)
        for (let i = 0; i < c.width; i++) {
            ctx.lineTo(i, c.height / 8 - cloudsWaves(acceleration + i) * 0.75);
        }
        ctx.stroke();
        ctx.fill();
    }

    let score = 0;
    let acceleration = 0;
    let speed = 0;
    let playing = true;
    let k = {ArrowUp : 0, ArrowDown : 0, ArrowLeft : 0, ArrowRight : 0};
    function loop() {
        
    if (mobile === true) {
        let buttonSpeedUp = document.querySelector(".buttonUp");
        let buttonSpeedDown = document.querySelector(".buttonDown");
        buttonSpeedUp.addEventListener("touchstart", (e) => {
            e.preventDefault();
            k.ArrowUp = 1;

            e.target.addEventListener("touchend", () => {
                k.ArrowUp = 0;
            });
        });
        buttonSpeedDown.addEventListener("touchstart", (e) => {
            e.preventDefault();
            k.ArrowUp = -1;

            e.target.addEventListener("touchend", () => {
                k.ArrowUp = 0;
            });
        });
    }
        if (speed >= 0) {
            speed -= (speed - (k.ArrowUp - k.ArrowDown)) * 0.01;
            acceleration += 10 * speed;
        } else if (speed < 0) {
            speed = 0
        }
        ctx.fillStyle = 'rgb(80, 200, 255)';
        ctx.fillRect(0, 0, c.width, c.height);
    
        ctx.fillStyle = 'rgb(85, 50, 50)';
        ctx.beginPath();
        ctx.moveTo(0, c.height);
        for (let i = 0; i < c.width; i++) {
            ctx.lineTo (i, c.height - waves(acceleration + i) * 0.55);
        }

        ctx.lineTo(c.width, c.height);
        ctx.fill();
        player.draw();
        requestAnimationFrame(loop);
        drawClouds();
    }
    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;

    loop();
    rain();
    
    if (mute === true) {
        setInterval(() => {
            let hud = document.querySelector(".hud");
            hud.value = speed;
            if (hud.value === "0" || k.ArrowDown === 1 && hud.value !== "666") {
                let audio = new Audio('2.mp3');
                audio.play();
            } else if (hud.value > "0" && hud.value < "0.7" && k.ArrowUp === 1 && hud.value !== "666") {
                let audio = new Audio('3.mp3');
                audio.play();
            } else if (hud.value >= "0.7" && k.ArrowUp === 1 && hud.value !== "666") {
                let audio = new Audio('4.mp3');
                audio.play();
            } else if (hud.value !== "0" && k.ArrowUp === 0 && hud.value !== "666") {
                let audio = new Audio('2.mp3');
                audio.play();
            }
        }, 1050);
    }
});
