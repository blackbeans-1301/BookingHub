// tao bang Hotel
module.exports = (sequelize, DataTypes) => {
    const Hotel = sequelize.define('Hotel', {
        hotel_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        owner_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            //primaryKey: true,
            allowNull: false
        },
        name: {
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
        },
        startPrice: {
            type: DataTypes.FLOAT,
            defaultValue: 0,
            allowNull: false
        },
        phone: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        fromCenter: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
    Hotel.associate = function (models) {
        // associations can be defined here
        Hotel.belongsTo(models.owner, {
            //as: 'hoteluser',
            foreignKey: 'owner_id',
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
        });
        Hotel.belongsToMany(models.user, { 
            through: models.favorite,
            foreignKey: 'hotel_id'
        });
    }
    return Hotel;
};

