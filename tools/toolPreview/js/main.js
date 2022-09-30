window.addEventListener("load", main);

function main() {
    let quiz = document.querySelector("quiz"),
        btnPreview = document.querySelector("[data-name=str-path]"),
        tmpQuestion = document.querySelector("template").content.firstElementChild;

    btnPreview.addEventListener("change", importProject);

    function importProject(e) {
        let file = e.target.files[0],
            reader = new FileReader();
        reader.onload = onReaderLoad;
        reader.readAsText(file);
    }

    function onReaderLoad(e) {
        quiz.innerHTML = "";
        eval(e.target.result);
        Quiz.perguntas.forEach(item => {
            let question = tmpQuestion.cloneNode(true);
            question.querySelector("x-statement").innerHTML = item.pergunta;
            question.querySelector("x-option:nth-child(1)").innerHTML = item.respostas[0];
            question.querySelector("x-option:nth-child(2)").innerHTML = item.respostas[1];
            question.querySelector("x-option:nth-child(3)").innerHTML = item.respostas[2];
            question.querySelector(`x-option:nth-child(${item.correta})`).classList.add('correct');
            quiz.appendChild(question);
        });
        MathJax.typeset();
    }

}