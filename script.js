(function () {
    const API_URL = "https://php-noise.com/noise.php";
    const audioClick = new Audio("src/sound-effects/click1.mp3");
    audioClick.volume = 0.1;
    const crtON = new Audio("src/sound-effects/crton.mp3");
    crtON.volume = 0.1;
    const crtOFF = new Audio("src/sound-effects/crtoff.mp3");
    crtOFF.volume = 0.1;
    const generateClick = new Audio("src/sound-effects/generate5.mp3");
    generateClick.volume = 0.1;
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        const noiseForm = document.querySelector('.noise-form'); //récupère le form dans le DOM
        const crtToggle = document.querySelector('.crt-check input');
        const random = document.querySelector('.random-btn');
        const logo = document.getElementById('logo');
        const hoverSound = new Audio("src/sound-effects/hover2.mp3");
        hoverSound.volume = 0.1;
        const hoverTarget = document.querySelectorAll(".btn, .creatorscard");
        const burger = document.querySelector('.burger');

        if (logo) {
            logo.addEventListener("click", () => audioClick.play());
        }

        if (random) {
            random.addEventListener("click", handleRandom);
        }

        if (noiseForm) {
            noiseForm.addEventListener("submit", handleSubmit); //écoute la soumission du formulaire pour appeler la méthode handlesubmit
        }

        if (crtToggle) {
            crtToggle.addEventListener("click", toggleCrt);
        }

        burger.addEventListener("click", handleBurgerMenu);

        hoverTarget.forEach(el => {
            el.addEventListener("mouseenter", () => {
                hoverSound.currentTime = 0;
                hoverSound.play();
            });
        });
    }

    function handleBurgerMenu() {
        const menu = document.querySelector('nav ul');
        menu.classList.toggle('active');
    }

    function toggleCrt() {
        const body = document.querySelector('body');

        if (!body.classList.contains('effect-class')) {
            crtON.play()
        } else {
            crtOFF.play()
        }
        body.classList.toggle('effect-class');
    }

    async function handleRandom() {
        const noiseImgEl = document.querySelector('.noise-img'); //récupère l'élément img dans le DOM
        generateClick.play();
        try {
            let res;
            res = await fetch(`${API_URL}?base64`); //fait une requête à l'api
            if (res.ok) { //si la réponse est bonne
                const body = await res.json(); //converti la réponse en json pour pouvoir la lire
                noiseImgEl.setAttribute("src", body.base64); //récupére la propriété base64 de l'objet pour le mettre dans le src de l'élément image
            }
        } catch (er) {
            console.error(er.message);// affiche l'erreur dans la console
        }
    }

    /**
     * Fonction gérant la soumission du formulaire
     * @param {*} e SubmitEvent
    */
    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target); //crée un FormData à partir de l'élément html pour avoir accès aux données des input
        generateClick.play();
        datas = Object.fromEntries(formData); //met les données dans un objet : { red : num, green: num, blue: num } pour y accéder facilement
        getAdvanced(datas.red, datas.green, datas.blue, datas.hex, datas.nbTiles, datas.tileSize, datas.borderWidth, datas.mode, datas.brightnessSteps, datas.brightnessMultiplicator);
    }


    async function getAdvanced(red, green, blue, hex, nbTiles = 50, tileSize = 7, borderWidth = 0, mode = "around", brightnessSteps = 5, brightnessMultiplicator = 1.5) {
        const noiseImgEl = document.querySelector('.noise-img'); //récupère l'élément img dans le DOM
        try {
            let res;

            if (hex === "") {
                res = await fetch(`${API_URL}?r=${red}&g=${green}&b=${blue}&tiles=${nbTiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&mode=${mode}&steps=${brightnessSteps}&multi=${brightnessMultiplicator}&base64`); //fait une requête à l'api
            } else {
                res = await fetch(`${API_URL}?hex=${hex}&tiles=${nbTiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&mode=${mode}&steps=${brightnessSteps}&multi=${brightnessMultiplicator}&base64`);
            }
            if (res.ok) { //si la réponse est bonne
                const body = await res.json(); //converti la réponse en json pour pouvoir la lire
                noiseImgEl.setAttribute("src", body.base64); //récupére la propriété base64 de l'objet pour le mettre dans le src de l'élément image
            }
        } catch (er) {
            console.error(er.message);// affiche l'erreur dans la console
        }

    }
}())

