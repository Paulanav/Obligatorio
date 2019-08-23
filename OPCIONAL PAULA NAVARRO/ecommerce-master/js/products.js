//function sortProducts(criteria, array){
//}
var productsArray = [];

let htmlContentToAppend = "";
function showProductsList(array){
    for(let i = 0; i < array.length; i++){
        let product = array[i];

        htmlContentToAppend += `
        <div class="list-group-item list-grop-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + product.imgSrc + `" alt="" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <h4 class="mb-1">`+ product.name +`</h4>

                        <small class="text-muted">` + product.soldCount + ` vendidos    </small>
                    </div>
                        <br>
                        <p>`+ product.description +`</p>
                        <br><br>
                        <h4 class="mb-1">`+ product.currency + product.cost +`</h4>
                </div>
            </div>
        </div>
        `
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
        
    }

}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            productsArray = resultObj.data;
            //Muestro las categorías ordenadas
            showProductsList(productsArray);
        }
    });
 
});