exports.GetCurrentDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = yyyy + '-' + mm + '-' + dd;
    return today;
}

exports.GetCurrentDateTime = () => {
    var now = new Date();
    var DD = String(now.getDate()).padStart(2, '0');
    var MM = String(now.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = now.getFullYear();
    var hh = String(now.getHours()).padStart(2, '0');
    var mm = String(now.getMinutes()).padStart(2, '0');
    var ss = String(now.getSeconds()).padStart(2, '0');
    today = YYYY + '-' + MM + '-' + DD + ' ' + hh + ':' + mm + ':' + ss;
    return today;
}

exports.FormatDateTime = (date) => {
    var DD = String(date.getDate()).padStart(2, '0');
    var MM = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var YYYY = date.getFullYear();
    var hh = String(date.getHours()).padStart(2, '0');
    var mm = String(date.getMinutes()).padStart(2, '0');
    var ss = String(date.getSeconds()).padStart(2, '0');
    dateFormat = DD + '-' + MM + '-' + YYYY + ' ' + hh + ':' + mm + ':' + ss;
    return dateFormat; 
}

exports.CreateData = (model, value) => {
    return model.create(value).then(data => {
        return data.dataValues
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.CreateManyData = (model, value) => {
    return model.bulkCreate(value).then(data => {
        return data
    }).catch(err => {
        return {code: -2, err: err.message}
    });
}

exports.UpdateData = (model, value, condition) => {
    return model.update(value,{
        where: condition
    }).then(data => {
        if (!data[0]) {
            return {code: -1}
        }
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.FindOneData = (model, condition) => {
    return model.findOne({
        where: condition
    }).then(data => {
        if (data === null) {
            return {code: -1}
        }
        return data.dataValues;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.FindManyData = (model, condition) => {
    return model.findAll({
        where: condition
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}

exports.DeleteData = (model, condition) => {
    return model.destroy({
        where: condition
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}
