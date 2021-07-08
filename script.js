'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Ryan Pinto',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');


const displayMovements = function(movements, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function(mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal'
    const html = `
      <div class="movements__row">
          <div class="movements__type movements__type--${type}">${i + 1} ${type}</div>        
          <div class="movements__value">${mov}€</div>
      </div>
    `
      containerMovements.insertAdjacentHTML('afterbegin', html);
  });
}


const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
}


const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc - mov, 0);
  labelSumOut.textContent = `${out}€`;

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(dep => (dep*acc.interestRate)/100)
    .filter(int => int >= 1)
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};


const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};

createUsernames(accounts);

// Update UI
const updateUI = function(acc) {
  // Display movements
  displayMovements(acc.movements);
  // Display balance
  calcDisplayBalance(acc);
  // Display summary
  calcDisplaySummary(acc)
}



// Event Handlers
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(acc => acc.username === inputLoginUsername.value);
  console.log(currentAccount);

  if(currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity = 100;

    // Clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});


btnTransfer.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value);
  inputTransferAmount.value = inputTransferTo.value = '';

  if(
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // "Doing the transfer"
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log('transfer processed');
    }

    // Update UI
    updateUI(currentAccount);
});

btnLoan.addEventListener('click', function(e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // add movement
    currentAccount.movements.push(amount);
    // update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});


btnClose.addEventListener('click', function(e) {
  e.preventDefault();

  if(Number(inputClosePin.value) === currentAccount.pin &&
    inputCloseUsername.value === currentAccount.username)
  {
    const index = accounts.findIndex(acc => acc.username === currentAccount.username);
    console.log(index);

    // Delete account
    accounts.splice(index, 1);

    // LOg out user (Hide UI)
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';

});

let sortState = false;

btnSort.addEventListener('click', function(e) {
  e.preventDefault();

  displayMovements(currentAccount.movements, !sortState);
  sortState = !sortState;
});




/////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////






/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
// live


// const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// console.log(owners.sort());
// console.log(owners);
//
// console.log(movements);
//
// // return  < 0, ----  A, B
// // return > 0, ----  B, A
// movements.sort((a, b) => a -  b);
// console.log(movements);
//
// movements.sort((a, b) => b - a);
// console.log(movements);


// console.log(movements);
// console.log(account4.movements.every(mov => mov > 0));
//
// // Separate callback
// const deposit = mov => mov > 0;
// console.log(movements.some(deposit));
//
//
// const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());
//
// const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// console.log(arrDeep.flat(2)); // <- ADD 'NEST DEEPNESS' LEVEL

//
// const accountMovements = accounts.map(acc => acc.movements);
// console.log(accountMovements);
// const allMovements = accountMovements.flat();
// console.log(allMovements);
// const overalBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
// console.log(overalBalance);

// const overAllBalance = accounts
//   .map(acc => acc.movements)
//   .flat()
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance);
//
// const overAllBalance2 = accounts
//   .flatMap(acc => acc.movements)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(overAllBalance2);




// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
//
// console.log('------for of-------')
// for(const [i, movement] of movements.entries()) {
//   if(movement>0) {
//     console.log(`Transaction: ${i+1} Deposit: ${movement}`)
//   } else {
//     console.log(`Transaction: ${i+1} Withdraw: ${Math.abs(movement)}`)
//   }
// }
//
// console.log('---------for each----------')
//
// movements.forEach(function (movement, i, arr) {
//   if(movement>0) {
//     console.log(`Transaction: ${i+1} Deposit: ${movement}`)
//   } else {
//     console.log(`Transaction: ${i+1} Withdraw: ${Math.abs(movement)}`)
//   }
// })
//
// console.log('-----forEach w/ Maps & Sets------')
//
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);
//
// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// })
//
// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function(value, key, map) {
//   console.log(`${key}: ${value}`);
// })


// let arr = ['a', 'b', 'c', 'd', 'e'];
//
// // slice method - leaves original array in tact
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(-2));
// console.log(arr.slice(-1));
// console.log(arr.slice(1, -2));
// console.log(arr.slice());
// console.log(...arr);
// console.log(arr);
//
// // splice method - mutates original array
// //console.log(arr.splice(2));
// //console.log(arr);
//
// // Reverse - does mutate
// // let arr = ['a', 'b', 'c', 'd', 'e'];
// let arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());
// console.log(arr2);
//
// // Concat - does not mutate
// const letters = arr.concat(arr2);
// console.log(letters);
//
// // Join method
// console.log(letters.join(' - '));
