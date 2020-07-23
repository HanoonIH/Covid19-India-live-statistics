$(document).ready(function(){

    var url = "https://api.covid19india.org/data.json";

    $.getJSON(url, function(data){

        // Nav Buttons
        const buttons = document.querySelector('.buttons')
        const pages = document.querySelectorAll('.page')

        buttons.addEventListener('click', function(e){
            if (e.target.tagName == "BUTTON"){
                const targetPage = document.querySelector(e.target.dataset.target)
                pages.forEach(function (page){
                    if (page == targetPage){
                        page.classList.remove('hidden')
                    } else {
                        page.classList.add('hidden')
                    }
                })
            }
        })

        // Live status
        var lastUpdated, totalConfirmed, totalRecovered, totalActive, totalDeath;

        lastUpdated = data.statewise[0].lastupdatedtime;
        totalConfirmed = data.statewise[0].confirmed;
        totalRecovered = data.statewise[0].recovered;
        totalActive = data.statewise[0].active;
        totalDeath = data.statewise[0].deaths;

        $('#lastUpdated').append(lastUpdated);
        $('#confirmed').append(totalConfirmed);
        $('#recovered').append(totalRecovered);
        $('#active').append(totalActive);
        $('#death').append(totalDeath);

        // Variables for charts
        var state = [];
        var statecode = [];
        var confirmed = [];
        var recovered = [];
        var active = [];
        var deaths = [];

        $.each(data.statewise, function(id, obj){
            state.push(obj.state);
            statecode.push(obj.statecode);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            active.push(obj.active);
            deaths.push(obj.deaths);
        })

        state.shift()
        statecode.shift()
        confirmed.shift()
        recovered.shift()
        active.shift()
        deaths.shift()

        // Chart 1 - All States
        var myChart = document.getElementById('myChart').getContext('2d');

        myChart.canvas.style.height = '100vh';
        myChart.canvas.style.width = '100vw';

        var chartAll = new Chart(myChart, {
            type: 'horizontalBar',
            data: {
                labels: statecode,
                datasets: [
                    {
                        label: "Recovered",
                        data: recovered,
                        backgroundColor: "#36a2eb",
                        minBarLength: 100
                    },
                    {
                        label: "Confirmed",
                        data: confirmed,
                        backgroundColor: "#ffcd56",
                        minBarLength: 100
                    },
                    {
                        label: "Deaths",
                        data: deaths,
                        backgroundColor: "#ff6384",
                        minBarLength: 100
                    }
                ]
            },
            options: {
                legend:{
                    display: false,
                },
                title: {
                    display: true,
                    text: 'All states in India',
                    fontSize: 20,
                    fontStyle: 'normal'
                },
                tooltips: {
                    mode: 'index'
                }
            }

        });

        // Chart 2 -Top 5 States
        var top5StatesChart = document.getElementById('top5States').getContext('2d');

        top5StatesChart.canvas.style.height = '100vh';
        top5StatesChart.canvas.style.width = '100vw';

        var chartTop5 = new Chart(top5StatesChart, {
            type: 'bar',
            data: {
                labels: statecode. slice(0, 5),
                datasets: [
                    {
                        label: "Confirmed",
                        data: confirmed,
                        backgroundColor: "#ffcd56",
                        minBarLength: 100
                    },
                    {
                        label: "Recovered",
                        data: recovered,
                        backgroundColor: "#36a2eb",
                        minBarLength: 100
                    },
                    {
                        label: "Deaths",
                        data: deaths,
                        backgroundColor: "#ff6384",
                        minBarLength: 100
                    },
                ]
            },
            options: {
                title: {
                    display: true,
                    text: 'Most infected 5 States',
                    fontSize: 20,
                    fontStyle: 'normal'
                }
            }
        });


        // State cards
        for (i=0; i < data.statewise.length - 1; i++) {

            // State Cards
            const stateList = document.querySelector('#statesPage ul')

            // Add a new state cards setup
            let stateLi = document.createElement('li')
            let stateName = document.createElement('h1')
            let cardsContainer = document.createElement('div')

            let stateConfirmedCard = document.createElement('div')
            let stateConfirmedTitle = document.createElement('h1')
            let stateConfirmedCount = document.createElement('h1')

            let stateRecoveredCard = document.createElement('div')
            let stateRecoveredTitle = document.createElement('h1')
            let stateRecoveredCount = document.createElement('h1')

            let stateActiveCard = document.createElement('div')
            let stateActiveTitle = document.createElement('h1')
            let stateActiveCount = document.createElement('h1')

            let stateDeathCard = document.createElement('div')
            let stateDeathTitle = document.createElement('h1')
            let stateDeathCount = document.createElement('h1')

            // append cards to the document
            stateLi.appendChild(stateName)

            stateConfirmedCard.appendChild(stateConfirmedTitle)
            stateConfirmedCard.appendChild(stateConfirmedCount)
            cardsContainer.appendChild(stateConfirmedCard)
            
            stateActiveCard.appendChild(stateActiveTitle)
            stateActiveCard.appendChild(stateActiveCount)
            cardsContainer.appendChild(stateActiveCard)

            stateRecoveredCard.appendChild(stateRecoveredTitle)
            stateRecoveredCard.appendChild(stateRecoveredCount)
            cardsContainer.appendChild(stateRecoveredCard)

            stateDeathCard.appendChild(stateDeathTitle)
            stateDeathCard.appendChild(stateDeathCount)
            cardsContainer.appendChild(stateDeathCard)

            stateLi.appendChild(cardsContainer)
            stateList.appendChild(stateLi)

            // Add classes to created Elements
            stateName.classList.add("rounded-lg", "my-5", "bg-white", "shadow-lg", "p-5", "md:mx-4", "text-3xl", "text-center", "border-red-900", "border-4", "font-bold", "state-name")
            cardsContainer.classList.add('lg:flex')

            stateConfirmedCard.classList.add("card", "card-confirm", "group")
            stateConfirmedTitle.classList.add("card-title", "group-hover:text-gray-100")
            stateConfirmedCount.classList.add("card-count", "card-count-confirm", "group-hover:text-gray-100")

            stateRecoveredCard.classList.add("card", "card-recover", "group")
            stateRecoveredTitle.classList.add("card-title", "group-hover:text-gray-100")
            stateRecoveredCount.classList.add("card-count", "card-count-recover", "group-hover:text-gray-100")

            stateActiveCard.classList.add("card", "card-active", "group")
            stateActiveTitle.classList.add("card-title", "group-hover:text-gray-100")
            stateActiveCount.classList.add("card-count", "card-count-active", "group-hover:text-gray-100")

            stateDeathCard.classList.add("card", "card-death", "group")
            stateDeathTitle.classList.add("card-title", "group-hover:text-gray-100")
            stateDeathCount.classList.add("card-count", "card-count-death", "group-hover:text-gray-100")

            // Add content to titles
            stateConfirmedTitle.textContent = 'Confirmed:'
            stateRecoveredTitle.textContent = 'Recovered:'
            stateActiveTitle.textContent = 'Active:'
            stateDeathTitle.textContent = 'Deaths:'

            // Add content to State name, count
            stateName.textContent = state[i] + ` (${statecode[i]})`
            stateConfirmedCount.textContent = confirmed[i]
            stateRecoveredCount.textContent = recovered[i]
            stateActiveCount.textContent = active[i]
            stateDeathCount.textContent = deaths[i]
        }
    });
});


