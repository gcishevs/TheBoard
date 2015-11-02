(function(database){

    var mongodb = require("mongodb");
    var mongodbUrl = "mongodb://localhost:27017/theBoard"
    var theDb = null;

    database.getDb = function(next){
        if(theDb){
            next(null, theDb);
        }
        else{
            mongodb.MongoClient.connect(mongodbUrl, function(err, db){
                if(err){
                    next(err, null);
                }
                else{
                    mongodb.MongoClient.connect(mongodbUrl, function(err, db){
                       if(err){
                           next(err, null);
                       }
                        else{
                           theDb = {
                               db: db,
                               notes: db.collection("notes")
                           }
                           next(null, theDb);
                       }
                    });
                }
            });
        }

    }


})(module.exports)