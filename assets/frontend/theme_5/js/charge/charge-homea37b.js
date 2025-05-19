$(document).ready(function () {

    getTelecom();
    getIdCode();

    var dataSend = {
        type: null,
        pin: null,
        serial: null,
        // captcha: null,
        amount: null,
        _token: $('meta[name="csrf-token"]').attr('content'),
    }

    $('#telecom').on('change', function () {
        let telecom = $(this).val();
        getAmount(telecom);
    });

    $('#reload_1').click(function () {
        $.ajax({
            type: 'GET',
            async:true,
            cache:false,
            url: 'reload-captcha',
            beforeSend: function () {
                $('.refresh-captcha img').removeClass("paused");
                $("#capchaImage").empty();
            },
            success: function (data) {
                $("#capchaImage").html(data);
            },
            complete: function () {
                setTimeout( function () {
                    $('.refresh-captcha img').addClass("paused");
                }, 1000);
            }
        });
    });

    $('#btnConfirm, #btnConfirmMobile').on('click', function (e) {
        prepareConfirmData();
        prepareDataSend();
    });

    // $(document).on('click', '#confirmSubmitButton', function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url:'/nap-the',
    //         type:'POST',
    //         data: dataSend,
    //         beforeSend: function () {
    //             $('#confirmSubmitButton').prop("disabled", true);
    //             $('#confirmSubmitButton').text("Đang xử lý");
    //             //Delete text in success and fail modal
    //             $('#successMessage').text('');
    //             $('#failMessage').text('');
    //         },
    //         success:function (res) {

    //             $('#orderCharge').modal('hide');

    //             if(res.status == 1) {
    //                 $('#successMessage').text(res.message);
    //                 $('#modalSuccessPayment').modal('show');
    //             }
    //             else if(res.status == 401){
    //                 $('#failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
    //                 $('#modalFailPayment').modal('show');
    //             }
    //             else if(res.status == 0){
    //                 $('#failMessage').text(res.message);
    //                 $('#modalFailPayment').modal('show');
    //             }
    //             else{
    //                 $('#failMessage').text('Đã có lỗi xảy ra!');
    //                 $('#modalFailPayment').modal('show');
    //             }
    //         },
    //         error: function (res) {
    //             $('#orderCharge').modal('hide');
    //             $('#failMessage').text('Đã có lỗi xảy ra!');
    //             $('#modalFailPayment').modal('show');
    //         },
    //         complete: function () {
    //             $('#reload_1').trigger('click');
    //             $('#confirmSubmitButton').prop("disabled", false);
    //             $('#confirmSubmitButton').text("Xác nhận");
    //         }
    //     });
    // });

    // $(document).on('click', '#confirmSubmitButtonMobile', function(e) {
    //     e.preventDefault();
    //     $.ajax({
    //         url:'/nap-the',
    //         type:'POST',
    //         data: dataSend,
    //         beforeSend: function () {
    //             $('#confirmSubmitButtonMobile').prop("disabled", true);
    //             $('#confirmSubmitButtonMobile').text("Đang xử lý");
    //             //Delete text in success and fail modal
    //             $('#successMessage').text('');
    //             $('#failMessage').text('');
    //         },
    //         success:function (res) {
    //             if(res.status == 1) {
    //                 $('#successMessage').text(res.message);
    //                 $('#modalSuccessPayment').modal('show');
    //             }
    //             else if(res.status == 401){
    //                 $('#failMessage').text('Bạn cần phải đăng nhập để hoàn thiện giao dịch!');
    //                 $('#modalFailPayment').modal('show');
    //             }
    //             else if(res.status == 0){
    //                 $('#failMessage').text(res.message);
    //                 $('#modalFailPayment').modal('show');
    //             }
    //             else{
    //                 $('#failMessage').text('Đã có lỗi xảy ra!');
    //                 $('#modalFailPayment').modal('show');
    //             }
    //         },
    //         error: function (res) {
    //             $('#failMessage').text('Đã có lỗi xảy ra!');
    //             $('#modalFailPayment').modal('show');
    //         },
    //         complete: function () {
    //             $('#reload_1').trigger('click');
    //             $('#confirmSubmitButtonMobile').prop("disabled", false);
    //             $('#confirmSubmitButtonMobile').text("Xác nhận");
    //         }
    //     });
    // });

    function reload_captcha() {
        $.ajax({
            type: 'GET',
            async:true,
            cache:false,
            url: '/reload-captcha',
            beforeSend: function () {
                $('.refresh-captcha img').removeClass("paused");
                $("#capchaImage").empty();
            },
            success: function (data) {
                $("#capchaImage").html(data.captcha);
            },
            complete: function () {
                setTimeout( function () {
                    $('.refresh-captcha img').addClass("paused");
                }, 1000);
            }
        });
    };

    // Get card data
    function getTelecom () {
        let url = '/ajax/get-tele-card';

        $.ajax({
            type: "GET",
            url: url,
            async:true,
            cache:false,
            success: function (data) {
                if(data.status == 1){
                    let html = '';

                    if ( data.data.length > 0 ) {
                        $.each( data.data, function ( key, value ) {
                            html += '<option value="'+value.key+'">'+value.title+'</option>';
                        });
                    } else {
                        html += '<option value="">-- Vui lòng chọn nhà mạng --</option>';
                    }

                    $('select#telecom').html(html)
                    $('.select-form').niceSelect('update');

                    let typeValue = $('#telecom').val();

                    if ( typeValue ) {
                        getAmount(typeValue);
                    }
                }
            },
            error: function (data) {
                swal({
                    title: "Lỗi !",
                    text: "Có lỗi phát sinh vui lòng liên hệ QTV để kịp thời xử lý.",
                    icon: "error",
                    buttons: {
                        cancel: "Đóng",
                    },
                })
            },
            complete: function (data) {
                $('#charge_card .loader-container').remove();
                $('#charge_card .content-block').removeClass('d-none');
            }
        });
    }

    function getAmount (telecom) {
        let url = '/ajax/get-amount-tele-card';
        $.ajax({
            type: "GET",
            url: url,
            async:true,
            cache:false,
            data: {
                telecom: telecom
            },
            beforeSend: function () {
                $('#cardAmount').empty();
                $('#cardAmountMobile').empty();
                $('.money-form-group .loader').removeClass('d-none');
            },
            success: function (data) {
                if ( data.status == 1 ) {
                    // Append new data both in mobile and desktop
                    let html = '';
                    let htmlMobile = '';

                    if ( data.data.length > 0 ) {
                        $.each( data.data, function( key, value ) {
                            html += '<div class="col-4 c-px-4 money-radio-form">';
                            htmlMobile += '<div class="col-4 c-px-4 money-radio-form">';
                            if ( key == 0 ) {
                                if ( $(window).width() >= 992 ) {
                                    html += '<input name="amount" type="radio" id="recharge_amount_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden>';
                                    htmlMobile += '<input name="amount" type="radio" id="recharge_amount_mobile_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden>';
                                } else {
                                    html += '<input name="amount" type="radio" id="recharge_amount_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden >';
                                    htmlMobile += '<input name="amount" type="radio" id="recharge_amount_mobile_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden>';
                                }

                            } else {
                                html += '<input name="amount" type="radio" id="recharge_amount_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden>';
                                htmlMobile += '<input name="amount" type="radio" id="recharge_amount_mobile_'+key+'" data-ratio="'+value.ratio_true_amount+'" value="'+value.amount+'" hidden>';
                            }

                            html += '<label for="recharge_amount_'+key+'" class="c-py-16 c-px-8 c-mb-8 brs-8 p_recharge_amount">';
                            html += '<p class="fw-500 fs-15 mb-0">'+ formatNumber(value.amount)  +'đ</p>';
                            html += '<p class="fw-500 fs-15 mb-0" style="color: #82869E;font-size: 12px"> Nhận '+ value.ratio_true_amount  +'%</p>';
                            html += '</label>';
                            html += '</div>';

                            htmlMobile += '<label for="recharge_amount_mobile_'+key+'" class="c-py-16 c-px-8 c-mb-8 brs-8 p_recharge_amount">';
                            htmlMobile += '<p class="fw-500 fs-15 mb-0">'+ formatNumber(value.amount)  +'đ</p>';
                            htmlMobile += '<p class="fw-500 fs-15 mb-0" style="color: #82869E;font-size: 11px"> Nhận '+ value.ratio_true_amount  +'%</p>';
                            htmlMobile += '</label>';
                            htmlMobile += '</div>';
                        });
                    }

                    //Append new amount data
                    $('#cardAmount').html(html);
                    $('#cardAmountMobile').html(htmlMobile);

                    //Refresh captcha
                    setTimeout(function(){
                        reload_captcha();
                    }, 3000);

                }
            },
            error: function (data) {
                swal({
                    title: "Lỗi !",
                    text: "Có lỗi phát sinh vui lòng liên hệ QTV để kịp thời xử lý.",
                    icon: "error",
                    buttons: {
                        cancel: "Đóng",
                    },
                })
            },
            complete: function (data) {
                $('.money-form-group .loader').addClass('d-none');
            }
        });
    }

    // Get auto ATM
    function getIdCode () {
        var url = '/ajax/transfer-code';
        $.ajax({
            type: "GET",
            async:true,
            cache:false,
            url: url,
            success: function (data) {
                if (data.status == 1 ) {
                    $('#transactionContent').text(data.data);
                } else {
                    $('#atm_card .atm-recharge-error').html( '<p class="atm-recharge-error fz-13 fw-400">Vui lòng đăng nhập để nhận được nội dung chuyển tiền! </p>');
                }
            },
            error: function () {
                swal({
                    title: "Lỗi !",
                    text: "Có lỗi phát sinh vui lòng liên hệ QTV để kịp thời xử lý.",
                    icon: "error",
                    buttons: {
                        cancel: "Đóng",
                    },
                })
            },
            complete: function () {
                $('#atm_card .loader-container').remove();
                $('#atm_card .content-block').removeClass('d-none');
            }
        });
    }

    //append new data into confirm modal
    function prepareConfirmData() {
        let cardChecked = $('input[name="amount"]:checked');
        let confirmTitle = $('#telecom').val();
        let confirmDiscount = $(cardChecked).data('ratio');
        let confirmPrice = $(cardChecked).val();

        if ( !confirmDiscount || confirmDiscount < 0 ) {
            confirmDiscount = 100;
        }

        let saleAmount = confirmPrice - (confirmPrice * confirmDiscount / 100);
        let totalAmount = confirmPrice - saleAmount;

        if ( saleAmount > 0  && totalAmount > 0 ) {
            $('#totalBill').text(`${ formatNumber(totalAmount)}`);
            $('#totalBillMobile').text(`${ formatNumber(totalAmount)}`);
        } else {
            $('#totalBill').text(`${ formatNumber(confirmPrice)}`);
            $('#totalBillMobile').text(`${ formatNumber(confirmPrice)}`);
        }

        $('#confirmTitle').text(confirmTitle);
        $('#confirmTitleMobile').text(confirmTitle);
        $('#confirmPrice').text(`${formatNumber( confirmPrice )} đ`);
        $('#confirmPriceMobile').text(`${formatNumber( confirmPrice )} đ`);
        $('#confirmDiscount').text(`${confirmDiscount}%`);
        $('#confirmDiscountMobile').text(`${confirmDiscount}%`);
    }

    //Append new data to submit to backend
    function prepareDataSend() {
        let cardChecked = $('input[name="amount"]:checked');
        let pin = $('input[name="pin"]').val().trim();
        let serial = $('input[name="serial"]').val().trim();
        // let captcha = $('input[name="captcha"]').val().trim();
        let type = $('#telecom').val();
        let amount = $(cardChecked).val();

        dataSend.type = type;
        dataSend.pin = pin;
        dataSend.serial = serial;
        // dataSend.captcha = captcha;
        dataSend.amount = amount;
    }
});
