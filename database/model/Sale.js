module.exports = (sequelize, DataTypes) => {
    const model = sequelize.define(
        'sales',
        {
            userName: {
                type: DataTypes.STRING,
                field: 'userName'
            },                  
            amount: {
                type: DataTypes.DECIMAL(15, 2),
            },
            date: {
                type: DataTypes.DATEONLY,                
            },   
            week: {
                type: DataTypes.STRING,                
            },
            hour: {
                type: DataTypes.INTEGER,                
            },                     
        }
    );

    return model;
};
