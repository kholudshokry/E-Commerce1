let productsDom = document.querySelector(".products")
 
let cartProductMenue = document.querySelector(".carts-products ");
let cartProductDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shoppingCart")
let badgeDom = document.querySelector(".badge");

    let products = [{
        id: 100,
        title: "xiaomi Redmi Note 8 Pro Dual SIM Mineral Grey 6GB RAM 128GB 4G LTE",
        price:"3799.00",
        imageUrl: "imges/mobil img/xiaomi1.jpg",
        qty:1,
    },
   { id: 200,
    title: "Poco X3 Dual SIM Cobalt Blue NFC 6GB RAM 64GB 4G LTE",
    price:"3,955",
    imageUrl: "imges/mobil img/xiaomi2.jpg",
    qty:1,

},
{  id: 300,
    title: "xiaomie Redmi Note 9 Pro Global Specs Dual SIM Interstellar Grey 128GB",
    price:"4,900",
    imageUrl: "imges/mobil img/xiaomi3.jpg",
    qty:1

},
{
     id: 400,
     title: "xiaomi Redmi Note 9S Dual SIM Blue 4GB RAM 64GB 4G LTE",
     price:"4,099",
     imageUrl: "imges/mobil img/xiaomi4.jpg",
     qty:1
},

];




shoppingCartIcon.addEventListener("click",openCartMenu)

function drawProductsUI(){
    let productsUI = products.map((item)=>{
        return ` 
        <div class="card">
                           <img src="${item.imageUrl}" class="card-img-top" alt="...">
                           <div class="card-body product-info">
                             <h5 class="card-title"> ${item.title}</h5>
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
                            <ul class="action-button">
                              <li>
                                  <a href="#" title="wishlist" tabindex="0">
                                      <i class="zmdi zmdi-favorite" style="color: ${item.liked == true ? "red" : "" }" onclick = "addToFavourite(${item.id})"></i>
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
                                     <i class="zmdi zmdi-shopping-cart-plus" onclick="addedToCart(${item.id})"></i>
                                 </a>
                             </li>

                          </ul>
                           </div>
                           <div class="card-footer">
                             <a href="product-page-mobile.html" class="card-link">See More ...</a>
                             
                           </div>
                         </div>
        `;

    });
    productsDom.innerHTML = productsUI ;
}
drawProductsUI();

let addedItem =localStorage.getItem("productsInCart")? JSON.parse(localStorage.getItem("productsInCart")):[];
 if(addedItem){
     addedItem.map((item) =>{
cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`;
     });
     badgeDom.style.display ="block";
    badgeDom.innerHTML = addedItem.length;
 }
 let allItems=[];
function addedToCart(id){
    if (localStorage.getItem("users")){

        let choosenItem = products.find((item) => item.id=== id );
        let item = allItems.find((i) => i.id === choosenItem.id);
        if (item){
            choosenItem.qty += 1;
        }else{
            allItems.push(choosenItem)
        }
        cartProductDom.innerHTML="";
        allItems.forEach((item)=>{
            cartProductDom.innerHTML += `<p>${item.title} ${item.qty}</p>`

        });
        // cartProductDom.innerHTML += `<p>${choosenItem.title} </p>`;
        addedItem = [...addedItem,choosenItem];
        let uniqueProducts = getuniqueArr(addedItem,id)
        localStorage.setItem('productsInCart',JSON.stringify(uniqueProducts))
        let cartProductItems = document.querySelectorAll(".carts-products div p")
        badgeDom.style.display ="block";
        badgeDom.innerHTML = cartProductItems.length;
       
    }else{
        window.location = "LogIn.html"
    }
 }



 function openCartMenu(){
     if (cartProductDom.innerHTML != ""){
         if(cartProductMenue.style.display == "block"){
             cartProductMenue.style.display ="none";
         }else{
             cartProductMenue.style.display="block";
         }
         }
     }
 function getuniqueArr(arr,filterType){
     let unique = arr
     .map((item)=> item[filterType])
     .map((item,i ,final) => final.indexOf(item) === i && i)
     .filter((item)=>arr[item])
     .map((item) => arr[item]);
     return unique;


 }
  let favoritesItem = localStorage.getItem("productsFavorite")
  ? JSON.parse(localStorage.getItem(productsFavorite)):[];
  
  function addToFavourite(id){
      if (localStorage.getItem("users")){
          let choosenItem = products.find((item)=> item.id === id);
          choosenItem.liked = true;
          favoritesItem =[...favoritesItem,choosenItem];
          let uniqueproducts = getuniqueArr(favoritesItem,"id")
          localStorage.setItem("productsfavorite",JSON.stringify(uniqueproducts));
          products.map((item)=>{
              if(item.id === choosenItem.id){
                  item.liked=true;
              }
          });
          localStorage.setItem("products",JSON.stringify(products));
          drawProductsUI(products);}else{
              window.location = "LogIn.html"
          }
      }