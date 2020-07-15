function isDigit(text) {
    for (var i = 0; i < text.length; i++) {
        if (text[i] < '0' || text[i] > '9') {
            return false;
        }
    }
    return true;
}

function generate() {
    var template = document.getElementById("template").value;
    var data = document.getElementById("data").value;

    var templateParts = new Array();
    var variableIndices = new Array();
    var lastPartStart = 0;
    for (var i = 0; i < template.length - 2; i++) {
        if (template[i] == '^' && isDigit(template[i + 1]) && template[i + 2] == '^') {
            templateParts.push(template.substring(lastPartStart, i));
            variableIndices.push(Number(template.substring(i + 1, i + 2)));
            lastPartStart = i + 3;
        } else if (i < template.length - 3 && template[i] == '^' && isDigit(template.substring(i + 1, i + 3)) && template[i + 3] == '^') {
            templateParts.push(template.substring(lastPartStart, i));
            variableIndices.push(Number(template.substring(i + 1, i + 3)));
            lastPartStart = i + 4;
        }
    }
    templateParts.push(template.substring(lastPartStart, template.length));
    var maxIndex = Math.max.apply(Math, variableIndices);
    var trim = document.getElementById("trimCheckbox").checked;

    var output = "";
    for (var dataLine of data.split('\n')) {
        var dataLineStrings = dataLine.split(',');

        if (dataLineStrings.length < maxIndex + 1) {
            document.getElementById("output").value = "Not enough variables in line: " + dataLine;
            return;
        }

        for (var i = 0; i < variableIndices.length; i++) {
            output += templateParts[i];
            if(trim) {
                output += dataLineStrings[variableIndices[i]].trim();
            } else {
                output += dataLineStrings[variableIndices[i]];
            }
        }
        output += templateParts[variableIndices.length] + "\n";
    }

    document.getElementById("output").value = output;
}

function applyPreset(nr) {
    var template = "";
    switch (nr) {
        case 0:
            template = "public string ^0^ {\n    get => this._^0^;\n    set => this.UpdateField(ref this._^0^, value);\n}\nprivate string _^0^;";
            break;
        case 1:
            template = "INSERT INTO table_name (column1, column2, column3)\nVALUES (^0^, ^1^, ^2^);";
            break;
        case 2:
            template = "public string ^0^;";
            break;
        default:
            return;
    }
    document.getElementById("template").value = template;
    generate();
}