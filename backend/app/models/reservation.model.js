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
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        date_out: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        check_in: {
            type: DataTypes.DATE,
            allowNull: true
        },
        check_out: {
            type: DataTypes.DATE,
            allowNull: true
        },
        number_of_rooms: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            defaultValue: 'waiting',
            allowNull: false,            
        }
    });
    Reservation.associate = function (models) {
        Reservation.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Reservation.belongsToMany(models.room, { 
            through: 'occupied_room',
            foreignKey: 'reservation_id'
        });
    }
    return Reservation;
};
