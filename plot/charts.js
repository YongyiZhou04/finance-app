let balances = [];
let dates = [];

const lineData = {
  labels: dates,
  datasets: [{
        data: balances,
        fill: false,
        borderColor: '#1F6F73',
        tension: 0.1
  }]
};

const lineConfig = {
    type: 'line',
    data: lineData,
    options: {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day'
                },
                min: dates.sort()[dates.length-1],
                max: dates.sort()[0],
                display: true,
                grid: {
                    display: false,
                },
                offsetAfterAutoskip: false,
            },
            y: {
                display: true,
                ticks: {
                    color: "#A5A6CC",
                    font: {
                        family: ""
                    }
                },
                grid: {
                    color: "#8bb0a4",
                    tickLength: 5,
                },
                border: {
                    dash: [2,2]
                    
                },
            },
        },
        plugins: {
            legend: {
                display: false
            }
        }
    },
};

// Get the canvas element
const lineCanvas = document.getElementById('lineChart');

// Create a new chart on the canvas
const lineChart = new Chart(lineCanvas, lineConfig);

const pieData = {
        labels: [
        'Income',
        'Expenses',
        'Other'
        ],
        datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#525F6F',
            '#CCE0DC',
            '#7A9698'
        ],
        hoverOffset: 4
        }]
    };

    const pieConfig = {
        type: 'doughnut',
        data: pieData,
        options: {
            responsive: true,
            cutout: "70",
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    };

const pieCanvas = document.getElementById('pieChart');

// Create a new chart on the canvas
const pieChart = new Chart(pieCanvas, pieConfig);

function updateChart(date, balance){
    let stringDate = date.toString();
    dates.push(stringDate.substr(6,4).concat("-", stringDate.substr(0,2), "-", stringDate.substr(3,2)));
    dates.sort();
    console.log("min" + dates[dates.length-1].toString());
    balances.push(balance);

    // Update the chart data
    lineChart.data.labels = dates.slice();
    lineChart.data.datasets[0].data = balances.slice();

    // Update the chart
    lineChart.update();
}

export {updateChart};