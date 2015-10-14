(function(homeController){
    var data = require("../data");

    homeController.init = function(app){
        app.get("/", function(req, res){

            data.getCategories(function(err, result){
                res.render("index", {title: "Express + Vash", error: err, categories: result});
            })

        })
    }
})(module.exports)