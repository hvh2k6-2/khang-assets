
//Sử lý chát có sẵn

var chatArrayDefault = [
    'Dịch vụ uy tín ghê',
    'Uy tín không anh em ?',
    'Vãi vừa ấn rút vật phẩm xong vào game có ngay (y)',
    'Web uy tín đấy, vừa nạp 500k xong.',
    'Nãy có ông bạn nạp 500k xong vào nạp luôn, quá xịn admin ơi.',
    'Thanks admin <3 , uy tín lắm luôn',
    'Nhanh gọn uy tín, thanks admin',
    'Web xịn không scam nha mọi người',
    'Hàng sạch, thanks admin',
    'Vừa nạp xong, quá ngon',
    'Web ok không anh em, có scam không?',
    'Vừa chạy ra quán mua 500k thẻ nạp ăn luôn, ngon quá admin',
    'Nhập nhầm mã thẻ với serial báo admin xử lý trong vòng 1 nốt nhạc, uy tín quá admin ơi',
    'Cứ tưởng lừa đảo, nạp thử 200k nhận vật phẩm trong 10s luôn, quá là uy tín',
    '1 vote uy tín cho web nhé, quá ngon luôn',
    'Bị lừa nhiều rồi, giờ mới tìm được web uy tín, thanks ad',
    'Vừa nạp 100k xong',
    'Web ngon vl',
    'Anh em nào chưa nạp thì vào nạp ngay đi đang có khuyến mại',
    'Uy tín lắm admin',
    'Vote 10000k sao nhé, quá uy tín',
    'Có anh em nào vừa từ youtube qua đây nạp k',
    'Ông em vừa giới thiệu, nạp cái ăn luôn, ngon vc',
    'Uy tín nhé anh em',
    'Đã nạp thành công',
    'Đã nạp ở đây 20tr tiền thẻ, vote uy tín nhé',
    'Web nạp ngon thế này mà giờ mới biết',
    'Đã nạp, nhanh lắm nhé',
    'Ngon vcl, +5 sao cho admin',
    'Nghe anh em review ngon quá, tôi ra làm cái thẻ 500k nạp đây',
    'Không scam, web nạp thật, nhận thật nhé !',
    'Đã nạp và thấy ngon ngọt nhé ae',
    'Web này trùm game mẹ rồi',
    'Web được đấy anh em',
    'Thấy web được nhiều anh em nạp rồi, yên tâm nạp hehe',
    'Anh em không phải sợ đâu, tôi nạp nhiều web này rồi',
    'Web xịn không scam nha mọi người',
    'Youtube mang tôi tới đây',
    'Tôi cũng từ youtube sang nè, web uy tín nhé mọi người',
    'Đã kiểm chứng là shop uy tín nhé',
    'Quay vật phẩm giá rẻ vl, lời hơn nạp game',
    'Chơi game trúng vật phẩm nhiều vl, ngon hơn nạp game thật',
    'Giá vòng quay ở đây rẻ thật, mà còn trúng được nhiều vật phẩm nữa',
    'Shop uy tín nhé ae, đã thử và nhận được vật phẩm trong game thật luôn',
];

//Set thời gian minmax
var lengthChatDefault = 12;
var monthsDefault = [30, 35, 40, 45, 50, 55, 60, 65];

var totaltime = 0;
var arr_time = [];

for (let i = 0; i < lengthChatDefault; i++){

    var randomDefault = Math.floor(Math.random() * monthsDefault.length);
    var i_minite = monthsDefault[randomDefault];
    totaltime = totaltime + i_minite;
    arr_time.push(i_minite);

}

// totaltime = totaltime + monthsDefault[0];

//App chat



var d_totaltime = 0;
var c_totaltime = 0;
var arr_group = [];


