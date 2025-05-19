
function getTotalVP(){
    $.ajax({
        url: '/withdrawitemajax-' + gameType,
        type: 'GET',
        data: '',
        success: function(res) {
            if (res.status === 1) {
                if(res.result.number_item){
                    $('.leaderboard-items p').html(`${formatNumber(res.result.number_item)} ${res.game_type}`);
                }else{
                    $('.leaderboard-items p').html(`0 ${res.game_type}`);
                }
            }
        }
    })
}
getTotalVP()
// swiper
let swiper_item_possession = new Swiper('.swiper-withdraw', {
    slidesPerView: 5,
    spaceBetween: 32,
    freeMode: true,
    observer: true,
    observeParents: true,
    breakpoints: {
        992: {
            slidesPerView: 2.05,
            spaceBetween: 16,
        }
    },
});

$('#modalWithdraw [name="started_at"],#modalWithdraw [name="ended_at"]').datetimepicker({
    format: 'DD-MM-YYYY',
    useCurrent: false,
    icons:
    {
        time: 'fas fa-clock',
        date: 'fas fa-calendar',
        up: 'fas fa-arrow-up',
        down: 'fas fa-arrow-down',
        previous: 'fas fa-arrow-circle-left',
        next: 'fas fa-arrow-circle-right',
        today: 'far fa-calendar-check-o',
        language: 'vi',
        clear: 'fas fa-trash',
        close: 'far fa-times'
    },
    maxDate: moment()

});

function getWithDrawItem(game_type, data_query) {
    $('#form-withdraw-item').toggleClass('is-loading', true);
    $.ajax({
        url: '/withdrawitemajax-' + game_type,
        type: 'GET',
        data: data_query,
        success: function (res) {
            if (res.status === 1) {
                $('.user-info').html('');
                //Lịch sử
                // $('#table-history-withdraw').html(res.history);
                //Chọn loại vật phẩm
                let result_data = res.result;
                if(result_data.gametype.parent_id == 13){
                    $('.desc-roblox').removeClass('d-none');
                }else{
                    $('.desc-roblox').addClass('d-none');
                }
                if (result_data.listgametype.length) {
                    let select_game_type = $('#wrap-game-type');
                    select_game_type.empty();
                    result_data.listgametype.forEach(function (item) {
                        if (item.image_icon) {

                            let html = `<div class="swiper-slide">
                                        <input type="radio" id="game_type_${item.parent_id}" value="${item.parent_id}" name="game_type" hidden ${item.parent_id === game_type * 1 ? 'checked' : ''}>
                                        <label for="game_type_${item.parent_id}" class="label-item">
                                            <div class="item-thumb">
                                                <img src="${item.image_icon}" alt="" style="width: 60px;height: 60px">
                                            </div>
                                            <div class="item-info">
                                                <div class="t-sub-1">${formatNumber(item.set_number_item) || 0}</div>
                                                <div class="t-body-1">${item.image}</div>
                                            </div>
                                        </label>
                                    </div>`;
                            select_game_type.prepend(html);
                        } else {
                            let html = `<div class="swiper-slide">
                                <input type="radio" id="game_type_${item.parent_id}" value="${item.parent_id}" name="game_type" hidden ${item.parent_id === game_type * 1 ? 'checked' : ''}>
                                <label for="game_type_${item.parent_id}" class="label-item">
                                    <div class="item-thumb">
                                        <img src="/assets/frontend/theme_3/image/icon-qh.png" alt="">
                                    </div>
                                    <div class="item-info">
                                        <div class="t-sub-1">${formatNumber(item.set_number_item) || 0}</div>
                                        <div class="t-body-1">${item.image}</div>
                                    </div>
                                </label>
                            </div>`;
                            select_game_type.prepend(html);
                        }


                    });
                }

                //    Chọn gói vật phẩm
                if (result_data.package.length) {
                    let select_package = $('#package');
                    select_package.empty();
                    result_data.package.forEach(function (item) {
                        let html = `<option value="${item.id}">${item.title}</option>`;
                        select_package.append(html);
                    });
                    select_package.niceSelect('update');
                } else {
                    let select_package = $('#package');
                    select_package.empty();
                    let html = `<option selected>Không có gói rút</option>`;
                    select_package.append(html);
                    select_package.niceSelect('update');
                }
                // server
                let has_server = !!result_data.service;
                let input_wrap = $('#input-server');
                if (has_server) {
                    if (result_data.service.idkey !== 'roblox_buyserver' && result_data.service.idkey !== 'roblox_gem_pet' && result_data.service.idkey !== 'roblox_internal' && result_data.service.idkey !== 'roblox_buygamepass'
                        !== result_data.service.idkey !== 'roblox_buyserver_dailyv2' && result_data.service.idkey !== 'roblox_gem_pet_dailyv2' && result_data.service.idkey !== 'roblox_buygamepass_dailyv2'
                    ) {
                        let service_params = JSON.parse(result_data.service.params);
                        let input_server = `<div class="form-label">Chọn máy chủ:</div>`;
                        input_server += '<select name="server" class="wide select-withdraw">';
                        service_params.server_data.forEach((server_name, idx) => {
                            if (!!server_name && server_name.indexOf('[DELETE]') === -1) {
                                input_server += `<option value="${service_params.server_id[idx]}">${server_name}</option>`
                            }
                        })
                        input_server += '</select>';
                        input_wrap.html(input_server);
                        input_wrap.find('.wide').niceSelect();
                    } else {
                        input_wrap.empty();
                    }
                } else {
                    input_wrap.empty();
                }
                //id game
                var idkey = null;

                if (res.idkey) {
                    idkey = res.idkey;
                }

                var position = null;

                if (res.position) {
                    position = res.position;
                }

                $('.user-info').empty();
                if (idkey) {
                    //id game
                    var html_idkey = '';
                    html_idkey = `<div class="input-id-game">
                        <div class="t-sub-2 t-color-title c-my-8">${idkey}</div>
                        <input class="form-control" type="text" name="idgame" placeholder="${idkey}" required="">
                    </div>`;
                    $('.user-info').append(html_idkey);
                }

                if (position) {
                    //id game

                    var html_position = '';
                    html_position = `<div class="input-id-game">
                        <div class="t-sub-2 t-color-title c-my-8">${position}</div>
                        <input class="form-control" type="text" name="phone" placeholder="${position}" required="">
                    </div>`;
                    $('.user-info').append(html_position);
                }


                var parameters_3 = null;
                var parameters_4 = null;
                var parameters_5 = null;

                if (res.parameters_3) {
                    parameters_3 = res.parameters_3;
                }
                if (res.parameters_4) {
                    parameters_4 = res.parameters_4;
                }

                if (res.parameters_5) {
                    parameters_5 = res.parameters_5;
                }

                if (parameters_3) {
                    var html_parameters_3 = '';
                    html_parameters_3 = `<div class="input-id-game">
                    <div class="t-sub-2 t-color-title c-my-8">${parameters_3}</div>
                        <input class="form-control" type="text" name="params[parameters_3]" placeholder="${parameters_3}" required="">
                    </div>`;
                    $('.user-info').append(html_parameters_3);
                }
                if (parameters_4) {
                    var html_parameters_4 = '';
                    html_parameters_4 = `<div class="input-id-game">
                    <div class="t-sub-2 t-color-title c-my-8">${parameters_4}</div>
                        <input class="form-control" type="text" name="params[parameters_4]" placeholder="${parameters_4}" required="">
                    </div>`;
                    $('.user-info').append(html_parameters_4);
                }

                if (parameters_5) {
                    var html_parameters_5 = '';
                    html_parameters_5 = `<div class="input-id-game">
                    <div class="t-sub-2 t-color-title c-my-8">${parameters_5}</div>
                        <input class="form-control" type="text" name="params[parameters_5]" placeholder="${parameters_5}" required="">
                    </div>`;
                    $('.user-info').append(html_parameters_5);
                }



                var server_id = null;

                if (res.server_id) {
                    server_id = res.server_id;
                }

                if (server_id) {
                    var html_server_id = '';
                    html_server_id = `
                        <input type="hidden" name="service_id" value="${server_id}">
                    </div>`;
                    $('.user-info').append(html_server_id);
                }
            }
        }
    }).done(function () {
        $('#form-withdraw-item').removeClass('is-loading');
    });
}

