let price_default = 0;
let discount_code = '';
$(document).ready(function () {
    $(document).on('click', '.buyaccnew',function(e){
        e.preventDefault();
        var htmlloading = '';
        let check_clause = $('#check_confirm_clasue').val();
        $('.discount_code').prop('disabled', false);
        $('.formDonhangAccount .error__text').html('');
        $('.formDonhangAccount .sussess__text').html('');
        htmlloading += '<div class="loading"></div>';
        $('.loading-data__buyacc').html('');
        $('.loading-data__buyacc').html(htmlloading);
        if(auth_check){
            var price = parseInt($(this).data('price'));
            if (auth_balance < price){
                $('.not-enough-money').html('<p class="text-danger mt-3 mb-0">Tài khoản của bạn không đủ để thanh toán, vui lòng nạp tiền để tiếp tục giao dịch</p>')
                let html = '';
                html += '<button type="button" class="btn ghost" disabled>';
                html += $('#check_auth_acc').data('pay');
                html += '</button>';
                html += '<button type="button" data-dismiss="modal" class="d-none d-lg-block btn primary " data-toggle="modal" data-target="#rechargeModal">';
                html += $('#check_auth_acc').data('recharge');
                html += '</button>';
                html += '<button type="button" data-dismiss="modal" class="d-lg-none btn primary " data-toggle="modal" data-target="#rechargeModalMobile">';
                html += $('#check_auth_acc').data('recharge');
                html += '</button>';
                $('.data__dangnhap').html(html);
            }
            else {
                let html = '';
                html += `<button type="submit" class="btn primary payment_confirm" ${check_clause == 1 ? 'disabled' : ''}>`;
                html += $('#check_auth_acc').data('pay');
                html += '</button>';
                $('.data__dangnhap').html(html);
            }

        }else {
            var html = '';
            html += '<button type="button" class="btn primary" data-dismiss="modal" onclick="openLoginModal();">';
            html += $('#check_auth_acc').data('login');
            html += '</button>';
            $('.data__dangnhap').html(html);
        }

        var id = $(this).data("id");
        var price = $(this).data('price');
        $('.formDonhangAccount .data_total_price').html(`${formatNumber(price)} đ`);
        var html = $('.formDonhangAccount' + id + '').html();
        $('.data__form__random').html('');
        $('.data__form__random').html(html);

        $('.loadModal__acount').modal('toggle');
        $('.loading-data__buyacc').html('');
        // getBuyAcc(id)
    });

    $(document).on('submit', '#LoadModal .formDonhangAccount', function(e){
        e.preventDefault();
        var htmlloading = '';

        htmlloading += '<div class="loading"></div>';
        $('.loading-data__muangay').html('');
        $('.loading-data__muangay').html(htmlloading);

        var formSubmit = $(this);
        let accRanId = formSubmit.data('ranid');
        var url = '/ajax-acc-category/'+accRanId+'/databuy';
        let category_customize_id = $('.category_customize_id').data('category_customize_id');
        let price_category = $('.price_category').data('price_category');



        var btnSubmit = formSubmit.find(':submit');
        btnSubmit.prop('disabled', true);
        $('.loginBox__layma__button__displayabs').prop('disabled', true);

        $.ajax({
            type: "POST",
            url: url,
            data: {
                id : accRanId,
                category_customize_id : category_customize_id,
                price_category : price_category,
                _token: $('meta[name="csrf-token"]').attr('content'),
                discount_code: discount_code,
            }, // serializes the form's elements.
            beforeSend: function (xhr) {

            },
            success: function (response) {

                $('.data__form__random').html('');

                if(response.status == 1){
                    $('.loadModal__acount').modal('hide');
                    $('#successNickRandomPurchase').modal('show');
                }
                else if (response.status == 2){
                    $('.loadModal__acount').modal('hide');

                    swal(
                        'Thông báo!',
                        response.message,
                        'warning'
                    )
                    $('.loginBox__layma__button__displayabs').prop('disabled', false);
                }else {
                    $('.loadModal__acount').modal('hide');
                    swal(
                        'Thông báo!',
                        response.message,
                        'error'
                    )
                    $('.loginBox__layma__button__displayabs').prop('disabled', false);
                }
                $('.loading-data__muangay').html('');
            },
            error: function (response) {
                if(response.status === 422 || response.status === 429) {
                    let errors = response.responseJSON.errors;

                    jQuery.each(errors, function(index, itemData) {

                        formSubmit.find('.notify-error').text(itemData[0]);
                        return false; // breaks
                    });
                }else if(response.status === 0){
                    alert(response.message);
                    $('#text__errors').html('<span class="text-danger pb-2" style="font-size: 14px">'+response.message+'</span>');
                }
                else {
                    let html = '';
                    html += `<span class="text-danger pb-2" style="font-size: 14px">`;
                    html += $('#check_auth_acc').data('discount_cd');
                    html += `</span>`;
                    $('#text__errors').html(html);
                }
            },
            complete: function (data) {
                btnSubmit.prop('disabled', false);
                // let price_discount_0d = $('#check_auth_acc').data('0d');
                // $('.data_discount').html(price_discount_0d);
            }
        })

    })
    let discount= 0;
    $('body').on('click', '.formDonhangAccount .refresh_discount_kt',function(e){
        let randid = $(this).data('randid');
        let price = $(this).data('price');
        discount_code = $(this).closest('.card--attr__name').find('.discount_code').val();
        price_default = price;
        $('.formDonhangAccount .error__text').html('');
        $('.formDonhangAccount .sussess__text').html('');
        if (!discount_code){
            $('.formDonhangAccount .error__text').html(`Vui lòng điền mã giảm giá`);
            return false;
        }
        var url = `/acc/${randid}/check-discount-code-new`;
        request = $.ajax({
            type: 'GET',
            url: url,
            async:true,
            cache:false,
            data: {
                discount_code:discount_code,
                price:price,
            },
            beforeSend: function (xhr) {

            },
            success: (data) => {
                if (data.status == 1) {
                    discount_code = data.discount_code;
                    $('.formDonhangAccount .error__text').html('');
                    $('.formDonhangAccount .sussess__text').html(`Áp dụng mã giảm giá thành công!`);
                    let price_discount = data.price_discount;

                    if (price_discount < 0) {
                        $('.formDonhangAccount .data_total_price').html(`0 đ`);
                    } else{
                        $('.formDonhangAccount .data_total_price').html(`${formatNumber(price_discount)} đ`);
                    }

                    let discount = data.price_discount;
                    if (auth_balance < discount){
                        $('.not-enough-money').html('<p class="text-danger mt-3 mb-0">Tài khoản của bạn không đủ để thanh toán, vui lòng nạp tiền để tiếp tục giao dịch</p>')
                    }else{
                        $('.not-enough-money').html('')
                        html = '';
                        html += '<button type="submit" class="btn primary">';
                        html += $('#check_auth_acc').data('pay');
                        html += '</button>';
                        $('.data__dangnhap').html(html);
                    }
                    $(this).data('price', data.price_discount);
                    $(this).attr('data-price', data.price_discount);
                    $(this).text('Gỡ');
                    $(this).removeClass('refresh_discount_kt').addClass('clear_discount_kt');
                    $('.discount_code').prop('disabled', true);
                    // if (auth_balance < discount){
                    //     let not_money = '';
                    //     not_money += `<div class="card--gray c-mb-0 c-mt-16 c-pt-8 c-pb-8 c-pl-12 c-pr-12">
                    //             <p class="card--attr__payment_failed c-mb-0 fw-400 fz-13 lh-20">`;
                    //     not_money +=  $('#check_auth_acc').data('not_money');
                    //     not_money +=    `</p>
                    //             </div>` ;
                    //     $('.not-enough-money').html(not_money);
                    //     let html = '';
                    //     html += `<button type="button" class="btn ghost" disabled>`;
                    //     html += $('#check_auth_acc').data('pay');
                    //     html += `</button>`;
                    //     html += `<button type="button" data-dismiss="modal" class="btn primary" data-toggle="modal" data-target="#rechargeModal">`;
                    //     html += $('#check_auth_acc').data('recharge');
                    //     html += `</button>`;
                    //     $('.data__dangnhap').html(html);

                    // }
                    // else {
                    //     $('.not-enough-money').html('');
                    //     let html = '';
                    //     html += `<button type="submit" class="btn primary">`;
                    //     html += $('#check_auth_acc').data('pay');
                    //     html += `</button>`;
                    //     $('.data__dangnhap').html(html);
                    // }

                    // let fm_discount = data.discount_amount;
                    // fm_discount = fm_discount.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                    // fm_discount = fm_discount.split('').reverse().join('').replace(/^[\.]/,'');
                    // fm_discount = fm_discount + $('#check_auth_acc').data('d');
                    // $('.data_discount').html('');
                    // $('.data_discount').html(fm_discount);

                    // let message = '';
                    // message += `<i class="fas fa-check-circle" style="color: #00a651"></i>`;
                    // message += $('#check_auth_acc').data('ss_discount');
                    // $('.formDonhangAccount .sussess__text').html(message);

                }else {
                    $('.formDonhangAccount .sussess__text').html('');
                    $('.formDonhangAccount .error__text').html(data.message);
                }

            },
            error: function (data) {

            },
            complete: function (data) {
                initSwiperGallery();
            }
        });

    })

    $('body').on('click', '.formDonhangAccount .clear_discount_kt',function(e){
        let randid = $(this).data('randid');
        let price = $(this).data('price');
        $('.discount_code').prop('disabled', false);
        $(this).removeClass('clear_discount_kt').addClass('refresh_discount_kt');
        $(this).text('Áp dụng');
        $('.formDonhangAccount .error__text').html('');
        $('.formDonhangAccount .sussess__text').html('');
        $(this).data('price',price_default);
        $(this).attr('data-price', price_default);
        $('.formDonhangAccount .data_total_price').html(`${formatNumber(price_default)} đ`);
        discount_code = '';
    })
});

$(document).on('change', '#privacyPolicy', function() {
    if ($(this).is(':checked')) {
        $('.payment_confirm').prop('disabled', false);
    } else {
        $('.payment_confirm').prop('disabled', true);
    }
});
