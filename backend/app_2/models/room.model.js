// tao bang Room
module.exports = (sequelize, DataTypes) => {
    const Room = sequelize.define('Room', {
        room_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        hotel_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
        },
        room_name: {
            type: DataTypes.STRING,
            allowNull: false
        },  
        criteria: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        number_of_bed: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_of_room: {
            type: DataTypes.STRING,
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
            //as: 'roomhotel',a
            foreignKey: 'hotel_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
        Room.hasMany(models.image, {
            foreignKey: 'room_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        // Room.belongsToMany(models.reservation, { 
        //     through: models.occupied_room,
        //     foreignKey: 'room_id' 
        // }); 
    }
    return Room;
};
