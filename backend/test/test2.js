
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

var time1 = "2002-11-09 11:20:18"
var time2 = "2002-11-10 11:21:00"


let date1 = new Date('2002-11-09T21:20:18')
let date2 = new Date('2021-10-22')
