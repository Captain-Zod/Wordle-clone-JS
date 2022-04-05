var WordContainsLetter =
{
    False: 0,
    InOtherPosition: 1,
    True: 2
};

function CheckGuess(answer, guess){
    if (guess.length != answer.length)
        throw "Exception!";
    let answerr = answer.split('');
    var res = [];
    for (let i = 0; i < guess.length; i++)
    {
        let result;
        let currLetter = guess[i];
        if (!answerr.includes(currLetter))
        {
            result = WordContainsLetter.False;
        }
        else if(answerr[i] == currLetter)
        {
            answerr[i] = '\\';
            result = WordContainsLetter.True;
        }
        else
        {
            answerr[answerr.indexOf(currLetter)] = '\\';
            result = WordContainsLetter.InOtherPosition;
        }
        res.push({guess: currLetter, result});
    }
    return res;
}

var WORDLE = [];
var REGEX = new RegExp("[A-Za-z]{1}");
var ROWS = document.getElementsByClassName("try");
var CURRENTROWINDEX = 0;
var gameover = false;

function getCurrentRow(){
    return ROWS[CURRENTROWINDEX];
}

for (let element of ROWS) {
    for (let cell of element.children) {
        cell.setAttribute("status", "empty");
    }
}

function addLetterToWORDLE(letter){
    if(WORDLE.length >= 5)
        return;
    letter = letter.toUpperCase();
    WORDLE.push(letter);
    var box = getNextLetterbox();
    box.innerHTML = letter;
    box.setAttribute("status", "written");
    console.log(WORDLE);
}

function backspace(){
    var box = getNextLetterbox();
    box.innerHTML = "";
    box.setAttribute("status", "empty");
    WORDLE.pop();
    console.log(WORDLE);
}

function keyboardPress(keyCode){
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
    console.log(e);
    keyboardPress(e.keyCode)
  });

function getNextLetterbox(){
    return getCurrentRow().children[WORDLE.length - 1];
}

function SubmitGuess(){
    if(WORDLE.length != 5)
        return;
    if(gameover)
        return;

    for (let cell of getCurrentRow().children) {
        cell.setAttribute("status", "true");
    }
    WORDLE = [];
    if(CURRENTROWINDEX++ >= 5){
        gameover = true;
        return;
    }
}
  