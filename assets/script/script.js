// ############# INIZIO DICHIARAZIONI VARIABILI #############

//const DATABASE_ADDRESS = "./assets/data/drinks.json"
const DATABASE_ADDRESS = "https://drink-roulette-backend.onrender.com/api/drinks/"  
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
const searchByIdInput = document.querySelector(".search-by-id")
const searchByIdBtn = document.querySelector(".search-by-id-btn")


// ############# FINE DICHIARAZIONI VARIABILI #############



// ############# INIZIO FUNZIONI #############

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



function getRandomItem(array) {
    const index = Math.floor(Math.random() * array.length)
    return array[index]
}


async function getDrinkById(id) {
    
    listIng.innerHTML = "";

    try {
        
        const res = await fetch(`${DATABASE_ADDRESS}${id}`);
        if (!res.ok) {
            throw new Error("Drink non trovato");
        }

        const foundDrink = await res.json();
        console.log(foundDrink)

        
        cardImg.setAttribute("src", "./" + foundDrink.data.immagine.url);
        cardImg.setAttribute("alt", foundDrink.data.immagine.alt);

        
        cardTitle.innerText = foundDrink.data.nome;
        drinkType.innerText = "Alcolico"; 
        cardText.innerText = foundDrink.data.istruzioni;

        
        fillCardIng(foundDrink.data.ingredienti);
        

        
        cardLink.setAttribute("href", GOOGLE_SEARCH + foundDrink.data.nome + " cocktail");

        stopLoading();
    } catch (error) {
        console.error(error);
        window.alert(error.message || "Errore nel recupero del drink");
    }
}



function fillCardIng(arrIng) {
    listIng.innerHTML = "";
    for (ing in arrIng) {
        const newIng = document.createElement("li");
        let name = arrIng[ing].ingrediente.nome
        let quantity = arrIng[ing].quantita
        

        newIng.innerHTML = `<div class="row">
                                <div class="col-8 ingredient-class">${name}</div>
                                <div class="col-4 text-end">${quantity}</div>
                            </div>`;
        listIng.append(newIng);
    }
}




async function getRandomDrink() {
    try {
        loading();
        const res = await fetch(DATABASE_ADDRESS);
        const data = await res.json();

        const drinks = data.data; // backend restituisce { success: true, data: [...] }
        const newDrink = getRandomItem(drinks);

        console.log(drinks)

        cardImg.setAttribute("src", newDrink.immagine.url);
        cardImg.setAttribute("alt", newDrink.immagine.alt);
        cardTitle.innerText = newDrink.nome;
        drinkType.innerText = "Alcolico"; // o usa newDrink.tipo se presente
        cardText.innerText = newDrink.istruzioni;

        fillCardIng(newDrink.ingredienti);
        console.log(newDrink.ingredienti)
        

    



        cardLink.setAttribute("href", GOOGLE_SEARCH + newDrink.nome + " cocktail");
        stopLoading();
    } catch (error) {
        console.log(error);
        stopLoadingErr();
    }
}



// ############# FINE FUNZIONI #############




getRandomDrink()


newDrinkBtn.addEventListener("click", () => {
    setTimeout(getRandomDrink, "500")
    

} )


searchByIdBtn.addEventListener("click", () => {


    const searchText = searchByIdInput.value

    getDrinkById(searchText)

})