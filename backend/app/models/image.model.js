// tao bang Image
module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', {
        img_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        hotel_id: {
            type: DataTypes.UUID,
            defaultValue: null,
            allowNull: true
        },
        room_id: {
            type: DataTypes.UUID,
            defaultValue: null,
            allowNull: true
        },
        imgURL: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isHotelImage: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    Image.associate = function (models) {
        // associations can be defined here
        Image.belongsTo(models.hotel, {
            foreignKey: 'hotel_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        Image.belongsTo(models.room, {
            foreignKey: 'room_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return Image;
};

