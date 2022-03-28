window.addEventListener("load", main);

function main() {
    let $parameters = {
            "id": "g7kcfcqg",
            "width": 672,
            "height": 378,
            "border": "ffffff",
            "rc": false,
            "ai": false,
            "sdz": false,
            "smb": false,
            "stb": false,
            "stbh": false,
            "ld": false,
            "sri": false,
            "ctl": false,
            "sfsb": false,
            "szb": false,
        },
        $alias = {
            "id": "Identificación",
            "width": "Ancho",
            "height": "Alto",
            "border": "Borde",
            "rc": "Clic derecho",
            "ai": "Barra de entrada",
            "sdz": "Shift arrastre zoom",
            "smb": "Barra de menú",
            "stb": "Barra de herramientas",
            "stbh": "Herramientas de ayuda",
            "ld": "Arrastrar etiquetas",
            "sri": "Icono de reinicio",
            "ctl": "Inicio de construcción",
            "sfsb": "Pantalla completa",
            "szb": "Zoom",
        }
    btnGenerate = document.querySelector("#btnGenerate"),
        btnCopy = document.querySelector("#btnCopy"),
        btnURL = document.querySelector("#btnURL");
    document.querySelectorAll(".options input").forEach(element => {
        element.addEventListener("change", generate)
    });
    btnGenerate.addEventListener("click", generate);
    btnCopy.addEventListener("click", () => {
        let elOutput = document.querySelector("#output")
        elOutput.select();
        navigator.clipboard.writeText(elOutput.value).then(() => {
            /* Resolved - text copied to clipboard */
        }, () => {
            /* Rejected - clipboard failed */
        });
    });
    btnURL.addEventListener("change", (ev) => {
        let value = ev.target.value.split("/")[4];
        $parameters["id"] = value;
        document.querySelector("div#id>input").value = value
        generate()
    })

    function generate() {
        let elPreview = document.querySelector("div#preview"),
            elOutput = document.querySelector("textarea#output"),
            content = document.createElement("div"),
            div = document.createElement("div"),
            strTemplate;
        strTemplate = String.raw `<iframe scrolling="no" 
        src="https://www.geogebra.org/material/iframe/id/${$parameters.id}/width/${$parameters.width}/height/${$parameters.height}/border/${$parameters.border}/rc/${$parameters.rc}/ai/${$parameters.ai}/sdz/${$parameters.sdz}/smb/${$parameters.smb}/stb/${$parameters.stbh}/stbh/${$parameters.stbh}/ld/${$parameters.ld}/sri/${$parameters.sri}/ctl/${$parameters.ctl}/sfsb/${$parameters.sfsb}/szb/${$parameters.szb}"
        width="${$parameters.width}px"
        height="${$parameters.height}px"
        style="border:0px; display:block; margin: 0 auto;">
        </iframe>`.replace(/\n/gm, " ").replace(/\s\s+/gm, " ");
        content.id = "main-container";
        div.classList.add("ggbContainer");
        elOutput.value = strTemplate;
        elPreview.innerHTML = strTemplate
    }
    initMenu = function() {
        let nav = document.querySelector("nav");
        for (item in $parameters) {
            createInput({ parameter: item, value: $parameters[item] });
        }

        function createInput(option) {
            let { parameter, value } = option;
            let input = document.createElement("input"),
                label = document.createElement("label"),
                div = document.createElement("div");
            label.innerHTML = $alias[parameter];
            label.for = parameter;
            input.value = value;
            input.type = typeof value == "boolean" ? "checkbox" : "text";
            div.id = parameter;
            div.classList.add("parameter");
            input.addEventListener("change", (ev) => {
                $parameters[ev.target.parentNode.id] = ev.target.type == "checkbox" ? ev.target.checked : ev.target.value;
                generate();
            })
            div.appendChild(label);
            div.appendChild(input);
            nav.appendChild(div);

        }
    }()

}
