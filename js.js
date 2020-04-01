let start = document.querySelector('button');
start.addEventListener('click',() => {
    let c = document.createElement('canvas');
    let ctx = c.getContext('2d');
    c.width = 1280;
    c.height = 720;
    document.body.appendChild(c);
    
    let ground = [];
    while (ground.length < 255) {
        while (ground.includes(val = Math.floor(Math.random()*255)));
        ground.push(val);
    }
    
    let wavesHight = (a, b, t) => 2 * a + (2 * b - 2 * a) * (1 - Math.cos(t * Math.PI)) / 2;
    let waves = x => {
        x = x * 0.005 % 255;
        return wavesHight(ground[Math.floor(x)], ground[Math.ceil(x)], x - Math.floor(x));
    }
    
    let player = new function() {
        this.x = c.width / 3;
        this.y = c.height / 2;
        this.ySpeed = 0;
        this.rotated = 0;
        this.rSpeed = 0;
    
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
                document.querySelector('canvas').parentNode.removeChild(document.querySelector('canvas'));
            } 
            let angle = Math.atan2((p2 - 15) - this.y, (this.x + 5) - this.x)
            this.y += this.ySpeed;
    
            if (!grounded && playing) {
                score += 1;
                document.querySelector('input').value = score;
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
    
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotated)
            ctx.drawImage(this.img, -70, -70, 100, 100);
            ctx.restore();
        }
    }
    
    let score = 0;
    let acceleration = 0;
    let speed = 0;
    let playing = true;
    let k = {ArrowUp : 0, ArrowDown : 0, ArrowLeft : 0, ArrowRight : 0};
    function loop() {
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
    }
    
    onkeydown = d => k[d.key] = 1;
    onkeyup = d => k[d.key] = 0;
    
    loop();
});
