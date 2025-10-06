const DATABASE_ADDRESS = "./assets/data/drinks.json"
const GOOGLE_SEARCH = "https://www.google.com/search?q="


const randomSection = document.querySelector(".random-drink")
const cardTitle = document.querySelector(".card-title")
const cardText = document.querySelector(".card-text")
const listIng = document.querySelector(".list-group")
const listItem = document.querySelectorAll(".list-group-item")
const cardImg = document.querySelector(".card-img-top")
const drinkType = document.querySelector(".drink-type")
const loadingDiv = document.querySelector(".loading-div")
const errorDiv = document.querySelector(".error-div")
const newDrinkBtn = document.querySelector(".new-drink-btn")
const cardLink = document.querySelector(".card-link")



function loading() {

    randomSection.setAttribute("class", "random-drink d-none")
    loadingDiv.setAttribute("class", "container loading loading-div")

}

function stopLoading() {

    randomSection.setAttribute("class", "random-drink")
    loadingDiv.setAttribute("class", "container d-none loading loading-div")

}

function stopLoadingErr() {
    loadingDiv.setAttribute("class", "container d-none loading loading-div")
    errorDiv.setAttribute("class", "container loading error-div")
}

function refreshPage() {
    location.reload()
}

function getRandomItem(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}

/* la funzione "convertIdText" serve per convertire l'id del dell'ingrediente del drink attuale, nel nome stesso dell' ingrediente;
    per poi aggiungere la ricerca automatica su google se viene cliccato il nome*/

function convertIdText() {

    fetch(DATABASE_ADDRESS)
        .then(result => {
            return result.json()
        })
        .then(data => {
            const ingToConvert = document.querySelectorAll(".ingredient-class")
            for (ing of ingToConvert) {
                for (i of data.ingredienti) {
                    if (i.id == ing.innerText) {
                        console.log("trovato id che corrisponde a ingrediente del drink attuale")
                        ing.innerText = i.nome
                    }
                }
            }


            const ingToSearch = document.querySelectorAll(".ingredient-class")
            for (singleIng in ingToSearch) {

                const actualIng = ingToSearch[singleIng]
                const ingUrl = GOOGLE_SEARCH + actualIng.innerText
                console.log(ingUrl)

                function Search() {
                    return window.open(ingUrl, '_blank')
                }
                actualIng.style.cursor = 'pointer'
                actualIng.addEventListener('click', Search)
            }
        })
        .catch(errore => console.log(errore))
}



function fillCardIng(arrIng) {
    for (ing of arrIng) {
        const newIng = document.createElement("li")
        newIng.innerHTML = `<div class="row"> <div class="col ingredient-class">${ing.ingredienteId}</div> <div class="col text-end">${ing.quantita}</div></div>`
        listIng.append(newIng)
    }
}


/* modifica del DOM e impaginazione delle informazioni */

fetch(DATABASE_ADDRESS)
    .then(result => {
        loading()
        return result.json()
    })
    .then(data => {
        console.log(data.ingredienti)
        console.log(data.cocktails)


        const newDrink = getRandomItem(data.cocktails)
        console.log(newDrink)

        cardImg.setAttribute("src", "." + newDrink.immagine.url)
        cardImg.setAttribute("alt", newDrink.immagine.alt)

        cardTitle.innerText = newDrink.nome
        drinkType.innerText = "Alcolico"
        cardText.innerText = newDrink.istruzioni
        fillCardIng(newDrink.ingredienti)
        convertIdText()








        cardLink.setAttribute("href", GOOGLE_SEARCH + newDrink.nome + " cocktail")
        stopLoading()

    })
    .catch(error => {
        console.log(error)
        stopLoadingErr()
    })




newDrinkBtn.addEventListener("click", refreshPage)