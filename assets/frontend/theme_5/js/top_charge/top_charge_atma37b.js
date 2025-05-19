$(document).ready(function(){
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
    }
    function fn(text, count){
        return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    function getTopCharge(){
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
                    let isMoldal = false;
                    let auth_id = false;
                    if (auth_user){
                        auth_id = auth_user.id;
                    }

                    if(data.data && data.data.length > 0 ){
                        $.each(data.data,function(key,value){
                            if (auth_id && value.user_id == auth_id){
                                isMoldal = true;
                            }
                        });
                    }

                    if (isMoldal){
                        $('#topChargModal').modal('show')
                    }
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

    getTopCharge();
});
