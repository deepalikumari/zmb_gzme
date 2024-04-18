// eration 1: Declare variables required for this game
const game_body = document.getElementById("game-body")
let gun_sound = new Audio("./assets/shotgun.wav")
let bg_music = new Audio("./assets/bgm.mp3")
let z_id=0;
let lives = 5
let Zb;
let time = 60


function gameover(){
    location.href = "game-over.html"
}

game_body.onclick = ()=>{
    gun_sound.currentTime = 0
    gun_sound.play()
}

bg_music.play()
bg_music.loop = true


function genZ(){
    game_body.innerHTML += `<img src=./assets/zombie-${unique_no(1, 6)}.png class = zombie-image id = Zombies${z_id}>`
    Zb = document.getElementById(`Zombies${z_id}`)

    let second = unique_no(1,6)
    Zb.style.animationDuration =`${second}s`
    let viewWidth = unique_no(20, 80)
    Zb.style.transform = `translateX(${viewWidth}vw)`
    Zb.onclick = ()=>{
        kill(Zb)

    }
    z_id +=1
}
genZ()

// Iteration 7: Write the helper function to get random integer
function unique_no(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; 
  }

function kill(Zb){
    Zb.style.display = "none"
    z_id +=1
    genZ()
}


function zmEsc(Zb){

    if(Zb.getBoundingClientRect().top<=0){
      const maxLivesElement = document.getElementById("max-lives");
      maxLivesElement.style.width = lives*12+"%";
        kill(Zb)
        lives -= 1
        if(lives==0){
            gameover()
        }
    }
}

zmEsc(Zb)

setInterval(timer,1000)
function timer(){
    if(time<=0){
        window.location.href = "win.html"

    }else{
        time--
        clearInterval(timer)
        document.getElementById("timer").innerText = time
        zmEsc(Zb)
    }

}
setInterval(check,100)
function check() {
    zmEsc(Zb);
}