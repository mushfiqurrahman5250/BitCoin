document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("#currency-form").onsubmit = () => {
        var base = document.getElementById("currency-from").value;
        fetch(`https://api.exchangerate.host/latest?/source=ecb&base=${base}`)
            .then((response) => response.json())
            .then((data) => {
                // console.log(data)
                const amount = document.querySelector("#input-amount").value;
                const currencyTo = document.getElementById("currency-to").value;
                const rate = data.rates[currencyTo];

                function convert() {
                    return amount * rate;
                }
                document.querySelector(
                    ".display-result"
                ).innerHTML = `${amount} ${base.toUpperCase()} equal to ${currencyTo} ${convert().toFixed(
            4
          )}`;
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        return false;
    };

    document.querySelector("#lowest-Bitcoin-rate-form").onsubmit = () => {
        var fromDate = document.querySelector("#fromDate").value;
        var toDate = document.getElementById("toDate").value;
        fetch(
                /* 
        api request url=https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-08&end=2022-01-11&currency=eur
        response={"bpi":{"2022-01-08":36694.9962,"2022-01-09":36858.4155,"2022-01-10":36936.3328,"2022-01-11":37599.288},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as EUR.","time":{"updated":"Jan 12, 2022 00:03:00 UTC","updatedISO":"2022-01-12T00:03:00+00:00"}}
        minimum rate=36694.9962
  
        */
                `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=eur`
            )
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                var minRateList = [];
                for (var key in data.bpi) {
                    minRateList.push(data.bpi[key]);
                    console.log(minRateList);
                }

                var minRate = Math.min(...minRateList);
                console.log(minRate);


                document.querySelector(
                    ".display-lowest-Bitcoin-rate"
                ).innerHTML = `The lowest Bitcoin rate from ${fromDate} to ${toDate} is ${minRate} EUR`;
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        return false;
    };

    document.querySelector("#highest-Bitcoin-rate-form").onsubmit = () => {
        var fromDate = document.querySelector("#fromDate").value;
        var toDate = document.getElementById("toDate").value;
        fetch(
                /* 
        api request url=https://api.coindesk.com/v1/bpi/historical/close.json?start=2022-01-08&end=2022-01-11&currency=eur
        response={"bpi":{"2022-01-08":36694.9962,"2022-01-09":36858.4155,"2022-01-10":36936.3328,"2022-01-11":37599.288},"disclaimer":"This data was produced from the CoinDesk Bitcoin Price Index. BPI value data returned as EUR.","time":{"updated":"Jan 12, 2022 00:03:00 UTC","updatedISO":"2022-01-12T00:03:00+00:00"}}
        maximum rate=37599.288
  
        */
                `https://api.coindesk.com/v1/bpi/historical/close.json?start=${fromDate}&end=${toDate}&currency=eur`
            )
            .then((response) => response.json())
            .then((data) => {
                //console.log(data);
                var maxRateList = [];
                for (var key in data.bpi) {
                    maxRateList.push(data.bpi[key]);
                    console.log(maxRateList);
                }

                var maxRate = Math.max(...maxRateList);
                console.log(maxRate);


                document.querySelector(
                    ".display-highest-Bitcoin-rate"
                ).innerHTML = `The highest Bitcoin rate from ${fromDate} to ${toDate} is ${maxRate} EUR`;
            })
            .catch((error) => {
                console.log("Error: ", error);
            });
        return false;
    };

});