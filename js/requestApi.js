
function selectMyTest() {
    let select = document.getElementById("test").value;
    if(select != ""){
        document.getElementById("myBtn").disabled = false;        
    }else{        
        document.getElementById("myBtn").disabled = true;
    }
  }

function procesarPeticion() {
    const select = document.getElementById("test").value; 
    // limpio la tabla
    $("#tableTests > tbody ").empty();   
    readJsonTokens().then(datos => {        
        const test = datos.test;
        const staging = datos.staging;
        const produccion = datos.produccion;
        
        switch (select) {
            case 'test':
                prepararPeticion(test);
                break;
            case 'staging':
                prepararPeticion(staging);
                break;
            case 'produccion':
                prepararPeticion(produccion);
            break;
            default:
                console.log('ninguno de los valores coincide');
            break;
        }
    }).catch(err => {
        console.log(err);
    })
}

function readJsonTokens() {
    const url = '../json/tokensBearer.json';

    return fetch(url)
        .then(async response => {
            return await response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}
function readJsonMonedas() {
    const url = '../json/listado.json';

    return fetch(url)
        .then(async response => {
            return await response.json();
        })
        .then(result => {
            return result;
        })
        .catch(err => {
            return err;
        })
}
function prepararPeticion(entorno) {
    const token = entorno.token;
    const fecha = entorno.fecha;
    readJsonMonedas().then(monedas => {        
        hacerPeticion(monedas.EURO, token, fecha);
        hacerPeticion(monedas.USD, token, fecha);
        hacerPeticion(monedas.MX, token, fecha);
    }).catch(err => {
        console.log(err);
    })
}

function hacerPeticion(monedas, token, fecha) {    
    monedas.forEach(moneda => {
        $("#spanSpin").show();
        const de = moneda.de;
        const a = moneda.a;   
        const url =`https://jsonplaceholder.typicode.com/users/1`;
       // const url = `https://cambiodivisa.easy-pays.com/CambioDivisa/realizarConversion/${de}/${a}/${fecha}`;
        const params = {
            method: "GET",
            // mode: "cors",            
            headers: {
                "Content-Type": "application/json",
                // 'Access-Control-Allow-Origin': '*',
                // 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
                // 'Access-Control-Request-Method': 'GET, POST, DELETE, PUT, OPTIONS',
                
                "Authorization": `Bearer ${token}`
            }
        }
        return fetch(url, params)
            .then(async response => {
                return await response.json();
            })
            .then(result => {                
                generarTablaApi(de, a, result)
            })
            .catch(err => {
                return err;
            })                     
    }); 
    $("#spanSpin").hide();

}

function generarTablaApi(de, a, dataApi) {    
    lstTr = `<tr>
                <th scope="row">${de}</th>
                <th >${a}</th>
                <td>${dataApi.name}</td>
                <td>${dataApi.username}</td>
                <td>${dataApi.email}</td>
                <td>${dataApi.address.street}</td>
            </tr>`;
    $("table tbody").append(lstTr);    
}