const { Op, Sequelize } = require("sequelize")
const { sequelize } = require("../models")

exports.GetOwnerHotels = (hotelModel, imageModel, condition) => {
    return hotelModel.findAll({
        where: condition,
        attributes: {
            exclude: ['owner_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        return { code: 1, data: data }
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}

exports.GetHotelInfo = (hotelModel, imageModel, condition) => {
    return hotelModel.findOne({
        where: condition,
        attributes: {
            exclude: ['owner_id']
        },
        include: [
            {
                model: imageModel,
                attributes: ['imgURL']
            }
        ]
    }).then(data => {
        if (data === null) {
            return { code: -1 }
        }
        return data.dataValues;
    }).catch(err => {
        return { code: -2, err: err.message }
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
        return { code: -2, err: err.message }
    })
}

exports.GetHotelCriteria = (Hotel, Room, Reservation, condition1, condition2) => {
    return Hotel.findAll({
            where: condition1,
            include: [{
                model: Room,
                include: [{
                    model: Reservation,
                    required: false,
                    where: condition2,
                }],
            }],
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
};

exports.GetHotelVietnamese = (province) => {
    if (province === "an giang") return "An Giang";
    if (province === "ba ria vung tau") return "Bà Rịa – Vũng Tàu";
    if (province === "bac giang") return "Bắc Giang";
    if (province === "bac kan") return "Bắc Kạn";
    if (province === "bac lieu") return "Bạc Liêu";
    if (province === "bac ninh") return "Bắc Ninh";
    if (province === "ben tre") return "Bến Tre";
    if (province === "binh dinh") return "Bình Định";
    if (province === "binh duong") return "Bình Dương";
    if (province === "binh phuoc") return "Bình Phước";
    if (province === "binh thuan") return "Bình Thuận";
    if (province === "ca mau") return "Cà Mau";
    if (province === "can tho") return "Cần Thơ";
    if (province === "cao bang") return "Cao Bằng";
    if (province === "da nang") return "Đà Nẵng";
    if (province === "dak lak") return "Đắk Lắk";
    if (province === "dak nong") return "Đắk Nông";
    if (province === "dien bien") return "Điện Biên";
    if (province === "dong nai") return "Đồng Nai";
    if (province === "dong thap") return "Đồng Tháp";
    if (province === "gia lai") return "Gia Lai";
    if (province === "ha giang") return "Hà Giang";
    if (province === "ha noi") return "Hà Nội";
    if (province === "ha tinh") return "Hà Tĩnh";
    if (province === "hai duong") return "Hải Dương";
    if (province === "hai phong") return "Hải Phòng";
    if (province === "hau giang") return "Hậu Giang";
    if (province === "hoa binh") return "Hòa Bình";
    if (province === "hung yen") return "Hưng Yên";
    if (province === "khanh hoa") return "Khánh Hòa";
    if (province === "kien giang") return "Kiên Giang";
    if (province === "kon tum") return "Kon Tum";
    if (province === "lai chau") return "Lai Châu";
    if (province === "lam dong") return "Lâm Đồng";
    if (province === "lang son") return "Lạng Sơn";
    if (province === "lao cai") return "Lào Cai";
    if (province === "long an") return "Long An";
    if (province === "nam dinh") return "Nam Định";
    if (province === "nghe an") return "Nghệ An";
    if (province === "ninh binh") return "Ninh Bình";
    if (province === "ninh thuan") return "Ninh Thuận";
    if (province === "phu tho") return "Phú Thọ";
    if (province === "phu yen") return "Phú Yên";
    if (province === "quang binh") return "Quảng Bình";
    if (province === "quang nam") return "Quảng Nam";
    if (province === "quang ngai") return "Quảng Ngãi";
    if (province === "quang ninh") return "Quảng Ninh";
    if (province === "quang tri") return "Quảng Trị";
    if (province === "soc trang") return "Sóc Trăng";
    if (province === "son la") return "Sơn La";
    if (province === "tay ninh") return "Tây Ninh";
    if (province === "thai binh") return "Thái Bình";
    if (province === "thai nguyen") return "Thái Nguyên";
    if (province === "thanh hoa") return "Thanh Hóa";
    if (province === "thua thien hue") return "Thừa Thiên Huế";
    if (province === "tien giang") return "Tiền Giang";
    if (province === "tp ho chi minh") return "TP Hồ Chí Minh";
    if (province === "tra vinh") return "Trà Vinh";
    if (province === "tuyen quang") return "Tuyên Quang";
    if (province === "vinh long") return "Vĩnh Long";
    if (province === "vinh phuc") return "Vĩnh Phúc";
    if (province === "yen bai") return "Yên Bái";
    return "########"
}

exports.removeVietnameseTones = (str) => {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); 
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); 
    str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); 
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); 
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); 
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); 
    str = str.replace(/đ/g,"d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g," ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
    return str;
}
