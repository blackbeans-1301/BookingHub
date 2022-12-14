var arr = [1,2,5,5,5,5,5,5]

for (var i = 1; i <= arr.length; i++) {
    if ( arr[i] === 5) {
        arr.splice(i, 1); 
        i--;
    }
    
}

console.log(arr);