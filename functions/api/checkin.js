export async function onRequest(context) {

  const urlAPI = "https://script.google.com/macros/s/AKfycbw7mxurQn2PD5S-mPWLKGoTAh-39xerb_Pj0CtPh08x3R7qd8dh5rFhSKNvVEyzLtPn4g/exec";


  const codigo = context.request.url.split("?codigo=")[1];


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
    urlAPI + "?codigo=" + codigo
  );


  const dados = await resposta.text();


  return new Response(
    dados,
    {
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

}
