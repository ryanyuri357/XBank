'use strict'


const euroToUsd = 1.1;
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// map
const movementsUSD = movements.map(function (mov) {
  return Math.floor(mov*euroToUsd);
})

// Map with arrow method
const moveUSA = movements.map(mov => Math.floor(mov*euroToUsd));

//console.log(movements);
//console.log(movementsUSD);
//console.log(moveUSA);

const movementDescriptions = movements.map((mov, i) =>
  `Movement ${i+1}: You ${mov > 0 ? 'deposited' : 'withdrew' } ${Math.abs(mov)}`
);

//console.log(movementDescriptions);

const deposits = movements.filter(function (mov) {
  return mov > 0;
});

//console.log(movements);
//console.log(deposits);

const withdrawals = movements.filter(mov => mov < 0);
//console.log(withdrawals);

console.log(movements);
// accumulator is like snowball
// const balance = movements.reduce(function (accumulator, current, i, arr) {
//   console.log(`Iteration ${i}: ${accumulator}`);
//   return accumulator + current;
//
// }, 0);
const balance = movements.reduce((accumulator, current) => accumulator + current, 0);

console.log(balance);

// maximum value ex. of reduce
const max = movements.reduce((acc, mov) => {
  if(acc > mov)
    return acc;
  else
    return mov;
}, movements[0]);
console.log(max);

// Pipeline !!! //
const totalDepositUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov*euroToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositUSD);

console.log(movements);
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(firstWithdrawal);
console.log(`-------------------------------`)


// check for =
console.log(movements);
console.log(movements.includes((-130)));

// check for condition
const anyDeposits = movements.some(mov => mov > 5000);
console.log(anyDeposits);