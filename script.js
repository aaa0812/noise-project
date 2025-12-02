(function () {
    const API_URL = "https://php-noise.com/noise.php";
    document.addEventListener('DOMContentLoaded', init);

    async function init() {
        const noiseImgEl = document.querySelector('.noise-img');
        try {
            const res = await fetch(API_URL + "?r=250&g=48&b=242&mode=around&base64");
            if(res.ok) {
                const body = await res.json();
                noiseImgEl.setAttribute("src", body.base64);
            }
        } catch(er) {
            console.log(er.message);
        }
    }
}())