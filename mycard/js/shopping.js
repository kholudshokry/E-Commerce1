let userInfo = document.querySelector("#user_info")
let userDom = document.querySelector("#user");
let links = document.querySelector("#links");
let logoutBtn = document.querySelector("#logout");

let username = localStorage.getItem("username");
if (username){
    links.remove();
    userInfo.style.display = "flex";
    userDom.innerHTML = username ;
}

logoutBtn.addEventListener("click", function(){
    localStorage.clear();
    setTimeout(()=>{
        window.location ="SignUp.html";},1000);
    });

let productsDom = document.querySelector(".products")
let cartProductMenue = document.querySelector(".carts-products ");
let cartProductDom = document.querySelector(".carts-products div");
let shoppingCartIcon = document.querySelector(".shoppingCart")
let badgeDom = document.querySelector(".badge");

    let products = [{
        id: 1,
        title: "headphone item",
        size:"large",
        imageUrl: "../images/57893.jpg",
        qty:1,
    },
   { id: 2,
    title: "headphone item",
    size:"large",
    imageUrl: "../images/57893.jpg",
    qty:1,

},
{  id: 3,
    title: "headphone item",
    size:"large",
    imageUrl: "../images/57893.jpg",
    qty:1

},
];
shoppingCartIcon.addEventListener("click",openCartMenu)
function drawProductsUI(){
    let productsUI = products.map((item)=>{
        return `
     <div class="product-item">
        <img src="${item.imageUrl}" class="product-item-img" alt="image"/>
        <div class="product-item-desc">
            <h2${item.title}</h2>
            <p>Lorem ipsum </p>
            <span>size: ${item.size}</span>
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="addedToCart(${item.id})">Add to Cart</button>
            <i class="fas fa-heart" style="color: ${item.liked == true ? "red" : "" }" onclick = "addToFavourite(${item.id})"></i>
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
    if (localStorage.getItem("username")){

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
      if (localStorage.getItem("username")){
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
              window.location = "../../LogIn.html"
          }
      }
  