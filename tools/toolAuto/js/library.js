window.addEventListener("load", main);

function main() {
    const arrImage = document.querySelector("#arrImg"),
        elView = document.querySelector("#view"),
        elStatus = document.querySelector("#status"),
        elTime = document.querySelector("#time"),
        elPlay = document.querySelector("#btnPlay"),
        elDownload = document.querySelector("#btnDownload"),
        elAux = document.querySelector("#aDownload")


    arrImage.addEventListener("change", importImages);
    elPlay.addEventListener("click", playAnimation);
    elDownload.addEventListener("click", exportProject);

    function playAnimation() {
        let images = elView.getElementsByTagName("img")
        setup();

        function setup() {
            for (let image of images) {
                image.style.display = "none";
            }
            let firstImage = images[0];
            firstImage.style.display = "block";
        }
        elView.onclick = function() {
            setup()
            thisIndex = 0;
            time = parseInt(elTime.value)
            step = function() {
                if (thisIndex < images.length - 1) {
                    nextIndex = thisIndex == images.length - 1 ? 1 : thisIndex + 1
                    thisImage = images[thisIndex]
                    nextImage = images[nextIndex]
                    thisImage.style.display = "none"
                    nextImage.style.display = "block";
                    images[nextIndex].style.display = "block";
                    thisIndex += 1;
                    setTimeout(step, 1000 * time);
                }
            }
            setTimeout(step, 1000 * time);
        }
    }

    function download(data, filename, type) {
        let file = new Blob([data], { type: type });
        url = URL.createObjectURL(file);
        elAux.href = url;
        elAux.download = filename;
        elAux.click()
        setTimeout(function() {
            window.URL.revokeObjectURL(url);
        }, 10000);
    }

    function exportProject() {
        let html = document.createElement("html"),
            body = document.createElement("body"),
            variables = document.createElement("script");

        variables.innerHTML = `let time = ${parseInt(elTime.value)};`
        html.appendChild(document.getElementById("head").content.firstElementChild.cloneNode(true));
        body.appendChild(elView.cloneNode(true));
        body.appendChild(variables);
        body.appendChild(document.getElementById("script").content.firstElementChild.cloneNode(true));
        html.appendChild(body)
        download(html.outerHTML, "auto.html", "text/html");
    }

    function importImages(e) {
        let files = e.target.files;
        for (let index = 0, file; file = files[index]; index++) {
            let reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsDataURL(file);
            elStatus.innerText = "Cargando..."
            if (index == files.length - 1) elStatus.innerText = "Imágenes cargadas"
        };

        function onReaderLoad(e) {
            let strSrc = e.target.result,
                img = document.createElement("img");
            img.src = strSrc;
            elView.appendChild(img)
        }
    }


}