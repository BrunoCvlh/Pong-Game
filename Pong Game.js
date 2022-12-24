//variaveis da bolinha
let xBola = 300;
let yBola = 200;
let diametro = 13;
let raio = diametro / 2;

//velocidade da bolinha
let velocidadeXBola = 6;
let velocidadeYBola = 6;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let wRaquete = 10;
let hRaquete = 90;

//variaveis oponente
let xRaqueteOponente = 585;
let yRaqueteOponente = 150;
let velocidadeYOponente;

let colidiu = false;

//placar jogo
let meusPontos = 0;
let pontosOponente = 0;

//sons jogo
let raquetada;
let ponto;
let trilha;

function preload(){
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
  
}

function setup() {
  createCanvas(600, 400);
  trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  //movimentaBolinha();
  verificaColisao();
  mostraRaquete(xRaquete, yRaquete);
  movimentaMinhaRaquete();
  verificaColisaoRaquete(xRaquete, yRaquete);
  mostraRaquete(xRaqueteOponente, yRaqueteOponente);
  movimentaRaqueteOponente();
  verificaColisaoRaquete(xRaqueteOponente, yRaqueteOponente);
  incluiPlacar();
  marcaPonto();
  
}

function mostraBolinha() {
  circle(xBola, yBola, diametro);
}

function movimentaBolinha() {
  xBola += velocidadeXBola;
  yBola += velocidadeYBola;
}

function verificaColisao() {
  if (xBola + raio > width || xBola - raio < 0) {
    velocidadeXBola *= -1;
   
  }
  if (yBola + raio > height || yBola - raio < 0) {
    velocidadeYBola *= -1;
      
  }
}

function mostraRaquete(x, y) {
  rect(x, y, wRaquete, hRaquete);
}

function movimentaMinhaRaquete(){
  if (keyIsDown(UP_ARROW)){
    yRaquete -= 8;
  }
   if (keyIsDown(DOWN_ARROW)){
    yRaquete += 8;
  }
}
function verificaColisaoRaquete(){
  if (xBola - raio < xRaquete + wRaquete && yBola - raio < yRaquete + hRaquete && yBola + raio > yRaquete){
    velocidadeXBola *= -1;
    raquetada.play();
  }
}

function verificaColisaoRaquete(x, y){
  colidiu =
    collideRectCircle(x, y, wRaquete, hRaquete, xBola, yBola, raio);
  if (colidiu){ 
    velocidadeXBola *= -1;
     raquetada.play();
  }
}
  

function movimentaRaqueteOponente(){
  if (keyIsDown(87)){
    yRaqueteOponente -= 8;
  }
   if (keyIsDown(83)){
    yRaqueteOponente += 8;
  }
}

function incluiPlacar(){
  stroke (255);
  textAlign(CENTER);
  textSize(18);
  fill(255, 140, 0);
  rect(170, 10, 40, 20);
  fill(255);
  text(meusPontos, 190, 26);
  rect(390, 10,40, 20);
  fill(255, 140, 0);
  text(pontosOponente, 410, 26);
}

function marcaPonto(){
  if (xBola > 590){
    meusPontos += 1;
    ponto.play();
  }
  if (xBola < 10){
    pontosOponente += 1;
    ponto.play();
  }
}