import country_list from './Data/countries_list.json' with { type: 'json' };

window.onload = function(){
    initialize();
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function initialize(){

    let auxRnd = getRndInteger(0, 240)    
    let country = document.getElementById("nome_pais")

    let codeLC = country_list[auxRnd]['code'].toLowerCase()
    let img = document.createElement('img')
    img.src = `./Data/Flags/${codeLC}.png`
    document.getElementById('body').appendChild(img)

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
                        console.log("Acertou!!");
                        location.reload()
                    }

                    inputField.value = '';
                });
                optionsList.appendChild(optionButton)
            });
            optionsList.style.display = 'block'
        }

    })

    inputField.addEventListener('focusout', function() {
        //optionsList.style.display = 'none'
    })

    return true
}


