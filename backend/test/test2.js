
function GetCurrentDate() {
    var today = new Date()
    var dd = String(today.getDate()).padStart(2, '0')
    var mm = String(today.getMonth() + 1).padStart(2, '0') //January is 0!
    var yyyy = today.getFullYear()
    today = yyyy + '-' + mm + '-' + dd
    return today
}

function GetCurrentDateTime() {
    var now = new Date()
    var DD = String(now.getDate()).padStart(2, '0')
    var MM = String(now.getMonth() + 1).padStart(2, '0') //January is 0!
    var YYYY = now.getFullYear()
    var hh = String(now.getHours()).padStart(2, '0')
    var mm = String(now.getMinutes()).padStart(2, '0')
    var ss = String(now.getSeconds()).padStart(2, '0')
    today = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss
    return today
}

function FormatDateTime(date) {
    var DD = String(date.getDate()).padStart(2, '0');
    var MM = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, '0');
    var mm = String(date.getMinutes()).padStart(2, '0');
    var ss = String(date.getSeconds()).padStart(2, '0');
    dateFormat = DD + '-' + MM + '-' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
    return dateFormat; 
}

var time1 = "2002-11-09 11:20:18"
var time2 = "2002-11-10 11:21:00"
var now = new Date()

let date1 = new Date('2022-12-19 00:00:00')
let date2 = new Date('2022-12-19 00:00:00')

console.log(FormatDateTime(date1));
console.log(FormatDateTime(date2));
if (date1 > date2) {
    console.log('ok')
} else if (date1 < date2) {
    console.log('ok2')
} else {
    console.log('ok3')
}

if (date1 = date2) {
    console.log("hehe")
}