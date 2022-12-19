exports.FormatDateTime = (date) => {
    var DD = String(date.getDate()).padStart(2, '0');
    var MM = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, '0');
    var mm = String(date.getMinutes()).padStart(2, '0');
    var ss = String(date.getSeconds()).padStart(2, '0');
    const dateFormat = DD + '-' + MM + '-' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
    return dateFormat; 
}

exports.FormatDate = (date) => {
    let dateInput = new Date(date);
    return dateInput.toLocaleDateString('en-CA'); 
}

exports.FormatDateToGB = (date) => {
    let dateInput = new Date(date);
    return dateInput.toLocaleDateString('en-GB'); 
}