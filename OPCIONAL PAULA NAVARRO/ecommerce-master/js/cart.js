let productUnitCost = 0;
let productCurrency = "";
let subtotal = 0;
let shippingPercentage = 0.15;
let total = 0;
let paymentTypeSelected = false;
const CREDIT_CARD_PAYMENT = "Tarjeta de crédito";
const BANKING_PAYMENT = "Transferencia bancaria";
let ERROR_MSG = "Ha habido un error :(, verifica qué pasó.";

//Función que se utiliza para actualizar los costos de publicación
function updateTotalCosts(){

}

function updateSubtotal(){

}

function showPaymentTypeNotSelected(){

}

function hidePaymentTypeNotSelected(){

}

function showArticles(array){
    let tableContent = "";
    for(let i = 0; i < array.length; i++){
        let articles = array[i];
        tableContent += `
                <tr>
                    <td><img src="`+ articles.scr +`" + width="50px"></td>
                    <td>`+ articles.name +`<td>
                    <td>`+ articles.unitCost +`</td>
                    <td>`+ articles.currency +`</td>
                    <td><input type="number" id="liveCount" value="1" min="1"></td>
                    <td>200</td>
                </tr>
            `
        document.getElementById("carritoTabla").innerHTML = tableContent;

    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(_e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status=== "ok")
        {
            showArticles();
        }
    });
});