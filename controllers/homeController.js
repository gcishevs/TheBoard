(function(homeController){
    var data = require("../data");

    homeController.init = function(app){
        app.get("/", function(req, res){

            data.getCategories(function(err, result){
                res.render("index", {
                    title: "The Board!",
                    error: err,
                    categories: result,
                    newCatError: req.flash("NewCatName")
                });
            })
        })

        app.get("/notes/:categoryName", function(req, res){
            var categoryName = req.params.categoryName;
            res.render("notes", {title : categoryName});
        })

        app.post("/newCategory", function(req, res){
            var categoryName = req.body.categoryName;
            data.createNewCategory(categoryName, function(err){
                if(err){
                    console.log(err);
                    req.flash("NewCatName", err);
                    res.redirect("/");
                }
                else{
                    res.redirect("/notes/" + categoryName);
                }
            })
        })
    }
})(module.exports)
