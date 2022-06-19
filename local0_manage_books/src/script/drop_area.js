document.body.ondragover = (event) => { event.preventDefault(); };
document.body.ondrop = (event) => { event.preventDefault(); };

const form = {
    input_types : ["text", "text", "text", "text", "number", "number", "number", "number", "text", "text", "category: spinner",  "complexity spinner",  "text", "text"],
    classes : ["authors", "title", "discipline", "sub-discipline", "year", "month", "edition", "pages", "language", "clasa", "category", "complexity", "keywords", "publisher"],
    validator : []
};

const OnDrop = (event) => {
    event.preventDefault();
    console.log("Drop");
    console.log(event.dataTransfer.files);

    console.log("Total size: ", SumFileSizes(event.dataTransfer.files));

    const container = document.getElementById("metadata-elements");
    if(container) {
        RemoveExistingMetadataElements(container);

        for (let index = 0; index < event.dataTransfer.files.length; index++) {
            GenerateMetadataElements(container, "container_" + index.toString());
        }
    }

    host_0_element.style.background = "white";
};

const OnDragEnter = (event) => {
    event.preventDefault();
    console.log("DragEnter");
    host_0_element.style.background = "grey";
};

const OnDragOver = (event) => {
    event.preventDefault();
    host_0_element.style.background = "grey";   // <TODO> this is annoying
    console.log("DragOver");
};

const OnDragLeave = (event) => {
    event.preventDefault();
    console.log("DragLeave");
    host_0_element.style.background = "white";
};

const body = document.body;
body.ondrop = (event) => {event.preventDefault()};
body.ondragover = (event) => {event.preventDefault()};

const host_0_element = document.getElementById("drop-area");
host_0_element.ondragenter = OnDragEnter;
host_0_element.ondragover = OnDragOver;
host_0_element.ondragleave = OnDragLeave;
host_0_element.ondrop = OnDrop;

const SumFileSizes = (files_list) => {
    if( files_list instanceof FileList ) {
        let size_sum = 0;
        for (let index = 0; index < files_list.length; index++) {
            size_sum += files_list[index].size;
        }

        return size_sum;
    }
};

const CSV_ToList = (csv) => {   // <TODO> useful for Authors, Keywords
    const list = [];
    let current_item = "";

    for(let index = 0; index < csv.length; index++) {
        if(csv[index] !== ',') {
            current_item += csv[index];
        }
        else if (csv[index] === ',' || index === csv.length - 1) {
            if (current_item.length > 0) {
                list.push(current_item);
                current_item = "";
            }
        }
    }

    return list;
};

const CSV_ToList_Event = (event) => {   // <TODO> useful for Authors, Keywords
    const id = event.target.dataset["id"];
    console.log(event.target, id);

    const container = document.getElementById(id);
    const metadata = container.children;
    console.log(container, metadata);

    // filter by class
    let authors;
    for( let index = 0; index < metadata.length; index++) {
        if (metadata[index].class === "authors") {
            authors = metadata[index];
            break;
        }
    }
    const csv = authors.value;
    console.log(authors, csv);

    // <TODO> consume L and R spaces
    // <TODO> the last item is always missing
        // (!) proper parser state-machine => structure (!)
    // <TODO> I do not know if "as,,er" -> (i) ["as", "er"] or (ii) ["as", "", "er"] -> parametrizable [in my case though, I need the specialized variant (i)]

    const list = [];
    let current_item = "";

    for(let index = 0; index < csv.length; index++) {
        if(csv[index] !== ',') {
            current_item += csv[index];
        }
        else if (csv[index] === ',') {
            if (current_item.length > 0) {
                list.push(current_item);
                current_item = "";
            }
        }
        else if (index === csv.length - 1) {
            current_item += csv[index];
            list.push(current_item);
        }
    }

    console.log(list);

    return list;
};

const CapitalizeWord = (word) => {
    if (word && typeof word === "string") {
        return word[0].toUpperCase() + word.substring(1, word.length);
    }
};

const MonthToNumber = (month_string) => {
    const patterns = ["jan", "ian", "january", "ianuarie", "--case-insensitive", "--spaces", "--match-prefix"];
    // mapping the whole of ASCII strings up to some reasonable length onto: [0, 11] - one of the twelve months - or [-1 or 12] - invalid -
};

const NumberToMonth = (month_number, language) => {
    // ?? get database( months[language] ) ??
};

const GenerateMetadataElements = (parent, item_id) => {
    const container = document.createElement("div");
    container.id = item_id;

// ----

    for (let index = 0; index < classes.length; index++) {
        const new_element = document.createElement("input");

        new_element.class = form.classes[index];
        new_element.type = form.input_types[index];
        new_element.placeholder = CapitalizeWord(form.classes[index]);

        container.appendChild(new_element);
    }
    const trigger = document.createElement("button");
    trigger.innerText = "Trigger";
    trigger.dataset["id"] = item_id;
    trigger.onclick = ValidateAndSend;
    container.appendChild(trigger);

    // const uri_mirrors_element = document.createElement("input");
    //     uri_mirrors_element.type = "text";  // comma separated -> List

    parent.appendChild(container);
};

const RemoveExistingMetadataElements = (parent) => {
    if(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }
};

const _getElementIndexByClassName = (_HTMLCollection, className) => {
    if (_HTMLCollection instanceof HTMLCollection) {
        for (let index = 0; index < _HTMLCollection.length; index++) {
            if (_HTMLCollection[index].class === className) {
                return index;
            }
        }
    }

    return -1;
};

const ValidateAndSend = (event) => {
    const id = event.target.dataset["id"];
    const container = document.getElementById(id);
    const validation = [];
    let AND_validation = true;
    const sql = {};

    for (let index = 0; index < form.classes.length; index++) {
        const element = _getElementIndexByClassName(container.children, form.classes[index]);
        [valid, data] = form.validator[index](element)
        validation.push(valid);
        AND_validation &= valid;
        sql[form.classes[index]] = data;
    }

};

const Validator_authors = (element) => {
    const text = element.value;
    const csv = CSV_ToList(text);

    if (csv.length > 0) {
        return [true, csv];
    }
    else {
        return [false, csv];
    }
};

const PrepareItemObjectForCommit = (item_id) => {

};
