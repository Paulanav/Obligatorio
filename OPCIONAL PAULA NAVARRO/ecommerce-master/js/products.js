const ORDER_ASC_COST = "Asc"
const ORDER_DEC_COST = "Desc"
const ORDER_COST = "costo"
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCost = undefined;
var maxCost = undefined;

function sortProducts(criteria, array){
    let result = [];
    if (criteria === ORDER_ASC_COST)
    {
        result = array.sort(function(a, b) {
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });            
    }else if (criteria === ORDER_DEC_COST){
        result = array.sort(function(a, b) {
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
    }else if (criteria === ORDER_COST){
        result = array.sort(function(a, b) {
            let aCost = parseInt(a.cost);
            let bCost = parseInt(b.cost);

            if ( aCost > bCost ){ return -1; }
            if ( aCost < bCost ){ return 1; }
            return 0;
        });
}
    return result;
}

function showProductsList(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let product = currentProductsArray[i];
        
        if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
            ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost))){

        
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-grop-item-action">
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
            </a> 
            `
            }
        document.getElementById("product-list").innerHTML = htmlContentToAppend;
        
    }

}
function sortAndShowProducts(sortCriteria, productsArray){
    currentSortCriteria = sortCriteria;

    if(productsArray != undefined){
        currentProductsArray = productsArray;
    }

    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    showProductsList();
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowProducts(ORDER_ASC_COST, resultObj.data);
        }
    });

    document.getElementById("costAsc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_ASC_COST);
    });

    document.getElementById("costDesc").addEventListener("click", function(){
        sortAndShowProducts(ORDER_DEC_COST);
    });

    document.getElementById("clearProductsFilter").addEventListener("click", function(){
        document.getElementById("productsFilterCostMin").value = "";
        document.getElementById("productsFilterCostMax").value = "";

        minCost = undefined;
        maxCost = undefined;

        showProductsList();
    });
    document.getElementById("productsFilterCost").addEventListener("click", function(){
   
        minCost = document.getElementById("productsFilterCostMin").value;
        maxCost = document.getElementById("productsFilterCostMax").value;

        if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0){
            minCost = parseInt(minCost);
        }
        else{
            minCost = undefined;
        }

        if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0){
            maxCost = parseInt(maxCost);
        }
        else{
            maxCost = undefined;
        }

        showProductsList();
    });
});
