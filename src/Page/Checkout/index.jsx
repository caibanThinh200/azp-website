import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Result,
  Select,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { Fragment, useEffect, useState } from "react";
import Icon from "../../Component/Icon";
import Wrapper from "../../Component/Wrapper";
import INFO_DEFINE from "../../Constant/infoDefine";
import { customOptionSelect, onLoadErrorImage } from "../../Util/function";
import emailjs from "@emailjs/browser";
import PaymentPopup from "./payment";
import { bindActionCreators } from "redux";
import OrderThunk from "../../thunk/orderThunk";
import { connect, useDispatch, useSelector } from "react-redux";
import { useOutletContext } from "react-router-dom";
import currentConfig from "../../Constant/env";
import { getListProvinceService } from "../../Service/destinationService";
import DestinationThunk from "../../thunk/destinationThunk";
import { find, get } from "lodash";
import shoppingCartAction from "../../action/shoppingCartAction";
import LIST_CTY_DISTRICT from "../../Constant/City.json";

const Checkout = (props) => {
  const [cartList, setCartList] = useState(
      JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || []
    ),
    [isPopup, setIsPopup] = useState(false),
    [order, setOrder] = useState({
      isFetching: false,
      item: {},
    }),
    [destination, setDestination] = useState({
      isFetching: {
        province: false,
        district: false,
        ward: false,
      },
      result: {
        province: [],
        district: [],
        ward: [],
      },
    }),
    [form] = Form.useForm(),
    dispatch = useDispatch(),
    shoppingCartState = useSelector((state) => state.shoppingCartReducer),
    routeProps = useOutletContext();

  useEffect(() => {
    if (Object.keys(props.orders?.item || {}).length > 0) {
      setOrder({
        isFetching: props.orders?.isOrderFetching,
        item: props.orders?.item,
      });
      setIsPopup(props.orders?.item?.status === 1);
    }
  }, [props.orders]);

  useEffect(() => {
    // props.getListProvince();
  }, []);

  useEffect(() => {
    if ((shoppingCartState.result || []).length > 0) {
      setCartList(shoppingCartState.result);
    }
  }, [shoppingCartState]);

  useEffect(() => {
    setDestination({
      isFetching: {
        province: props.destinations?.isFetching?.province,
        district: props.destinations?.isFetching?.district,
        ward: props.destinations?.isFetching?.ward,
      },
      result: {
        province: LIST_CTY_DISTRICT,
        // district: props.destinations?.result?.district,
        // ward: props.destinations?.result?.ward,
      },
    });
  }, [props.destinations, LIST_CTY_DISTRICT]);

  const removeItem = (item) => {
    // const newCart = cartList.filter(cart => cart?.id !== item?.id);
    // setCartList(newCart);
    // localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(newCart));
    // notification.warning({
    //     description: "Đã xóa sản phẩm khỏi giỏ hàng",
    // });
    dispatch(shoppingCartAction.removeAction(item));
  };

  const increament = (item) => {
    // const updateCart = cartList.map(cart => {
    //     if (cart?.id === item?.id) {
    //         cart = { ...cart, quantity: cart?.quantity + 1 }
    //     };
    //     return cart;
    // });
    // setCartList([...updateCart]);
    // localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(updateCart));
    dispatch(
      shoppingCartAction.updateQuantityAction({ ...item, type: "increment" })
    );
  };

  const decreament = (item) => {
    // const updateCart = cartList.map(cart => {
    //     if (cart?.id === item?.id) {
    //         cart = { ...cart, quantity: cart?.quantity - 1 }
    //     };
    //     return cart;
    // });
    // setCartList([...updateCart]);
    // localStorage.setItem(INFO_DEFINE.KEY.cart, JSON.stringify(updateCart));
    dispatch(
      shoppingCartAction.updateQuantityAction({ ...item, type: "decrement" })
    );
  };

  const getDestination = (code, level) => {
    if (level === 1) {
      props.getListDistrict(code);
    } else {
      props.getListWard(code);
    }
  };

  const totalPrice = cartList.reduce((prevPrice, currentItem) => {
    return (
      prevPrice +
      (currentItem?.discount_price || currentItem?.price || 0) *
        currentItem?.quantity
    );
  }, 0);

  const totalOrder = totalPrice + (totalPrice * INFO_DEFINE.VAT_VALUE) / 100;

  const handleCheckout = (e) => {
    let contactInfo = e;
    if (contactInfo.province) {
      contactInfo = {
        ...contactInfo,
        province: get(
          find(destination.result.province, { code: contactInfo.province }),
          "name"
        ),
      };
    }
    if (contactInfo.district) {
      contactInfo = {
        ...contactInfo,
        district: get(
          find(destination.result.district, { code: contactInfo.district }),
          "name"
        ),
      };
    }
    if (contactInfo.ward) {
      contactInfo = {
        ...contactInfo,
        ward: get(
          find(destination.result.ward, { code: contactInfo.ward }),
          "name"
        ),
      };
    }
    let paymentInfo = {
      contact: contactInfo,
      orders: cartList,
      paymentMethod: 1,
      cost: {
        totalCost: totalPrice,
        totalOrder: totalOrder,
        VATCost: INFO_DEFINE.VAT_VALUE,
      },
    };
    // console.log(paymentInfo);
    props.checkoutOrder(paymentInfo);
  };

  const handlePayment = (status) => {
    let requestParams = { ...order.item, status };
    props.payment(requestParams?.id, requestParams, routeProps.navigate);
  };
  console.log(destination)
  const handleFieldChange = (fields) => {
    if (fields[0].name[0] === "province") {
      form.resetFields(["district", "ward"])
      setDestination({
        ...destination,
        result: {
          ...destination.result,
          district: get(
            find(LIST_CTY_DISTRICT, { code: fields[0]?.value }),
            "districts"
          ),
        },
      });
    }
    if (fields[0].name[0] === "district") {
      setDestination({
        ...destination,
        result: {
          ...destination.result,
          ward: get(
            find(destination.result.district, { code: fields[0]?.value }),
            "wards"
          ),
        },
      });
    }
  };

  return (
    <Wrapper className="ms-3 ms-lg-0">
      {cartList.length > 0 ? (
        <Wrapper className="row">
          <Wrapper className={"col-12 col-xl-8 pe-5 mt-5 mt-lg-0"}>
            <Wrapper className={"mb-3"}>
              <span className="h4 fw-bold mb-1 border-bottom">GIỎ HÀNG</span>
            </Wrapper>
            <Wrapper
              className={"furniture_checkout__cart__divider--title mb-5"}
            />
            <Wrapper className="">
              {cartList.length > 0
                ? cartList.map((item) => (
                    <Fragment>
                      <Wrapper
                        className={"row furniture_checkout__cart__item"}
                        bordered
                      >
                        <Wrapper
                          className={"col-12 col-md-4 p-0 h-100 img-wrapper"}
                        >
                          <img
                            src={item?.main_thumb[0]?.url}
                            onError={onLoadErrorImage}
                            className="w-100 d-inline-block h-100 img-fluid center-image"
                          />
                        </Wrapper>
                        <Wrapper className={"col p-4 position-relative"}>
                          <Tooltip title={item?.name}>
                            <p className="h4 fw-bolder furniture_checkout__cart__item__title">
                              {item?.name}
                            </p>
                          </Tooltip>
                          <Divider className="mt-2 mb-4" />
                          <Wrapper className="furniture_checkout__cart__item__quantity-input d-inline float-end">
                            <button
                              className="furniture_checkout__cart__item__quantity-input__modify"
                              onClick={() => decreament(item)}
                              disabled={item?.quantity === 1}
                            >
                              &mdash;
                            </button>
                            <input
                              className="furniture_checkout__cart__item__quantity-input__screen"
                              type="text"
                              readOnly
                              value={item?.quantity}
                              // value={quantity}
                            />
                            <button
                              className="furniture_checkout__cart__item__quantity-input__modify"
                              onClick={() => increament(item)}
                            >
                              &#xff0b;
                            </button>
                          </Wrapper>
                          {/* <p style={{
                                    transform: "translate(-20%, -60%)"
                                }}
                                    className="position-absolute bottom-0 end-0 h4 fw-bolder furniture_checkout__cart__item__price">
                                    {item?.discount_price || item?.price} VND
                                </p> */}
                          <Wrapper className={"mb-3"}>
                            <p className="h5 mb-4">
                              Mã sản phẩm:{" "}
                              <span className="fw-bold">{item.code}</span>
                            </p>
                            <span className="h5 fw-bolder furniture_checkout__cart__item__price">
                              Giá: {item?.discount_price || item?.price} VND
                            </span>
                          </Wrapper>
                          <Wrapper className={"mt-1"}>
                            <Tag
                              onClick={() => removeItem(item)}
                              color={"#DC143C"}
                              className="p-2 me-0 cursor-pointer"
                            >
                              <span className="h6">
                                <Icon type="delete" className="fs-18" /> Xóa sản
                                phẩm
                              </span>
                            </Tag>
                          </Wrapper>
                        </Wrapper>
                      </Wrapper>
                      <Wrapper
                        className={"furniture_checkout__cart__divider m-5"}
                      />
                    </Fragment>
                  ))
                : ""}
            </Wrapper>
          </Wrapper>
          <Wrapper className={"col-12 col-xl-4 pe-3"}>
            <Wrapper className={"mb-3"}>
              <span className="h4 fw-bold mb-1 border-bottom">ĐƠN HÀNG</span>
            </Wrapper>
            <Wrapper
              className={"furniture_checkout__cart__divider--title mb-5"}
            />
            <Wrapper className={"furniture_checkout__order p-4"}>
              <Wrapper className={"row"}>
                <p className="h6 fw-bold col-4">Sản phẩm</p>
                <p className="h6 fw-bold col-4 text-center">Số lượng</p>
                <p className="h6 fw-bold col-4 text-end">Giá tiền</p>
              </Wrapper>
              <Divider />
              {cartList.map((item) => (
                <Wrapper className={"row mb-3"}>
                  <span className="h6 col-4 text-wrap">{item.name}</span>
                  <span className="h6 col-4 text-wrap text-center">
                    {item?.quantity}
                  </span>
                  <span className="h6 col-4 text-wrap text-end">
                    {item.discount_price || item.price}
                  </span>
                </Wrapper>
              ))}
              <Divider />
              <Wrapper className={"row"}>
                <span className="h5 col-6">Giá đơn hàng:</span>
                <span className="h5 col-6">{totalPrice} VND</span>
              </Wrapper>
              <Wrapper className={"row"}>
                <span className="h5 col-6">VAT:</span>
                <span className="h5 col-6">{INFO_DEFINE.VAT_VALUE}%</span>
              </Wrapper>
              <Wrapper className={"row"}>
                <span className="h4 fw-bold col-6">Tổng tiền:</span>
                <span className="h4 fw-bold col-6">{totalOrder} VND</span>
              </Wrapper>
            </Wrapper>
          </Wrapper>
          <Wrapper
            className={"furniture_checkout__cart__divider--title mb-4 mt-5"}
          />
          <Wrapper className={"col-12"}>
            <Wrapper className={"mb-3"}>
              <span className="h4 fw-bold mb-1 border-bottom">
                THÔNG TIN LIÊN HỆ
              </span>
            </Wrapper>
            <Wrapper
              className="p-4 pb-1 d-flex justify-content-center"
              bordered
            >
              <Form
                form={form}
                onFinish={handleCheckout}
                layout="vertical"
                labelAlign="left"
                // wrapperCol={{ span: 24 }}
                onFieldsChange={handleFieldChange}
                // size="large"
                className="row w-100"
              >
                <Wrapper className={"col-12 col-sm-6 ps-2 text-center"}>
                  <Form.Item
                    rules={[
                      { required: true, message: "Vui lòng nhập họ tên" },
                    ]}
                    name="name"
                    label="Họ tên"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: "Vui lòng nhập SDT" },
                      {
                        pattern:
                          /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
                        message: "SDT không đúng định dạng",
                      },
                      //   {
                      //     pattern: /^[\d]{0,50}$/,
                      //     message: "SDT không đúng định dạng",
                      //   },
                      //   { type: "phone", message: "SDT không đúng định dạng" },
                    ]}
                    name="phone"
                    label="SDT"
                  >
                    <Input />
                  </Form.Item>
                </Wrapper>
                <Wrapper className={"col-12 col-sm-6 ps-2 text-center"}>
                  <Form.Item
                    rules={[
                      { required: true, message: "Vui lòng email" },
                      { type: "email", message: "Email chưa đúng định dạng" },
                    ]}
                    name="email"
                    label="Email"
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={"address"}
                    rules={[
                      { required: true, message: "Vui lòng nhập địa chỉ" },
                    ]}
                    label="Địa chỉ (Số nhà và tên đường)"
                  >
                    <Input />
                  </Form.Item>
                </Wrapper>
                <Wrapper className="col-12 row ps-4">
                  <p>Chọn địa điểm</p>
                  <Form.Item
                    rules={[
                      { required: true, message: "Vui lòng chọn thành phố" },
                    ]}
                    name="province"
                    className="col-12 col-sm-4"
                  >
                    <Select
                      loading={destination.isFetching.province}
                      // onSelect={(value) => getDestination(value, 1)}
                      options={customOptionSelect(destination.result.province, [
                        "name",
                        "code",
                      ])}
                      placeholder="Chọn tỉnh, thành phố"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Vui lòng chọn quận" }]}
                    name="district"
                    className="col-12 col-sm-4"
                  >
                    <Select
                      loading={destination.isFetching.district}
                      // onSelect={(value) => getDestination(value, 2)}
                      options={customOptionSelect(destination.result.district, [
                        "name",
                        "code",
                      ])}
                      placeholder="Chọn quận, huyện"
                    />
                  </Form.Item>
                  <Form.Item
                    rules={[
                      { required: true, message: "Vui lòng chọn phường, xã" },
                    ]}
                    name={"ward"}
                    getValueFromEvent={(value) => value}
                    className="col-12 col-sm-4"
                  >
                    <Select
                      loading={destination.isFetching.ward}
                      onSelect={() => {}}
                      options={customOptionSelect(destination.result.ward, [
                        "name",
                        "code",
                      ])}
                      placeholder="Chọn phường, xã"
                    />
                  </Form.Item>
                </Wrapper>
                <Wrapper className={"col-12"}>
                  <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
                </Wrapper>
                <Form.Item
                  wrapperCol={{ offset: 6, span: 16 }}
                  className="mt-2"
                >
                  <Button
                    htmlType="submit"
                    size="large"
                    className="w-50 h-75"
                    type="primary"
                  >
                    <span className="h4 d-inline">Thanh toán</span>
                  </Button>
                </Form.Item>
              </Form>
            </Wrapper>
          </Wrapper>
          <PaymentPopup
            isPopup={isPopup}
            className="w-75 h-100"
            closable={false}
            confirmLoading={order.isFetching}
            handlePayment={handlePayment}
            orderResult={order.item}
            loading={order.isFetching}
            cancelButtonProps={{ hidden: true }}
            title="Xác nhận đơn hàng"
          />
        </Wrapper>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Hiện tại chưa có sản phẩm trong giỏ hàng"
          extra={
            <Button onClick={() => routeProps.navigate("/")} type="primary">
              Tiếp tục mua sắm
            </Button>
          }
        />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orderReducer,
  destinations: state.destinationReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      checkoutOrder: (data) => OrderThunk.checkout(data),
      payment: (id, data, navigate) => OrderThunk.payment(id, data, navigate),
      getListProvince: () => DestinationThunk.getListProvince(),
      getListDistrict: (code) => DestinationThunk.getListDistrict(code),
      getListWard: (code) => DestinationThunk.getListWard(code),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
