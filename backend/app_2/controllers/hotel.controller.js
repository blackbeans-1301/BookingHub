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

exports.GetHotelCriteria = (Hotel, Room, Reservation, Image, condition1, condition2) => {
    return Hotel.findAll({
        where: condition1,
        include: [{
            model: Room,
            include: [{
                model: Reservation,
                required: false,
                where: condition2,
            }],

        }, {
            model: Image
        }],
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
};

exports.GetHotelByAddress = (Hotel, Image, condition) => {
    return Hotel.findAll({
        where: condition,
        include: [{
            model: Image
        }]
    }).then(data => {
        return data;
    }).catch(err => {
        return { code: -2, err: err.message }
    })
}
exports.GetHotelVietnamese = (province) => {
    if (province === "an giang" || province === "tinh an giang") return "An Giang";
    if (province === "ba ria - vung tau" || province === "tinh ba ria - vung tau") return "Bà Rịa – Vũng Tàu";
    if (province === "bac giang" || province === "tinh bac giang") return "Bắc Giang";
    if (province === "bac kan" || province === "tinh bac kan") return "Bắc Kạn";
    if (province === "bac lieu" || province === "tinh bac lieu") return "Bạc Liêu";
    if (province === "bac ninh" || province === "tinh bac ninh") return "Bắc Ninh";
    if (province === "ben tre" || province === "tinh ben tre") return "Bến Tre";
    if (province === "binh dinh" || province === "tinh binh dinh") return "Bình Định";
    if (province === "binh duong" || province === "tinh binh duong") return "Bình Dương";
    if (province === "binh phuoc" || province === "tinh binh phuoc") return "Bình Phước";
    if (province === "binh thuan" || province === "tinh binh thuan") return "Bình Thuận";
    if (province === "ca mau" || province === "tinh ca mau") return "Cà Mau";
    if (province === "can tho" || province === "thanh pho can tho") return "Cần Thơ";
    if (province === "cao bang" || province === "tinh cao bang") return "Cao Bằng";
    if (province === "da nang" || province === "thanh pho da nang") return "Đà Nẵng";
    if (province === "dak lak" || province === "tinh dak lak") return "Đắk Lắk";
    if (province === "dak nong" || province === "tinh dak nong") return "Đắk Nông";
    if (province === "dien bien" || province === "tinh dien bien") return "Điện Biên";
    if (province === "dong nai" || province === "tinh dong nai") return "Đồng Nai";
    if (province === "dong thap" || province === "tinh dong thap") return "Đồng Tháp";
    if (province === "gia lai" || province === "tinh gia lai") return "Gia Lai";
    if (province === "ha giang" || province === "tinh ha giang") return "Hà Giang";
    if (province === "ha noi" || province === "thanh pho ha noi") return "Hà Nội";
    if (province === "ha tinh" || province === "ha tinh") return "Hà Tĩnh";
    if (province === "hai duong" || province === "tinh hai duong") return "Hải Dương";
    if (province === "hai phong" || province === "thanh pho hai phong") return "Hải Phòng";
    if (province === "hau giang" || province === "tinh hau giang") return "Hậu Giang";
    if (province === "hoa binh" || province === "tinh hoa binh") return "Hòa Bình";
    if (province === "hung yen" || province === "tinh hung yen") return "Hưng Yên";
    if (province === "khanh hoa" || province === "tinh khanh hoa") return "Khánh Hòa";
    if (province === "kien giang" || province ==="tinh kien giang") return "Kiên Giang";
    if (province === "kon tum" || province === "tinh kon tum") return "Kon Tum";
    if (province === "lai chau" || province === "tinh lai chau") return "Lai Châu";
    if (province === "lam dong" || province === "tinh lam dong") return "Lâm Đồng";
    if (province === "lang son" || province === "tinh lang son") return "Lạng Sơn";
    if (province === "lao cai" || province === "tinh lao cai") return "Lào Cai";
    if (province === "long an" || province === "tinh long an") return "Long An";
    if (province === "nam dinh" || province === "tinh nam dinh") return "Nam Định";
    if (province === "nghe an" || province === "tinh nghe an") return "Nghệ An";
    if (province === "ninh binh" || province === "tinh ninh binh") return "Ninh Bình";
    if (province === "ninh thuan" || province === "tinh ninh thuan") return "Ninh Thuận";
    if (province === "phu tho" || province === "tinh phu tho") return "Phú Thọ";
    if (province === "phu yen" || province === "tinh phu yen") return "Phú Yên";
    if (province === "quang binh" || province === "tinh quang binh") return "Quảng Bình";
    if (province === "quang nam" || province === "tinh quang nam") return "Quảng Nam";
    if (province === "quang ngai" || province === "tinh quang ngai") return "Quảng Ngãi";
    if (province === "quang ninh" || province === "tinh quang ninh") return "Quảng Ninh";
    if (province === "quang tri" || province === "tinh quang tri") return "Quảng Trị";
    if (province === "soc trang" || province === "tinh soc trang") return "Sóc Trăng";
    if (province === "son la" || province === "tinh son la") return "Sơn La";
    if (province === "tay ninh" || province === "tinh tay ninh") return "Tây Ninh";
    if (province === "thai binh" || province === "tinh thai binh") return "Thái Bình";
    if (province === "thai nguyen" || province === "tinh thai nguyen") return "Thái Nguyên";
    if (province === "thanh hoa" || province === "tinh thanh hoa") return "Thanh Hóa";
    if (province === "thua thien hue" || province === "tinh thua thien hue") return "Thừa Thiên Huế";
    if (province === "tien giang" || province === "tinh tien giang") return "Tiền Giang";
    if (province === "thanh pho ho chi minh" || province === "thanh pho ho chi minh") return "TP Hồ Chí Minh";
    if (province === "tra vinh" || province === "tinh tra vinh") return "Trà Vinh";
    if (province === "tuyen quang" || province === "tinh tuyen quang") return "Tuyên Quang";
    if (province === "vinh long" || province === "tinh vinh long") return "Vĩnh Long";
    if (province === "vinh phuc" || province === "tinh vinh phuc") return "Vĩnh Phúc";
    if (province === "yen bai" || province === "tinh yen bai") return "Yên Bái";
    return "########"
}

exports.removeVietnameseTones = (str) => {
    if (str === undefined || str === null) {
        return ""
    }
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
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
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str;
}
