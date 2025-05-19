$(document).ready(function () {
    let module_comment = $("#module-comment").val();
    let category_comment = $("#category-comment").val();
    let slug_viewed = $("#slug-viewed").val();
    let title_viewed = $("#title-viewed").val();
    let title_child_viewed = $("#title-child-viewed").val();
    let total_order_viewed = $("#total-order-viewed").val();
    let display_type = $("#display-type").val();
    let image_viewed = $("#image-viewed").val();

    if(module_comment  != '' && category_comment != ''){
        if (localStorage.getItem("viewedProduct") == null) {
            if ( display_type == 1 && title_child_viewed != null && title_child_viewed != ''){
                var subArrayToAdd = [
                    {
                        category: category_comment,
                        module: module_comment,
                        slug: slug_viewed,
                        title: title_viewed,
                        totalOrder: total_order_viewed,
                        displayType: display_type,
                        image: image_viewed,
                        data_child: [{title_child_viewed: title_child_viewed}]
                    },
                ];
            }else{
                var subArrayToAdd = [
                    {
                        category: category_comment,
                        module: module_comment,
                        slug: slug_viewed,
                        title: title_viewed,
                        totalOrder: total_order_viewed,
                        displayType: display_type,
                        image: image_viewed,
                    },
                ];
            }

            var viewedArray = JSON.stringify(subArrayToAdd);
            localStorage.setItem("viewedProduct", viewedArray);

            const now = new Date().getTime();
            const expires = now + 7 * 24 * 60 * 60 * 1000;
            localStorage.setItem("viewedProductExpires", expires);
        } else {
            var storedArray = localStorage.getItem("viewedProduct");
            var retrievedArray = JSON.parse(storedArray);

            if (display_type == 1 && title_child_viewed != null && title_child_viewed != ''){
                var subArrayToAdd =
                    {
                        category: category_comment,
                        module: module_comment,
                        slug: slug_viewed,
                        title: title_viewed,
                        totalOrder: total_order_viewed,
                        displayType: display_type,
                        image: image_viewed,
                        data_child: [{title_child_viewed: title_child_viewed}]
                    }
            }else{
                var subArrayToAdd = {
                    category: category_comment,
                    module: module_comment,
                    slug: slug_viewed,
                    title: title_viewed,
                    totalOrder: total_order_viewed,
                    displayType: display_type,
                    image: image_viewed,
                };
            }

            if (retrievedArray.length >= 15) {
                retrievedArray.pop();
            }

            let check_cat = 0;

            $.each(retrievedArray.slice(), function (indexx, innerArray) {
                if (innerArray["displayType"] === 1 || display_type == 1){
                    if (innerArray["category"] == category_comment && innerArray["module"] == module_comment) {
                        check_cat = 0;
                        if (innerArray['data_child'] != null && innerArray['data_child'] != ''){
                            check_cat = 0;
                            $.each(innerArray['data_child'], function (index, innerDataChild) {
                                if(innerDataChild['title_child_viewed'] == title_child_viewed){
                                    innerArray['data_child'].splice(index, 1);
                                }
                            })
                            if(title_child_viewed != '' && title_child_viewed != null){
                                innerArray["data_child"].unshift({title_child_viewed: title_child_viewed});
                                retrievedArray.splice(indexx, 1);
                                retrievedArray.unshift(innerArray);
                            }
                            return false;
                        }else{
                            if(title_child_viewed != '' && title_child_viewed != null){
                                innerArray["data_child"] = [{title_child_viewed: title_child_viewed}];
                            }
                            check_cat = 0;
                            return false;
                        }
                    }else{
                        check_cat = 1;
                    }
                }else{
                    if (innerArray["category"] == category_comment && innerArray["module"] == module_comment) {
                        retrievedArray.splice(indexx, 1);
                    }
                }
            });

            if(display_type != 1){
                retrievedArray.unshift(subArrayToAdd);
            } else if(display_type == 1 && check_cat == 1){
                retrievedArray.unshift(subArrayToAdd);
            }

            var updatedArray = JSON.stringify(retrievedArray);
            localStorage.setItem("viewedProduct", updatedArray);

            const expires = localStorage.getItem("viewedProductExpires");
            if (expires) {
                const now = new Date().getTime();
                if (now > expires) {
                    localStorage.removeItem("viewedProduct");
                    localStorage.removeItem("viewedProductExpires");
                }
            }
        }
    }
});
