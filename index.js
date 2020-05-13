const main = document.getElementById("main");
const addUserBtn = document.getElementById("add-user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show-millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate-wealth");

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and money
async function getRandomUser() {
  const res = await fetch("https://randomuser.me/api");
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 10000000),
  };

  addData(newUser);
}

//add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

function updateDOM(provideData = data) {
  //clear main div
  main.innerHTML = "<h2><strong>Person</strong>Wealth</h2>";
  provideData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(
      item.money
    )}`;
    main.appendChild(element);
  });
}

function formatMoney(number) {
  var num = new Number(number).toLocaleString("en-IN");
  var val = "Rs " + num;
  return val;
}

addUserBtn.addEventListener("click", getRandomUser);

doubleBtn.addEventListener("click", doubleMoney);

function doubleMoney() {
  data = data.map((x) => {
    return { ...x, money: 2 * x.money };
  });
  updateDOM();
}

sortBtn.addEventListener("click", sortRich);

function sortRich() {
  data.sort((a, b) => b.money - a.money);
  updateDOM();
}

showMillionairesBtn.addEventListener("click", showMillionaires);

function showMillionaires() {
  data = data.filter((x) => x.money > 1000000);
  updateDOM();
}

calculateWealthBtn.addEventListener("click", totalWealth);

function totalWealth() {
  const total = data.reduce((x, y) => x + y.money, 0);
  const element = document.createElement("div");
  element.innerHTML = `<h3>Total<strong>${formatMoney(total)}</strong></h3>`;
  main.appendChild(element);
}