function getShowHistoryWithDrawItem(game_type_history, data_query) {
    $('#table-history-withdraw').toggleClass('is-loading', true);
    $.ajax({
        url: '/historywithdrawitemajax-' + game_type_history,
        type: 'GET',
        data: data_query,
        success: function (res) {
            if (res.status === 1) {
                //Lịch sử
                $('#table-history-withdraw').html(res.history);

            }
        }
    }).done(function () {
        $('#table-history-withdraw').removeClass('is-loading');
    });
}
$('#form-withdraw-item').on('submit', function (e) {
    e.preventDefault();
    let data_form = $(this).serializeArray().reduce(function (obj, item) {
        obj[item.name] = item.value;
        return obj;
    }, {});
    $('#form-withdraw-item').toggleClass('is-loading', true);
    $('#withdrawMessage').empty();
    $.ajax({
        url: '/postwithdrawitemajax-' + data_form.game_type,
        type: 'POST',
        data: data_form,
        success: function (res) {
            let html_message;
            if (res.status) {
                html_message = `<span class="text-error">${res.msg}</span>`;
            } else {
                html_message = `<span class="text-error">${res.msg}</span>`;
            }
            $('#withdrawMessage').html(html_message);
        },
    }).done(function () {
        let game_type = $('input[name="game_type"]:checked').val();
        getWithDrawItem(game_type);
        console.log('trunghehehe',game_type)
        getShowHistoryWithDrawItem(game_type);
        $('#form-withdraw-item').removeClass('is-loading');
    });
});

let game_type = $('#wrap-game-type').data('game_type');
$('.btn-withdraw-items').click(function(){
    if(auth_check){
        getWithDrawItem(game_type);
    }
})

$(document).on('change', 'input[name="game_type"]', function (event) {
    getWithDrawItem($(this).val());
    $('.check_withdraw_item_history').val(0)
});
// $(document).on('click', 'input[name="history_game_type"]', function (event) {
//     getShowHistoryWithDrawItem($(this).val());
// });
$('#modal-tab-history').on('click', '.page-link', function (e) {
    e.preventDefault();
    let url_string = $(this).attr('href');
    let url = new URL(url_string);
    let page = url.searchParams.get('page');
    let game_type = $('input[name="game_type"]:checked').val();

    getWithDrawItem(game_type, { page: page })
});

$(document).ready(function () {
    $('.btn-history-withdraw').on('click', function (e) {
        e.preventDefault();
        let game_type = $('input[name="game_type"]:checked').val();
        if(auth_check){
            if($('.check_withdraw_item_history').val() == 0){

                getShowHistoryWithDrawItem(game_type)
                $('.check_withdraw_item_history').val(1)
            }
        }
    });
})


$('#modalWithdraw #resetFormButton').on('click', function (e) {
    e.preventDefault();
    $('#modal-tab-history [name="started_at"],#modal-tab-history [name="ended_at"]').val('');
    $('#modal-tab-history [name="id"],#modal-tab-history [name="status"]').val('');
    $('#modal-tab-history [name="id"],#modal-tab-history [name="status"]').niceSelect('update');
});
