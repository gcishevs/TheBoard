(function(notesController){

    var data = require("../data");

    notesController.init = function(app){

        app.get("/api/notes/:categoryName", function(req, res){
            var categoryName = req.params.categoryName;
            data.getCategory(categoryName, function(err, notes){
                if(err){
                    res.send(400, err);
                }
                else{
                    res.set("Content-Type", "application/json");
                    res.send(notes.notes);
                }
            })
        })

        app.post("/api/notes/:categoryName", function(req, res){
            var categoryName = req.params.categoryName;

            var noteToInsert = {
                name: req.body.name,
                color: req.body.color,
                author: "German Cishevskiy"
            }

            data.addNote(categoryName, noteToInsert, function(err){
                if(err){
                    res.send(400, err);
                }
                else{
                    res.set("Content-Type", "application/json");
                    res.send(201, noteToInsert);
                }
            })
        })

    };

})(module.exports)