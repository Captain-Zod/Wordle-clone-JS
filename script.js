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
var CURRENTROW = document.getElementsByClassName("try")[0];

function addLetterToWORDLE(letter){
    if(WORDLE.length >= 5)
        return;
    letter = letter.toUpperCase();
    WORDLE.push(letter);
    getNextLetterbox().innerHTML = letter;
    console.log(WORDLE);
}

function backspace(){
    getNextLetterbox().innerHTML = "";
    WORDLE.pop();
    console.log(WORDLE);
}

function keyboardPress(keyCode){
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
    return CURRENTROW.children[WORDLE.length - 1];
}
  