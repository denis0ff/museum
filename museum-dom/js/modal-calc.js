// Get Elements

const amountOfBasic = document.querySelectorAll(".amount-basic");
const amountOfSenior = document.querySelectorAll(".amount-senior");
const basicPlus = document.querySelectorAll(".basic-plus");
const basicMinus = document.querySelectorAll(".basic-minus");
const seniorPlus = document.querySelectorAll(".senior-plus");
const seniorMinus = document.querySelectorAll(".senior-minus");
const ticketTypeRadio = document.getElementsByName("radio");
const ticketTypeSelect = document.querySelector("select.ticket-type");
const ticketTypeSelectOptions = ticketTypeSelect.querySelectorAll("option");
const timeInput = document.querySelector(".time");
const dateInput = document.querySelector(".date");

const resultDate = document.querySelector(".date-result");
const resultTime = document.querySelector(".time-result");
const resultTicketType = document.querySelector(".type-result");
const totalAmountOfBasic = document.querySelector(".basic-result");
const totalAmountOfSenior = document.querySelector(".senior-result");
const basicSummary = document.querySelector(".basic-summary");
const seniorSummary = document.querySelector(".senior-summary");

const totalSummary = document.querySelectorAll(".total-summary");

let ticketCost;
let flag = 1;
// Functions

function plusTicketAmount() {
  if (this.previousElementSibling.classList[1] === "amount-basic") {
    amountOfBasic.forEach((amount) =>
      amount.value < 20 ? (amount.value = +amount.value + 1) : amount.value
    );
  }
  if (this.previousElementSibling.classList[1] === "amount-senior") {
    amountOfSenior.forEach((amount) =>
      amount.value < 20 ? (amount.value = +amount.value + 1) : amount.value
    );
  }
  updateSummary();
}

function minusTicketAmount() {
  if (this.nextElementSibling.classList[1] === "amount-basic") {
    amountOfBasic.forEach((amount) =>
      amount.value > 0 ? (amount.value = amount.value - 1) : amount.value
    );
  }
  if (this.nextElementSibling.classList[1] === "amount-senior") {
    amountOfSenior.forEach((amount) =>
      amount.value > 0 ? (amount.value = amount.value - 1) : amount.value
    );
  }
  updateSummary();
}

function updateRadio() {
  for (let radio of ticketTypeRadio) {
    if (radio.type == "radio" && radio.checked) {
      ticketCost = radio.value;
      updateSummary();
    }
  }
  for (let option of ticketTypeSelectOptions) {
    if (option.value === ticketCost) {
      option.selected = true;
    }
  }
}

function updateSelect() {
  for (let option of ticketTypeSelectOptions) {
    if (option.selected) {
      ticketCost = option.value;
      updateSummary();
    }
  }
  for (let radio of ticketTypeRadio) {
    if (radio.value === ticketCost) {
      radio.checked = true;
    }
  }
}

function updateTime(event) {
  let time = event.target.value.split(":");
  let hours = parseInt(time[0]);
  let mins = parseInt(time[1]);

  if (mins < 15) {
    mins = 0;
  } else if (mins < 45) {
    hours < 9 || hours >= 18 ? (mins = 0) : (mins = 30);
  } else if (mins < 60) {
    mins = 0;
    hours = (hours + 1) % 24;
  }
  if (hours < 9) hours = 9
  else hours = 18
  let rounded = [
    hours.toString().padStart(2, "0"),
    mins.toString().padStart(2, "0"),
  ].join(":");
  event.target.value = rounded;
  updateSummary();
}

function updateMinimalDate() {
  const date = new Date();
  dateInput.min = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  updateRadio();
  updateSelect();
}

function updateDate() {
  const date = new Date(dateInput.value);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  dateInput.TextContent = `${days[date.getDay()]}, ${
    months[date.getMonth()]
  } ${date.getDate()}`;
  updateSummary();
}

function getTicketType(ticketType) {
  const ticketTypeText = [
    [20, "Permanent exhibition"],
    [25, "Temporary exhibition"],
    [40, "Combined Admission"],
  ];
  let ticketTypeInner = "Permanent exhibition";
  for (let type of ticketTypeText) {
    if (type[0] == ticketType) ticketTypeInner = type[1];
  }
  return ticketTypeInner;
}

function updateSummary() {
  if (flag) loadStorageData();
  const totalSum =
    amountOfBasic[0].value * ticketCost +
    amountOfSenior[0].value * (ticketCost / 2);
  totalSummary.forEach((total) => (total.innerHTML = totalSum));

  resultDate.innerHTML = dateInput.TextContent;
  resultTime.innerHTML = timeInput.value;
  resultTicketType.innerHTML = getTicketType(ticketCost);
  totalAmountOfBasic.innerHTML = amountOfBasic[0].value;
  totalAmountOfSenior.innerHTML = amountOfSenior[0].value;
  basicSummary.innerHTML = amountOfBasic[0].value * ticketCost;
  seniorSummary.innerHTML = amountOfSenior[0].value * (ticketCost / 2);
  saveStorageData();
}

function saveStorageData(total) {
  localStorage.setItem("basicAmount", amountOfBasic[0].value);
  localStorage.setItem("seniorAmount", amountOfSenior[0].value);
  localStorage.setItem("ticketCost", ticketCost);
}

function loadStorageData() {
  amountOfBasic.forEach( amount => amount.value = localStorage.basicAmount);
  amountOfSenior.forEach( amount => amount.value = localStorage.seniorAmount);
  ticketCost = localStorage.ticketCost;
  flag--;
}

// Hook up events
basicPlus.forEach((handler) =>
  handler.addEventListener("click", plusTicketAmount)
);
basicMinus.forEach((handler) =>
  handler.addEventListener("click", minusTicketAmount)
);
seniorPlus.forEach((handler) =>
  handler.addEventListener("click", plusTicketAmount)
);
seniorMinus.forEach((handler) =>
  handler.addEventListener("click", minusTicketAmount)
);

ticketTypeRadio.forEach((handler) =>
  handler.addEventListener("change", updateRadio)
);
ticketTypeSelect.addEventListener("change", updateSelect);

timeInput.addEventListener("change", updateTime);
dateInput.addEventListener("change", updateDate);
document.addEventListener("DOMContentLoaded", updateMinimalDate);
document.addEventListener("DOMContentLoaded", updateDate);
