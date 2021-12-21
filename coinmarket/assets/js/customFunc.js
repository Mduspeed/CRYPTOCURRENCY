function getParam(){
    var url = location.search;
    var tag = url.split("?");
    if(tag[1] == null){
        value = null;
    }else {
        var param = tag[1].replace("&","=").split("=");
        var value = new Array();
    
        for(var i=0; i<param.length/2; i++){
            value[param[2*i]] = transKr(param[2*i+1]);
        }
    }
    
    return value;
}

function setLabel(cat){
    var value = getParam();
    
    if(value == null || value[cat] == undefined){
        switch(cat){
            case "brand":
                document.write("브랜드");
                break;
            case "status":
                document.write("상품 상태");
                break;
            case "color":
                document.write("색상");
                break;
            case "size":
                document.write("사이즈");
                break;
            case "cost":
                document.write("단가");
                break;
        }
    }else {
        document.write(value[cat]);
    }
}

function priceToString(num){
    var price = new Array(2);
    var cost;
    if(num/1000 >= 1){
        price[0] = Math.floor(num/1000);
        if(num%1000 == 0){
            price[1] = "000"
        }else{
            price[1] = (num%1000).toString();
        }
    }else{
        price[0] = 0;
        price[1] = num;
    }
    if(price[0] == 0){
        cost = price[1];    
    }else {
        cost = price.toString().replace(".",",");
    }
    return cost;
}

function itemPrint(item, val){
    document.write("<div class=\"col l-2-4 m-4 c-6\"><a class=\"home-product-item\" href=\"#\"><div class=\"home-product-item__img\" style=\"background-image:url(");
    document.write(item.img);
    document.write(");\"></div><h4 class=\"home-product-item__name\">")
    document.write(item.name);
    document.write("</h4><div class=\"home-product-item__price\"><span class=\"home-product-item__price-old\">");
    document.write(priceToString(item.price_old));
    document.write(" 원</span><span class=\"home-product-item__price-current\">");
    document.write(priceToString(item.price_cur));
    document.write(" 원</span></div><div class=\"home-product-item__action\"><span class=\"home-product-item__like home-product-item__like--liked\"><i class=\"home-product-item__like-icon-empty far fa-heart\"></i><i class=\"home-product-item__like-icon-fill fas fa-heart\"></i></span><div class=\"home-product-item__rating\"><i class=\"home-product-item__star--gold fas fa-star\"></i><i class=\"home-product-item__star--gold fas fa-star\"></i><i class=\"home-product-item__star--gold fas fa-star\"></i><i class=\"home-product-item__star--gold fas fa-star\"></i><i class=\"fas fa-star\"></i></div><span class=\"home-product-item__sold\">");
    document.write(item.review);
    document.write(" 리뷰</span></div><div class=\"home-product-item__origin\"><span class=\"home-product-item__brand\">");
    document.write(item.brand);
    document.write("</span><span class=\"home-product-item__origin-name\">");
    document.write(item.produce);
    document.write("</span></div><div class=\"home-product-item__favourite\"><i class=\"fas fa-check\"></i><span>BEST</span></div><div class=\"home-product-item__sale-off\"><span class=\"home-product-item__sale-off-percent\">");
    document.write(Math.round(100-100*item.price_cur/item.price_old));
    document.write("%<br></span><span class=\"home-product-item__sale-off-label\">할인</span></div></a></div>");
    
}

function transKr(value){
    var trans;
    
    switch(value) {
        case "%EC%9D%B4%EB%8B%88%EC%8A%A4%ED%94%84%EB%A6%AC":
            trans = "이니스프리";
            break;
        case "NATURE%20REPUBLIC":
            trans = "NATURE REPUBLIC";
            break;
        case "The%20Face%20Shop":
            trans = "The Face Shop";
            break;
        case "new":
            trans = "새 상품";  
            break;
        case "best":
            trans = "베스트셀러"
            break;
        case "repack":
            trans = "재출시"
            break;
        case "black":
            trans = "블랙"
            break;
        case "navy":
            trans = "네이비"
            break;
        case "red":
            trans = "레드"
            break;
        case "silver":
            trans = "실버"
            break;
        case "grey":
            trans = "그레이"
            break;
        case "orange":
            trans = "오렌지"
            break;
        case "high":
            trans = "단가: 높음"
            break;
        case "low":
            trans = "단가: 낮음"
            break;
        default:
            trans = value;
    }
    return trans;
}

function searchItem(){
    var value = getParam();
    var t;
    var url = location.search;
    var tag = url.split("?");
    if(tag[1] == null){
        param = null;
    }else {
        var param = tag[1].replace("&","=").split("=");
        param[1] = transKr(param[1]);
    }
    
    for(var i=0; i<item.length; i++){
        if(param == null){
            itemPrint(item[i]);
        }else {
            switch(param[0]){
                case "brand":
                    t = item[i].brand;
                    break;
                case "status":
                    t = item[i].status;
                    break;
                case "color":
                    t = item[i].color;
                    break;
                case "cost":
                    t = item[i].price_cur;
                    break;
            }
            if(param[0] == "cost"){
                switch(param[1]){
                    case "단가: 높음":
                        if(t >= 30000){
                            itemPrint(item[i]);
                        }
                        break;
                    case "단가: 낮음":
                        if(t < 30000){
                            itemPrint(item[i]);
                        }
                        break;
                }
            }else {    
                if(t == param[1]){
                    itemPrint(item[i]);    
                }
            }    
        }
    }
}

function setUrl(cat, val){
    var value = getParam();
    var url;
    if(value[3] == undefined){
        url = concat("?",cat,"=",val);
    }else {
        url = concat("?",cat,"=",val,"&",value[2],"=",value[3]);
    }
    
    location.href(url);
}