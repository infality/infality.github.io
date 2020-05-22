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
    for (var i = 0; i < template.length - 3; i++) {
        if (template[i] == '^' && isDigit(template[i + 1]) && template[i + 2] == '^') {
            templateParts.push(template.substring(lastPartStart, i));
            variableIndices.push(Number(template.substring(i + 1, i + 2)));
            lastPartStart = i + 3;
        } else if (template[i] == '^' && isDigit(template.substring(i + 1, i + 3)) && template[i + 3] == '^') {
            templateParts.push(template.substring(lastPartStart, i));
            variableIndices.push(Number(template.substring(i + 1, i + 3)));
            lastPartStart = i + 4;
        }
    }
    templateParts.push(template.substring(lastPartStart, template.length));
    var maxIndex = Math.max.apply(Math, variableIndices);

    var output = "";
    for (var dataLine of data.split('\n')) {
        var dataLineStrings = dataLine.split(',');

        if (dataLineStrings.length < maxIndex + 1) {
            document.getElementById("output").value = "Not enough variables in line: " + dataLine;
            return;
        }

        for (var i = 0; i < variableIndices.length; i++) {
            output += templateParts[i];
            output += dataLineStrings[variableIndices[i]].trim();
        }
        output += templateParts[variableIndices.length] + "\n";
    }

    document.getElementById("output").value = output;
}