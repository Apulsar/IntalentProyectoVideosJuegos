// ----------------------------------------------------------------------VARIABLES GLOBALES
let obstacles = [];
let personaje;
let centesimas=0;
let segundos=0;
let minutos=0;
let horas=0;
let hora;
let puntuacion=[];

// -----------------------------------------------------------------------Inicio del juego
function startGame() {
    gameArea.start();
    personaje = new component(50, 50, 'red', 20, 220);
    resetcronometro();
    iniciarcronometro();
}

let gameArea = {
    canvas: document.querySelector('#juego2'),
    // -------------------------------------------------------------------Estructura del lienzo
    start: function () {
        this.canvas.width = 640;
        this.canvas.height = 490;
        this.context = this.canvas.getContext('2d');
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 10);
        // ---------------------------------------------------------------Evento de teclado
        window.addEventListener('keydown', function (e) {
            gameArea.keys = gameArea.keys || [];
            gameArea.keys[e.key] = e.type == 'keydown';
        });
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.key] = e.type == 'keydown';
        });
    },
    // --------------------------------------------------------------------Clear (deja el canvas en blanco)
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    // ---------------------------------------------------------------------FIN (resetea el interval)
    end: function () {
        clearInterval(this.interval);
        pararcronometro();
    },
};
// --------------------------------------------------------------------------Declaración de componente
function component(width, height, color, x, y) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    ctx = gameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
    // ------------------------------------------------------------------------Repintado de componente
    this.update = function () {
        ctx = gameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    // -------------------------------------------------------------------------Posicion del personaje
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x > 590) {
            this.x = 590;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y > 440) {
            this.y = 440;
        }
        if (this.y < 0) {
            this.y = 0;
        }
    };
    // -------------------------------------------------------------------------Colision
    this.collision = function (obstacle) {
        let left = this.x;
        let right = this.x + this.width;
        let top = this.y;
        let bottom = this.y + this.height;
        let obstacleleft = obstacle.x;
        let obstacleright = obstacle.x + obstacle.width;
        let obstacletop = obstacle.y;
        let obstaclebottom = obstacle.y + obstacle.height;
        let crash = true;
        if (
            bottom < obstacletop ||
            top > obstaclebottom ||
            right < obstacleleft ||
            left > obstacleright
        ) {
            crash = false;
        }
        return crash;
    };
}

// -------------------------------------------------------------------------Nuevo frame
function updateGameArea() {
    gameArea.clear();
    gameArea.frameNo += 1;
    // ---------------------------------------------------------------------Comprovación de colision
    for (i = 0; i < obstacles.length; i += 1) {
        if (personaje.collision(obstacles[i])) {
            gameArea.end();
            return;
        }
    }
    // ---------------------------------------------------------------------Generacion de obstaculos
    if (gameArea.frameNo == 1 || everyinterval(200)) {
        x = gameArea.canvas.width;
        y = Math.random() * (gameArea.canvas.height - 50);
        obstacles.push(new component(50, 50, 'green', x, y));
    }

    function everyinterval(n) {
        if ((gameArea.frameNo / n) % 1 == 0) {
            return true;
        }
        return false;
    }
    // ---------------------------------------------------------------------Movimiento de obstaculos
    for (i = 0; i < obstacles.length; i += 1) {
        obstacles[i].x += -1;
        obstacles[i].update();
    }
    // ---------------------------------------------------------------------Movimiento de personaje
    personaje.speedX = 0;
    personaje.speedY = 0;
    if (
        (gameArea.keys && gameArea.keys['ArrowLeft']) ||
        (gameArea.keys && gameArea.keys['a'])
    ) {
        personaje.speedX = -1.5;;
    }

    if (
        (gameArea.keys && gameArea.keys['ArrowRight']) ||
        (gameArea.keys && gameArea.keys['d'])
    ) {
        personaje.speedX = 1.5;
    }
    if (
        (gameArea.keys && gameArea.keys['ArrowUp']) ||
        (gameArea.keys && gameArea.keys['w'])
    ) {
        personaje.speedY = -1.5;
    }
    if (
        (gameArea.keys && gameArea.keys['ArrowDown']) ||
        (gameArea.keys && gameArea.keys['s'])
    ) {
        personaje.speedY = 1.5;
    }
    personaje.newPos();
    personaje.update();
}

//---------------------------------------------------------------Cronómetro puntuación
let centesimas=0;
let segundos=0;
let minutos=0;
let horas=0;
let hora;
let puntuacion=[];
function iniciarcronometro(){
    hora=setInterval(cronometro,10);
}
function pararcronometro(){
    clearInterval(hora);
    puntuacion=[horas,minutos,segundos,centesimas];
    console.log(puntuacion);

}
function resetcronometro(){
    clearInterval(hora);
    horas=0;
    minutos=0;
    segundos=0;
    centesimas=0;
    document.querySelector("#centesimas").innerHTML=":"+centesimas;
    document.querySelector("#segundos").innerHTML=":"+segundos;
    document.querySelector("#minutos").innerHTML=":"+minutos;
    document.querySelector("#horas").innerHTML=horas;
}
function cronometro(){ 
    function timerCondition(t, type) {
		if (t < 10) {
			document.querySelector(`#${type}`).innerHTML = ":0" + t;
            
		} else {
			document.querySelector(`#${type}`).innerHTML = ":"+t;
		}
        
	}
    function timerCondition2(t, type) {
		if (t < 10) {
			document.querySelector(`#${type}`).innerHTML = "0" + t;
		} else {
			document.querySelector(`#${type}`).innerHTML = t;
		}
	}
    centesimas++;
    timerCondition(centesimas,"centesimas");
    if(centesimas==100){
        centesimas=0;    
        segundos++;
        timerCondition(segundos,"segundos");
        if(segundos==60){
            segundos=0
            minutos++;
            timerCondition(minutos,"minutos");
            if (minutos==60){
                minutos=0;
                horas++;
                timerCondition2(horas,"horas")
            }
        }
    }
    

}


startGame();
