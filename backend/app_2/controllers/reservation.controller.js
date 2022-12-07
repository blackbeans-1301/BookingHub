exports.isBelongToOwner = (Reservation, Room, Hotel, Owner, condition1, condition2) => {
    return Reservation.findOne({
        where: condition1,
        include: [{
            model: Room,
            include: [{
                model: Hotel,
                include: [{
                    model: Owner,
                    where: condition2
                }]
            }]
        }]
    }).then(data => {
        if (data === null) {
            return {code: -1}
        } 
        return {code: 1}
    }).catch(err => {
        return {code: -2}
    })
}

exports.isBelongToUser = (Reservation, condition) => {
    return Reservation.findOne({
        where: condition,
    }).then(data => {
        if (data === null) {
            return {code: -1}
        } 
        return {code: 1}
    }).catch(err => {
        return {code: -2}
    })
}

exports.HotelReservations = (Reservation, Room, condition) => {
    return Reservation.findAll({
        include: [{
            model: Room,
            where: condition
        }]
    }).then(data => {
        return data;
    }).catch(err => {
        return {code: -2, err: err.message}
    })
}