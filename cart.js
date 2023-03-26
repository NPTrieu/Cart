$(function () {
    lst = [];
    curItem = null;
    var data = [
        {
            "value": "iPhone 14 Pro",
            "label": "iPhone 14 Pro - 27.690.000₫",
            "codeProduct": "iphone01",
            "nameProduct": "iPhone 14 Pro",
            "price":  27690000,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "iPhone 14",
            "label": "iPhone 14 - 22.690.000₫",
            "codeProduct": "iphone02",
            "nameProduct": "iPhone 14",
            "price": 22690000,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "iPhone 13",
            "label": "iPhone 13 -25.550.000₫",
            "codeProduct": "iphone03",
            "nameProduct": "iPhone 13",
            "price": 25550000,
            "unit": "PCS",
            "type": "iPhone"
        },
        {
            "value": "MacBook Pro 16”",
            "label": "MacBook Pro 16” - 38.990.000₫",
            "codeProduct": "mac01",
            "nameProduct": "MacBook Pro 16”",
            "price":  38990000,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "MacBook Pro 14”",
            "label": "MacBook Pro 13” - 50.990.000₫",
            "codeProduct": "mac02",
            "nameProduct": "MacBook Pro 14”",
            "price":  50990000,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "MacBook Pro 13”",
            "label": "MacBook Pro 13” - 23.690.000₫",
            "codeProduct": "mac03",
            "nameProduct": "MacBook Pro 13”",
            "price": 23690000,
            "unit": "PCS",
            "type": "Mac"
        },
        {
            "value": "iPad Pro",
            "label": "iPad Pro - 35.690.000₫",
            "codeProduct": "ipad01",
            "nameProduct": "iPad Pro",
            "price": 735690000,
            "unit": "PCS",
            "type": "Ipad"
        },
    ];
    $("#txtProduct").autocomplete({
        source: data,
        select: function (e, ui) {
            curItem = ui.item;
            $("#lblSelect").html("You have chosen <b>[" + ui.item.nameProduct + "]</b> - price: <b>" + formatNumber(ui.item.price) + "</b>");
        }
    });
});

function addProduct() {
    const qty = parseInt($("#inp_quantity").val());
    curItem.Quantity = qty;
    curItem.intomoney = qty * curItem.price;

    var i = 0;
    for (i; i < lst.length; i++) {
        if (lst[i].codeProduct == curItem.codeProduct) {
            break;
        }
    }
    if (i < lst.length) {
        curItem.Quantity = qty + lst[i].Quantity;
        curItem.intomoney = curItem.Quantity * curItem.price;
    } else {
        lst.push(curItem);
    }

    totalMoney();
   
}

function DeleteProduct(codeID) {
    var i = 0;
    for (i; i < lst.length; i++) {
        if (lst[i].codeProduct == codeID) {
            break;
        }
    }
    if (i < lst.length) {
        lst.splice(i, 1);
        totalMoney();
    }
    
}

function totalMoney() {
    total = 0;
    for (i = 0; i < lst.length; i++) {
        total +=lst[i].intomoney;
    }
    $("#totalMoney").html(formatNumber(total));
    $("#totalProduct").text(lst.length);
    $("#ulCart").html("");
    $("#cartTemplate").tmpl(lst).appendTo("#ulCart");
}

function formatNumber(n) {
    return "$" + n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}