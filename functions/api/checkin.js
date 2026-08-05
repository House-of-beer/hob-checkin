export async function onRequest(context) {

  const urlAPI = "https://script.google.com/macros/s/AKfycbw7mxurQn2PD5S-mPWLKGoTAh-39xerb_Pj0CtPh08x3R7qd8dh5rFhSKNvVEyzLtPn4g/exec";


  const url = new URL(context.request.url);

  const codigo = url.searchParams.get("codigo");


  if (!codigo) {

    return new Response(
      JSON.stringify({
        sucesso: false,
        mensagem: "Código não recebido"
      }),
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

  }


  const resposta = await fetch(
    urlAPI + "?codigo=" + encodeURIComponent(codigo)
  );


  const texto = await resposta.text();


  return new Response(
    texto,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}
