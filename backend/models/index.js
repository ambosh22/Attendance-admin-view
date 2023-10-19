const mongoose = require("mongoose");
const uri = "mongodb+srv://walexlim123:Nbv8KnD8dstLAzm5@cluster0.0jfnequ.mongodb.net/?retryWrites=true&w=majority";


function main() {
    mongoose.connect(uri).then(() => {
        console.log("Succesfull")
    
    }).catch((err) => {
        console.log("Error: ", err)
    })
}

module.exports = { main };
