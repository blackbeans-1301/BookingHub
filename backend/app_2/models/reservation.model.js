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
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
    });
    Reservation.associate = function (models) {
        Reservation.belongsTo(models.user, {
            foreignKey: 'user_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Reservation.belongsToMany(models.room, { 
            through: models.occupied_room,
            foreignKey: 'reservation_id'
        });
        Reservation.hasOne(models.comment, {
            foreignKey: 'reservation_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        Reservation.hasOne(models.bill, {
            foreignKey: 'reservation_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return Reservation;
};
