const stocks = ['AAPL' ,'MSFT' ,'GOOGL' ,'AMZN' ,'PYPL', 'TSLA' ,'JPM' ,'NVDA', 'NFLX', 'DIS'];
async function render() {
    document.getElementById('chart').style.display='none'
    let stockChartsData,stockStatsData,stockSummary;
    try{
        stockChartsData = await (await fetch('https://stocks3.onrender.com/api/stocks/getstocksdata')).json()
        stockStatsData = await (await fetch('https://stocks3.onrender.com/api/stocks/getstockstatsdata')).json()
        stockSummary=await (await fetch('https://stocks3.onrender.com/api/stocks/getstocksprofiledata')).json()
       // console.log(stockStatsData);
    }
    finally {
        document.getElementById('chart').style.display='block'
        document.getElementById('waiting').style.display='none'
    }
    const stockListEle = document.getElementById('stockList')
    let options = {
        series: [{
            name: 'AAPL',
            data: createChart(stockChartsData,stockStatsData,stockSummary,'AAPL',"5y")
        }],
        chart: {
            id: 'area-datetime',
            type: 'area',
            height: 350,
            zoom: {
                autoScaleYaxis: true
            }
        },
        dataLabels: {
            enabled: false
        },
        markers: {
            size: 2,
            style: 'hollow',
        },
        xaxis: {
            type: 'datetime',
            min: createChart(stockChartsData,stockStatsData,stockSummary,'AAPL',"5y")[0][0],
            tickAmount: 10,
        },
        tooltip: {
            x: {
                format: 'dd MMM yyyy'
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.9,
                stops: [0, 100]
            }
        },
    };


}