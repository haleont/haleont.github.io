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
        return result ? `${r}, ${g}, ${b}` : null
    }
    let colorGroups = [
        ["#00B8AC", "#E21061", "#929292"],
        ["#FF4C45", "#0A88DE", "#242424", "#505050"],
        ["#5B14B7", "#FAA644", "#9A2EE8", "#FF4444", "#65AD1D", "#44AAFA", "#FA376C", "#FF8B43"],
        ["#006400", "#0000FF", "#9933ff", "#F40099", "#CC0000", "#FF5500", "#993300", "#666666", "#009900", "#00CC00", "#0099ff", "#00B0F6"],
        ["#E6007E"]
        ],
        inputModel = document.querySelectorAll(".model");
    inputModel.forEach(input => {
        input.addEventListener("change", (ev) => {
            if (ev.target.checked) generate(ev.target.value)
        });
    })

    function generate(model) {
        let table = document.createElement("div"),
            div = document.querySelector("#output");
        table.id = "palette"
        if (div.firstChild) div.firstChild.remove();
        colorGroups.forEach(group => {
            group.sort((c1, c2) => {
                return c1.localeCompare(c2)
            }).forEach((color) => {
                let input = document.createElement("input");
                input.classList.add("color")
                input.type = "text";
                input.dataset.color = color
                input.value = model == "HTML" ? color : model == "RGB" ? hexToRgb(color, false) : hexToRgb(color, true);
                input.addEventListener("click", (ev) => {
                    ev.target.select()
                    let strColor = ev.target.value,
                        strHexColor = ev.target.dataset.color;
                    navigator.clipboard.writeText(strColor)
                    document.querySelector("#msg").innerHTML = `Color <span style="color:${strHexColor}">${strColor}</span> copiado.`
                })
                input.style.backgroundColor = color;
                table.appendChild(input);
            })
        })
        div.appendChild(table);
    }
    generate("HTML");
}
