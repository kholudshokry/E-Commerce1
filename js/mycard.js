

let productsDom = document.querySelector(".products")
let noProduct = document.querySelector(".noproducts")


function drawCartProductsUI(allproducts =[]){
    let products =JSON.parse(localStorage.getItem("productsInCart")) || allproducts;
    if(JSON.parse(localStorage.getItem("productsInCart")).length===0)
    noProduct.innerHTML = "there is no items !!";

    let productsUI = products.map((item)=>{
        return `
        <div class="card">
        <img src="${item.imageUrl}"   alt="image"/>
        <div class="card-body product-info">
          <h5 class="card-title">${item.title}</h5>
          <div class="pro-rating">
             <a href="#" tabindex="0">
                 <i class="zmdi zmdi-star"></i>
             </a>
             <a href="#" tabindex="0">
              <i class="zmdi zmdi-star"></i>
          </a>
          <a href="#" tabindex="0">
              <i class="zmdi zmdi-star"></i>
          </a>
          <a href="#" tabindex="0">
              <i class="zmdi zmdi-star"></i>
          </a>
          <a href="#" tabindex="0">
              <i class="zmdi zmdi-star"></i>
          </a>
         </div>
         <h3 class="pro-price">${item.price}</h3>
         <h3 class="pro-price">quantity:${item.qty}</h3>
         <ul class="action-button">
           <li>
               <a href="#" title="wishlist" tabindex="0">
                   <i class="zmdi zmdi-favorite"   style="color: ${item.liked == true ? "red" : "" }" onclick = "addToFavourite(${item.id})"></i>
               </a>
           </li>
           <li>
              <a href="#" data-toggle="modal" data-target="#productModal" title="Quickview" tabindex="0">
                  <i class="zmdi zmdi-zoom-in"></i>
              </a>
          </li>
          <li>
              <a href="#" title="compare" tabindex="0">
                  <i class="zmdi zmdi-refresh"></i>
              </a>
          </li>
          <li>
              <a href="#" title="add to cart" tabindex="0">
              <i class="fas fa-trash" onclick="removeItemFromCart(${item.id})" ></i>
              </a>
          </li>

       </ul>
        </div>
        <div class="card-footer">
         <a href="product-page-makeup.html" class="card-link">See More ...</a>
       </div> 
       </div>
       

        `;

    });

    productsDom.innerHTML = productsUI ;
    document.getElementById("btn").style.display ="block";
}
drawCartProductsUI();
function removeItemFromCart(id){
    let productsInCart = localStorage.getItem("productsInCart")
    if(productsInCart){
        let items = JSON.parse(productsInCart);
        let filteredItems = items.filter((item)=> item.id !== id);
        drawCartProductsUI(filteredItems);
        localStorage.setItem("productsInCart", JSON.stringify(filteredItems));

    }
}