let cookies_minigame = getCookie('chat_minigame');
// eraseCookie('chat_minigame');
if (cookies_minigame){

    var cookies_lengthChatDefault = JSON.parse(cookies_minigame);

    for (let k = 0; k < cookies_lengthChatDefault.length; k++){
        var k_cookies_lengthChatDefault = cookies_lengthChatDefault[k];
        var cookies_html;
        var defoalt = k_cookies_lengthChatDefault[2];
        defoalt = new Date(defoalt);

        var cookies_minute = defoalt.getMinutes();
        var cookies_hour = defoalt.getHours();

        var c_timepast = timeSince(cookies_minute,cookies_hour);

        if (parseInt(cookies_minute) < 10){
            cookies_minute = "0"+cookies_minute;
        }
        if (parseInt(cookies_hour) < 10){
            cookies_hour = "0"+cookies_hour;
        }


        if (k_cookies_lengthChatDefault[0] == 0){
            cookies_html = `
                <li>
                    <div class="comment-item d-flex align-items-start c-mb-16 comment-item-khach" data-time="${defoalt}">
                        <div class="comment-avatar c-mr-8">
                            <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                        </div>
                        <div class="comment-detail">
                            <div class="comment-info c-mb-4">
                                <h6 class="d-inline-block">Khách </h6>
                                <span class="c-ml-8 fw-400 fz-12">${cookies_hour}:${cookies_minute}, </span><small class="data_time_minigame">${c_timepast}</small>
                            </div>
                            <div class="comment-content fw-400 fz-13">
                                ${k_cookies_lengthChatDefault[1]}
                            </div>
                            <div class="comment-interact c-mt-12">
                                <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                                <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                            </div>
                        </div>
                    </div>
                </li>`;
        }else{

            cookies_html = `
                <li>
                    <div class="comment-item d-flex align-items-start c-mb-16 comment-item-user" data-time="${defoalt}">
                        <div class="comment-avatar c-mr-8">
                            <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                        </div>
                        <div class="comment-detail">
                            <div class="comment-info c-mb-4">
                                <h6 class="d-inline-block text-primary-color" >Bạn </h6>
                                <span class="c-ml-8 fw-400 fz-12">${cookies_hour}:${cookies_minute}, </span><small class="data_time_user">${c_timepast}</small>
                            </div>
                            <div class="comment-content fw-400 fz-13">
                                ${k_cookies_lengthChatDefault[1]}
                            </div>
                            <div class="comment-interact c-mt-12">
                                <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                                <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                            </div>
                        </div>
                    </div>
                </li>`;
        }
        $('.list-unstyled').append(cookies_html);

    }

    (function loop() {

        var months = [30, 35, 40, 45, 50, 55, 60, 65];

        var random = Math.floor(Math.random() * months.length);

        setTimeout(function() {

            var chatArray = [
                'Dịch vụ nạp uy tín ghê',
                'Uy tín không anh em.',
                'Vãi vừa ấn nạp xong vào game có ngay (y)',
                'Web uy tín đấy, vừa nạp 500k xong.',
                'Nãy có ông bạn nạp 500k xong vào nạp luôn, quá xịn admin ơi.',
                'Thanks admin <3 , uy tín lắm luôn',
                'Nhanh gọn uy tín, thanks admin',
                'Web xịn không scam nha mọi người',
                'Hàng sạch, thanks admin',
                'Vừa nạp xong, quá ngon',
                'Web ok không anh em, có scam không?',
                'Vừa chạy ra quán mua 500k thẻ nạp ăn luôn, ngon quá admin',
                'Nhập nhầm mã thẻ với serial báo admin xử lý trong vòng 1 nốt nhạc, uy tín quá admin ơi',
                'Cứ tưởng lừa đảo, nạp thử 200k nhận luôn kim cương trong 10s',
                '1 vote uy tín cho web nhé, quá ngon luôn',
                'Bị lừa nhiều rồi, giờ mới tìm được web uy tín, thanks ad',
                'Vừa nạp 100k xong',
                'Web ngon vl',
                'Anh em nào chưa nạp thì vào nạp ngay đi đang có khuyến mại',
                'Uy tín lắm admin',
                'Vote 10000k sao nhé, quá uy tín',
                'Có anh em nào vừa từ youtube qua đây nạp k',
                'Ông em vừa giới thiệu, nạp cái ăn luôn, ngon vc',
                'Uy tín nhé anh em',
                'Đã nạp thành công',
                'Đã nạp ở đây 20tr tiền thẻ, vote uy tín nhé',
                'Web nạp ngon thế này mà giờ mới biết',
                'Đã nạp, nhanh lắm nhé',
                'Ngon vcl, +5 sao cho admin',
                'Nghe anh em review ngon quá, tôi ra làm cái thẻ 500k nạp đây',
                'Không scam, web nạp thật, nhận thật nhé !',
                'Đã nạp và thấy ngon ngọt nhé ae',
                'Web này trùm nạp mẹ rồi',
                'Web được đấy anh em',
                'Thấy web được nhiều anh em nạp rồi, yên tâm nạp hehe',
                'Anh em không phải sợ đâu, tôi nạp nhiều web này rồi',
                'Web xịn không scam nha mọi người'
            ];

            const randomChat = Math.floor(Math.random() * chatArray.length);

            let cookies_set = getCookie('chat_minigame');

            setArray(cookies_set,chatArray[randomChat],0);
            loop()
        }, months[random]*1000);

    }());

    $('body').on('click','.btn-send-message',function(){
        var context = $('#message-to-send').val();

        let cookies_set = getCookie('chat_minigame');
        setArray(cookies_set,context,1);

        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);

        $('#message-to-send').val('');
    })

    $('body').on('keyup','#message-to-send',function (e) {

        var key = e.which;
        if (key == 13) {
            var context = $(this).val();

            let cookies_set = getCookie('chat_minigame');
            setArray(cookies_set,context,1);

            $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);

            $('#message-to-send').val('');
        }
        e.preventDefault();
    })
    // console.log(cookies_lengthChatDefault)
}else{

    for (let j = 0; j < lengthChatDefault; j++){
        // console.log(arr_time[j])
        var dateTimeDefault = new Date();
        var datenow = new Date();

        d_totaltime = d_totaltime + arr_time[j]*1;
        c_totaltime = (totaltime - d_totaltime)*1;
        if (j == 0){
            dateTimeDefault.setSeconds(dateTimeDefault.getSeconds() - totaltime); // timestamp
        }else{
            dateTimeDefault.setSeconds(dateTimeDefault.getSeconds() - c_totaltime); // timestamp
        }

        var s_minute = dateTimeDefault.getMinutes();
        var s_hour = dateTimeDefault.getHours();
        var timepast = timeSince(s_minute,s_hour);
        if (parseInt(s_minute) < 10){
            s_minute = "0"+s_minute;
        }
        if (parseInt(s_hour) < 10){
            s_hour = "0"+s_hour;
        }
        // dateTimeDefault = new Date(dateTimeDefault).toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
        const randomChatDefault = Math.floor(Math.random() * chatArrayDefault.length);
        var arr_item = [];
        arr_item.push(0);
        arr_item.push(chatArrayDefault[randomChatDefault]);
        arr_item.push(dateTimeDefault);
        arr_group.push(arr_item);

        var htmldefault = `
            <li>
                <div class="comment-item d-flex align-items-start c-mb-16 comment-item-khach" data-time="${dateTimeDefault}">
                    <div class="comment-avatar c-mr-8">
                        <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                    </div>
                    <div class="comment-detail">
                        <div class="comment-info c-mb-4">
                            <h6 class="d-inline-block">Khách </h6>
                            <span class="c-ml-8 fw-400 fz-12">${s_hour}:${s_minute}, </span><small class="data_time_minigame">${timepast}</small>
                        </div>
                        <div class="comment-content fw-400 fz-13">
                            ${chatArrayDefault[randomChatDefault]}
                        </div>
                        <div class="comment-interact c-mt-12">
                            <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                            <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                        </div>
                    </div>
                </div>
            </li>`;

        $('.list-unstyled').append(htmldefault);

    }

    var arr_groups = JSON.stringify(arr_group);
    setCookie('chat_minigame',arr_groups,1);

    (function loop() {

        var months = [30, 35, 40, 45, 50, 55, 60, 65];

        var random = Math.floor(Math.random() * months.length);

        setTimeout(function() {

            var chatArray = [
                'Dịch vụ nạp uy tín ghê',
                'Uy tín không anh em.',
                'Vãi vừa ấn nạp xong vào game có ngay (y)',
                'Web uy tín đấy, vừa nạp 500k xong.',
                'Nãy có ông bạn nạp 500k xong vào nạp luôn, quá xịn admin ơi.',
                'Thanks admin <3 , uy tín lắm luôn',
                'Nhanh gọn uy tín, thanks admin',
                'Web xịn không scam nha mọi người',
                'Hàng sạch, thanks admin',
                'Vừa nạp xong, quá ngon',
                'Web ok không anh em, có scam không?',
                'Vừa chạy ra quán mua 500k thẻ nạp ăn luôn, ngon quá admin',
                'Nhập nhầm mã thẻ với serial báo admin xử lý trong vòng 1 nốt nhạc, uy tín quá admin ơi',
                'Cứ tưởng lừa đảo, nạp thử 200k nhận luôn kim cương trong 10s',
                '1 vote uy tín cho web nhé, quá ngon luôn',
                'Bị lừa nhiều rồi, giờ mới tìm được web uy tín, thanks ad',
                'Vừa nạp 100k xong',
                'Web ngon vl',
                'Anh em nào chưa nạp thì vào nạp ngay đi đang có khuyến mại',
                'Uy tín lắm admin',
                'Vote 10000k sao nhé, quá uy tín',
                'Có anh em nào vừa từ youtube qua đây nạp k',
                'Ông em vừa giới thiệu, nạp cái ăn luôn, ngon vc',
                'Uy tín nhé anh em',
                'Đã nạp thành công',
                'Đã nạp ở đây 20tr tiền thẻ, vote uy tín nhé',
                'Web nạp ngon thế này mà giờ mới biết',
                'Đã nạp, nhanh lắm nhé',
                'Ngon vcl, +5 sao cho admin',
                'Nghe anh em review ngon quá, tôi ra làm cái thẻ 500k nạp đây',
                'Không scam, web nạp thật, nhận thật nhé !',
                'Đã nạp và thấy ngon ngọt nhé ae',
                'Web này trùm nạp mẹ rồi',
                'Web được đấy anh em',
                'Thấy web được nhiều anh em nạp rồi, yên tâm nạp hehe',
                'Anh em không phải sợ đâu, tôi nạp nhiều web này rồi',
                'Web xịn không scam nha mọi người'
            ];

            const randomChat = Math.floor(Math.random() * chatArray.length);

            let cookies_set = getCookie('chat_minigame');

            setArray(cookies_set,chatArray[randomChat],0);
            loop()
        }, months[random]*1000);

    }());

    $('body').on('click','.btn-send-message',function(){
        var context = $('#message-to-send').val();

        let cookies_set = getCookie('chat_minigame');
        setArray(cookies_set,context,1);

        $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);

        $('#message-to-send').val('');
    });

    $('body').on('keyup','#message-to-send',function (e) {

        var key = e.which;
        if (key == 13) {
            var context = $(this).val();

            let cookies_set = getCookie('chat_minigame');
            setArray(cookies_set,context,1);

            $('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);

            $('#message-to-send').val('');
        }
        e.preventDefault();
    })

}

