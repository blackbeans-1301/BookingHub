// tao bang User
module.exports = (sequelize, DataTypes) => {
    const Owner = sequelize.define('Owner', {
        owner_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        dob: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        member_since: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone_number: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        imgURL: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        resetCode: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null
        },
        timeOfResetCode: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null
        }
    });
    Owner.associate = function (models) {
        // // associations can be defined here
        Owner.hasMany(models.hotel, {
            foreignKey: 'owner_id',
            targetKey: 'hotel_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return Owner;
};

