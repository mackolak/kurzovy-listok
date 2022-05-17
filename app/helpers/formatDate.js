const formatCurrencyDate = (currencyRateDate) => {
  const formattedCurrencyDate = new Date(currencyRateDate);
  return {
    unixDate: formattedCurrencyDate.getTime(),
    year: formattedCurrencyDate.getFullYear(),
    month: formattedCurrencyDate.getMonth() + 1,
    day: formattedCurrencyDate.getDate(),
    formattedCurrencyDate,
  };
};

module.exports = formatCurrencyDate;
