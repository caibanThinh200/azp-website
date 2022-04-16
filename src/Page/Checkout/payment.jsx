import { Divider, Modal, Space, Tag } from "antd";
import clsx from "clsx";
import { useEffect, useState } from "react";
import Wrapper from "../../Component/Wrapper"
import { Link } from "react-router-dom";
import currentConfig from "../../Constant/env";
import { find, get } from "lodash";
import { ORDER_CONSTANT } from "../../Mapping/Response/orderResponse";

const PaymentPopup = props => {
    const [visible, setVisible] = useState(false),
        [orderResult, serOrderResult] = useState({
            isFetching: false,
            item: {}
        });

    useEffect(() => {
        setVisible(props?.isPopup);
    }, [props?.isPopup])

    useEffect(() => {
        serOrderResult({
            isFetching: props.loading,
            item: props.orderResult
        })
    }, [props.orderResult, props.loading]);

    const onSubmit = (status) => {
        return props.handlePayment(status)
    }

    const contact = orderResult.item?.contact;
    const orders = orderResult.item?.orders;
    const cost = orderResult.item?.cost;

    return <Modal
        {...props}
        okText={"Xác nhận thanh toán"}
        visible={visible}
        className={clsx(props?.className)}
        onOk={() => onSubmit(2)}
    >
        <Wrapper className="p-0 p-md-5">
            <Wrapper className="mb-5 row">
                <Wrapper className="col-12 col-sm-6">
                    <span className="h3 me-3 d-block d-lg-inline">Mã đơn hàng:</span>
                    <span className="h3 fw-bold">{orderResult?.item?.code}</span>
                </Wrapper>
                <Wrapper className="col-12 col-sm-6 mt-5 mt-sm-0">
                    <span className="h3 me-3 d-block d-lg-inline">Trạng thái:</span>
                    <Tag className="p-2" color={get(find(ORDER_CONSTANT.status, { value: orderResult.item?.status }), "color")}>
                        <span className="h5">
                            {get(find(ORDER_CONSTANT.status, { value: orderResult.item?.status }), "title")}
                        </span>
                    </Tag>
                </Wrapper>
            </Wrapper>
            <Divider />
            <Wrapper className="row">
                <Wrapper className="col-12 col-lg-6">
                    <p className="h5 mb-4">Sản phẩm</p>
                    <Wrapper>
                        <Wrapper className="row mb-3">
                            <span className="col-6">Tên sản phẩm</span>
                            <span className="col-3">Số lượng</span>
                            <span className="col-3">Giá tiền</span>
                        </Wrapper>
                        {
                            (orders || []).length > 0 && (orders || []).map(order =>
                                <Wrapper className="row">
                                    <Link className="col-6" to={`/san-pham/${order?.slug}`}>{order?.name}</Link>
                                    <span className="col-3">x {order?.quantity}</span>
                                    <span className="col-3 fw-bold">{order?.discount_price || order?.price}</span>
                                </Wrapper>
                            )
                        }
                    </Wrapper>
                </Wrapper>
                <Wrapper className="col-12 col-lg-6 mt-5 mt-lg-0 furniture_checkout__payment__contact">
                    <p className="h5 mb-4">Thông tin liên hệ</p>
                    <Wrapper bordered shadow className="p-3">
                        <Wrapper className="row">
                            <span className="h6 col-6">Họ tên:</span>
                            <span className="col-6 fw-bold">{contact?.name}</span>
                        </Wrapper>
                        <Wrapper className="row mt-3 mt-sm-0">
                            <span className="h6 col-6">Email:</span>
                            <span className="col-6 fw-bold">{contact?.email}</span>
                        </Wrapper>
                        <Wrapper className="row mt-3 mt-sm-0">
                            <span className="h6 col-6">SDT:</span>
                            <span className="col-6 fw-bold">{contact?.phone}</span>
                        </Wrapper>
                        <Wrapper className="row mt-3 mt-sm-0">
                            <span className="h6 col-6">Ghi chú:</span>
                            <span className="col-6 fw-bold">{contact?.note}</span>
                        </Wrapper>
                        <Wrapper className="row mt-3 mt-sm-0">
                            <span className="h6 col-6">Địa chỉ:</span>
                            <span className="col-6 fw-bold">{contact?.address}, {contact?.ward}, {contact?.district}, {contact?.province}</span>
                        </Wrapper>
                    </Wrapper>
                </Wrapper>
                <Divider className="mt-5" />
                <Wrapper className="col-12">
                    <Wrapper className="row furniture_checkout__payment__revenue mb-3">
                        <span className="h5 col-6">Tổng đơn hàng:</span>
                        <span className="h5 col fw-bold">{cost?.totalCost} VND</span>
                    </Wrapper>
                    <Wrapper className="row furniture_checkout__payment__revenue mb-3">
                        <span className="h5 col-6">VAT:</span>
                        <span className="h5 col fw-bold">{cost?.VATCost} %</span>
                    </Wrapper>
                    <Wrapper className="row furniture_checkout__payment__revenue mb-3">
                        <span className="h5 col-6">Phí ship</span>
                        <span className="h5 col fw-bold">{cost?.ship} VND</span>
                    </Wrapper>
                    <Wrapper className="row furniture_checkout__payment__revenue">
                        <span className="h5 col-6">Thành tiền</span>
                        <span className="h5 col fw-bold">{cost?.totalOrder} VND</span>
                    </Wrapper>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    </Modal>
}

export default PaymentPopup;