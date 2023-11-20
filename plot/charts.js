let spendings = [];
let dates = [];

const lineData = {
  labels: dates,
  datasets: [{
        label: 'My First Dataset',
        data: spendings,
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
                display: true,
                grid: {
                    display: false,
                },
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
        label: 'My First Dataset',
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
    dates.push(date.toString());
    spendings.push(balance);
    console.log(spendings);
    console.log(dates);

    // Update the chart data
    lineChart.data.labels = dates.slice();
    lineChart.data.datasets[0].data = spendings.slice();

    // Update the chart
    lineChart.update();
}

export {updateChart};