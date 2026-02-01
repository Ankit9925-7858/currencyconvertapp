const BASE_URL = "https://open.er-api.com/v6/latest";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let option = document.createElement("option");
    option.value = currCode;
    option.innerText = currCode;

    if (select.name === "from" && currCode === "USD") {
      option.selected = true;
    }
    if (select.name === "to" && currCode === "INR") {
      option.selected = true;
    }

    select.append(option);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

// Update exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value || 1;
  amount.value = amtVal;

  try {
    const response = await fetch(`${BASE_URL}/${fromCurr.value}`);
    const data = await response.json();

    const rate = data.rates[toCurr.value];
    const finalAmount = (amtVal * rate).toFixed(2);

    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
  } catch (error) {
    msg.innerText = "Network error ❌";
    console.error(error);
  }
};

// Update flag image
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let img = element.parentElement.querySelector("img");

  img.src = `https://flagcdn.com/w80/${countryCode.toLowerCase()}.png`;
};

// Button click
btn.addEventListener("click", (e) => {
  e.preventDefault();
  updateExchangeRate();
});

// Load default rate
window.addEventListener("load", () => {
  updateExchangeRate();
});


