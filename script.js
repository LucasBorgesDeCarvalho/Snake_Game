let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = []; //Cria corpo da Cobra;
snake[0] = { //Cria corpo da Cobra;
    x: 8 * box, //Cria corpo da Cobra;
    y: 8 * box //Cria corpo da Cobra;
}
let direction = "rigth";
let food = { // Cria a Comida em lugares diferentes;
    x: Math.floor(Math.random() * 15 +1) * box, // Cria a Comida em lugares diferentes;
    y: Math.floor(Math.random() * 15 +1) * box // Cria a Comida em lugares diferentes;
}

// Criação do Quadrado onde o jogo vai acontecer;
function createBG(){
    context.fillStyle = "gray";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
// Criação do Corpo da Cobra;
function createSnake (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "purple";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}
// Criação da comida que faz a cobra crescer;
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

// Movimentação da Cobra
document.addEventListener('keydown', update);

function update (event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function StartGame(){
    // Arrumando limite da borda "Caso passe do limite volta para o lado oposto do limite maximo";
    if(snake[0].x > 15*box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 && direction == 'left') snake[0].x = 16 * box;
    if(snake[0].y > 15*box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == 'up') snake[0].y = 16 * box;

    // Cria uma condição para quando a cobra bater nela mesma dar GAMEOVER
    for(i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo);
            alert(' GAME OVER =('); 
        }
    }

    createBG(); // Cria o fundo da tela ;
    createSnake(); // Cria a cobra;
    drawFood(); // Roda o comando de colocar a comida em locais diferentes ;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    // Comando que ao passar por cima da comida a Cobra cresce e a Comida pararece em outro lugar aleatorio;
    if(snakeX != food.x || snakeY != food.y){
        snake.pop();
    }else{
        food.x = Math.floor(Math.random() * 15 +1) * box; 
        food.y = Math.floor(Math.random() * 15 +1) * box;
    }

    let newHead ={
        x: snakeX,
        y: snakeY
    }
    snake.unshift(newHead);
}

let jogo = setInterval(StartGame, 100);
