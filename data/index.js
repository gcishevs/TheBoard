(function (data) {

    var seedData = require("./seedData");
    var database = require("./database");

    data.getCategories = function (next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err, null);
            }
            else {
                db.notes.find().sort({name: 1}).toArray(function (err, result) {
                    if (err) {
                        next(err, null);
                    }
                    else {
                        next(null, result);
                    }
                })
            }
        })
    }

    data.getCategory = function(categoryName, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.notes.findOne({name: categoryName}, next);
            }
        })
    }

    data.addNote = function(categoryName, noteToInsert, next){
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.notes.update({name: categoryName}, {$push: {notes : noteToInsert}}, next);
            }
        })

    }

    data.createNewCategory = function (categoryName, next) {
        database.getDb(function (err, db) {
            if (err) {
                next(err);
            }
            else {
                db.notes.find({name: categoryName}).count(function (err, count) {
                    if (err) {
                        next(err)
                    }
                    else {
                        if (count != 0) {
                            next("Category already exists");
                        }
                        else {
                            var category = {
                                name: categoryName,
                                notes: []
                            }
                            db.notes.insert(category, function (err) {
                                if (err) {
                                    next(err);
                                }
                                next(null);
                            })
                        }
                    }
                })
            }
        })
    }

    function seedDataBase() {
        database.getDb(function (err, db) {
            if (err) {
                console.log('Failed to get the db: ' + err);
            }
            else {
                // test to see if data exists
                if (db.notes.count(function (err, count) {
                        if (err) {
                            console.log("Failed to retrieve notes count: " + err);
                        }
                        else {
                            if (count == 0) {
                                console.log("Seeding...");
                                seedData.initialNotes.forEach(function (item) {
                                    db.notes.insert(item, function (err) {
                                        if (err) {
                                            console.log("Failed to insert item: " + err);
                                        }

                                    })
                                })
                            }
                            else {
                                console.log("Data already exists");
                            }
                        }
                    }));
            }
        })
    }

    seedDataBase();

})(module.exports)