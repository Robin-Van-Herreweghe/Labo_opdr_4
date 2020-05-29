$(document).ready(function(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var arr = JSON.parse(xhttp.responseText);
            for(i=0;i<arr.length;i++)
                {
                    var table = document.getElementById("Table1")
                    var row = table.insertRow(i+1);
                    var cell1 = row.insertCell(0);
                    var cell2 = row.insertCell(1);
                    cell1.innerHTML = arr[i]['Temp'];
                    cell2.innerHTML = arr[i]['Date'];
                    var data, options, chart;
                }
            // Load the Visualization API and the corechart package.
            google.charts.load('current', {'packages':['corechart']});

            // Set a callback to run when the Google Visualization API is loaded.
            google.charts.setOnLoadCallback(drawChart);

            // Callback that creates and populates a data table,
            // instantiates the pie chart, passes in the data and
            // draws it.
            function drawChart() {

                // Create the data table.
                var data = new google.visualization.DataTable();
                data.addColumn('string', 'Datum');
                data.addColumn('number', 'Temperatuur');
            
                for(var j = 0; j < arr.length; j++)
                
                    data.addRow([arr[j]['Date'],parseInt(arr[j]['Temp'])]);

                // Set chart options
                var options = {
                        chart: {
                                        title: 'CO2waardes van de afgelopen 24 uur',
                                        subtitle: 'Hogeschool Vives, lokaal A118'
                                },
                        width: '100%',
                        height: '500',
                        legend: {position:'none', alignment: 'end'}
                        };

                // Instantiate and draw our chart, passing in some options.
                var chart = new google.visualization.LineChart(document.getElementById('Grafiek'));
                chart.draw(data, options);
            }
        }
    };
    xhttp.open("GET", "/data.json", true);
    xhttp.send();   
}); 