export default {
    AUTH: {
        register: "/auth/register",
        login: "/auth/login",
        detail: "/auth/:id",
        token: "/auth/token"
    },
    CATEGORY: {
        getList: "/category",
        create: "/category",
        all: "/category/all",
        getDetail: "/category/detail/:id",
        update: "/category/detail/:id"
    },
    PRODUCT: {
        create: "/product",
        init: "/product/init",
        getList: "/product",
        getDetail: "/product/azp/detail/:slug",
        update: "/product/azp/detail/:slug"
    },
    PRODUCT_TYPE: {
        create: "/product-type",
        getList: "/product-type",
        all: "/product-type/all",
        getCount: "/product-type/count",
        getDetail: "/product-type/detail/:id",
        update: "/product-type/detail/:id"
    },
    ATTRIBUTE: {  
        getList: "/attribute",
        all: "/attribute/all",
        create: "/attribute",
        getDetail: "/attribute/detail/:id",
        update: "/attribute/detail/:id"
    },
    DISCOUNT: {  
        getList: "/discount",
        all: "/discount/all",
        create: "/discount",
        getDetail: "/discount/detail/:id",
        update: "/discount/detail/:id"
    },
    ORDER: {
        checkoutOrder: "/order",
        paymentOrder: "/order/payment/:id",
        getDetail: "/order/detail/:id"
    },
    GENERAL: {
        revenue: "/general/revenue",
        monthRevenue: "/general"
    },
    UPLOAD: {
        loadFile: "/upload"
    },
    DESTINATION: {
        getListProvince: "/",
        getListDistrict: "/p/:code",
        getListWard: "/d/:code"
    }
}