(function(data){

    var seedData = require("./seedData");

    data.getCategories = function(next){
        next(null, seedData.initialNotes);
    }

})(module.exports)