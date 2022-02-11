console.log("Hello Gamers");
let gover = new Audio("win.mp3");
let tchange = new Audio("tun.mp3");
let turn = "X";
let gameover = false;
const changeTurn = ()=>{
    if(turn === "X"){
        turn = "0";
    }
    else{
        turn = "X";
    }
}

const checkwin = ()=>{
    btexts = document.getElementsByClassName('btext');
    let win_pos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    win_pos.forEach(pos =>{
        if((btexts[pos[0]].innerText===btexts[pos[1]].innerText) && (btexts[pos[0]].innerText===btexts[pos[2]].innerText) && (btexts[pos[0]].innerText !== '')){
            document.querySelector('.win').style.width = '100px';
            document.getElementById('side').innerHTML = "Game Over.<br>'" + turn + "' Won";
            gameover = true;
        }
    })

}

const reset = ()=>{
    btexts = document.getElementsByClassName('btext');
    Array.from(btexts).forEach(t => {
        t.innerText = ''
    })
    turn = 'X';
    gameover = false;
    document.getElementById('side').innerText = "Turn for 'X'"
    document.querySelector('.win').style.width = '0px';
}

let boxes = document.getElementsByClassName("box");


    Array.from(boxes).forEach(element =>{
        let btext = element.querySelector('.btext');
        element.addEventListener('click', (t)=>{
            if(btext.innerText==='' && gameover === false){
                btext.innerText = turn;
                checkwin();
                changeTurn();
                // tchange.play();
                if(gameover === false){
                    document.getElementById('side').innerText = "Turn for '" + turn +"'" ;
                }
            }
        })
    })

let res = document.querySelector('.but');

res.addEventListener('click',reset);