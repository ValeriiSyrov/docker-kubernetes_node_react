console.log(sum(2,3)); // 5
console.log(sum(2)(3)); // 5

function sum (a,b) {
    
    if (b) {
        return a+b
    } else {
        return function (c) {
            return a+c
        }
    }
}

