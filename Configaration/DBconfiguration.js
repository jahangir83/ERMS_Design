module.exports = {
    HOST: 'localhost',
    USER: 'postgres',
    PASSWORD: 'Jahangir6566',
    DB: 'testing_project',
    dialect: 'postgresql', 
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}