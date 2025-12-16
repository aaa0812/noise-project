(function () {
    const API_URL = "https://php-noise.com/noise.php";
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        const noiseForm = document.querySelector('.noise-form'); //récupère le form dans le DOM
        
        noiseForm.addEventListener("submit", handleSubmit); //écoute la soumission du formulaire pour appeler la méthode handlesubmit   
    }
    
    /**
     * Fonction gérant la soumission du formulaire
     * @param {*} e SubmitEvent
    */
   function handleSubmit(e) {
       e.preventDefault();
       let formData = new FormData(e.target); //crée un FormData à partir de l'élément html pour avoir accès aux données des input

       datas = Object.fromEntries(formData); //met les données dans un objet : { red : num, green: num, blue: num } pour y accéder facilement
       console.log(datas)
       //getRGBImg(datas.red, datas.green, datas.blue);
       getAdvanced(datas.red, datas.green, datas.blue, datas.nbTiles, datas.tileSize, datas.borderWidth, datas.brightnessMode, datas.aroundMode, datas.brightnessSteps);     
    }
    
    async function getRGBImg(red, green, blue) {
        const noiseImgEl = document.querySelector('.noise-img'); //récupère l'élément img dans le DOM

        try {
            const res = await fetch(`${API_URL }?r=${red}&g=4${green}&b=${blue}&mode=around&base64`); //fait une requête à l'api
            if (res.ok) { //si la réponse est bonne
                const body = await res.json(); //converti la réponse en json pour pouvoir la lire
                noiseImgEl.setAttribute("src", body.base64); //récupére la propriété base64 de l'objet pour le mettre dans le src de l'élément image
            }
        } catch (er) {
            console.log(er.message);// affiche l'erreur dans la console
        }
    }

    async function getAdvanced(red, green, blue, nbTiles, tileSize, borderWidth, brightnessMode, aroundMode, brightnessSteps) {
        
        const noiseImgEl = document.querySelector('.noise-img'); //récupère l'élément img dans le DOM
        try {
            const res = await fetch(`${API_URL }?r=${red}&g=${green}&b=${blue}&tiles=${nbTiles}&tileSize=${tileSize}&borderWidth=${borderWidth}&base64`); //fait une requête à l'api
            if (res.ok) { //si la réponse est bonne
                const body = await res.json(); //converti la réponse en json pour pouvoir la lire
                noiseImgEl.setAttribute("src", body.base64); //récupére la propriété base64 de l'objet pour le mettre dans le src de l'élément image
            }
        } catch (er) {
            console.log(er.message);// affiche l'erreur dans la console
        }
    }
}())

