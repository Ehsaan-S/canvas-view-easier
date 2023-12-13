let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 800;
cnv.height = 600;
let world = {
  w: 1600,
  h: 600,
};

let player = {
  x: 50,
  y: 600,
  w: 20,
  h: 20,
  xspeed: 2,
  yspeed: 0,
  a: 0.5,
  jumpSpeed: -15,
};

let view = {
  x: 0,
};
let leftPressed = false;
let rightPressed = false;

let platforms = [];
platforms.push(
  { x: 245, y: 100, w: 250, h: 20 },
  { x: 345, y: 250, w: 250, h: 20 },
  { x: 545, y: 400, w: 250, h: 20 },
  { x: 700, y: 475, w: 250, h: 20 },
  { x: 1200, y: 200, w: 250, h: 20 },
  { x: 100, y: 550, w: 250, h: 20 }
);

function drawPlatform() {
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, cnv.width, cnv.height);

  ctx.fillStyle = "black";
  for (let i = 0; i < platforms.length; i++) {
    let platform = platforms[i];
    ctx.fillRect(platform.x, platform.y, platform.w, platform.h);
  }
}
function drawPlayer() {
  ctx.fillStyle = "black";
  ctx.fillRect(player.x, player.y, player.w, player.h);
}

function movePlayer() {
  player.yspeed += player.a;
  player.y += player.yspeed;

  if (rightPressed) {
    player.x += player.xspeed;
  } else if (leftPressed) {
    player.x += -player.xspeed;
  }
  if (player.y + player.h > cnv.height) {
    player.y = cnv.height - player.h;
    player.yspeed = 0;
  }
  if (player.y < 0) {
    player.y = 0;
  }
}

function ChangeView() {
  view.x = player.x - cnv.width / 2;
}

document.addEventListener("keydown", keydownHandler);
function keydownHandler(e) {
  console.log(e.code);
  if (e.code === "ArrowLeft") {
    leftPressed = true;
  } else if (e.code === "ArrowRight") {
    rightPressed = true;
  } else if (e.code === "ArrowUp") {
    player.yspeed = player.jumpSpeed;
  }
}

document.addEventListener("keyup", keyupHandler);
function keyupHandler(e) {
  if (e.code === "ArrowLeft") {
    leftPressed = false;
  } else if (e.code === "ArrowRight") {
    rightPressed = false;
  }
}

function gameLoop() {
  drawPlatform();
  drawPlayer();
  movePlayer();
  ChangeView();
  requestAnimationFrame(gameLoop);
}

gameLoop();
