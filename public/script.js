$(document).ready(function(){

    var url = "https://api.covid19india.org/data.json";

    $.getJSON(url, function(data){
        console.log(data)

        var totalConfirmed, totalRecovered, totalActive, totalDeath;

        totalConfirmed = data.statewise[0].confirmed;
        totalRecovered = data.statewise[0].recovered;
        totalActive = data.statewise[0].active;
        totalDeath = data.statewise[0].deaths;

        $('#confirmed').append(totalConfirmed);
        $('#recovered').append(totalRecovered);
        $('#active').append(totalActive);
        $('#death').append(totalDeath);

    })

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
})

