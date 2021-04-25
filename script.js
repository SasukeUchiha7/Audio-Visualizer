const play_btn = document.getElementById("button1");
const auto_btn = document.getElementById("button2");
const file = document.getElementById('fileupload');

const container = document.getElementById('container');
const canvas = document.getElementById('canvas1');
// @ts-ignore
const ctx = canvas.getContext('2d');

console.log(canvas);
// @ts-ignore
canvas.width = window.innerHeight;
// @ts-ignore
canvas.height = window.innerHeight;

let audioSource;
let analyser;

file.addEventListener("change",()=>{
    const audio = document.getElementById('audio');
    // @ts-ignore
    const files= file.files;
    const audioctx = new AudioContext();
    // @ts-ignore
    audio.src = URL.createObjectURL(files[0]);
    // @ts-ignore
    audio.load();
    // @ts-ignore
    audio.play();
    // @ts-ignore
    audioSource = audioctx.createMediaElementSource(audio);
    analyser = audioctx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioctx.destination);
    analyser.fftSize = 64;
    const bufferLen = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLen);

    // @ts-ignore
    const barWidth = canvas.width/bufferLen;
    let barHeight;
    let x;

    function animate(){
        x=0;
        // @ts-ignore
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        analyser.getByteFrequencyData(dataArray);
        for (let i=0;i< bufferLen;i++){
            barHeight = dataArray[i]*2;
            ctx.fillStyle= 'white';
            // @ts-ignore
            ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
            x += barWidth;
        }
        requestAnimationFrame(animate);
    }

    animate();

});

// console.log(audioctx);

// audio.src = 'audio.wav';

// play_btn.addEventListener('click', ()=>{
//     audio.play();
//     audio.addEventListener('playing', ()=>{
//         console.log("Started playing audio");
//     });
// });

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