$('.chat-scroll').scrollTop($('.chat-scroll')[0].scrollHeight);

function setArray(array = [],contents,index){

    var parse_group =[]
    var cookies_parse = JSON.parse(array);
    var parse_html;

    $('.list-unstyled').html('');

    for (let p = 0; p < cookies_parse.length; p++){
        if(p > 0){
            var k_cookies_parse = cookies_parse[p];
            var arr_parse = [];
            arr_parse.push(k_cookies_parse[0]);
            arr_parse.push(k_cookies_parse[1]);
            arr_parse.push(k_cookies_parse[2]);
            parse_group.push(arr_parse);

            k_cookies_parse[2] = new Date(k_cookies_parse[2]);

            var parse_minute = k_cookies_parse[2].getMinutes();
            var parse_hour = k_cookies_parse[2].getHours();
            var timeparse = timeSince(parse_minute,parse_hour);

            if (parseInt(parse_minute) < 10){
                parse_minute = "0"+parse_minute;
            }
            if (parseInt(parse_hour) < 10){
                parse_hour = "0"+parse_hour;
            }

            if (k_cookies_parse[0] == 0){
                parse_html = `
                    <li>
                        <div class="comment-item d-flex align-items-start c-mb-16 comment-item-khach" data-time="${k_cookies_parse[2]}">
                            <div class="comment-avatar c-mr-8">
                                <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                            </div>
                            <div class="comment-detail">
                                <div class="comment-info c-mb-4">
                                    <h6 class="d-inline-block">Khách </h6>
                                    <span class="c-ml-8 fw-400 fz-12">${parse_hour}:${parse_minute}, </span><small class="data_time_minigame">${timeparse}</small>
                                </div>
                                <div class="comment-content fw-400 fz-13">
                                    ${k_cookies_parse[1]}
                                </div>
                                <div class="comment-interact c-mt-12">
                                    <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                                    <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </li>`;
            }else{

                parse_html = `
                    <li>
                        <div class="comment-item d-flex align-items-start c-mb-16 comment-item-user" data-time="${k_cookies_parse[2]}">
                            <div class="comment-avatar c-mr-8">
                                <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                            </div>
                            <div class="comment-detail">
                                <div class="comment-info c-mb-4">
                                    <h6 class="d-inline-block text-primary-color" >Bạn </h6>
                                    <span class="c-ml-8 fw-400 fz-12">${parse_hour}:${parse_minute}, </span><small class="data_time_user">${timeparse}</small>
                                </div>
                                <div class="comment-content fw-400 fz-13">
                                    ${k_cookies_parse[1]}
                                </div>
                                <div class="comment-interact c-mt-12">
                                    <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                                    <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                                </div>
                            </div>
                        </div>
                    </li>`;
            }

            $('.list-unstyled').append(parse_html);

        }
    }

    var u_datenow = new Date();

    var set_arr = [];
    set_arr.push(index);
    set_arr.push(contents);
    set_arr.push(u_datenow);
    parse_group.push(set_arr);



    var set_parse_minute = u_datenow.getMinutes();
    var set_parse_hour = u_datenow.getHours();

    if (parseInt(set_parse_minute) < 10){
        set_parse_minute = "0"+set_parse_minute;
    }
    if (parseInt(set_parse_hour) < 10){
        set_parse_hour = "0"+set_parse_hour;
    }

    var setparse_html;


    if (index == 0){
        setparse_html = `
            <li>
                <div class="comment-item d-flex align-items-start c-mb-16 comment-item-khach" data-time="${u_datenow}">
                    <div class="comment-avatar c-mr-8">
                        <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                    </div>
                    <div class="comment-detail">
                        <div class="comment-info c-mb-4">
                            <h6 class="d-inline-block">Khách </h6>
                            <span class="c-ml-8 fw-400 fz-12">${set_parse_hour}:${set_parse_minute}, </span><small class="data_time_minigame">Vừa xong</small>
                        </div>
                        <div class="comment-content fw-400 fz-13">
                            ${contents}
                        </div>
                        <div class="comment-interact c-mt-12">
                            <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                            <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                        </div>
                    </div>
                </div>
            </li>`;
    }else{

        setparse_html = `
            <li>
                <div class="comment-item d-flex align-items-start c-mb-16 comment-item-user" data-time="${u_datenow}">
                    <div class="comment-avatar c-mr-8">
                        <img class="brs-100" src="/assets/frontend/theme_5/image/phu/user_avatar.png" alt="">
                    </div>
                    <div class="comment-detail">
                        <div class="comment-info c-mb-4">
                            <h6 class="d-inline-block text-primary-color" >Bạn </h6>
                            <span class="c-ml-8 fw-400 fz-12">${set_parse_hour}:${set_parse_minute}, </span><small class="data_time_user">Vừa xong</small>
                        </div>
                        <div class="comment-content fw-400 fz-13">
                            ${contents}
                        </div>
                        <div class="comment-interact c-mt-12">
                            <span id="likeComment" class="d-inline-flex align-items-center fw-400 fz-12 c-mr-40"><img src="/assets/frontend/theme_5/image/svg/hearts-suit_1.svg" alt=""> Thích</span>
                            <span id="replyComment" class="d-inline-flex align-items-center fw-400 fz-12"><img src="/assets/frontend/theme_5/image/svg/comment_1.svg" alt=""> Trả lời</span>
                        </div>
                    </div>
                </div>
            </li>`;
    }

    $('.list-unstyled').append(setparse_html);

    eraseCookie('chat_minigame');

    var parse_groups = JSON.stringify(parse_group);
    setCookie('chat_minigame',parse_groups,1);

}

