const url = "https://v6.exchangerate-api.com/v6/7bdc7ee0020c192ba59faf61/latest/USD";
const currencyList = document.getElementById('currency-list');
const currencyList2 = document.getElementById('currency-list2');
const currencySelect = document.getElementById('currency-pair');
const currencySelect2 = document.getElementById('currency-pair2');
const currencyoutput = document.getElementById('currency-rate');
const amountInput = document.getElementById('amount');
const convertButton = document.getElementById('convert-btn'); 

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
  for (let currency in conversionRates) {
    const option = document.createElement('option');
    option.value = currency;
    datalist.appendChild(option);
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

    
    currencyoutput.textContent = `1 ${fromCurrency} is ${conversionRate} ${toCurrency}`;

    
    if (!isNaN(amount) && amount > 0) {
      const convertedAmount = (amount * conversionRate).toFixed(2);
      currencyoutput.textContent = `${amount} ${fromCurrency} is ${convertedAmount} ${toCurrency} (1 ${fromCurrency} is ${conversionRate} ${toCurrency})`;
    }
  } else {
    currencyoutput.textContent = 'Please select both currencies and enter an amount.';
  }
}


convertButton.addEventListener('click', updateConversionResult);
