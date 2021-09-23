'use strict';
const main = document.getElementById('main');
const addUser = document.getElementById('add-user');
const double = document.getElementById('double');
const filterRich = document.getElementById('filter-rich');
const showTotal = document.getElementById('total');
const sort = document.getElementById('sort');

// variable
let url = 'https://randomuser.me/api';
// User array
let users = [];
// functions

// Async -await
const getRandomUser = async function () {
  const response = await fetch(url);
  const data = await response.json();
  const user = data.results[0];
  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    balance: Math.floor(Math.random() * 100000),
  };

  addData(newUser);
};

const addData = function (newUser) {
  users.push(newUser);
  updateDom();
};
// Updating DOM
const updateDom = function (userData = users) {
  main.innerHTML = `<h2><strong>Name</strong><strong>Balance</strong></h2>`;
  userData.forEach((user) => {
    const element = document.createElement('div');
    element.classList.add('users');
    element.innerHTML = `<strong>${user.name}</strong>${user.balance}`;
    main.appendChild(element);
  });
};
// Double balance
const doubleBalance = function () {
  users = users.map((user) => {
    return { ...user, balance: user.balance * 2 };
  });

  updateDom();
};
// Filter
const filterByRich = function () {
  users = users.filter((user) => user.balance > 50000);
  updateDom();
};
// Sorting
const sortByDescending = function () {
  users = users.sort((a, b) => {
    return b.balance - a.balance;
  });
  updateDom();
};

// calculating Total balance
const calculateTotal = function () {
  const total = users.reduce((acc, user) => (acc = acc + user.balance), 0);
  const totalElement = document.createElement('div');
  totalElement.innerHTML = `<h2>Total balance is <strong>₹ ${total}</strong></h2>`;
  main.appendChild(totalElement);
};

// Event listeners
addUser.addEventListener('click', getRandomUser);
double.addEventListener('click', doubleBalance);
filterRich.addEventListener('click', filterByRich);
showTotal.addEventListener('click', calculateTotal);
sort.addEventListener('click', sortByDescending);
