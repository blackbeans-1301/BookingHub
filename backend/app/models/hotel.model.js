// tao bang Hotel
module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('Hotel', {
        hotel_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            //primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Hotel.associate = function (models) {
        // associations can be defined here
        Hotel.belongsTo(models.user, {
            //as: 'hoteluser',
            foreignKey: 'user_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        // console.dir(models.room)
        Hotel.hasMany(models.room, {
            //as: 'roomhotel',
            foreignKey: 'hotel_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        Hotel.hasMany(models.image, {
            foreignKey: 'hotel_id',
            onDelete: "RESTRICT",
            onUpdate: "CASCADE"
        })
    }
    return Hotel;
};

