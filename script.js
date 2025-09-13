const SERVER_ADDRESS1 = "https://www.thecocktaildb.com/api/json/v1/1/random.php?units=metric"
const GOOGLE_SEARCH = "https://www.google.com/search?q="


const randomSection = document.querySelector(".random-drink")
const cardTitle = document.querySelector(".card-title")
const cardText = document.querySelector(".card-text")
const listGroup = document.querySelector(".list-group")
const listItems = document.querySelectorAll(".list-group-item")
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

fetch(SERVER_ADDRESS1)
    .then(result => {
        loading()
        return result.json()
    })
    .then(json => json.drinks[0])
    .then(drink => {
        cardImg.setAttribute("src", drink.strDrinkThumb)
        cardTitle.innerText = drink.strDrink;
        cardText.innerText = drink.strInstructionsIT;
        for (i = 1; i < 16; i++) {
            if (drink[`strIngredient${i}`] !== null) {
                drinkType.innerText = drink.strAlcoholic === "Alcoholic" ? "Alcolico" : "Non alcolico"

                let newItem = document.createElement('li')
                newItem.setAttribute("class", "list-group-item")
                let ingredient = drink[`strIngredient${i}`]
                let dosaggio = drink[`strMeasure${i}`]
                if (dosaggio === null) {
                    dosaggio = ""
                }
                newItem.innerHTML = `<div class="row"> <div class="col ingredient-class">${ingredient}</div> <div class="col text-end">${dosaggio}</div></div>`
                listGroup.appendChild(newItem)
                cardLink.setAttribute("href", GOOGLE_SEARCH + drink.strDrink)

                let ingredientUrl = GOOGLE_SEARCH + ingredient
                let ingredientDiv = newItem.querySelector('.ingredient-class')
                ingredientDiv.style.cursor = 'pointer'
                ingredientDiv.addEventListener('click', () => {
                    window.open(ingredientUrl, '_blank')
                })


                
            }
        }
        stopLoading()

    })
    .catch(error => {
        console.log(error)
        stopLoadingErr()
    })




newDrinkBtn.addEventListener("click", refreshPage)



