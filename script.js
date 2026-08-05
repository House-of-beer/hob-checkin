const resultado = document.getElementById("resultado"); 

function mostrarResultado(mensagem, sucesso = false) {
    resultado.innerHTML = mensagem;

    if (sucesso) {
        resultado.style.background = "#0a7d32";
    } else {
        resultado.style.background = "#8b0000";
    }
}

function onScanSuccess(decodedText) {

    mostrarResultado("🔎 Consultando ingresso...");

    fetch("https://script.google.com/macros/s/SEU_LINK_DO_APPS_SCRIPT/exec?codigo=" + decodedText)
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

            mostrarResultado(
                "Erro ao consultar ingresso"
            );

            console.log(error);

        });

}


function onScanFailure(error) {

}


let scanner = new Html5QrcodeScanner(
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
