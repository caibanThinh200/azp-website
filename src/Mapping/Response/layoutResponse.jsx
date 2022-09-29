import { getThumbsUrl } from '../../Util/function'

class LayoutResponse {
    constructor(data) {
        this.setData(data)
    }

    setData(data) {
        this.id = data._id || ''
        this.name = data?.name || ''
        this.introduce = data?.introduce || ''
        this.phones = data.phones || []
        this.emails = data?.emails || []
        this.socialMedia = data.socialMedia || []
        this.stores = data?.stores || []
        this.tabIcon = data.tabIcon || ''
        this.store_logo = getThumbsUrl(data?.store_logo)
        this.created_at = data.created_at || null
        this.updated_at = data.updated_at || null
    }
}

export const LAYOUT_CONSTANT = {
    social: [
        {
            label: 'Facebook',
            value: 'Facebook',
        },
        {
            label: 'Instagram',
            value: 'Instagram',
        },
        {
            label: 'Twitter',
            value: 'Twitter',
        },
    ],
}

export default LayoutResponse
