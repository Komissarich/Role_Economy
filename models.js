const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:root@localhost:5432/Role_Economy') 
try {
     sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }

// Пример создания модели
// const User = sequelize.define(
//     'User',
//     {
//       // Здесь определяются атрибуты модели
//       firstName: {
//         type: DataTypes.STRING,
//         allowNull: false,
//       },
//       lastName: {
//         type: DataTypes.STRING,
//         // allowNull по умолчанию имеет значение true
//       }
//     },
//     {
//         timestamps: false,
//     }
//   )
//User.drop()

const Player = sequelize.define(
    'Player',
    {

    },
    {
        timestamps: false
    }


)
console.log('Таблица для модели `User` только что была создана заново!')