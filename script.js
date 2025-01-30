// const moment = require('moment');
console.log("script OK !")

//fonction qui ajoute les trips de la base donnée en fonction des valeurs des input
document.querySelector("#searchTrip").addEventListener("click", function () {
    const departureValue = document.querySelector(".inputTop").value
    const arrivalValue = document.querySelector(".inputDown").value
    const dateValue = document.querySelector(".inputDate").value
    // test des valeurs écrits dans les input 
    console.log(departureValue)
    console.log(arrivalValue)
    console.log(dateValue)

    // Supprime l'élément "defaultResult" s'il existe
    const defaultResult = document.querySelector("#defaultResult");
    if (defaultResult) {
        defaultResult.remove();
    }

   
    //vas dans la route trips pour vérifier et récupérer les valeurs de la BDD
    fetch('http://localhost:3000/trips/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            departure: departureValue,
            arrival: arrivalValue,
            date: dateValue,
        })
    }).then(response => response.json())
        .then(data => {          

            if (data.result) {
                 // Vider les anciens résultats si la data est trouvée en amont
                document.querySelector("#resultBoxe").innerHTML = ""
                for (let i = 0; i < data.allTrips.length; i++) {
                    // extrait les heures et minutes de la valeur "date" reçu de la BDD
                    const date = new Date(data.allTrips[i].date);
                    const hours = date.getUTCHours().toString().padStart(2, "0"); // Ajoute un 0 si nécessaire
                    const minutes = date.getUTCMinutes().toString().padStart(2, "0");
                    // console.log(`${hours}:${minutes}`); 

                    document.querySelector("#resultBoxe").innerHTML += `                   
                        <div id="tripContainer">
                        <div id="DepartureCity" class="values">${data.allTrips[i].departure}</div>
                        <div><p>></p></div>
                        <div id="ArrivalCity" class="values">${data.allTrips[i].arrival}</div>
                        <div id="hour" class="values">${hours}:${minutes}</div>
                        <div id="price" class="values">${data.allTrips[i].price}</div>
                        <input id="buttonBook" class="button" type="button" value="Book">
                        </div>                   
                    `;
                    // vide les valeurs des input après la recherche
                    document.querySelector(".inputTop").value = '';
                    // document.querySelector(".inputDown").value = '';
                    // document.querySelector(".inputDate").value = '';
                }
            }

            else {
                document.querySelector("#resultBoxe").innerHTML = `                   

                 <div id="defaultResult">

                        <div class="imageResult">
                            <img id="imageAccueil" src="./images/notfound.png"/>
                        </div>

                        <div class="textResult">
                            <p>No trip found.</p>
                        </div>
                    </div>
                    `;
            }
        })
})





