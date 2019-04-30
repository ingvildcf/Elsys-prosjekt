function fetchAndDisplayDataFromTo(from, to) {
    fetch('https://vannovervakning.com/api/v1/measurements/4/' + from + '/' + to)
    .then(function (response) {
        return response.json();
    })
    .then(function (result) {
        timestampToHoursAndMinutes(result);
        timestampToDate(result);

        var labelsC = []
        var valuesC = []


        var res = result.data.CONDUCTIVITY.forEach(element => {
            valuesC.push(element.value)
            labelsC.push(element.timeCreated)
        });

        labelsC.reverse()
        valuesC.reverse()

        for (i = 0; i < labelsC.length; i++) {
            labelsC[i] = timestampToDate(labelsC[i]) + " " + timestampToHoursAndMinutes(labelsC[i]);
        }

        var ctx = document.getElementById("myChart111").getContext('2d');
        var myLineChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labelsC,
                datasets: [{
                    label: "Konduktivitet",
                    borderColor: 'rgb(130, 177, 255)',
                    data: valuesC,
                }]
            },
            options: {
                layout: {
                    padding: {
                        bottom: 20

                    }
                }
            }
        });

    });
}


function timestampToHoursAndMinutes(timestamp) {
    var javaScriptRelease = Date.parse(timestamp);
    var date = new Date(javaScriptRelease);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = '0' + date.getMinutes()
    }
    return hours + ":" + minutes;
}

function timestampToDate(timestamp) {
    var javaScriptRelease = Date.parse(timestamp);
    var date = new Date(javaScriptRelease);
    return date.getDate() + "." + parseInt(date.getMonth())+1 + "." + date.getFullYear();
}
