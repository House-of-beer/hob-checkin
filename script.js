const resultado = document.getElementById("resultado");

const URL_API = "https://script.google.com/macros/s/AKfycbwZXGi8OqaKdfTU7LmUmbA_VfGRppW1XbSGr7Ikpy0JLFT4MQCUdHRMkE3kE0v_t9mKWA/exec";


function mostrarResultado(mensagem, sucesso = false) {

    resultado.innerHTML = mensagem;

    resultado.style.background = sucesso
        ? "#0a7d32"
        : "#8b0000";

}



function onScanSuccess(decodedText) {


    mostrarResultado("🔎 Consultando ingresso...");


    fetch(
        URL_API + "?codigo=" + encodeURIComponent(decodedText)
    )

    .then(response => response.json())

    .then(data => {


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

    .catch(error => {


        console.log(error);


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
