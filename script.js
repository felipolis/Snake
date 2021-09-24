window.onload = function(){
    var stage = document.getElementById('stage');
    var ctx = stage.getContext('2d');

    document.addEventListener('keydown', KeyPush)

    setInterval(game, 60);

    var points = document.getElementById('points');
    var p = 0;
    points.innerHTML = 'Points: 0'

    var record = document.getElementById('record');
    var r = 0;
    record.innerHTML = 'Record: 0'

    const vel = 1;
    var vx = vy = 0;
    var px = 10;
    var py = 15;
    var tp = 20;
    var qp = 20;
    var ax = ay = 15;
    var trail = [];
    var tail = 5;

    function game(){
        px += vx;
        py += vy;
        if(px < 0){
            px = qp - 1;
        }
        if(px > qp - 1){
            px = 0;
        }
        if(py < 0){
            py = qp - 1;
        }
        if(py > qp - 1){
            py = 0;
        }


        ctx.fillStyle = "grey";
        ctx.fillRect(0, 0, stage.width, stage.height);

        ctx.fillStyle = "red";
        ctx.fillRect(ax*tp, ay*tp, tp, tp);
        
        ctx.fillStyle = '#19FA1F';
        for(var i = 0; i < trail.length; i++){
            ctx.fillRect(trail[i].x*tp, trail[i].y*tp, tp-1, tp-1)
            if(trail[i].x == px && trail[i].y == py){
                vx = vy = 0;
                tail = 5;
                points.innerHTML = `Points: 0`
                if(p >= r){
                    r = p;
                    record.innerHTML = `Record: ${r}`;
                }
                p = 0;
            }
        }

        trail.push({x:px, y:py})
        while(trail.length > tail){
            trail.shift();
        }

        if(ax == px && ay == py){
            tail++;
            points.innerHTML = `Points: ${++p}`
            ax = Math.floor(Math.random()*qp);
            ay = Math.floor(Math.random()*qp)
        }
    }

    function KeyPush(event){
        switch(event.keyCode){
            case 37: //LEFT
                vx = -vel;
                vy = 0;
                break;
            case 38: //UP
                vx = 0;
                vy = -vel;
                break;
            case 39: //RIGHT
                vx = vel;
                vy = 0;
                break;
            case 40: //DOWN
                vx = 0;
                vy = vel;
                break;
            default:
                break;
        }
    }
}