function gimmick(el) {
    var exists = document.getElementById('gimmick');
    if (exists) {
        exists.parentNode.removeChild(exists);
        return false;
    }

    var element = document.querySelector(el);
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    var focused = true;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.id = 'gimmick';

    var coin = new Image();
    coin.src = 'frames.png';

    coin.onload = function () {
        element.appendChild(canvas);
        focused = true;
        drawloop();
        // Animasyonu 10 saniye sonra durdur
        setTimeout(function() {
            focused = false;
            
        }, 10000); // 10 saniye
    };

    var coins = [];

    function drawloop() {
        if (focused) {
            requestAnimationFrame(drawloop);
        }
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (Math.random() < 0.05) {
            coins.push({
                x: Math.random() * canvas.width | 0,
                y: -100,
                dy: 0.1,
                s: 1 + Math.random(),
                state: Math.random() * 10 | 0
            });
        }
        
        var i = coins.length;
        while (i--) {
            var x = coins[i].x;
            var y = coins[i].y;
            var s = coins[i].s;
            var state = coins[i].state;
            coins[i].state = (state > 9) ? 0 : state + 0.1;
            coins[i].dy += 0.01;
            coins[i].y += coins[i].dy;

            ctx.drawImage(coin, 44 * Math.floor(state), 0, 44, 40, x, y, 44 * s, 40 * s);

            if (y > canvas.height) {
                coins.splice(i, 1);
            }
        }
    }
}

window.onload = function () {
    gimmick('body');
};
