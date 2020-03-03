

function readJson() {
    
    const url = '../json/listado.json';
   
    return fetch(url)
        .then( async response => {
            return await response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}
generarListado();

function generarListado(){
    $("#spanSpin").hide();

    document.getElementById("myBtn").disabled = true;
    readJson().then( monedas => {
        generarTabla(monedas.EURO);
        generarTabla(monedas.USD);
        generarTabla(monedas.MX);
    }).catch( err=> {
        console.log(err);
    })
}

 function generarTabla(monedas){
    //const listCoinsArray = [];
    monedas.forEach(moneda => {
        //listCoinsArray.push({moneda});
        lstTr=`<tr>
                    <th scope="row">${moneda.de}</th>
                    <th >${moneda.a}</th>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>`;
        $("table tbody").append(lstTr);
    });
 }
