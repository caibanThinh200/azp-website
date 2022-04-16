import INFO_DEFINE from "../../Constant/infoDefine";
import UploadResponse from './uploadResponse';

export default class ProductResponse {
    constructor(data) {
        this.setData(data);
    }

    setData(data) {
        this.id = data?._id || "";
        this.name = data?.name || "";
        this.description = data?.description || "";
        this.code = data?.code || "";
        this.quantity = data?.quantity || 0;
        this.saled_count = data?.saled_count || 0;
        this.is_percent = data?.is_percent || false;
        this.product_type = data?.product_type || "";
        this.discount_value = data?.discount_value || 0;
        this.discount_price = data?.discount_price || 0;
        this.shortDescription = data?.shortDescription || "";
        this.detailDescription = data?.detailDescription || "";
        this.price = data?.price || 0;
        this.product_type = data?.product_type || "";
        this.main_thumb = this.getFileData(data?.mainThumbs);
        this.sub_thumb = this.getFileData(data?.subThumbs);
        this.relatedProduct = data?.relatedProduct || [];
        // this.mainThumb = data?.mainThumbs || [];
        // this.subThumb = data?.subThumbs || [];
        // this.main_thumb = data?.mainThumbs || [];
        // this.sub_thumb = data?.subThumbs || [];
        this.slug = data?.slug || "";
        this.status = data?.status || 1;
        this.attribute = data?.attribute || {};
        this.category = data?.category || [];
        this.created_at = data?.created_at || null;
        this.updated_at = data?.updated_at || null;
    }

    getFileData(thumbs) {
        const newFiles = (thumbs || []).length > 0 && (thumbs || []).map(item => {
            const newFile = new File([""], item?.name, { type: "image" });
            // return Object.assign(newFile, {
            //     url: this.getThumbsUrl(item?.name)
            // });
            return {...item, url: item?.url || ""}
        });
        return newFiles || [];
    }

    getThumbsUrl(url) {
        return `${process.env.REACT_APP_FURNITURE_HOST}/${INFO_DEFINE.UPLOAD.key}/${url}` || "";
    }
}

export const PRODUCT_CONSTANT = {
    labelCols: ["name", "price", "type", "status", "created_at", "updated_at"],
    STATUS_DEFINE: [
        {
            title: "Chưa kích hoạt",
            value: 0,
            color: "#808080"
        },
        {
            title: "Khởi tạo",
            value: 1,
            color: "#108ee9"
        },
        {
            title: "Đã duyệt",
            value: 2,
            color: "#87d068"
        },
        {
            title: "Đã hủy",
            value: 3,
            color: "#FF0000"
        }
    ],
    PRODUCT_TYPE_DEFINE: [
        {
            title: "Ghế",
            value: 0
        },
        {
            title: "Bàn",
            value: 1
        },
        {
            title: "Tủ",
            value: 2
        },
        {
            title: "Kệ",
            value: 3
        }
    ]
}