function setCookie(name,value,hours) {
    var expires = "";
    if (hours) {
        var date = new Date();
        date.setTime(date.getTime() + (hours*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}


function timeSince(minute,hours) {
    var  date1 = new Date();
    // The number of milliseconds in one day
    var now_minute = date1.getMinutes();
    var now_hour = date1.getHours();
    var time;

    if (parseInt(hours) < parseInt(now_hour)){

        if (parseInt(now_minute) < parseInt(minute)){
            time = (parseInt(now_minute) + 60) - parseInt(minute) + " Phút trước";
        }else if (parseInt(now_minute) > parseInt(minute)){
            time = parseInt(minute) - parseInt(now_minute) + " Phút trước";
        }else {
            time = 1 + " Giờ trước";
        }

    }else if (parseInt(hours) > parseInt(now_hour)){

        if (parseInt(now_minute) < parseInt(minute)){
            time = (parseInt(now_minute) + 60) - parseInt(minute) + " Phút trước";
        }else if (parseInt(now_minute) > parseInt(minute)){
            time = parseInt(minute) - parseInt(now_minute) + " Phút trước";
        }else {
            time = 1 + " Giờ trước";
        }
    }else {
        if (parseInt(now_minute) == parseInt(minute)){
            time = "Vừa xong";
        }else {
            time = parseInt(now_minute) - parseInt(minute) + " Phút trước";
        }

    }

    // Convert back to days and return
    return time;

}



