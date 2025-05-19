function animate(options) {
    var start = performance.now();
    requestAnimationFrame(function animate(time) {
        var timeFraction = (time - start) / options.duration;
        if (timeFraction > 1) timeFraction = 1;
        var progress = options.timing(timeFraction)
        options.draw(progress);
        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }
    });
}

const intervalIds = [];

function setIntervalMinigame(){
// Khi cần clear mọi setInterval
    clearAllIntervals();
    var intervalId;

    const hexagons = $('.hexagon-middle');

    $('.hexagon-middle.new-background').removeClass('new-background');

    let previousHexagon = null;

    // Clear any existing interval to avoid overlapping intervals on multiple clicks
    if (intervalId) clearInterval(intervalId);

    intervalId = setInterval(function() {
        // If there was a previously changed hexagon, revert it to the original background
        if (previousHexagon) {
            $(previousHexagon).removeClass('new-background');
        }

        // Randomly select one hexagon
        const randomIndex = Math.floor(Math.random() * hexagons.length);
        const randomHexagon = hexagons[randomIndex];

        // Change the background of the randomly selected hexagon
        $(randomHexagon).addClass('new-background');

        // Store the current hexagon to revert it in the next cycle
        previousHexagon = randomHexagon;
    }, 500); // Change every 0.5s

    intervalIds.push(intervalId);

}

// Hàm để clear tất cả các intervals
function clearAllIntervals() {
    intervalIds.forEach(intervalId => clearInterval(intervalId));
    // Xóa sạch mảng sau khi đã clear
    intervalIds.length = 0;
}

