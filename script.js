const resultado = document.getElementById("resultado");

const URL_API = "/api/checkin";


function mostrarResultado(mensagem, sucesso = false) {

    resultado.innerHTML = mensagem;

    resultado.style.padding = "20px";
    resultado.style.marginTop = "20px";
    resultado.style.borderRadius = "10px";
    resultado.style.color = "white";

    resultado.style.background = sucesso
        ? "#0a7d32"
        : "#8b0000";

}



function onScanSuccess(decodedText) {


    // Evita várias leituras seguidas
    scanner.clear();


    mostrarResultado(
        "🔎 QR Code escaneado!<br>Consultando ingresso..."
    );


    fetch(
        URL_API + "?codigo=" + encodeURIComponent(decodedText)
    )

    .then(response => response.json())

    .then(data => {


        if (data.sucesso) {


            mostrarResultado(

                "✅ QR Code válido!<br><br>" +
                "Entrada liberada 🎉<br><br>" +
                "Nome: " + data.nome +
                "<br>Lote: " + data.lote,

                true

            );


        } else {


            mostrarResultado(

                data.mensagem

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
