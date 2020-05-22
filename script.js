function generate() {
    var template = document.getElementById("template").value;
    var data = document.getElementById("data").value;

    var templateParts = template.split('^^');
    var variableCount = templateParts.length - 1;

    var output = "";
    for (var dataLine of data.split('\n')) {
        var dataLineStrings = dataLine.split(',');
        if (dataLineStrings.length != variableCount) {
            document.getElementById("output").value = "Wrong data amount in line: " + dataLine;
            return;
        }

        for (var i = 0; i < variableCount; i++) {
            output += templateParts[i];
            output += dataLineStrings[i].trim();
        }
        output += templateParts[variableCount] + "\n";
    }

    document.getElementById("output").value = output;
}