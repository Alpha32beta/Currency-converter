const url = "https://v6.exchangerate-api.com/v6/7bdc7ee0020c192ba59faf61/latest/USD";
const currencyList = document.getElementById('currency-list');
const currencyList2 = document.getElementById('currency-list2');
const currencySelect = document.getElementById('currency-pair');
const currencySelect2 = document.getElementById('currency-pair2');
const currencyoutput = document.getElementById('currency-rate');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert-btn');
const swapcontainer = document.getElementById('swap-container');

let conversionRates = {};

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    if (response && response.conversion_rates) {
      conversionRates = response.conversion_rates;
      populateDatalist(conversionRates, currencyList);
      populateDatalist(conversionRates, currencyList2);
    } else {
      console.error('Error: Unexpected response format.');
    }
  })
  .catch((err) => {
    console.error('Error fetching conversion rates:', err);
  });

function populateDatalist(conversionRates, datalist) {
  datalist.innerHTML = '';
  let count = 0;
  for (let currency in conversionRates) {
    if (count >= 5) break;  
    const option = document.createElement('option');
    option.value = currency;
    datalist.appendChild(option);
    count++;
  }
}

function updateConversionResult() {
  const fromCurrency = currencySelect.value;
  const toCurrency = currencySelect2.value;
  const amount = parseFloat(amountInput.value);

  if (fromCurrency && toCurrency && conversionRates) {
    const rateFrom = conversionRates[fromCurrency];
    const rateTo = conversionRates[toCurrency];
    const conversionRate = (rateTo / rateFrom).toFixed(2);

    const currencySymbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      AUD: 'A$',
      CAD: 'C$',
      CHF: 'Fr.',
      CNY: '¥',
      SEK: 'kr',
      NZD: 'NZ$',
      MXN: '$',
      INR: '₹',
      BRL: 'R$',
      ZAR: 'R',
      SGD: 'S$',
      HKD: 'HK$',
      NOK: 'kr',
      KRW: '₩',
      TRY: '₺',
      RUB: '₽',
      IDR: 'Rp',
      THB: '฿',
      PHP: '₱',
      MYR: 'RM',
      ARS: '$',
      COP: '$',
      PLN: 'zł',
      DKK: 'kr',
      HUF: 'Ft',
      CZK: 'Kč',
      ILS: '₪'
    };
  

    const fromSymbol = currencySymbols[fromCurrency] || fromCurrency;
    const toSymbol = currencySymbols[toCurrency] || toCurrency;

    currencyoutput.textContent = `1 ${fromCurrency} (${fromSymbol}) is ${conversionRate} ${toCurrency} (${toSymbol})`;

    if (!isNaN(amount) && amount > 0) {
      const convertedAmount = (amount * conversionRate).toFixed(2);
      currencyoutput.textContent = `${amount} ${fromCurrency} (${fromSymbol}) is ${convertedAmount} ${toCurrency} (${toSymbol}) (1 ${fromCurrency} is ${conversionRate} ${toCurrency})`;
    }
  } else {
    currencyoutput.textContent = 'Please select both currencies and enter an amount.';
  }
}






convertButton.addEventListener('click', updateConversionResult);


swapcontainer.addEventListener("click", function() {
  
  try {
  var temp = currencySelect.value;
  currencySelect.value = currencySelect2.value;
  currencySelect2.value = temp;

  
  updateConversionResult(); 

  
  currencySelect.focus();
  currencySelect2.focus();}

  catch (err){
    console.error('error swapping currencies', err)
  }
});


currencySelect.addEventListener('change', updateConversionResult);
currencySelect2.addEventListener('change', updateConversionResult);


function updateTradingViewWidget(symbol) {
  const container = document.getElementById('tradingview-widget-container');
  container.innerHTML = ''; 

  const widgetScript = document.createElement('script');
  widgetScript.type = 'text/javascript';
  widgetScript.src = 'https://s3.tradingview.com/external-embedding/embed-widget-mini-symbol-overview.js';
  widgetScript.async = true;

  const widgetConfig = {
    symbol: symbol,
    width: "100%",
    height: "100%",
    locale: "en",
    dateRange: "1D",
    colorTheme: "light",
    isTransparent: false,
    autosize: true,
    largeChartUrl: ""
  };

  widgetScript.innerHTML = JSON.stringify(widgetConfig);
  container.appendChild(widgetScript);
}

convertButton.addEventListener('click', function () {
  const fromCurrency = currencySelect.value;
  const toCurrency = currencySelect2.value;
  const tradingPair = `FX:${fromCurrency}${toCurrency}`;
  updateTradingViewWidget(tradingPair);
});


