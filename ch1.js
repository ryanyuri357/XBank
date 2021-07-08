'use strict';


const julia = [3, 5, 2, 12, 7];
const kate = [4, 1, 15, 8, 3];

const checkDogs = function (dogsJulia, dogsKate) {
  const tempArr = dogsJulia.slice(1, -2);
  console.log(tempArr);
  console.log(dogsJulia);
  const dogsAll = [...tempArr, ...dogsKate];
  console.log(dogsAll);

  dogsAll.forEach(function(value, i) {
    const dispStr = value < 3 ? `Dog number ${i+1} is still a puppy` : `Dog number ${i+1} is an adult and is ${value} years old`
    console.log(dispStr);

  })
}
checkDogs(julia, kate);

const ages = [5, 2, 4, 1, 15, 8, 3]

const calcAverageHumanAge = function (ages) {
  // convert to human ages
  const humanAges = ages.map(age => age <= 2 ? 2*age : 16 + age*4);
  // less than 18 filter
  const lessThan18 = humanAges.filter(age => age >= 18);
  console.log(lessThan18);
  // avg
  const avgAge = lessThan18.reduce((acc, age) => acc+age, 0)/lessThan18.length;

  return `Average age = ${avgAge}`;
}

console.log(calcAverageHumanAge(ages));

const calcAvgHumanAge = ages =>
   ages
    .map(age => (age <= 2 ? 2*age : 16 + age*4))
    .filter(age => age >= 18)
     .reduce((acc, age, i, arr) => acc + age /arr.length, 0);

console.log(calcAvgHumanAge(ages));






