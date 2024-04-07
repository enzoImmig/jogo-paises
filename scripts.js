import country_list from './Data/countries_list.json' with { type: 'json' };

const maxTries = 5;
let curTry = 0;

window.onload = function(){
    initialize();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function winningPage(msg) {
    let winPage = document.createElement('div')
    winPage.id = 'win-page'
    document.getElementById('body').appendChild(winPage)

    let winTitle = document.createElement('h1')
    winTitle.id = 'win-title'
    winTitle.innerText = msg
    winPage.appendChild(winTitle)

    let restartButton = document.createElement('button')
    restartButton.id = 'restart-button'
    restartButton.textContent = 'Reiniciar'
    restartButton.addEventListener('click', function(){
        location.reload()
    })
    winPage.appendChild(restartButton)
}

function initialize(){

    let auxRnd = getRndInteger(0, 240)    
    let codeLC = country_list[auxRnd]['code'].toLowerCase()
    let img = document.createElement('img')
    img.src = `./Data/Flags/${codeLC}.png`
    document.getElementById('body').appendChild(img)

    const attempts = document.createElement('h2')
    attempts.id = 'num-attempts'
    document.getElementById('body').appendChild(attempts)
    attempts.innerText = curTry.toString() + '/' + maxTries.toString()

    const guessesList = document.createElement('div')
    guessesList.id = 'guesses-list'
    document.getElementById('body').appendChild(guessesList)
    
    let arrCountriesNames = []
    country_list.forEach(element => {
        arrCountriesNames.push(element['name'])
    });
    
    const inputField = document.getElementById('input-country')
    const optionsList = document.getElementById('option-list')

    inputField.addEventListener('input', function() {
        const inputValue = inputField.value.toLowerCase();
        let filteredOptions = arrCountriesNames.filter(option =>
            option.toLowerCase().includes(inputValue)
        );

        if(filteredOptions.length === 0) {
            optionsList.style.display = 'none'
        } else {
            optionsList.innerHTML = ' '
            filteredOptions.forEach(option => {
                const optionButton = document.createElement('button');
                optionButton.textContent = option;

                optionButton.addEventListener('click', function() {
                    inputField.value = option;
                    optionsList.style.display = 'none'

                    const guess = document.createElement('h2');
                    guess.innerText = optionButton.textContent
                    console.log(guess.innerHTML)
                    guessesList.appendChild(guess)

                    if(inputField.value == country_list[auxRnd]['name']){
                        winningPage("You won! Congrats!");
                    }

                    inputField.value = '';

                    curTry += 1;
                    attempts.innerText = curTry.toString() + '/' + maxTries.toString()

                    if(curTry === maxTries){
                        winningPage("You lost! You got it in the next one!");
                    }
                });
                optionsList.appendChild(optionButton)
            });
            optionsList.style.display = 'block'
        }

    })
    return true
}


