import { getThumbsUrl } from '../../Util/function'

class LayoutRequest {
    constructor(data) {
        this.setData(data)
    }

    setData(data) {
        this.id = data._id || ''
        this.phones = data.phones || []
        this.socialMedia = data.socialMedia || []
        this.emails = data?.emails || []
        this.stores = data?.stores || []
        this.name = data?.name || ''
        this.tabIcon = data.tabIcon || ''
        this.store_logo =
            ((data?.store_logo || []).length > 0 && {
                ...data?.store_logo[0],
                url: data?.store_logo[0]?.response?.url
                    ? data?.store_logo[0]?.response?.url
                    : data.store_logo[0]?.url,
            }) ||
            {}
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }
}

export default LayoutRequest
