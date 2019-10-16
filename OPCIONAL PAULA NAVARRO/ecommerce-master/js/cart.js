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

function updateSubtotal(precioUnitario){
    //let precioUnitario = parseInt(document.getElementById("unitCost").textContent);
    let cantidad = parseInt(document.getElementById("liveCount").value);
    let sTotal = precioUnitario * cantidad;
    document.getElementById("subTotal").innerHTML = sTotal;
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
                    <td><img src="`+ articles.src +`" + width="70px" class="img-thumbnail"></td>
                    <td>`+ articles.name +`<td>
                    <td id="unitCost">`+ articles.currency +` `+` ` + articles.unitCost +`</td>
                    <td><input type="number" id="liveCount" class="form-control" style="width: 5em;"`+ articles.count +`" min="1"></td>
                    <th id="subTotal"></th>
                </tr>
            `
            document.getElementById("carritoTabla").innerHTML = tableContent;
            updateSubtotal(articles.unitCost);
            document.getElementById("liveCount").addEventListener("change",function(){
            updateSubtotal(articles.unitCost);
        });
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(_e){
    getJSONData(CART_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            showArticles(resultObj.data.articles);
        }
    });
});