const DATABASE_ADDRESS = "./assets/data/drinks.json"

const drinkUL = document.querySelector(".drinklist-ul")
const drinkArray = []

function fillDrinkList() {

    fetch(DATABASE_ADDRESS)
        .then(result => {

            return result.json()
        })
        .then(data => {
            console.log(data.ingredienti)
            console.log(data.cocktails)
            const drinks = data.cocktails

            for (drink of drinks) {

                drinkArray.push(drink.nome)
            }


            drinkArray.sort()

            for (name of drinkArray) {

                console.log(name)

                const listItem = document.createElement("li")

                listItem.innerHTML = `<h5>${name}</h5>`

                drinkUL.appendChild(listItem)
            }


            console.log(drinkArray)




        })
        .catch(error => {
            console.log(error)

        })


}



document.addEventListener("DOMContentLoaded", () => {
    fillDrinkList()
})