window.addEventListener("load", main)

function main() {
    function hexToRgb(hex, boolrgb) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex),
            r, g, b;
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
        if (boolrgb) {
            r = Math.round(r / 255 * 1000) / 1000;
            g = Math.round(g / 255 * 1000) / 1000;
            b = Math.round(b / 255 * 1000) / 1000;
        }
        return result ? [r, g, b] : null
    }
    let colorGroups = [
            ["#B6B6B6", "#23D769"],
            ["#1FA172", "#32CF5B", "#3AE351", "#C7D530", "#B4E24D", "#17CB8D"],
            ["#079AAE", "#1E6991", "#1D5FBF", "#0068B7", "#696B74", "#7E8681"],
            ["#006400", "#0000FF", "#9933ff", "#F40099", "CC0000", "#FF5500", "#993300", "#666666", "#009900", "#CC0000", "#00CC00", "#0099ff", "#00B0F6"]
        ],
        inputModel = document.querySelectorAll(".model");
    inputModel.forEach(input => {
        input.addEventListener("change", (ev) => {
            if (ev.target.checked) generate(ev.target.value)
        });
    })

    function generate(model) {
        let table = document.createElement("table"),
            div = document.querySelector("#output");
        if (div.firstChild) div.firstChild.remove();
        colorGroups.forEach(group => {
            group.sort((c1, c2) => {
                return c1.localeCompare(c2)
            }).forEach((color) => {
                let row = document.createElement("row"),
                    td = document.createElement("td"),
                    tdColor = document.createElement("td"),
                    input = document.createElement("input");
                input.type = "text";
                input.value = model == "HTML" ? color : model == "RGB" ? hexToRgb(color, false) : hexToRgb(color, true);
                td.appendChild(input);
                tdColor.style.backgroundColor = color;
                row.appendChild(tdColor);
                row.appendChild(td);
                table.appendChild(row);
            })
        })
        div.appendChild(table);
    }
    generate("HTML");
}