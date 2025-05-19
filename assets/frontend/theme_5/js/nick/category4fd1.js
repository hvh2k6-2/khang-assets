//Hide random or normal category based on the query type parameter
const urlSearchParamsAccount = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParamsAccount.entries());

if (params.type == "1") {
    $('.randomAccountItem').remove();
} else if ( params.type == "2" ) {
    $('.normalAccountItem').remove();
}

$(document).ready(function(){

    $('#account-category #service-form').on('submit', function (e) {
        e.preventDefault();
        let keyword = convertToSlug($('#keyword--search').val());
        let is_empty = true;
        let text_empty = $('#text-empty');
        text_empty.hide();
        $('.js-service').each(function (i,elm) {
            let slug_service = $(elm).find('img').attr('alt');
            slug_service = convertToSlug(slug_service);
            $(this).toggle(slug_service.indexOf(keyword) > -1);
            if (slug_service.indexOf(keyword) > -1){
                is_empty  = false;
            }
        });
        if (is_empty){
            text_empty.show();
        }
    });

    $('body').on('keyup','#mobile_keyword--search',function(){
        let keyword = convertToSlug($(this).val());
        let is_empty = true;
        let text_empty = $('#text-empty');
        text_empty.hide();

        $('.js-service').each(function (i,elm) {
            let slug_service = $(elm).find('img').attr('alt');
            slug_service = convertToSlug(slug_service);
            $(this).toggle(slug_service.indexOf(keyword) > -1);
            if (slug_service.indexOf(keyword) > -1){
                is_empty  = false;
            }
        });

        if (is_empty){
            text_empty.show();
        }
    });

    function convertToSlug(title) {
        var slug;
        //Đổi chữ hoa thành chữ thường
        slug = title.toLowerCase();
        //Đổi ký tự có dấu thành không dấu
        slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
        slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
        slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
        slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
        slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
        slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
        slug = slug.replace(/đ/gi, 'd');
        //Xóa các ký tự đặt biệt
        slug = slug.replace(/\`|\~|\!|\@|\#|\||\$|\%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\<|\'|\"|\:|\;|_/gi, '');
        //Đổi khoảng trắng thành ký tự gạch ngang
        slug = slug.replace(/ /gi, "-");
        //Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
        //Phòng trường hợp người nhập vào quá nhiều ký tự trắng
        slug = slug.replace(/\-\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-\-/gi, '-');
        slug = slug.replace(/\-\-\-/gi, '-');
        slug = slug.replace(/\-\-/gi, '-');
        //Xóa các ký tự gạch ngang ở đầu và cuối
        slug = '@' + slug + '@';
        slug = slug.replace(/\@\-|\-\@|\@/gi, '');
        // trả về kết quả
        return slug;
    }
})


