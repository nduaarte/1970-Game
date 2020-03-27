document.addEventListener("keydown", function(e){
    switch(e.keyCode) {
        case 37:
            speedX = -9;
            left = true;
            right = false;
            sair == true;
            break;
        //esquerda

        case 39:
            speedX = 9;
            right = true;
            left = false;
            break;
        //direita
    }
});

document.addEventListener("keyup", function(e){
    switch(e.keyCode) {
        case 37:
            speedX = 0;
            break;

        case 39:
            speedX = 0;
            break;  
    }
});

var 
    ctx, 
    ALTURA = 600,
    LARGURA = 400,
    frames = 0,
    speedX = 0,
    left = false,
    right = false,
//fim das variaveis



objective = {
    x: 150,
    y: 0,
    xLargura: 100,
    yAltura: 4.1,

    art: function() {
        ctx.fillStyle = "#32CD32";
        ctx.fillRect(this.x, this.y, this.xLargura, this.yAltura);
    }
};

limbo = {
    x: 0,
    y: 510,            
    xLargura: LARGURA,
    yAltura: ALTURA,

    art: function() {
    ctx.fillStyle = "#FFE4C4";
    ctx.fillRect(this.x, this.y, this.xLargura, this.yAltura);                   
    }
};

ball = {
    x: Math.floor(Math.random() * 350 + 50),
    y: 200,
    xLargura: 8,           
    yAltura: 0, 
    xSpeedBall: 5,
    ySpeedBall: 5,

    art: function() {
        ctx.beginPath();
        ctx.fillStyle = "black";
        ctx.arc(this.x, this.y, this.xLargura, this.yAltura, Math.PI*2, true);
        ctx.fill();            
    },

    limpar: function() {
        ctx.clearRect(this.x-12, this.y-8, this.xLargura+12, this.yAltura+20);
    }, 

    atualiza: function() {
        this.limpar();
        this.y += this.ySpeedBall;
        this.x += this.xSpeedBall;
        this.art();

        //se bater na prancha:
        if(this.y + 8 - this.yAltura >= board.y && this.x >= board.x && this.x <= board.x + 100) {
            this.ySpeedBall *= -1;
        }

        //se bater no limbo:
        if(this.y + 8 - this.yAltura >= limbo.y) {
            location.reload();
        }

        // se bater aqui: >|
        if(this.x  + 15 - this.xLargura >= LARGURA) {
            this.xSpeedBall *= -1;
        }

        //se bater aqui: |<
        if(this.x -8 <= 0) {
            this.xSpeedBall *= -1;
        }

        //se bater no teto:
        if(this.y <= 0) {
            this.ySpeedBall *= -1;
        }
    } 
}; 

board = {
    x: 150,
    y: 500,
    xLargura: 100,
    yAltura: 6,
    
    art: function() {
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, this.xLargura, this.yAltura);
    },

    limpar: function() {
        ctx.clearRect(this.x, this.y, this.xLargura, this.yAltura);
    },

    atualiza: function() {
        if(left == true || right == true) {
            this.limpar();
            this.x += speedX;
            this.art();
        };

        if(this.x <= 0) {
            this.x = 0;
        }

        if(this.x + this.xLargura >= 400) {
            this.x = 300;
        }
    } 
}
//fim dos objetos



function main(){
    roda();
}


function atualiza (){
    frames++;
    ball.atualiza();
    board.atualiza();
}

function art() {
    var canvas = document.getElementById("game")
    ctx = canvas.getContext("2d");

    ball.art();
    limbo.art();
    board.art();
    objective.art();
}

function limpar() {
    ball.limpar();            
    board.limpar();

}

function roda() {
    art();           
    atualiza();
    window.requestAnimationFrame(roda);
}

main();