const play_btn = document.getElementById("button1");
const auto_btn = document.getElementById("button2");
const file = document.getElementById("fileupload");

const container = document.getElementById("container");
const canvas = document.querySelector("canvas");

const ctx = canvas.getContext("2d");
console.log(canvas);

canvas.width = window.innerHeight;

canvas.height = window.innerHeight;

let audioSource;
let analyser;

file.addEventListener("change", () => {
  const audio = document.querySelector("audio");
  // @ts-ignore
  const files = file.files;
  const audioctx = new AudioContext();
  audio.src = URL.createObjectURL(files[0]);

  audio.load();

  audio.play();

  audioSource = audioctx.createMediaElementSource(audio);
  analyser = audioctx.createAnalyser();
  audioSource.connect(analyser);
  analyser.connect(audioctx.destination);
  analyser.fftSize = 2048;
  const bufferLen = analyser.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLen);

  // const barWidth = (canvas.width/2)/bufferLen;
  const barWidth = 15;
  let barHeight;
  let x;

  function animate() {
    x = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    analyser.getByteFrequencyData(dataArray);
    drawVisualizer(bufferLen, barHeight, barWidth, x, dataArray);
    requestAnimationFrame(animate);
  }
  animate();
});

/*** SPIRAL STYLE ****/

function drawVisualizer(bufferLen, barHeight, barWidth, x, dataArray) {
  for (let i = 0; i < bufferLen; i++) {
    barHeight = dataArray[i] * 1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(i * 4.184); //new
    const hue = 120 + i * 0.3;
    // ctx.fillStyle = "white";
    //     // @ts-ignore
    // ctx.fillRect(barWidth, barHeight , barWidth+3, 5);
    ctx.fillStyle = "hsl(" + hue + ",100%," + barHeight / 3 + "%)";
    ctx.fillRect(0, 0, barWidth-5, barHeight);
    x += barWidth;
    ctx.restore();
  }
}

/**** CENTER TO END BAR STYLE ****/

// function drawVisualizer(bufferLen, barHeight, barWidth, x, dataArray){
//     for (let i=0;i< bufferLen;i++){
//             barHeight = dataArray[i]*2;
//             const red = i* barHeight/20;
//             const green = i*8;
//             const blue = barHeight/8;
//             ctx.fillStyle = "white";
//             // @ts-ignore
//             ctx.fillRect(canvas.width/2-x, canvas.height - barHeight -30, barWidth, 5);
//             // ctx.fillStyle= 'rgb('+red+','+green+','+blue+')';
//             // // @ts-ignore
//             // ctx.fillRect(canvas.width/2-x, canvas.height - barHeight, barWidth, barHeight);
//             x += barWidth;
//         }
//     for (let i=0;i< bufferLen;i++){
//             barHeight = dataArray[i]*2;
//             const red = i* barHeight/20;
//             const green = i*8;
//             const blue = barHeight/8;
//             ctx.fillStyle = "white";
//             // @ts-ignore
//             ctx.fillRect(x, canvas.height - barHeight -30, barWidth, 5);
//             // ctx.fillStyle = 'rgb('+red+','+green+','+blue+')';
//             // // @ts-ignore
//             // ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
//             x += barWidth;
//         }
// }

/** FOR AUTO SOUND **/
// auto_btn.addEventListener('click', playSound);

// function playSound(){
//     const oscillator = audioctx.createOscillator();  //Creates a oscillator
//     oscillator.connect(audioctx.destination);   //Connects to the speaker
//     oscillator.type = 'sine';   //sine, square, triangle
//     oscillator.start();
//     setTimeout(()=>{
//         oscillator.stop();
//     }, 100);
// }
