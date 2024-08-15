let btnRef = document.querySelectorAll(".btn-Opt");
let popRef = document.getElementById("popupMessage"); 
let newGame = document.getElementById("new_game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

document.getElementById('new_game').addEventListener('click', function() {
    document.getElementById('startScreen').classList.add('hide');
    document.getElementById('gameArea').classList.remove('hide');
});

document.getElementById('restart').addEventListener('click', function() {
    alert("Game Reset");
});

let winningPattern = [
    [0, 1, 2],
    [0, 3, 6],
    [2, 5, 8],
    [6, 7, 8],
    [3, 4, 5],
    [1, 4, 7],
    [0, 4, 8],
    [2, 4, 6],
];

let xturn = true; 
let count = 0;


const disabledButtons = () => {
    btnRef.forEach((element) => (element.disabled = true));
}

const enableButtons = () => {
    btnRef.forEach((element) => {
        element.innerText = "";  
        element.disabled = false;
    });
    popRef.classList.add("hide");
}

newGame.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

restartBtn.addEventListener("click", () => {
    count = 0;
    enableButtons();
});

const winFunction = (letter) => {
    disabledButtons(); 
    popRef.classList.remove("hide"); 
    if (letter === "X") {
        msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
    } else if (letter === "O") {
        msgRef.innerHTML = "&#x1F369; <br> 'O' Wins";
    }
}
const drawFunction = () => {
    disabledButtons(); 
    msgRef.innerHTML = "&#x1F603; <br> It's a Draw"; 
    popRef.classList.remove("hide");  
}

const winChecker = () => {
    for (let pattern of winningPattern) {
        let [element1, element2, element3] = [
            btnRef[pattern[0]].innerText,
            btnRef[pattern[1]].innerText,
            btnRef[pattern[2]].innerText,
        ];
        if (element1 !== "" && element1 === element2 && element2 === element3) {
            winFunction(element1);
            return true;
        }
    }
    return false;
}

btnRef.forEach((element) => {
    element.addEventListener("click", () => {
        if (element.innerText === "") {  
            if (xturn) {
                element.innerText = "X"; 
                xturn = false; 
            } else {
                element.innerText = "O";
                xturn = true; 
            }
            element.disabled = true;
            count += 1; 

            if (winChecker()) {
                return;  
            }
            if (count === 9) {
                drawFunction();
            }
        }
    });
});
