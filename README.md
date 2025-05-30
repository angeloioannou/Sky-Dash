<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sky Dash</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
      font-family: sans-serif;
    }
    canvas {
      display: block;
      margin: 0 auto;
      background: transparent;
    }
    #score {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 1px 1px 2px #000;
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <canvas id="gameCanvas"></canvas>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let score = 0;
    let gameOver = false;

    const player = {
      x: width / 4,
      y: height / 2,
      width: 30,
      height: 30,
      color: '#fff',
      dy: 0,
      gravity: 0.5,
      jumpStrength: -10,
      onGround: false
    };

    const platforms = [];
    const stars = [];

    function createPlatform(x, y, width, height) {
      return { x, y, width, height };
    }

    function createStar(x, y) {
      return { x, y, radius: 5 };
    }

    function initPlatforms() {
      platforms.push(createPlatform(100, height - 100, 100, 10));
      platforms.push(createPlatform(300, height - 200, 100, 10));
      platforms.push(createPlatform(500, height - 150, 100, 10));
    }

    function drawPlayer() {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawPlatforms() {
      ctx.fillStyle = '#fff';
      platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
      });
    }

    function drawStars() {
      ctx.fillStyle = 'yellow';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      if (gameOver) return;

      player.dy += player.gravity;
      player.y += player.dy;

      // Collision detection
      player.onGround = false;
      platforms.forEach(p => {
        if (
          player.x < p.x + p.width &&
          player.x + player.width > p.x &&
          player.y + player.height < p.y + player.dy &&
          player.y + player.height + player.dy >= p.y
        ) {
          player.y = p.y - player.height;
          player.dy = 0;
          player.onGround = true;
        }
      });

      // Move platforms and stars
      platforms.forEach(p => {
        p.x -= 2;
      });
      stars.forEach(s => {
        s.x -= 2;
      });

      // Remove off-screen platforms and stars
      if (platforms[0].x + platforms[0].width < 0) {
        platforms.shift();
        const lastPlatform = platforms[platforms.length - 1];
        const newPlatformX = lastPlatform.x + 200 + Math.random() * 100;
        const newPlatformY = height - 100 - Math.random() * 200;
        platforms.push(createPlatform(newPlatformX, newPlatformY, 100, 10));

        // Add a star above the new platform
        if (Math.random() < 0.5) {
          stars.push(createStar(newPlatformX + 50, newPlatformY - 20));
        }
      }

      // Collect stars
      stars.forEach((s, index) => {
        if (
          player.x < s.x + s.radius &&
          player.x + player.width > s.x - s.radius &&
          player.y < s.y + s.radius &&
          player.y + player.height > s.y - s.radius
        ) {
          score += 5;
          stars.splice(index, 1);
        }
      });

      // Check for game over
      if (player.y > height) {
        gameOver = true;
        alert('Game Over! Your score: ' + score);
        window.location.reload();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      drawPlayer();
      drawPlatforms();
      drawStars();
      document.getElementById('score').innerText = 'Score: ' + score;
    }

    function gameLoop() {
      update();
      draw();
      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      }
    }

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('touchstart', () => {
      if (player.onGround) {
        player.dy = player.jumpStrength;
        score += 1;
      }
    });

    initPlatforms();
    gameLoop();
  </script>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sky Dash</title>
  <style>
    body {
      margin: 0;
      overflow: hidden;
      background: linear-gradient(to top, #a18cd1 0%, #fbc2eb 100%);
      font-family: sans-serif;
    }
    canvas {
      display: block;
      margin: 0 auto;
      background: transparent;
    }
    #score {
      position: absolute;
      top: 10px;
      left: 50%;
      transform: translateX(-50%);
      color: #fff;
      font-size: 24px;
      font-weight: bold;
      text-shadow: 1px 1px 2px #000;
    }
  </style>
</head>
<body>
  <div id="score">Score: 0</div>
  <canvas id="gameCanvas"></canvas>
  <script>
    const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let score = 0;
    let gameOver = false;

    const player = {
      x: width / 4,
      y: height / 2,
      width: 30,
      height: 30,
      color: '#fff',
      dy: 0,
      gravity: 0.5,
      jumpStrength: -10,
      onGround: false
    };

    const platforms = [];
    const stars = [];

    function createPlatform(x, y, width, height) {
      return { x, y, width, height };
    }

    function createStar(x, y) {
      return { x, y, radius: 5 };
    }

    function initPlatforms() {
      platforms.push(createPlatform(100, height - 100, 100, 10));
      platforms.push(createPlatform(300, height - 200, 100, 10));
      platforms.push(createPlatform(500, height - 150, 100, 10));
    }

    function drawPlayer() {
      ctx.fillStyle = player.color;
      ctx.fillRect(player.x, player.y, player.width, player.height);
    }

    function drawPlatforms() {
      ctx.fillStyle = '#fff';
      platforms.forEach(p => {
        ctx.fillRect(p.x, p.y, p.width, p.height);
      });
    }

    function drawStars() {
      ctx.fillStyle = 'yellow';
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function update() {
      if (gameOver) return;

      player.dy += player.gravity;
      player.y += player.dy;

      // Collision detection
      player.onGround = false;
      platforms.forEach(p => {
        if (
          player.x < p.x + p.width &&
          player.x + player.width > p.x &&
          player.y + player.height < p.y + player.dy &&
          player.y + player.height + player.dy >= p.y
        ) {
          player.y = p.y - player.height;
          player.dy = 0;
          player.onGround = true;
        }
      });

      // Move platforms and stars
      platforms.forEach(p => {
        p.x -= 2;
      });
      stars.forEach(s => {
        s.x -= 2;
      });

      // Remove off-screen platforms and stars
      if (platforms[0].x + platforms[0].width < 0) {
        platforms.shift();
        const lastPlatform = platforms[platforms.length - 1];
        const newPlatformX = lastPlatform.x + 200 + Math.random() * 100;
        const newPlatformY = height - 100 - Math.random() * 200;
        platforms.push(createPlatform(newPlatformX, newPlatformY, 100, 10));

        // Add a star above the new platform
        if (Math.random() < 0.5) {
          stars.push(createStar(newPlatformX + 50, newPlatformY - 20));
        }
      }

      // Collect stars
      stars.forEach((s, index) => {
        if (
          player.x < s.x + s.radius &&
          player.x + player.width > s.x - s.radius &&
          player.y < s.y + s.radius &&
          player.y + player.height > s.y - s.radius
        ) {
          score += 5;
          stars.splice(index, 1);
        }
      });

      // Check for game over
      if (player.y > height) {
        gameOver = true;
        alert('Game Over! Your score: ' + score);
        window.location.reload();
      }
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      drawPlayer();
      drawPlatforms();
      drawStars();
      document.getElementById('score').innerText = 'Score: ' + score;
    }

    function gameLoop() {
      update();
      draw();
      if (!gameOver) {
        requestAnimationFrame(gameLoop);
      }
    }

    window.addEventListener('resize', () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    });

    window.addEventListener('touchstart', () => {
      if (player.onGround) {
        player.dy = player.jumpStrength;
        score += 1;
      }
    });

    initPlatforms();
    gameLoop();
  </script>
</body>
</html>
