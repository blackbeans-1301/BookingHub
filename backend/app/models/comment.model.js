// tao bang Hotel
const moment = require('moment');
module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('Comment', {
        comment_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        reservation_id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            defaultValue: "",
            allowNull: false
        },
        rating: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,                   
            get() {
                return moment(this.getDataValue('createdAt')).format('DD-MM-YYYY hh:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('DD-MM-YYYY hh:mm:ss');
            }
        }
    });
    Comment.associate = function (models) {
        // associations can be defined here
        Comment.belongsTo(models.reservation, {
            foreignKey: 'reservation_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        });
    }
    return Comment;
};

