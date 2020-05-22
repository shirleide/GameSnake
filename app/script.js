let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];

snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direcao = "right";

let comida = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

//Criando o BackGround
function criarBG() {
    context.fillStyle = "black";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Criando a Cobrinha
function criarSnake() {
    for (i = 0; i < snake.length; i++) {
        context.fillStyle = "green";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

//Comida 
function drawComida() {
    context.fillStyle = "red";
    context.fillRect(comida.x, comida.y, box, box);

}

//Para a cobrinha não sumir da tela
document.addEventListener('keydown', update);

//Definição das teclas + direções
function update(event) {
    if (event.keyCode == 37 && direcao != "right") direcao = "left";
    if (event.keyCode == 38 && direcao != "down") direcao = "up";
    if (event.keyCode == 39 && direcao != "left") direcao = "right";
    if (event.keyCode == 40 && direcao != "up") direcao = "down";


}

//Para iniciar o jogo
function iniciarJogo() {
    //Para cobrinha continuar na tela e atravessar 
    if (snake[0].x > 15 * box && direcao == "right") snake[0].x = 0;
    if (snake[0].x < 0 * box && direcao == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direcao == "down") snake[0].y = 0;
    if (snake[0].y < 0 * box && direcao == "up") snake[0].y = 16 * box;

    for(i = 1; i < snake.length; i++ ){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert('Game Over =( ')
        }
    }

    //Chamada de funções
    criarBG();
    criarSnake();
    drawComida();

    //Variaveis de coordenadas
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Direções
    if (direcao == "right") snakeX += box
    if (direcao == "left") snakeX -= box
    if (direcao == "up") snakeY -= box
    if (direcao == "down") snakeY += box

    if (snakeX != comida.x || snakeY != comida.y) {
        snake.pop();
    } 
    else{comida.x = Math.floor(Math.random() * 15 + 1) * box,
         comida.y = Math.floor(Math.random() * 15 + 1) * box
    }
    

    //Adicionando o corpo ---> cabeça
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

}

let jogo = setInterval(iniciarJogo, 100);
