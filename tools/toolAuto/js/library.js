window.addEventListener("load", main);

function main() {
    const arrImage = document.querySelector("#arrImg"),
        elView = document.querySelector("#view"),
        elStatus = document.querySelector("#status"),
        elTime = document.querySelector("#time"),
        elPlay = document.querySelector("#btnPlay"),
        elDownload = document.querySelector("#btnDownload"),
        elReload = document.querySelector("#btnReload"),
        elAux = document.querySelector("#aDownload"),
        arrBtn = document.querySelectorAll(".btn-container")


    arrImage.addEventListener("change", importImages);
    elPlay.addEventListener("click", playAnimation);
    elDownload.addEventListener("click", exportProject);
    elReload.addEventListener("click", () => { location.reload() });

    function setup() {
        let images = elView.getElementsByTagName("img");
        arrBtn[0].style.visibility = "visible";
        arrBtn[1].style.visibility = "hidden";
        for (let image of images) {
            image.style.display = "none";
        }
        let firstImage = images[0];
        firstImage.style.display = "block";
    }

    function playAnimation() {
        let images = elView.getElementsByTagName("img")
        setup();
        elView.onclick = function() {
            setup()
            let thisIndex = 0;
            arrBtn[0].style.visibility = "hidden";
            time = parseInt(elTime.value)
            step = function() {
                if (thisIndex < images.length) {
                    nextIndex = thisIndex == images.length - 1 ? 1 : thisIndex + 1
                    thisImage = images[thisIndex]
                    nextImage = images[nextIndex]
                    thisImage.style.display = "none"
                    nextImage.style.display = "block";
                    images[nextIndex].style.display = "block";
                    thisIndex += 1;
                    setTimeout(step, 1000 * time);
                }
                if (thisIndex == images.length) {
                    arrBtn[1].style.visibility = "visible";
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
        setup();
        let html = document.createElement("html"),
            body = document.createElement("body"),
            variables = document.createElement("script");

        variables.innerHTML = `let time = ${parseInt(elTime.value)};`
        html.appendChild(document.querySelector("#head").content.cloneNode(true));
        body.appendChild(elView.cloneNode(true));
        body.appendChild(variables);
        body.appendChild(document.querySelector("#script").content.cloneNode(true));
        html.appendChild(body)
        download(html.outerHTML, "index.html", "text/html");
    }

    function importImages(e) {
        let files = e.target.files;
        for (let index = 0, file; file = files[index]; index++) {
            let reader = new FileReader();
            reader.onload = onReaderLoad;
            reader.readAsDataURL(file);
            elStatus.innerText = "Cargando..."
            if (index == files.length - 1) elStatus.innerText = `Imágenes cargadas ${index+1}`
        };

        function onReaderLoad(e) {
            let strSrc = e.target.result,
                img = document.createElement("img");
            img.src = strSrc;
            elView.appendChild(img)
        }
    }


}