let carts = document.querySelectorAll('.add-cart');


products = [
    {
        name: 'paypall',
        tag: 'paypall carst',
        price : 10,
        inCart: 0
    },
    {
        name: 'amazonCart',
        tag: 'amazonCart ',
        price : 14,
        inCart: 0
    },
    {
        name: 'visaCart',
        tag: 'visaCart',
        price : 16,
        inCart: 0
    },
    {
        name: 'masterCart',
        tag: 'masterCart',
        price : 20,
        inCart: 0
    },
];


for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);
    })
}

function onloadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers ){
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

function cartNumbers(product) {
    
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if( productNumbers ) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers',1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItems(product);

}

function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    console.log('My cartItems are',cartItems);
    if(cartItems != null) {
        if(cartItems[product.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [product.tag]: product
            }

        }
        cartItems[product.tag].inCart += 1;
    } else{
        product.inCart = 1;
        cartItems = {
            [product.tag]: product
        }

    }


    localStorage.setItem("productsInCart",JSON.stringify(cartItems));
}

function totalCost(product){
    let cartCost = localStorage.getItem('totalCost');

    console.log('my cartCost is ', cartCost);


    if(cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else{
        localStorage.setItem('totalCost', product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products-container");
    let cartCost = localStorage.getItem('totalCost');
    console.log(cartItems);

    if(cartItems && productContainer ) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="products>
                <div class="div-padding border-black">
                    <div class="container">
        
                        <div class="row">
                            <div class="col-xs-12 col-sm-8 text-align-right animate-box">
                                <h1 class="h-with-img"><img src="images/cart.png"> حقيبة التسوق</h1>
        
                                <ul class="list-inline list-unstyled">
                                    <li><img src="images/mastercart-icon.png"></li>
                                    <li><img src="images/visa-icon.png"></li>
                                <li><img src="images/paypal-icon.png"></li>
                                </ul>
                        </div>
        
                        <div class="col-xs-12 col-sm-4 text-align-left animate-box">
                            <a href="https://buy.stripe.com/test_9AQcNL5hh8l161W7ss" class="btn btn-orange sr">المتابعة للدفع</a>
                        </div>
                    </div>
        
                </div>
                <div class="animate-box table-box">
                    <table class="table cart-table">
                        <thead>
                        <tr>
                            <th>معلومات البنود</th>
                            <th>OPTIONS</th>
                            <th>سعر الوحدة</th>
                            <th>المجموع</th>
                        </tr>
                        </thead>
                        <tbody>

        
                        <tr>
                            <td>
                                <div class="table-view">
                                    <div class="table-cell xs-block product-img"><a href="product.html"><img src="images/van-22.jpg"></a></div>
                                    <div class="table-cell xs-block">
                                        <p class="fa-2x"><a href="product.html">اسم المنتج</a></p>
                                        <p>البند رقم : <span class="color-gray">0B02510445H</span></p>
        
                                        <a href="#" class="color-black">الانتقال إلى قائمة المفضلات</a> <span class="right-fa left-fa">/</span> <a href="#">أزالة</a>
                                    </div>
                                </div>
                            </td>
                            <td class="text-center">
                                <p>اللون: <span class="color-orange">${item.name}</span></p>
                                <p>الكمية: <span class="color-orange">${item.inCart}</span></p>
                                <a href="#" class="btn btn-orange sr radius-20">تعديل</a>
                            </td>
                            <td class="text-center">
                                <p class="color-orange">${item.price}</p>
                                <p><s>$15.99</s></p>
                                <p>خصم <span class="color-orange">13%</span></p>
                            </td>
                            <td class="text-center">
                                <span class="color-orange fa-2x">$${item.inCart * item.price}</span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div> 
            </div>
            <div>
                <center>
                    <h1>المجموع كاملا</h1>
                    <h1>$${cartCost}</h1>
                </center>
            </div>      
            `;
        });
    };
}

onloadCartNumbers();
displayCart();