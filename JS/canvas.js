const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');

const img = new Image();

let currentTheme = localStorage.getItem('theme') || 'light';

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (img.complete) {
    draw();
  }
}

function draw() {

  if (!currentTranslations || !currentTranslations['canvas_subtitle']) {
    return; 
  }
  
  const imgRatio = img.width / img.height;
  const canvasRatio = canvas.width / canvas.height;
  let drawWidth, drawHeight, offsetX, offsetY;

  if (canvasRatio > imgRatio) {
    drawWidth = canvas.width;
    drawHeight = canvas.width / imgRatio;
    offsetX = 0;
    offsetY = (canvas.height - drawHeight) / 2;
  } else {
    drawWidth = canvas.height * imgRatio;
    drawHeight = canvas.height;
    offsetX = (canvas.width - drawWidth) / 2;
    offsetY = 0;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

  const padding = canvas.width * 0.08;
  
  if (currentTheme === 'dark') {
    ctx.shadowColor = "rgba(168, 85, 247, 0.6)";
    ctx.fillStyle = '#e6e1f2';                    
  } else {
    ctx.shadowColor = "rgba(139, 44, 245, 0.3)";
    ctx.fillStyle = '#120f1d';
  }

  ctx.shadowBlur = 10;
  ctx.shadowOffsetX = 10;
  ctx.shadowOffsetY = 5;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';

  let titleFontSize = Math.max(28, canvas.width / 15); 
  ctx.font = `bold ${titleFontSize}px sans-serif`;
  ctx.fillText('Aurélien JONES', padding, canvas.height / 2 - 30);
  
  const subtitleText = currentTranslations['canvas_subtitle'];

  ctx.shadowBlur = 4;
  let subtitleFontSize = Math.max(15, canvas.width / 45); 
  ctx.font = `${subtitleFontSize}px sans-serif`;

  const indent = canvas.width > 992 ? 50 : 15;
  const subtitleX = padding + indent;
  const maxWidth = canvas.width - subtitleX - padding; 
  const lineHeight = subtitleFontSize * 1.4;            
  let subtitleY = canvas.height / 1.9 + 25;                

  ctx.textBaseline = 'top'; 

  const words = subtitleText.split(' ');
  let currentLine = '';

  for (let n = 0; n < words.length; n++) {
    let testLine = currentLine + words[n] + ' ';
    let metrics = ctx.measureText(testLine);
    let testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(currentLine, subtitleX, subtitleY);
      currentLine = words[n] + ' ';
      subtitleY += lineHeight;
    } else {
      currentLine = testLine;
    }
  }
  ctx.fillText(currentLine, subtitleX, subtitleY);
}

resize();

img.onload = draw;
window.addEventListener('resize', resize);
