module.exports = (sequelize, DataTypes) => {
    const Bill = sequelize.define('Bill', {
        bill_id : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        reservation_id : {
            type: DataTypes.UUID,
            allowNull: false
        },
        total_price : {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        amount_paid: {
            type: DataTypes.DOUBLE,
            defaultValue: 0,
            allowNull: false
        }
    });

    Bill.associate = function (models) {
        Bill.belongsTo(models.reservation, {
            foreignKey: 'reservation_id',
            onDelete: 'RESTRICT',
            onUpdate: 'CASCADE'
        })
    }
    return Bill;
};
