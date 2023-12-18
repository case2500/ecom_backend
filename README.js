let arr = [1, 2, 3, 4, 5];

//******************** */
let sum = 0;
for (let i = 0; i < arr.length; i++) {
  sum += arr[i];
}
console.log(sum);

//******************** */
let sumreduce = arr.reduce((accsum, current) => accsum + current);
let sumreduce2 = arr.reduce((accsum, current) => accsum + current, 2);
console.log(sumreduce);
console.log(sumreduce2);

//******************** */
let grater = false;
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 0) {
    grater = true;
    break;
  }
}
console.log(grater);

//******************** */
let graterArr = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 0) {
    graterArr.push(arr[i]);
    // console.log(arr[i])
  }
}
console.log(graterArr);

//******************** */
let filter = arr.filter((item) => item > 3);
console.log(filter);

//******************** */
let graterThan = [];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] > 0) {
    graterThan = arr[i];
    break;
  }
}
console.log(graterThan);

let arrFind = arr.find((item) => item > 0);
console.log(arrFind);

//******************** */
let graterIndex = -1;
for (let i = 0; i < arr.length; i++) {
  if (arr[i]) {
    graterIndex = i;
    break;
  }
}
console.log(graterIndex)

let finIndex = arr.findIndex(item => item >0)
console.log(finIndex)