class DashboardResponse {

constructor(data) {
        this.setGeneralData(data);
    }

     setGeneralData(data) {
        this.setRevenue(data);
        this.setMonthRevenue(data);
    }

     setRevenue(data) {
        this.contacts = data?.contacts || 0;
        this.totalRevenue = data?.totalRevenue || 0;
        this.approveOrder = data?.approveOrder || 0;
        this.cancelOrder = data?.cancelOrder || 0;
    }

     setMonthRevenue(data) {
        this.id = data?.id || "";
        this.month = data?.month || "";
        this.total = data?.total || 0;
        this.target = data?.target || 0;
        this.percent_kpi = data?.percent_kpi || 0;
        this.created_at = data?.created_at || 0;
    }

     getRevenue() {
        return {
            contacts: this.contacts,
            totalRevenue: this.totalRevenue,
            approveOrder: this.approveOrder,
            cancelOrder: this.cancelOrder
        }
    }

     getMonthRevenue() {
        return {
            month: this.month,
            total: this.total,
            target: this.target,
            percent_kpi: this.percent_kpi,
            created_at: this.created_at,
        }
    }
}

export default DashboardResponse;