// ---- ---- ----

const config = require("./../../config");
const unoconv = require("./unoconv");
const ddjvu = require("./ddjvu");

// ---- ---- ----

const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

// ---- ---- ----

const RecursiveFileEnumeration = (root_directory) => {
    let files = [];
    let directories = [root_directory];

    while (directories.length > 0) {
        const directory = directories.shift();

        const temp_files = fs.readdirSync(directory, {withFileTypes: true})
            .filter(dirent => dirent.isFile())
            .map(dirent => path.join(directory, dirent.name));

        const temp_directories = fs.readdirSync(directory, {withFileTypes: true})
            .filter(dirent => dirent.isDirectory())
            .map(dirent => path.join(directory, dirent.name));

        // ----

        temp_files.forEach( (file) => {
            files.push(file);
        });

        temp_directories.forEach( (directory) => {
            directories.push(directory);
        });
    }

    console.log(files);
    return files;
};

const HashBuffers = (buffers, hash) => {
    if (!hash) {
        hash = "md5";
    }

    return buffers
        .map( (buffer) => {
            return crypto.createHash(hash).update(buffer).digest().toString("hex");
        });
};

const FilterFilesByExtensions = (files, extensions, positive_filtering) => {
    console.log("Files: ", files);

    return files.filter( (file) => {
        let decision = false;

        const extension = path.extname(file);
        for (let index = 0; index < extensions.length; index++) {
            decision |= extension === extensions[index];
        }

        if (positive_filtering) { return decision; }
        else return !decision;
    });
};

const FilterFilesBySize = (files, minimum_size, maximum_size, positive_filtering) => {
    // return a list
};

const SplitFilesBySizeIntervals = (files, intervals, positive_filtering) => {
    // return a list of lists
};

const Ddjvu_Call = (filtereds, index, hash_type, target_directory) => {
    ddjvu.convert(filtereds[index], "pdf", "0.9", () => {   // <TODO> this has the severe problem that ddjvu behaves poorly; it doesn't want to write to stdout (!), especially not for .pdf output files
        Read_Hash_Write_Next(filtereds, index, hash_type, target_directory, filtereds[index], buffer);
    });
};

const Unoconv_Call = (filtereds, index, hash_type, target_directory) => {
    unoconv.convert(filtereds[index], "pdf", (error, buffer) => {
        if (error) {
            console.log(error);
        } else {
            Read_Hash_Write_Next(filtereds, index, hash_type, target_directory, filtereds[index], buffer);
        }
    });
};

const Read_Hash_Write_Next = (filtereds, index, hash_type, target_directory, filepath, buffer) => {
    if (!buffer) {
        buffer = fs.readFileSync(filepath);
    }

    const hash = HashBuffers([buffer], hash_type);

    // <TODO> check if the hash already exists; if it does, then there is no need to save this file (?), if they also have the same size (!) -> maybe keep a source / origin in the database ? (no, I dislike those incoming filenames)

    fs.writeFile(path.join(target_directory, hash.toString("hex")), buffer, {}, () => {
        console.log(`Finished writing file ${hash}`);

        ConvertToPDF_Callback(filtereds, index + 1, hash_type, target_directory);
    });
};

const ConvertToPDF_Callback = (filtereds, index, hash_type, target_directory) => {
    if (index < filtereds.length) {
        const filtered = filtereds[index];
        console.log(`Handling index ${index}, with file ${filtered}`);

	const extension = path.extname(filtered);

    if ( extension === ".pdf" || extension === ".djvu") {    // <TODO> remove the prefix dot (!); also, check what does extname do in cases such as ".tar.gz"
        Read_Hash_Write_Next(filtereds, index, hash_type, target_directory, filtered);

    } else if ( [".djvu"].includes(extension) ) {  // <TODO> what formats can `ddjvu` handle ?
            // don't have a converter for that yet
            Ddjvu_Call(filtereds, index, hash_type, target_directory, filtered);

        } else if ( [".doc", ".docx", ".txt", ".odt"].includes(extension) ) { // <TODO> what formats can `LibreOffice` handle ?
            Unoconv_Call(filtereds, index, hash_type, target_directory, filtered);

        }
    }
    else {  // <TODO> unknown format - log this request, maybe find a converter for it

    }
};

const PIPELINE_DatabaseHashedPDF = (source_directory = __dirname, extensions = null, positive_filtering = true, size_intervals = null, hash_type = "md5", target_directory) => {
    while (source_directory[source_directory.length - 1] === '/') {
        source_directory = source_directory.substring(0, source_directory.length - 1);
    }
    while (target_directory[source_directory.length - 1] === '/') {
        target_directory = target_directory.substring(0, target_directory.length - 1);
    }

    const files = RecursiveFileEnumeration(source_directory);
    const filtereds = FilterFilesByExtensions(files, extensions, positive_filtering);
    console.log(`Source directory: ${source_directory}, Target directory: ${target_directory}`);

    ConvertToPDF_Callback(filtereds, 0, hash_type, target_directory);
};

// ---- ---- ----

module.exports = {RecursiveFileEnumeration, PIPELINE_DatabaseHashedPDF};
