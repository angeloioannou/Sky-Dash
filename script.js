{\rtf1\ansi\ansicpg1252\cocoartf2639
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww13980\viewh10460\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 function generatePlatform() \{\
  const platformWidth = Math.random() * (150 - 50) + 50;\
  const platformX = canvas.width;\
  const platformY = Math.random() * (canvas.height - 200) + 100;\
  platforms.push(\{ x: platformX, y: platformY, width: platformWidth, height: 10 \});\
\}\
let level = 1;\
\
function checkLevelUp() \{\
  if (score >= level * 100) \{\
    level++;\
    increaseDifficulty();\
    changeBackground();\
  \}\
\}\
function changeBackground() \{\
  const backgrounds = ['bg1.png', 'bg2.png', 'bg3.png'];\
  document.body.style.backgroundImage = `url($\{backgrounds[level % backgrounds.length]\})`;\
\}\
const jumpSound = new Audio('jump.mp3');\
const collectSound = new Audio('collect.mp3');\
\
function playJumpSound() \{\
  jumpSound.play();\
\}\
\
function playCollectSound() \{\
  collectSound.play();\
\}\
function generatePowerUp() \{\
  const powerUpTypes = ['speed', 'shield', 'doublePoints'];\
  const type = powerUpTypes[Math.floor(Math.random() * powerUpTypes.length)];\
  powerUps.push(\{ x: canvas.width, y: Math.random() * canvas.height, type \});\
\}\
function generateObstacle() \{\
  const obstacleY = Math.random() * (canvas.height - 50);\
  obstacles.push(\{ x: canvas.width, y: obstacleY, width: 20, height: 50 \});\
\}let comboCount = 0;\
\
function updateCombo(success) \{\
  if (success) \{\
    comboCount++;\
    score += comboCount * 10;\
  \} else \{\
    comboCount = 0;\
  \}\
\}\
const achievements = [\
  \{ name: 'First Jump', condition: () => score >= 10 \},\
  \{ name: 'Star Collector', condition: () => starsCollected >= 50 \},\
];\
\
function checkAchievements() \{\
  achievements.forEach(achievement => \{\
    if (achievement.condition() && !achievement.unlocked) \{\
      achievement.unlocked = true;\
      alert(`Achievement Unlocked: $\{achievement.name\}`);\
    \}\
  \});\
\}\
function resizeCanvas() \{\
  canvas.width = window.innerWidth;\
  canvas.height = window.innerHeight;\
\}\
\
window.addEventListener('resize', resizeCanvas);\
resizeCanvas();\
canvas.addEventListener('touchstart', function(e) \{\
  // Handle jump or other actions\
\});\
\
}