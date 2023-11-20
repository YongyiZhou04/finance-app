let spendings = [];
let dates = [];

function updateChart(date, balance){
    dates.push(date.toString());
    spendings.push(balance);
    console.log(spendings);
    console.log(dates);
}

export{updateChart, spendings, dates};