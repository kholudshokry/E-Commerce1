let productsDom = document.querySelector(".products")
let cartProductMenue = document.querySelector(".carts-products ");
let cartProductDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shoppingCart")
let badgeDom = document.querySelector(".badge");

    let products = [{
        id: 80,
        title: "Extreme Copy Colour - Flowers",
        price:" $ 22.00",
        imageUrl: "imges/book img/artsauth2-1.PNG",
        qty:1,
    },
   { id: 81,
    title: "Refreshing Mandala - Colouring Book for Adults Book 3",
    price:"$ 46.00",
    imageUrl: "imges/book img/artsauth2-2.PNG",
    qty:1,

},
{  id: 82,
    title: "Extreme Copy Colour - Mandala Paperback",
    price:"$36.00",
    imageUrl: "imges/book img/artsauth2-3.PNG",
    qty:1

},
{
     id: 83,
     title: "Refreshing Mandala - Colouring Book for Adults Book 5",
     price:"$17.00",
     imageUrl: "imges/book img/artsauth2-4.PNG",
     qty:1
},

];


shoppingCartIcon.addEventListener("click",openCartMenu)

function drawProductsUI(){
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
                  <i class="zmdi zmdi-shopping-cart-plus" onclick="addedToCart(${item.id})" ></i>
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