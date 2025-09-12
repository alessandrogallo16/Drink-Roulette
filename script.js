const SERVER_ADDRESS1 = "https://www.thecocktaildb.com/api/json/v1/1/random.php?units=metric"


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


function loading () {

    randomSection.setAttribute("class", "random-drink d-none")
    loadingDiv.setAttribute("class", "container loading loading-div")
    
}

function stopLoading () {

    randomSection.setAttribute("class", "random-drink")
    loadingDiv.setAttribute("class", "container d-none loading loading-div")

}

function stopLoadingErr () {
    loadingDiv.setAttribute("class", "container d-none loading loading-div")
    errorDiv.setAttribute("class", "container loading error-div")
}

function refreshPage () {
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
                    ingredient = drink[`strIngredient${i}`]
                    dosaggio = drink[`strMeasure${i}`]
                        if (dosaggio === null) {
                            dosaggio = ""
                        }
                    
                    newItem.innerHTML =  `<div class="row"> <div class="col">${ingredient}</div> <div class="col text-end">${dosaggio}</div></div>`
                    listGroup.appendChild(newItem)
                    stopLoading()

                   
                }    
            }   
        
        })
    .catch(error => { 
        console.log(error + `  errore nel reperire le informazioni dal server (API FETCH)`)
        stopLoadingErr()



    })



        
newDrinkBtn.addEventListener("click", refreshPage)



