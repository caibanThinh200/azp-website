const INFO_DEFINE = {
    pageOptions: [ 
        {
            value: 5, children: 5
        },
        {
            value: 10, children: 10
        },
        {
            value: 15, children: 15
        },
    ],
    PAGE_ROUTE: {
        PRODUCT: {
            list: "/product",
            action: "/product/action",
        }
    },
    DEFAULT_THUMB: {
        preview: "/define/gray_default_thumb.png"
    },
    KEY: {
        userToken: "azp_utk",
        cart: "azp_cart"
    },
    VAT_VALUE: 10
}

export default INFO_DEFINE;