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
    let costoEnvio = subtotal * shippingPercentage;
    document.getElementById("precioEnvio").innerHTML = costoEnvio;
    total = costoEnvio + subtotal;
    document.getElementById("precioTotal").innerHTML = total;
}

function updateSubtotal(precioUnitario){
    //let precioUnitario = parseInt(document.getElementById("unitCost").textContent);
    let cantidad = parseInt(document.getElementById("liveCount").value);
    subtotal = precioUnitario * cantidad;
    document.getElementById("subTotal").innerHTML = subtotal;
    document.getElementById("precioSubtotal").innerHTML = subtotal;
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
                    <td><input type="number" id="liveCount" class="form-control" style="width: 5em" value="`+ articles.count +`" min="1"></td>
                    <th id="subTotal"></th>
                </tr>
            `
            document.getElementById("carritoTabla").innerHTML = tableContent;
            updateSubtotal(articles.unitCost);
            updateTotalCosts();
            
            document.getElementById("liveCount").addEventListener("change",function(){
            updateSubtotal(articles.unitCost); 
            updateTotalCosts();
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
document.getElementById("sendPremium").addEventListener("change", function(){
    shippingPercentage = 0.15;
    updateTotalCosts();
})
document.getElementById("sendExpress").addEventListener("change", function(){
    shippingPercentage = 0.07;
    updateTotalCosts();
})
document.getElementById("sendStandard").addEventListener("change", function(){
    shippingPercentage = 0.05;
    updateTotalCosts();
})