console.log("script OK !")

// fonction qui supprime l'existant de la div defaultResult
function deleteDefaultResult() {
    document.querySelector(".defaultResult").remove()
    document.querySelector("#resultBoxe").innerHTML += ""
}

//fonction qui ajoute les trips de la base donnée en fonction des valeurs des input
document.querySelector("#searchTrip").addEventListener("click", function () {
    const departureValue = document.querySelector(".inputTop").value
    const arrivalValue = document.querySelector(".inputDown").value
    const dateValue = document.querySelector(".inputDate").value
    // test des valeurs écrits dans les input 
    console.log(departureValue)
    console.log(arrivalValue)
    console.log(dateValue)

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
            console.log(data)
            if (data.result) {
                document.querySelector("#defaultResult").remove()
                
                for (let i = 0; i < data.allTrips.length; i++) {
                    const formattedTime = moment(data.allTrips[i].date).format("HH:mm");

                    document.querySelector("#resultBoxe").innerHTML += `                   
                        <div id="tripContainer">
                        <div id="DepartureCity" class="values">${data.allTrips[i].departure}</div>
                        <div><p>></p></div>
                        <div id="ArrivalCity" class="values">${data.allTrips[i].arrival}</div>
                        <div id="hour" class="values">${formattedTime}</div>
                        <div id="price" class="values">${data.allTrips[i].price}</div>
                        <input id="buttonBook" class="button" type="button" value="Book">
                        </div>                   
                    `;
                   //permet de vider les valeurs des input après la recherche
                    // document.querySelector(".inputTop").value = '';
                    // document.querySelector(".inputDown").value = '';
                    // document.querySelector(".inputDate").value = '';
                }
                //  document.querySelector("#tripContainer").remove()
            }

            else {
                console.log("no trips found")
                document.querySelector("#imageAccueil").src = "./images/notfound.png"
                document.querySelector(".textResult").textContent = "No trip found."
            }
        })
})


