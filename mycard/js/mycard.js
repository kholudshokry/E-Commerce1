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


function drawCartProductsUI(allproducts =[]){
    let products =JSON.parse(localStorage.getItem("productsInCart")) || allproducts;
    if(JSON.parse(localStorage.getItem("productsInCart")).length===0)
    noProduct.innerHTML = "there is no items !!";

    let productsUI = products.map((item)=>{
        return `
     <div class="product-item">
        <img src="${item.imageUrl}" class="product-item-img" alt="image"/>
        <div class="product-item-desc">
            <h2${item.title}</h2>
            <p>Lorem ipsum </p>
            <span>size: ${item.size}</span>
            <br>
            <span>Quantity: ${item.qty}</span>
        </div>
        <div class="product-item-actions">
            <button class="add-to-cart" onclick="removeItemFromCart(${item.id})">remove from card</button>
            <i class="far fa-heart"></i>
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