$(document).ready(function(e) {

    var saleoffpass = "";
    var game_type_value = "";
    var userpoint = 0;
    var numrollbyorder = -1;
    var roll_check = true;
    var num_loop = 4;
    var angle_gift = '';
    var num_gift = $('#count_item').val();
    var gift_detail = '';
    var num_roll_remain = 0;
    var angles = 0;
    var arrxgt;
    var free_wheel = 0;
    var value_gif_bonus = '';
    var msg_random_bonus = '';
    var payment_methods = 0;
    //var arrDiscount = '';

    $('body').delegate('#start-played', 'click', function() {
        $('.check_history_spin').val(0);
        $('.check_withdraw_item').val(0);
        if (!auth_check) {
            let width = $(window).width();
            if ( width > 992 ) {
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
        }

        $('#type_play').val('real');
        setIntervalMinigame();
        play();
    });

    $('body').delegate('.num-play-try', 'click', function() {

        if (!auth_check) {
            let width = $(window).width();
            if ( width > 992 ) {
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
        }

        $('#type_play').val('try');

        play();
    });

    //Click nút quay
    function play(){
        if (roll_check) {
            roll_check = false;
            saleoffpass = $("#saleoffpass").val();
            numrolllop = $("#numrolllop").val();
            payment_methods = $('#payment_methods').val();

            setIntervalMinigame();

            $.ajax({
                url: '/minigame-play',
                datatype: 'json',
                data: {
                    _token: $('meta[name="csrf-token"]').attr('content'),
                    id: $('#group_id').val(),
                    numrolllop: numrolllop,
                    payment_methods: payment_methods,
                    numrollbyorder: numrollbyorder,
                    typeRoll: $('#type_play').val(),
                    saleoffpass: saleoffpass,
                },
                type: 'POST',
                success: function(data) {
                    if (data.status == 4) {
                        let width = $(window).width();
                        setTimeout(function(){
                            if ( width > 992 ) {
                                $('#loginModal').modal('show');
                                setTimeout(() => {
                                    $('#loginModal #modal-login-container').removeClass('right-panel-active');
                                }, 200);

                                return;
                            } else {
                                $('.mobile-auth-form #formLoginMobile').css('display', 'flex');
                                $('.mobile-auth-form #formRegisterMobile').css('display', 'none');
                                $('.mobile-auth .head-mobile h1').text('Đăng nhập');
                                $('.mobile-auth').css('transform', 'translateX(0)');

                                return;
                            }
                        }, 0);
                    }
                    else if (data.status == 3) {
                        roll_check = true;

                        let html = 'Tài khoản của quý khách hiện không đủ để thanh toán, vui lòng nạp tiền để tiếp tục.';
                        if (data.type_charge){
                            if (data.type_charge == 1){
                                html = 'Rất tiếc việc quay minigame đã thất bại do tài khoản khuyến mãi của bạn không đủ số dư, vui lòng nạp thẻ để được khuyến mại và tiếp tục giao dịch!';
                            }
                        }
                        $('#naptheModal .data_faild').html(html);
                        $('#naptheModal').modal('show');

                        return;

                    }
                    else if (data.status == 0) {
                        roll_check = true;
                        $('#noticeModal .content-popup').text(data.msg);
                        $('#noticeModal').modal('show');
                        return;
                    }
                    numrollbyorder = parseInt(data.numrollbyorder);
                    gift_detail = data.gift_detail;
                    gift_revice = data.arr_gift;
                    game_type_value = data.game_type_value;
                    arrxgt = data.xgt;
                    if (data.xgt > 0) {
                        xvalue = data.xgt[data.xgt.length - 1];
                    } else {
                        xvalue = 0;
                    }
                    value_gif_bonus = data.value_gif_bonus;
                    msg_random_bonus = data.msg_random_bonus;
                    xvalueaDD = data.xValue;
                    free_wheel = data.free_wheel;
                    // num_roll_remain = gift_detail.num_roll_remain;
                    angles = 0;
                    angle_gift = gift_detail.order * (360 / num_gift);
                    loop();

                    if($('#type_play').val()=='real'){
                        userpoint = data.userpoint;
                        if(userpoint<100){
                            $(".progress-bar").css("width", userpoint + "%");
                        }else{
                            $(".pyro").show();
                            setTimeout(function(){
                                $(".pyro").hide();
                            },6000)
                            $(".progress-bar").css("width", "100%");
                            $(".progress-bar").addClass('clickgif');
                        }
                        $('.progress-tooltip').text(`Điểm của bạn: ${userpoint}/100`);
                        $("#saleoffpass").val("");
                        //saleoffmessage = data.saleMessage;
                    }
                },
                error: function() {
                    $('#noticeModal .content-popup').text('Có lỗi xảy ra. Vui lòng thử lại!');
                    $('#noticeModal').modal('show');
                }
            })
        }
    };


    function getgifbonus() {
        if($('#checkPoint').val() != "1"){
            return;
        }
        $.ajax({
            url: '/minigame-bonus',
            datatype: 'json',
            data: {
                _token: $('meta[name="csrf-token"]').attr('content'),
                id: $('#group_id').val(),
            },
            type: 'POST',
            success: function(data) {
                if (data.status == 0) {
                    $('#noticeModal .content-popup').text(data.msg);
                    $('#noticeModal').modal('show');
                    return;
                }

                var flag_bonus = true;
                var c_game_type_value = '';
                if (data.game_type_value){
                    c_game_type_value = " " + data.game_type_value;
                }
                if (data.value_gif_bonus.length > 0){
                    for (let i = 0; i < data.value_gif_bonus.length; i++ ){
                        if (parseInt(data.value_gif_bonus[i]) > 0){
                            flag_bonus = false;
                        }
                    }
                }
                var total_vp = parseInt(data.arr_gift[0]['parrent'].params.value) + parseInt(data.value_gif_bonus[0]);
                if (!flag_bonus){
                    var html_bonus = "";
                    html_bonus += "</br>";
                    html_bonus += "</br>";
                    html_bonus += "Nổ hũ may mắn - bạn đã trúng thêm " + total_vp + c_game_type_value;
                    $('#noticeModal .content-popup').append(html_bonus);
                }else{
                    var html_bonus = "";
                    html_bonus += "</br>";
                    html_bonus += "</br>";
                    html_bonus += data.msg + " - " + data.arr_gift[0].title;
                    $('#noticeModal .content-popup').append(html_bonus);
                }

                //$("#noticeModalNoHu #btnWithdraw").hide();
                $('#noticeModal').modal('show');
                var userpoint = data.userpoint;
                if(userpoint<100){
                    $(".progress-bar").css("width", data.userpoint + "%");
                    $(".progress-bar").removeClass('clickgif');
                }else{
                    $(".progress-bar").css("width", "100%");
                    $(".progress-bar").addClass('clickgif');
                }
                $(".progress-tooltip").text(`Điểm của bạn: ${data.userpoint}/100`);
                $(".pyro").show();
                setTimeout(function(){
                    $(".pyro").hide();
                },6000)
            },
            error: function() {
                $('#noticeModal .content-popup').text('Có lỗi xảy ra. Vui lòng thử lại!');
                $('#noticeModal').modal('show');
            }
        })
    }

    function loop() {
        $('#rotate-play').css({
            "transform": "rotate(" + angles + "deg)"
        });

        if ((parseInt(angles) - 10) <= -(((num_loop * 360) + angle_gift))) {
            angles = parseInt(angles) - 2;
        } else {
            angles = parseInt(angles) - 10;
        }

        if (angles >= -((num_loop * 360) + angle_gift)) {
            requestAnimationFrame(loop);
        } else {
            roll_check = true;

            $("#btnWithdraw").show();
            if (gift_detail.winbox == 0) {
                $("#btnWithdraw").hide();
            } else {
                if (gift_detail.gift_type == 0) {
                    // $("#btnWithdraw").html("Rút " + $("#withdrawruby_" + gift_detail.game_type).val());
                    $("#btnWithdraw").html("Rút Quà");
                    $("#btnWithdraw").attr('href', '/withdrawitem-' + gift_detail.game_type);
                } else if (gift_detail.gift_type == 1) {
                    $("#btnWithdraw").html("Kiểm tra nick trúng");
                    $("#btnWithdraw").attr('href', '/minigame-logacc-' + $('#group_id').val());
                } else if (gift_detail.gift_type == 2) {
                    $("#btnWithdraw").html("Load lại trang");
                    $("#btnWithdraw").removeAttr("href");
                    $("#btnWithdraw").addClass('reLoad');
                } else {
                    $("#btnWithdraw").hide();
                }

            }
            if (gift_revice.length > 0) {
                $html = "";
                $strDiscountcode="";
                // if(saleoffmessage.length > 0)
                // {
                //     $html += "<br/><span style='font-size: 14px;color: #f90707;font-style: italic;display: block;text-align: center;'>"+saleoffmessage+"</span><br/>";
                // }
                var flag_bonus = true;

                if (value_gif_bonus.length > 0){
                    for (let i = 0; i < value_gif_bonus.length; i++ ){
                        if (parseInt(value_gif_bonus[i]) > 0){
                            flag_bonus = false;
                        }
                    }
                }

                var c_game_type_value = '';
                if (game_type_value){
                    c_game_type_value = " " + game_type_value;
                }

                if($('#type_play').val() == "real")
                {
                    if(gift_revice.length == 1)
                    {
                        // if(arrDiscount[0] != "")
                        // {
                        //     $strDiscountcode="<span>Bạn nhận được 1 mã giảm giá khuyến mãi đi kèm: <b>"+arrDiscount[0]+"</b></span>";
                        // }
                        if (!flag_bonus){//trường hợp bonus.
                            var total_vp = parseInt(gift_revice[0]['parrent'].params.value) + parseInt(value_gif_bonus[0]);

                            $html += "<span>Kết quả: Bạn đã trúng " + total_vp + c_game_type_value +"</span><br/>";
                            if (gift_detail.winbox == 1) {
                                $html += "<span>Mua X1: Nhận được " + total_vp + game_type_value + "</span><br/>";
                                $html += "<span>Tổng cộng: " + formatNumber((parseInt(gift_revice[0]['parrent'].params.value) * (parseInt(xvalueaDD[0])) + parseInt(value_gif_bonus[0])) + game_type_value) +"</span>";
                            }
                        }else {
                            $html += "<span>Kết quả: " + gift_revice[0]["title"] + "</span><br/>";

                            if (gift_detail.winbox == 1) {
                                $html += "<span>Mua X1: Nhận được " + gift_revice[0]['parrent'].params.value + "</span><br/>";
                                //$html += "<span>Quay được "+(xvalue+3)+" hình trùng nhau. Nhận X"+(xvalueaDD[0])+" giải thưởng: "+gift_revice[0]['parrent'].params.value*(xvalueaDD[0])+""+msg_random_bonus[0]+"</span><br/>"+$strDiscountcode;
                                $html += "<span>Tổng cộng: " +  formatNumber(parseInt(gift_revice[0]['parrent'].params.value) * (parseInt(xvalueaDD[0]))) + "</span>";
                            }
                        }
                    }
                    else
                    {

                        if (!flag_bonus) {//trường hợp bonus.

                            $totalRevice = 0;
                            $html += "<span>Kết quả: Nhận " + gift_revice.length + " phần thưởng cho " + gift_revice.length + " lượt quay.</span><br/>";
                            $html += "<span><b>Mua X" + gift_revice.length + ":</b></span><br/>";
                            for ($i = 0; $i < gift_revice.length; $i++) {

                                var total_vp = parseInt(gift_revice[$i]['parrent'].params.value) + parseInt(value_gif_bonus[$i]);

                                $html += "<span>Lần quay " + ($i + 1) + ": " + gift_revice[$i].title;
                                if (gift_revice[$i].winbox == 1) {

                                    $html += " - nhận được: " + gift_revice[$i]['parrent'].params.value + " X" + (parseInt(xvalueaDD[$i])) + " = " + (parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i])) + "" + c_game_type_value + "</span><br/><br/>";
                                } else {
                                    if(msg_random_bonus[$i] != undefined){
                                        $html += "" + msg_random_bonus[$i] + "<br/>";
                                    }else{
                                        $html += "<br/>";
                                    }
                                }
                                $totalRevice += parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i]);
                            }

                            $html += "<span><b>Tổng cộng: " + $totalRevice + c_game_type_value + " </b></span>";
                        }else{


                            $totalRevice = 0;
                            $html += "<span>Kết quả: Nhận " + gift_revice.length + " phần thưởng cho " + gift_revice.length + " lượt quay.</span><br/>";
                            $html += "<span><b>Mua X" + gift_revice.length + ":</b></span><br/>";
                            for ($i = 0; $i < gift_revice.length; $i++) {
                                $html += "<span>Lần quay " + ($i + 1) + ": " + gift_revice[$i]["title"];
                                if (gift_revice[$i].winbox == 1) {
                                    $html += " - nhận được: " + gift_revice[$i]['parrent'].params.value + " X" + (parseInt(xvalueaDD[$i])) + " = " + parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + "" + msg_random_bonus[$i] + "</span><br/>" + $strDiscountcode + "<br/>";
                                } else {
                                    if(msg_random_bonus[$i] != undefined){
                                        $html += "" + msg_random_bonus[$i] + "<br/>" + $strDiscountcode + "<br/>";
                                    }else{
                                        $html += "<br/><br/>";
                                    }
                                }
                                $totalRevice += parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i]);
                            }

                            $html += "<span><b>Tổng cộng: " + $totalRevice + "</b></span>";
                        }
                    }
                }
                else
                {
                    $("#btnWithdraw").hide();
                    if (gift_revice.length == 1) {
                        if (!flag_bonus) {//trường hợp bonus.
                            var total_vp = parseInt(gift_revice[0]['parrent'].params.value) + parseInt(value_gif_bonus[0]);
                            $html += "<span>Kết quả: Bạn đã trúng " + total_vp + c_game_type_value +"</span><br/>";
                            if (gift_detail.winbox == 1) {
                                $html += "<span>Mua X1: Nhận được " + total_vp + game_type_value + "</span><br/>";
                                $html += "<span>Tổng cộng: " + formatNumber((parseInt(gift_revice[0]['parrent'].params.value) * (parseInt(xvalueaDD[0])) + parseInt(value_gif_bonus[0])) + game_type_value) +"</span>";
                            }
                        }else{
                            $html += "<span>Kết quả chơi thử: " + gift_revice[0]["title"] + "</span><br/>";
                            if (gift_detail.winbox == 1) {
                                $html += "<span>Mua X1: Nhận được " + gift_revice[0]['parrent'].params.value + "</span><br/>";
                                //$html += "<span>Quay được "+(xvalue+3)+" hình trùng nhau. Nhận X"+(xvalueaDD[0])+" giải thưởng: "+gift_revice[0]['parrent'].params.value*(xvalueaDD[0])+""+msg_random_bonus[0]+"</span><br/>";
                                $html += "<span>Tổng cộng: " + formatNumber(parseInt(gift_revice[0]['parrent'].params.value) * (parseInt(xvalueaDD[0]))) + "</span>";
                            }
                        }
                    } else {
                        if (!flag_bonus) {//trường hợp bonus.
                            $totalRevice = 0;
                            $html += "<span>Kết quả chơi thử: Nhận " + gift_revice.length + " phần thưởng cho " + gift_revice.length + " lượt quay.</span><br/>";
                            $html += "<span><b>Mua X" + gift_revice.length + ":</b></span><br/>";
                            for ($i = 0; $i < gift_revice.length; $i++) {
                                var total_vp = parseInt(gift_revice[$i]['parrent'].params.value) + parseInt(value_gif_bonus[$i]);
                                $html += "<span>Lần quay " + ($i + 1) + ": " + gift_revice[$i]["title"];
                                if (gift_revice[$i].winbox == 1) {
                                    $html += " - nhận được: " + gift_revice[$i]['parrent'].params.value + " X" + (parseInt(xvalueaDD[$i])) + " = " + (parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i])) + "" + c_game_type_value + "</span><br/><br/>";
                                } else {
                                    if(msg_random_bonus[$i] != undefined){
                                        $html += "" + msg_random_bonus[$i] + "<br/>";
                                    }else{
                                        $html += "<br/>";
                                    }
                                }
                                $totalRevice += parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i]);
                            }
                            $html += "<span><b>Tổng cộng: " + formatNumber($totalRevice + c_game_type_value) + " </b></span>";
                        }else{
                            $totalRevice = 0;
                            $html += "<span>Kết quả chơi thử: Nhận " + gift_revice.length + " phần thưởng cho " + gift_revice.length + " lượt quay.</span><br/>";
                            $html += "<span><b>Mua X" + gift_revice.length + ":</b></span><br/>";
                            for ($i = 0; $i < gift_revice.length; $i++) {
                                $html += "<span>Lần quay " + ($i + 1) + ": " + gift_revice[$i].title;
                                if (gift_revice[$i].winbox == 1) {
                                    $html += " - nhận được: " + gift_revice[$i]['parrent'].params.value + " X" + (parseInt(xvalueaDD[$i])) + " = " + parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + "" + msg_random_bonus[$i] + "</span><br/>";
                                } else {
                                    if(msg_random_bonus[$i] != undefined){
                                        $html += "" + msg_random_bonus[$i] + "<br/>";
                                    }else{
                                        $html += "<br/>";
                                    }
                                }
                                $totalRevice += parseInt(gift_revice[$i]['parrent'].params.value) * (parseInt(xvalueaDD[$i])) + parseInt(value_gif_bonus[$i]);
                            }

                            $totalRevice = $totalRevice.toString().split('').reverse().join('').replace(/(?=\d*\.?)(\d{3})/g,'$1.');
                            $totalRevice = $totalRevice.split('').reverse().join('').replace(/^[\.]/,'');

                            $html += "<span><b>Tổng cộng: " + formatNumber($totalRevice) + "</b></span>";
                        }
                    }
                }
            }

            $('#noticeModal .content-popup').html($html);

            if (userpoint > 99) {
                getgifbonus();
            }
            let order_class = 0;
            if(gift_revice.length > 0){
                order_class = gift_revice[0].order;
            }
            // if (gift_detail && gift_detail)

            setTimeout(function() {

                const hexagons = $('.hexagon-middle');

                // Khi cần clear mọi setInterval
                clearAllIntervals();

                // Remove the background class from the previously selected hexagon (if any)
                hexagons.removeClass('new-background');
                // hexagons.removeClass('hexagon-middle-color');

                // // Add the background to the 5th hexagon (index 4 because it's 0-based)

                let isBackground = true; // Biến để luân phiên đổi màu

// Sử dụng setInterval để thay đổi class sau mỗi khoảng thời gian
                const intervalId2 = setInterval(function() {
                    if (hexagons.eq(order_class).length) {
                        // hexagons.eq(0).addClass('new-background');
                        if (isBackground) {
                            // Thêm class new-background và xóa class hexagon-middle-color

                            hexagons.eq(order_class).addClass('new-background').removeClass('hexagon-middle-color');
                        } else {
                            // Thêm class hexagon-middle-color và xóa class new-background
                            hexagons.eq(order_class).addClass('hexagon-middle-color').removeClass('new-background');
                        }

                        // Đảo ngược biến isBackground
                        isBackground = !isBackground;
                    }
                }, 500); // Hiệu ứng đổi màu mỗi 0.5 giây (500ms)

                intervalIds.push(intervalId2);

                $('#noticeModal').modal('show');
            }, 3000); // Trì hoãn 3 giây (3000ms)
        }
    }
});
$('body').delegate('.reLoad', 'click', function() {
    location.reload();
})
