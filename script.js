const resultado = document.getElementById("resultado");

const URL_API = "https://script.google.com/macros/s/AKfycbw7mxurQn2PD5S-mPWLKGoTAh-39xerb_Pj0CtPh08x3R7qd8dh5rFhSKNvVEyzLtPn4g/exec";


function mostrarResultado(mensagem, sucesso = false) {

    resultado.innerHTML = mensagem;

    resultado.style.background = sucesso
        ? "#0a7d32"
        : "#8b0000";

}



function onScanSuccess(decodedText) {


    mostrarResultado(
        "🔎 Consultando ingresso..."
    );


    const url = URL_API + "?codigo=" + encodeURIComponent(decodedText);


    fetch(url, {
        method: "GET",
        mode: "cors"
    })


    .then(function(response) {

        return response.text();

    })


    .then(function(texto) {


        console.log(texto);


        const data = JSON.parse(texto);



        if (data.sucesso) {


            mostrarResultado(

                "✅ Entrada liberada<br><br>" +
                "Nome: " + data.nome +
                "<br>Lote: " + data.lote,

                true

            );


        } else {


            mostrarResultado(
                "❌ " + data.mensagem
            );


        }


    })


    .catch(function(erro) {


        console.log("ERRO:", erro);


        mostrarResultado(
            "❌ Erro ao consultar ingresso"
        );


    });


}



function onScanFailure(error) {

}



const scanner = new Html5QrcodeScanner(

    "reader",

    {
        fps: 10,
        qrbox: 250
    }

);



scanner.render(

    onScanSuccess,

    onScanFailure

);
