const resultado = document.getElementById("resultado");

const URL_API = "https://script.google.com/macros/s/AKfycbwZXGi8OqaKdfTU7LmUmbA_VfGRppW1XbSGr7Ikpy0JLFT4MQCUdHRMkE3kE0v_t9mKWA/exec";


function mostrarResultado(mensagem, sucesso = false) {

    resultado.innerHTML = mensagem;

    resultado.style.background = sucesso 
        ? "#0a7d32" 
        : "#8b0000";

}



function consultarIngresso(codigo) {


    const url = URL_API + "?codigo=" + encodeURIComponent(codigo);


    const iframe = document.createElement("iframe");

    iframe.style.display = "none";

    iframe.src = url;


    document.body.appendChild(iframe);


}



function onScanSuccess(decodedText) {


    mostrarResultado("🔎 Consultando ingresso...");


    fetch(
        URL_API + "?codigo=" + encodeURIComponent(decodedText),
        {
            method: "GET",
            mode: "no-cors"
        }
    )

    .then(() => {


        setTimeout(() => {

            location.reload();

        }, 1500);


    })

    .catch(() => {


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
