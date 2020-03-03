function selectMyTest() {

    let select = document.getElementById("test").value;
    if(select != ""){
        document.getElementById("myBtn").disabled = false;
        getListadoMonedas();
    }else{
        console.log('no procede');
        document.getElementById("myBtn").disabled = true;
    }
  }

function readJsonMonedas() {
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

function readTokensYFecha() {
    const url = '../json/tokensBearer.json';
   
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

function getListadoMonedas(){
    readJsonMonedas().then( monedas => {
        procesarPeticion(monedas.EURO);
        procesarPeticion(monedas.USD);
        procesarPeticion(monedas.MX);

    }).catch( err=> {
        console.log(err);
    })
}
function getListadoTokens(){
    readTokensYFecha().then( tests => {
        procesarPeticion(tests.test);
        procesarPeticion(tests.staging);
        procesarPeticion(tests.produccion);

    }).catch( err=> {
        console.log(err);
    })
}

function procesarPeticion(monedas){
    monedas.forEach(moneda => {
       console.log(moneda) 
    });
 }
 function procesarPeticionTokens(token, fecha){
    monedas.forEach(moneda => {
       console.log(moneda) 
    });
 }
