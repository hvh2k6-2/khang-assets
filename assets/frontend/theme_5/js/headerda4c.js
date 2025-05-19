function loadDataCart() {
    let domain = window.location.host;

    const dataFromLocalStorage = localStorage.getItem(`cart_${domain}`);

    const datas = JSON.parse(dataFromLocalStorage);

    let totalQuantity
    if (datas) {
        totalQuantity = datas.reduce((total, item) => {
            return total + item.quantity;
        }, 0);
    } else {
        totalQuantity = 0
    }
    if (document.getElementById('num_cart_mob')) {
        document.getElementById('num_cart_mob').innerHTML = `${totalQuantity}`;
    }
    if(totalQuantity === 0){
        $('.cart-pay').html(`<a href="/" class="btn primary w-100">Về trang chủ</a>`);

    }
    document.getElementById('num_cart').innerHTML = `${totalQuantity}`;

    const cart_header_nick = document.getElementById('cart-header-nick');
    const cart_header_service = document.getElementById('cart-header-service');
    const title_nick = document.getElementById('title-nick');
    const title_service = document.getElementById('title-service');
    function createHtmlCart(data) {
        if (data.module != 'service') {
            title_nick.innerHTML = 'Nick'

            return `<li class="list-group-item">
            <div class="row">
                <nav aria-label="img" class="navbar">
                        <a href="${data.slug}"> <img src="${data.image}" width="60" height="35" alt="${data.title}"></a>
                </nav>
                <div class="col pr-0">
                    <a href="${data.slug}" class="text-limit limit-1 fw-700 pl-2"><span class="text-danger">${data.randId ? `#${data.randId}` : ''}</span> ${data.title}   </a>
                </div>
                <div class="col-lg-4 col-4 text-end">
                    <p class="price-cart">${formatNumber(data.price)}đ</p>
                </div>
            </div>
        </li>`;
        }

    }

    function createHtmlCartService(data) {

        if (data.module === 'service') {

            title_service.innerHTML = 'Dịch vụ'
            return `<li class="list-group-item">
                <div class="row">
                    <nav aria-label="img" class="navbar">
                        <a href="${data.slug}"> <img src="${data.image}" width="60" height="35" alt="${data.title}"></a>

                    </nav>
                    <div class="col pr-0">
                        <a href="${data.slug}" class="text-limit limit-1 fw-700 pl-2">${data.title}</a>
                        <p class="pl-2 m-0 text-limit limit-1"> ${data.dataSend.title_item ? data.dataSend.title_item : ''} </p>
                    </div>
                    <div class="col-lg-4 col-4 text-end">
                        <p class="price-cart">${data.price ? formatNumber(data.price) : ''}đ</p>
                    </div>
                </div>
            </li>`;
        }

    }





    if (dataFromLocalStorage) {
        if (Array.isArray(datas) && datas.length > 0) {
            let html = datas.map(createHtmlCart).join('');
            let html_service = datas.map(createHtmlCartService).join('');

            cart_header_nick.innerHTML = html;
            cart_header_service.innerHTML = html_service;
        } else {
            cart_header_nick.innerHTML = `
                 <li>
            <p class="text-center fz-20">Giỏ hàng trống !!!</p>
        </li>
        <li>
            <div class="d-flex justify-content-center">
                <img class="w-75 img-null-cart" src="/assets/frontend/image/empty-cart.png" alt="Giỏ hàng trống">

            </div>
        </li>
            `;
            cart_header_service.innerHTML = null
            document.getElementById('title-service').innerHTML = null
        }
    } else {
        cart_header_nick.innerHTML = `
        <li>
            <p class="text-center fz-20">Giỏ hàng trống !!!</p>
        </li>
        <li>
            <div class="d-flex justify-content-center">
                <img class="w-75 img-null-cart" src="/assets/frontend/image/empty-cart.png" alt="Giỏ hàng trống">

            </div>
        </li>
         `;
        cart_header_service.innerHTML = null
        document.getElementById('title-service').innerHTML = null

    }
}

loadDataCart()

function checkTotalQuantityCart() {
    let domain = window.location.host;
    let cart = JSON.parse(localStorage.getItem(`cart_${domain}`)) || [];

    // Tính tổng số lượng sản phẩm trong giỏ hàng
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    return totalQuantity;
}
