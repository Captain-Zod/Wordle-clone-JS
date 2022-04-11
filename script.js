var WordContainsLetter =
{
    False: 0,
    InOtherPosition: 1,
    True: 2
};

var cellStatus =
{
    empty: "empty",
    written: "written",
    gray: "gray",
    yellow: "yellow",
    green: "green"
};

var letterStatus = {
    0: cellStatus.gray,
    1: cellStatus.yellow,
    2: cellStatus.green
};

var WORDLE = [];
var REGEX = new RegExp("[A-Za-z]{1}");
var ROWS = document.getElementsByClassName("try");
var CURRENTROWINDEX = 0;
var gameover = false;
const random = Math.floor(Math.random() * wp.length);
var ANSWER = wp[random].toUpperCase();
console.log(ANSWER);
//a.every((val, index) => val === b[index]);
function CheckGuess(answer, guess){
    if (guess.length != answer.length)
        throw "Exception!";
    let answerr = answer.split('');
    var temp = [];
    for (let i = 0; i < guess.length; i++)
    {
        if(answerr[i] == guess[i])
        {
            answerr[i] = '\\';
            temp.push({index: i, guess: guess[i], result: WordContainsLetter.True});
        }
    }

    for (let i = 0; i < guess.length; i++)
    {
        if (answerr.includes(guess[i]))
        {
            answerr[answerr.indexOf(guess[i])] = '\\';
            temp.push({index: i, guess: guess[i], result: WordContainsLetter.InOtherPosition});
        }
    }

    var res = [];
    for (let i = 0; i < guess.length; i++) {
        let a = temp.find(item => { return item.index == i});
        if(a == undefined)
            res.push({index: i, guess: guess[i], result: WordContainsLetter.False});
        else
            res.push(a);
    }
    return res;
}

function getCurrentRow(){
    return ROWS[CURRENTROWINDEX];
}
function setCellStatus(cell, status){
    cell.setAttribute("status", status);
}

for (let element of ROWS) {
    for (let cell of element.children) {
        setCellStatus(cell, cellStatus.empty);
    }
}

function addLetterToWORDLE(letter){
    if(WORDLE.length >= 5)
        return;
    letter = letter.toUpperCase();
    WORDLE.push(letter);
    var box = getNextLetterbox();
    box.innerHTML = letter;
    setCellStatus(box, cellStatus.written);
    //console.log(WORDLE);
}

function backspace(){
    var box = getNextLetterbox();
    box.innerHTML = "";
    setCellStatus(box, cellStatus.empty);
    WORDLE.pop();
    //console.log(WORDLE);
}

function keyboardPressed(keyCode){
    if(gameover)
        return;

    if(keyCode === 8){ //Backspace
        backspace();
    }
    else if(keyCode === 13){ //Enter
        SubmitGuess();
    }
    else {
        var letter = String.fromCharCode(keyCode);
        if(letter.length == 1 && REGEX.test(letter))
            addLetterToWORDLE(letter);
    }
}

document.addEventListener('keydown', (e) => {
    keyboardPressed(e.keyCode)
  });

function getNextLetterbox(){
    return getCurrentRow().children[WORDLE.length - 1];
}

function SubmitGuess(){
    if(WORDLE.length != 5)
        return;
    if(gameover)
        return;
    var res = CheckGuess(ANSWER, WORDLE);
    console.log(res);
    var array = getCurrentRow().children;
    for (let i = 0; i < array.length; i++) {
        let cell = array[i];
        setTimeout(() => {
            setCellStatus(cell, letterStatus[res[i].result]);
        }, 300 * i);
    }
    WORDLE = [];
    if(CURRENTROWINDEX++ >= 5){
        gameover = true;
        return;
    }
}

var buttons = document.getElementsByClassName('key');

for (let key of buttons) {
    key.onclick = e =>{
        buttonPressed(key.getAttribute("letter"));
    }
}

//todo
function buttonPressed(str){
    if(gameover)
        return;

    if(str === "Backspace"){ //Backspace
        backspace();
    }
    else if(str === "Enter"){ //Enter
        SubmitGuess();
    }
    else {
        if(REGEX.test(str))
            addLetterToWORDLE(str);
    }
}