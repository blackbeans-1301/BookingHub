// tao bang User
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        user_id: {
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
            type: DataTypes.STRING
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
            type: DataTypes.DATEONLY
        },
        member_since: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING
        },
        phone_number: {
            type: DataTypes.INTEGER
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
    User.associate = function (models) {
        // // associations can be defined here
        User.hasMany(models.reservation, {
            foreignKey: 'user_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
        User.belongsToMany(models.hotel, { 
            through: models.favorite,
            foreignKey: 'user_id'
        });
    }
    return User;
};

