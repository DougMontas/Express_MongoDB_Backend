const mongoose = require('mongoose')

const connectionDb = async () => {
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING)
        console.log('Connection to the DataBase is established', connect.connection.host,connect.connection.name)

    }catch(err) {
        console.log(err)
        process.exit(1)
    }

}

module.exports = connectionDb