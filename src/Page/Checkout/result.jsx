import { Button, Result } from "antd";
import { useEffect, useState } from "react";
import { bindActionCreators } from "redux";
import Wrapper from "../../Component/Wrapper"
import OrderThunk from "../../thunk/orderThunk";
import { connect } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import INFO_DEFINE from "../../Constant/infoDefine";

const PaymentResult = props => {
    const [order, setOrder] = useState({
        isFetching: false,
        item: {},
        result: {
            title: "",
            message: "",
            status: "info"
        }
    }),
        params = useParams(),
        routeProps = useOutletContext();

    useEffect(() => {
        props.getDetail(params?.id, routeProps.navigate);
    }, [params?.id]);

    useEffect(() => {
        let result = {};
        if (Object.keys(props.orders?.item).length > 0 && props.orders?.item?.status !== 2) {
            result = { 
                title: "Thanh toán thất bại",
                message: "Đã có lỗi xảy ra, thanh toán đơn hàng thất bại",
                status: "error"
            }
        } else {
            localStorage.removeItem(INFO_DEFINE.KEY.cart);
            result = {
                title: "Thanh toán thành công",
                message: `Mã đơn hàng ${props.orders?.item?.code} đã được thanh toán`,
                status: "success"
            }
        }

        setOrder({
            isFetching: props.orders?.isOrderFetching,
            item: props.orders?.item,
            result
        })
    }, [props.orders])

    return <Wrapper>
        <Result
            status={order?.result.status}
            title={order.result.title}
            subTitle={order.result.message}
            extra={[
                <Button onClick={() => routeProps.navigate("/")} type="primary">Về trang chủ</Button>,
            ]}
        />,
    </Wrapper>
}

const mapStateToProps = state => ({
    orders: state.orderReducer,
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getDetail: (id, navigate) => OrderThunk.getDetail(id, navigate)
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(PaymentResult);