
  const url = "https://v6.exchangerate-api.com/v6/7bdc7ee0020c192ba59faf61/latest/USD";
  const currencyList = document.getElementById('currency-list');
  const currencyList2 = document.getElementById('currency-list2');
  const currencySelect = document.getElementById('currency-pair');
  const currencySelect2 = document.getElementById('currency-pair2');
  const currencyInput = document.getElementById('currency-rate');
  const searchInput = document.getElementById('currency-search');
  
  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response && response.conversion_rates) {
        const conversionRates = response.conversion_rates;
        populateDatalist(conversionRates, currencyList);
        populateDatalist(conversionRates, currencyList2);
  
        currencySelect.addEventListener('input', updateConversionResult);
        currencySelect2.addEventListener('input', updateConversionResult);
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
  
    fetch(url)
      .then((response) => response.json())
      .then((response) => {
        if (fromCurrency && toCurrency && response.conversion_rates) {
          const rateFrom = response.conversion_rates[fromCurrency];
          const rateTo = response.conversion_rates[toCurrency];
          const conversionRate = (rateTo / rateFrom).toFixed(2);
          currencyInput.value = conversionRate;
        } else {
          currencyInput.value = '';
        }
      });
  }
  