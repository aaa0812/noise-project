(function () {
    const API_URL = "https://php-noise.com/noise.php";
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        const noiseForm = document.querySelector('.noise-form'); //récupère le form dans le DOM

        if(noiseForm) {
            noiseForm.addEventListener("submit", handleSubmit); //écoute la soumission du formulaire pour appeler la méthode handlesubmit
        }
        initBurgerMenu();
    }

    function initBurgerMenu() {
        const burger = document.querySelector('.burger');
        const menu = document.querySelector('nav ul');

        burger.addEventListener('click', () => {
            menu.classList.toggle('active');
        });
    }

    /**
     * Fonction gérant la soumission du formulaire
     * @param {*} e SubmitEvent
    */
    function handleSubmit(e) {
        e.preventDefault();
        let formData = new FormData(e.target); //crée un FormData à partir de l'élément html pour avoir accès aux données des input

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

