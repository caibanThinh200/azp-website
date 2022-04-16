const TEXT_DEFINE = {
    PAGE: {
        MEMU: {
            title: "AZP Admin"
        },
        PRODUCT: {
            title: "Sản phẩm AZP",
            name: "Tên sản phẩm",
            status: "Trạng thái",
            quantity: "Số lượng",
            code: "Mã sản phẩm",
            discount_value: "Giá trị giảm",
            type: "Loại sản phẩm",
            category: "Danh mục",
            price: "Giá tiền",
            discount_price: "Giá tiền sau khi giảm",
            created_at: "Ngày tạo",
            updated_at: "Ngày cập nhật",
            action: "Thao tác",
            percent: "Phần trăm",
            is_percent: "Giảm giá theo phầm trăm",
            cash: "Tiền mặt",
            type_info: "Bảng thông số của loại sản phẩm",
            image: "Hình ảnh",
            short_description: "Giới thiệu sản phẩm",
            detail_description: "Mô tả sản phẩm",
            main_thumb: "Hình ảnh đại diện",
            sub_thumb: "Hình ảnh đi kèm"
        },
        PRODUCT_TYPE: {
            title: "Phân loại sản phẩm",
            code: "Mã phân loại",
            status: "Trạng thái",
            name: "Tên phân loại",
            type: "Số phân loại",
            created_at: "Ngày tạo",
            accessories: "Thông số loại sản phẩm",
            updated_at: "Ngày cập nhật",
            action: "Thao tác"
        },
        ACCESSORY: {
            title: "Thông số sản phẩm",
            name: "Tên thông số",
            unit: "Đơn vị",
            created_at: "Ngày tạo",
            updated_at: "Ngày cập nhật",
            code: "Mã thông số",
            action: "Thao tác",
            required: "Bắt buộc",
            status: "Trạng thái",
            action: "Thao tác"
        },
        BILL_REPORT: {
            code: "Mã đơn hàng",
            title: "Đơn hàng",
            name: "Tên khách hàng",
            email: "Email",
            phone: "Số điện thoại",
            note: "Ghi chú",
            total: "Tổng tiền",
            status: "Trạng thái",
            created_at: "Ngày tạo",
            updated_at: "Ngày cập nhật",
            action: "Thao tác"
        },
        DASHBOARD: {
            title: "Dashboard",
            total_revenue: "Tổng doanh thu",
            approve_order: "Đơn hàng đã duyệt",
            cancel_order: "Đơn hàng bị hủy",
            phone_order: "Số lượng SDT đặt hàng",
            monthLabel: "Tháng %s",
            totalLabel: "Doanh thu hiện tại",
            targetLabel: "Mục tiêu doanh thu",
            monthRevenueChart: "Bảnh doanh thu của năm %s"
        },
        CATEGORY: {
            title: "Danh mục sản phẩm",
            name: "Tên danh mục",
            productTypes: "Danh sách loại sản phẩm",
            products: "Danh sách sản phẩm",
            created_at: "Ngày tạo",
            updated_at: "Ngày cập nhật",
            code: "Mã danh mục",
            action: "Thao tác"
        },
        DISCOUNT_EVENT: {
            title: "Sự kiện giảm giá sản phẩm",
            name: "Tên sự kiện",
            code: "Mã sự kiện",
            status: "Trạng thái",
            discount_value: "Gía trị giảm",
            isPercent: "Giảm theo phần trăm",
            created_at: "Ngày tạo",
            updated_at: "Ngày cập nhật",
            action: "Thao tác"
        }
    },
    GENERAL: {
        unUpdate: "Chưa cập nhật",
        invalidData: "Chưa có %s",
        upload: "Click hoặc kéo file vào đây"
    },
    VALIDATE: {
        checkSpecialCharacter: "%s không được có ký tự đặc biệt",
        product: {
            invalidName: "Tên sản phẩm không được để trống",
            isPercent: "Nếu chọn giảm theo phần trăm thì giá trị giảm không được vượt quá 100",
            invalidType: "Vui lòng chọn phân loại sản phẩm",
            invalidCategory: "Vui lòng chọn danh mục",
            invalidShortDescription: "Giới thiệu sản phẩm không được để trống",
            invalidDetailDescription: "Mô tả sản phẩm không được để trống",
        }
    },
    ACTION: {
        filter: {
            submit: "Tìm kiếm",
            title: "Bộ lọc"
        },
        create: "Tạo mới",
        add: "Thêm mới",
        updated: "Cập nhật",
        active: "Kích hoạt"
    },
    METHOD: {
        CREATE: "create",
        UPDATE: "update",
    }
}

export default TEXT_DEFINE;