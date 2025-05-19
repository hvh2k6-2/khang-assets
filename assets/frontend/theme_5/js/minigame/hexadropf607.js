const items = document.querySelectorAll('.item');
const totalDuration = 4000;
const totalSteps = 30;
const delay = totalDuration / totalSteps;
let previousIndex = -1;

function winnerV2(data,type){
    let reward = data.arr_gift[0].order;
    let current = 0;
    const hexes = [document.getElementById('hex1'), document.getElementById('hex2')];
        const interval = setInterval(() => {
        hexes.forEach(el => el.classList.remove('active'));
        hexes[current].classList.add('active');
        current = (current + 1) % hexes.length;
    }, 300);
    setTimeout(() => {
        clearInterval(interval);
        hexes.forEach(el => el.classList.remove('active'));
        if (reward == 8) {
            hexes[0].classList.add('active');
        } else if (reward == 9) {
            hexes[1].classList.add('active');
        }
        showGift(data, type);
    }, 3000);
}
let hexagon = $('.border-hexagon')
function animateStep(data,type,step) {    
    items.forEach(item => {
        item.classList.remove('gold');
        item.classList.remove('gold-final');
    });
    hexagon.removeClass('gold');
    let index;
    do {
        index = Math.floor(Math.random() * items.length);
    } while (items.length > 1 && index === previousIndex);
    previousIndex = index;
    if (step === totalSteps - 1) {
        if(data.arr_gift[0].order > 3 && (data.arr_gift[0].order < 8) ){
            items[(data.arr_gift[0].order + 1) ?? 0].classList.add('gold-final');
        }else if(data.arr_gift[0].order > 7){
            items[4].classList.add('gold-final');
        }else{
            items[data.arr_gift[0].order ?? 0].classList.add('gold-final');
        }
    } else {
        items[index].classList.add('gold');
        if(index == 4){
            $('.border-hexagon').addClass('gold');
        }
    }
    if (step < totalSteps - 1) {
        setTimeout(() => {
            animateStep(data,type,step + 1);
        }, delay);
    }else{
        if(data.arr_gift[0].order > 7){
            winnerV2(data, type);
        }else{
            showGift(data, type);
        }
    }
}

function showGift(data, type) {
    var html = ''    
    if (data.arr_gift.length === 1) {
        var total_vp = parseInt(data.arr_gift[0]['parrent'].params.value) + parseInt(data.value_gif_bonus[0]);
        if (type === 'real') {
            html += "<span>Kết quả chơi: Bạn đã trúng " + data.arr_gift[0].title + "</span><br/>";
        } else {
            html += "<span>Kết quả chơi thử: Bạn đã trúng " + data.arr_gift[0].title + "</span><br/>";
        }

        if (data.gift_detail.winbox == 1) {
            html += "<span>Mua X1: Nhận được " + total_vp + " " + data.game_type_value + "</span><br/>";
            html += "<span>Tổng cộng: " + (parseInt(data.arr_gift[0]['parrent'].params.value) * (parseInt(data.xValue[0])) + parseInt(data.value_gif_bonus[0])) + " " + data.game_type_value + "</span>";
        }
        $('#noticeModal .content-popup').html(html);
    } else {
        var total_vp = 0;
        var totalRevice = 0;
        if (type === 'real') {
            html += "<span>Kết quả chơi: Nhận " + data.arr_gift.length + " phần thưởng cho " + data.arr_gift.length + " lượt quay.</span><br/>";
        } else {
            html += "<span>Kết quả chơi thử: Nhận " + data.arr_gift.length + " phần thưởng cho " + data.arr_gift.length + " lượt quay.</span><br/>";
        }
        html += "<span><b>Mua X" + data.arr_gift.length + ":</b></span><br/>";
        for (let i = 0; i < data.arr_gift.length; i++) {

            total_vp += parseInt(data.arr_gift[i]['parrent'].params.value);

            html += "<span>Lần quay " + (i + 1) + ": " + data.arr_gift[i].title;
            if (data.arr_gift[i].winbox == 1) {

                html += " - nhận được: " + data.arr_gift[i]['parrent'].params.value + " X" + (parseInt(data.xValue[0])) + " = " + (parseInt(gift_revice[i]['parrent'].params.value) * (parseInt(xvalueaDD[i])) + parseInt(value_gif_bonus[i])) + "" + c_game_type_value + "</span><br/><br/>";
            } else {
                if (data.msg_random_bonus[i] != undefined) {
                    html += "" + data.msg_random_bonus[i] + "<br/>";
                } else {
                    html += "<br/>";
                }
            }
            totalRevice += parseInt(data.arr_gift[i]['parrent'].params.value) * (parseInt(data.xValue[0])) + parseInt(data.value_gif_bonus[i]);
        }
        html += "<span><b>Tổng cộng: " + totalRevice + " " + data.game_type_value + " </b></span>";
        $('#noticeModal .content-popup').html(html);
    }
    $('#noticeModal img').attr('src', data.arr_gift[0].image);
    $('#noticeModal img').attr('alt', data.arr_gift[0].title);
    $('#noticeModal img').addClass('w-100 col-6');
    $('#noticeModal img').removeClass('c-pb-20');
    setTimeout(() => {
        $('#noticeModal').modal('show');
    }, 1000);
}

document.querySelectorAll('.play').forEach(function (button) {
    button.addEventListener('click', function () {
        playMinigame('real');
    });
});

document.querySelectorAll('.num-play-try').forEach(function (button) {
    button.addEventListener('click', function () {
        playMinigame('try');
    });
});

function playMinigame(type) {
    saleoffpass = $("#saleoffpass").val();
    numrolllop = $("#numrolllop").val();
    payment_methods = $('#payment_methods').val();
    $('.play, .num-play-try').prop('disabled', true);
    $.ajax({
        url: '/minigame-play',
        datatype: 'json',
        data: {
            _token: $('meta[name="csrf-token"]').attr('content'),
            id: $('#group_id').val(),
            numrolllop: numrolllop,
            payment_methods: payment_methods,
            numrollbyorder: -1,
            typeRoll: type,
            saleoffpass: saleoffpass,
        },
        type: 'POST',
        success: function (data) {
            if (data.status == 4) {
                let width = $(window).width();
                if (width > 992) {
                    $('#loginModal').modal('show');
                    $('#loginModal #modal-login-container').removeClass('right-panel-active');
                    return;
                } else {
                    $('.mobile-auth-form #formLoginMobile').css('display', 'flex');
                    $('.mobile-auth-form #formRegisterMobile').css('display', 'none');
                    $('.mobile-auth .head-mobile h1').text('Đăng nhập');
                    $('.mobile-auth').css('transform', 'translateX(0)');
                    return;
                }
            } else if (data.status == 3) {
                $('#naptheModal').modal('show')
            } else if (data.status == 1) {
                animateStep(data,type,0);
                $('.play, .num-play-try').prop('disabled', false);                
            }
        },
        error: function (data) {
            $('#noticeModal .content-popup').text('Có lỗi xảy ra. Vui lòng thử lại!');

        },
    })
}
