$(document).ready(function(){

    var url = "https://api.covid19india.org/data.json";

    $.getJSON(url, function(data){
        console.log(data)

        var totalConfirmed, totalRecovered, totalActive, totalDeath;

        var state = [];
        var confirmed = [];
        var recovered = [];
        var deaths = [];

        $.each(data.statewise, function(id, obj){
            state.push(obj.state);
            confirmed.push(obj.confirmed);
            recovered.push(obj.recovered);
            deaths.push(obj.deaths);
        })

        state.shift()
        confirmed.shift()
        recovered.shift()
        deaths.shift()

        console.log(state)

        totalConfirmed = data.statewise[0].confirmed;
        totalRecovered = data.statewise[0].recovered;
        totalActive = data.statewise[0].active;
        totalDeath = data.statewise[0].deaths;

        $('#confirmed').append(totalConfirmed);
        $('#recovered').append(totalRecovered);
        $('#active').append(totalActive);
        $('#death').append(totalDeath);

        var myChart = document.getElementById('myChart').getContext('2d');

        var chart = new Chart(myChart, {
            type: 'line',
            data: {
                labels: state,
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
                    }
                ]
            },
            options: {}

        })

    })
})

