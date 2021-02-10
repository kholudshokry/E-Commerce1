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
let noProduct = document.querySelector(".noproducts")


function drawFavoritesProductsUI(allproducts =[]){
    
    if(JSON.parse(localStorage.getItem("productsfavorite")).length === 0 )
    noProduct.innerHTML = "there is no items !!";
    let products =JSON.parse(localStorage.getItem("productsfavorite")) || allproducts;
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
            <button class="add-to-cart" onclick="removeItemFromFav(${item.id})">remove from Favorites</button>
          
        </div>
        </div> 

        `;

    });
    productsDom.innerHTML = productsUI ;
}
drawFavoritesProductsUI();

function removeItemFromFav(id){
    let productsfavorite = localStorage.getItem("productsfavorite")
    if(productsfavorite){
        let items = JSON.parse(productsfavorite);
        let filteredItems = items.filter((item)=> item.id !== id);
        drawFavoritesProductsUI(filteredItems);
        localStorage.setItem("productsfavorite", JSON.stringify(filteredItems));

    }
}