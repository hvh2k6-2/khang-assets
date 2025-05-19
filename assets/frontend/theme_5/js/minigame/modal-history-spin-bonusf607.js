let screen_width = $(window).width();
let elm_modal_spin_bonus = $('#data-ajax-render');
let elm_modal_spin_bonus_mobile = $('#data-ajax-mobile-render');
function getLogs(...query) {
    elm_modal_spin_bonus.toggleClass('is-loading',true);
    elm_modal_spin_bonus_mobile.toggleClass('is-loading', true);
    let data_query= {};
    data_query.type = query[0] || '';
    data_query.id = query[1] || '';
    data_query.gift_name = query[2] || '';
    data_query.started_at = query[3] || '';
    data_query.ended_at = query[4] || '';
    data_query.page = query[5] || '1';
    $.ajax({
        url:'/ajax-modal-logs-spin-bonus',
        type:'GET',
        data: data_query,
        success:function (res) {
            if (res.status){

                if ( screen_width > 990 ) {
                    elm_modal_spin_bonus.html(res.html);
                    $('#data-ajax-render select').niceSelect();


                    $('#data-ajax-render [name="started_at"],#data-ajax-render [name="ended_at"]').datetimepicker({
                        format: 'DD-MM-YYYY LT',
                        useCurrent: false,
                        icons:
                            { time: 'fas fa-clock',
                                date: 'fas fa-calendar',
                                up: 'fas fa-arrow-up',
                                down: 'fas fa-arrow-down',
                                previous: 'fas fa-arrow-circle-left',
                                next: 'fas fa-arrow-circle-right',
                                today: 'far fa-calendar-check-o',
                                language: 'vi',
                                clear: 'fas fa-trash',
                                close: 'far fa-times' },
                        maxDate: moment()

                    });
                } else {
                    elm_modal_spin_bonus_mobile.html(res.html);
                    $('#data-ajax-mobile-render select').niceSelect();


                    $('#data-ajax-mobile-render [name="started_at"],#data-ajax-mobile-render [name="ended_at"]').datetimepicker({
                        format: 'DD-MM-YYYY LT',
                        useCurrent: false,
                        icons:
                            { time: 'fas fa-clock',
                                date: 'fas fa-calendar',
                                up: 'fas fa-arrow-up',
                                down: 'fas fa-arrow-down',
                                previous: 'fas fa-arrow-circle-left',
                                next: 'fas fa-arrow-circle-right',
                                today: 'far fa-calendar-check-o',
                                language: 'vi',
                                clear: 'fas fa-trash',
                                close: 'far fa-times' },
                        maxDate: moment()

                    });
                }
            }
        }
    }).done(function () {
        elm_modal_spin_bonus.toggleClass('is-loading',false);
        elm_modal_spin_bonus_mobile.toggleClass('is-loading', false);
    });
}

let minigame_id = elm_modal_spin_bonus.data('id');
$('.btn-history-spin').click(function(){
    if(auth_check){
        if($('.check_history_spin').val() == 0){
            getLogs('spin-bonus', minigame_id);
            $('.check_history_spin').val('1');
        }
    }
})

$('#modal-spin-bonus').on('change','[name="id"],[name="type"]',function (e) {
    e.preventDefault();
    let data_query = getQuerySpin();
    getLogs(...data_query);
});

$('#sheet-filter-02').on('change','[name="id"],[name="type"]',function (e) {
    e.preventDefault();
    let data_query = getQuerySpin();
    getLogs(...data_query);
});

$(document).on('click','#submit-filter-spin',function (e) {
    e.preventDefault();
    getLogs(...getQuerySpin())
});

$(document).on('click','#reset-filter-spin',function (e) {
    e.preventDefault();
    if ( screen_width > 990 ) {
        $('#data-ajax-render [name="gift_name"]').val(null);
        $('#data-ajax-render [name="started_at"]').val(null);
        $('#data-ajax-render [name="ended_at"]').val(null);
    } else {
        $('#data-ajax-mobile-render [name="gift_name"]').val(null);
        $('#data-ajax-mobile-render [name="started_at"]').val(null);
        $('#data-ajax-mobile-render [name="ended_at"]').val(null);
    }
});

elm_modal_spin_bonus.on('click','.page-link',function (e) {
    e.preventDefault();
    let data_query = getQuerySpin();
    const urlParams = new URLSearchParams($(this).attr('href'));
    let page = urlParams.get('page');
    getLogs(...data_query,page);
});
function getQuerySpin() {
    let type,id,gift_name,started_at,ended_at;
    if ( screen_width > 990 ) {
        type = $('#data-ajax-render [name="type"]').val();
        id = $('#data-ajax-render [name="id"]').val();
        gift_name = $('#data-ajax-render [name="gift_name"]').val();
        started_at = $('#data-ajax-render [name="started_at"]').val();
        ended_at = $('#data-ajax-render [name="ended_at"]').val();
    } else {
        type = $('#data-ajax-mobile-render [name="type"]').val();
        id = $('#data-ajax-mobile-render [name="id"]').val();
        gift_name = $('#data-ajax-mobile-render [name="gift_name"]').val();
        started_at = $('#data-ajax-mobile-render [name="started_at"]').val();
        ended_at = $('#data-ajax-mobile-render [name="ended_at"]').val();
    }
    return [type,id,gift_name,started_at,ended_at];
}
