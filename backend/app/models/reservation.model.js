// tao bang reservation
module.exports = (sequelize, DataTypes) => {
    const Reservation = sequelize.define('Reservation', {
        reservation_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        user_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        date_in: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        date_out: {
            type: DataTypes.STRING,
            allowNull: false
        },
        number_of_rooms: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    });
    Room.associate = function (models) {
        // associations can be defined here
        Room.belongsTo(models.hotel, {
            //as: 'roomhotel',
            foreignKey: 'hotel_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        Room.hasMany(models.image, {
            foreignKey: 'room_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return Room;
};
