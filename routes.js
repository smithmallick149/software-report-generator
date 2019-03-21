var controllers = require("./app/controllers/");

module.exports = function(app) {
    app.get("/", controllers.home.basic);

    app.get("/clean_csv_files", controllers.cleaner.clean_csv_files);
    app.get("/convert_xlsx2csv", controllers.xlsx2csv.convert);
    app.get("/report_data_json", controllers.generateDataJson.from_resources_csv_files);
    app.get("/resize", controllers.resizeImages.cad_files);

    app.get("/dynamic_js", controllers.generateJsJson.dynamic);
    app.get("/dynamic_css", controllers.generateCss.dynamic);

    app.get("/landing_page", controllers.render.report_landing_page);
    app.get("/report_details_page", controllers.render.report_details_page);
    app.get("/generate_landing_page", controllers.generateHtml.report_landing_page);
    app.get("/generate_report_details_page", controllers.generateHtml.report_details_page);

    app.get("/edit_markers", controllers.edit_view.markers);
    app.post("/api/edit_markers", controllers.edit_view.markersPosition);
    app.post("/api/inspection_map_snapshot", controllers.edit_view.inspectionMapSnapshot);
    app.post("/api/defect_map_snapshot", controllers.edit_view.defectMapSnapshot);

    app.get("/export_support_files", controllers.export.export_support_files);
    app.get("/crack_length_measurement", controllers.crack_measurement.crack_length_measurement);

    app.use((req, res, next) => {
        var err = new Error("Page Not Found : Please Contact Software Team");
        err.status = 404;
        next(err);
    });

    if (app.get("env") === "development") {
        app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render("error", {
                message: err.message,
                error: err,
                title: "error"
            });
        });
    }

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: {},
            title: "error"
        });
    });
};