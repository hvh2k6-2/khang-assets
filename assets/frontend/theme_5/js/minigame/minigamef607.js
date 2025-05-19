$(document).ready(function () {
    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    const rndInt = randomIntFromInterval(300, 1000);
    $('.userCount').text(`${rndInt} người đang chơi`);
});


