const pipeline_to_pdf = require("./src/js/parsing_files");
const config = require("./config");
pipeline_to_pdf.PIPELINE_DatabaseHashedPDF("/home/nq/Downloads///", [".pdf", ".djvu", ".epub", ".txt", ""], true, null, "md5", config.URI_FileDirectory);

// (!)
    // mongoose: keep track of all files
    // encrypt all files, store their passwords in mongoose
    // try to compress files before committing to database (hashing)
    //

// (!)