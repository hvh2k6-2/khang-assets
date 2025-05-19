$(document).ready(function(){
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    function fn(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    function getTopCharge(){
        const url = '/top-charge';
        $.ajax({
            type: "GET",
            url: url,
            async:true,
            cache:false,
            beforeSend: function (xhr) {
            },
            success: function (data) {
                if(data.status == 1){
                    let html = '';
                    let htmlCharge = '';
                    let isMoldal = false;
                    let auth_id = false;
                    if (auth_user){
                        auth_id = auth_user.id;
                    }
                    if(data.data && data.data.length > 0){
                        $.each(data.data,function(key,value){
                            key = key +1;
                            if (auth_id && value.user_id == auth_id){
                                isMoldal = true;
                            }
                            if (key < 6){
                                html += '<li>';
                                html += '<div><img src="/assets/frontend/theme_5/image/top-charge/top-nap-' + key + '.svg" alt="" style="width: 24px; height= 24px">';
                                html += '<span>'+fn(value.fullname ?? value.username, 10) +'</span></div>';
                                html += '<label>'+ formatNumber(value.amount) +'<sup>đ</sup></label>';
                                html +='</li>';
                            }

                        });
                        htmlCharge += '<a href="/nap-the" class="">';
                        htmlCharge += '<div class="text-white btn-nap-the c-py-8 c-px-16 text-center c-mb-12">Nạp thẻ ngay</div>';
                        htmlCharge += '</a>';
                    }else{
                        html += '<li>';
                        html += '<span class="text-danger text-center">Không có dữ liệu!</span>';
                        html += '</li>';
                    }

                    $('.content-banner-top-card-home').html(html)
                    $('#leaderboard_m-1 .btn-charge').html(htmlCharge);
                }
            },
            error: function (data) {
                console.log('Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý(top-charge)!')
                return;
            },
            complete: function (data) {

            }
        });
    }
    function getTopChargeATM(){
        const url = '/top-charge-atm';
        $.ajax({
            type: "GET",
            url: url,
            async:true,
            cache:false,
            beforeSend: function (xhr) {
            },
            success: function (data) {
                if(data.status == 1){
                    let html = '';
                    let htmlCharge = '';
                    let isMoldal = false;
                    let auth_id = false;
                    if (auth_user){
                        auth_id = auth_user.id;
                    }

                    if(data.data && data.data.length > 0 ){
                        $.each(data.data,function(key,value){
                            key = key +1;
                            if (auth_id && value.user_id == auth_id){
                                isMoldal = true;
                            }
                            if (key < 6){
                                html += '<li>';
                                html += '<div><img src="/assets/frontend/theme_5/image/top-charge/top-nap-' + key + '.svg" alt="" style="width: 24px; height= 24px">';
                                html += '<span>'+fn(value.fullname ?? value.username, 10) +'</span></div>';
                                html += '<label>'+ formatNumber(value.amount) +'<sup>đ</sup></label>';
                                html +='</li>';
                            }

                        });
                        htmlCharge += '<a href="/nap-the" class="">';
                        htmlCharge += '<div class="text-white btn-nap-the c-py-8 c-px-16 text-center c-mb-12">Nạp thẻ ngay</div>';
                        htmlCharge += '</a>';
                    } else{
                        html += '<span class="text-danger text-center fz-16 d-block">Không có dữ liệu!</span>';
                    }

                    $('.content-banner-top-card-atm-home').html(html)
                    $('#leaderboard_m-2 .btn-charge').html(htmlCharge);
                }
            },
            error: function (data) {
                console.log('Có lỗi phát sinh, vui lòng liên hệ QTV để kịp thời xử lý(top-charge)!')
                return;
            },
            complete: function (data) {

            }
        });
    }

    $('.nav-atm-charge').click(function(){
        getTopChargeATM();
    });

    getTopCharge();
});
