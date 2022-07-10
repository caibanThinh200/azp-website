import { Button, Divider, message, Result, Spin, Tabs, Tooltip } from "antd";
import { cloneElement, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useOutletContext, useParams } from "react-router-dom";
import Slider from "react-slick";
import { Fragment } from "react/cjs/react.production.min";
import { bindActionCreators, combineReducers } from "redux";
import Wrapper from "../../Component/Wrapper";
import productThunk from "../../thunk/productThunk";
import { getSlug, onLoadErrorImage } from "../../Util/function";
import AttributeThunk from "../../thunk/attributeThunk";
import { find, get, set } from "lodash";
import parse from "html-react-parser";
import Icon from "../../Component/Icon";
import INFO_DEFINE from "../../Constant/infoDefine";
import shoppingCartAction from "../../action/shoppingCartAction";
import Cookies from "js-cookie";

const ProductDetail = (props) => {
  const params = useParams();
  const dispatch = useDispatch();
  const shoppingCartState = useSelector((state) => state.shoppingCartReducer);
  const [quantity, setQuantity] = useState(1);
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [recentProduct, setRecentProduct] = useState([]);
  const [product, setProduct] = useState({
    item: {},
    isFetching: false,
  });
  const [attribute, setAttribute] = useState({
    isFetching: false,
    all: [],
  });
  const [recent, setRecent] = useState([]);
  const routeProps = useOutletContext();
  const settings = {
    customPaging: function (i) {
      const thumbDots = [
        ...(product.item?.main_thumb || []),
        ...(product.item?.sub_thumb || []),
      ];
      return (
        thumbDots[i]?.url && (
          <a>
            <img
              src={thumbDots[i]?.url || ""}
              onError={onLoadErrorImage}
              className="w-100 furniture_detail__thumb--dot"
            />
          </a>
        )
      );
    },
    autoplay: true,
    infinite: true,
    dots: true,
    dotsClass: "slick-dots slick-thumb position-static",
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => {
      return (
        <Slider
          style={{ top: "400px" }}
          className="position-static border"
          {...dotSettings}
        >
          {dots.length > 0 &&
            dots.map((dot, key) => {
              return cloneElement(dot, {
                key: key,
                ref: (ref) =>
                  ref && ref.style.setProperty("height", "150px", "important"),
                className: "h-100 cursor-pointer pe-2 border p-3",
              });
            })}
        </Slider>
      );
    },
  };

  const dotSettings = {
    speed: 500,
    slidesToShow: 4,
    infinite: false,
    slidesToScroll: 1,
    dotsClass: "slick-thumb",
    autoplay: true,
  };

  const relatedSettings = {
    // infinite: true,
    speed: 500,
    slidesToShow: relatedProduct.length > 5 ? 5 : relatedProduct.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  const recentSettings = {
    // infinite: true,
    speed: 500,
    slidesToShow: recentProduct.length > 5 ? 5 : recentProduct.length,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          infinite: true,
          slidesToShow: 1,
          slidesToScroll: 1,
          autoplay: true,
          autoplaySpeed: 3000,
        },
      },
    ],
  };

  useEffect(() => {
    props.getListAllAttribute();
  }, []);

  useEffect(() => {
    setProduct({
      isFetching: props.products.isProductFetching,
      item: props.products.item,
    });
    if ((props.products?.item?.relatedProduct || []).length) {
      setRelatedProduct(props.products?.item?.relatedProduct);
    }
    if ((props.products?.item?.recentProducts || []).length) {
      setRecentProduct(props.products?.item?.recentProducts);
    }
  }, [props.products]);

  useEffect(() => {
    if (props.products.item?.id) {
      const recents = Cookies.get(INFO_DEFINE.KEY.recent) || "";
      if (!recents) {
        setRecent([props.products.item?.id]);
        Cookies.set(INFO_DEFINE.KEY.recent, props.products.item?.id || "", {
          expires: 30,
        });
      } else {
        let generateIds = Cookies.get(INFO_DEFINE.KEY.recent).split(",");
        if (!generateIds.includes(props.products.item?.id)) {
          generateIds.unshift(props.products.item?.id);
          if (generateIds.length > 10) {
            generateIds.pop();
          }
          const newIds = generateIds.join(",");
          Cookies.set(INFO_DEFINE.KEY.recent, newIds, {
            expires: 30,
          });
        }
        const generateProduct = generateIds.map((item) => {
          // props.getDetail(item)
        });
        setRecent(generateIds);
      }
    }
  }, [props.products.item?.id]);

  useEffect(() => {
    if (params.slug) {
      let slug = params.slug;
      props.getDetail(slug);
    }
  }, [params]);

  useEffect(() => {
    setAttribute({
      isFetching: props.attributes.isAccessoryFetching,
      all: props.attributes.all,
    });
  }, [props.attributes]);

  const handleAddToCart = () => {
    let currentCart =
      JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || [];
    const checkExist = find(currentCart, { id: product.item?.id });
    if (currentCart.length > 0 && Object.keys(checkExist || {}).length > 0) {
      message.error("Sản phẩm đã có trong giỏ hàng");
      return;
    }
    dispatch(shoppingCartAction.addAction({ ...product.item, quantity }));
  };

  const handleCheckout = () => {
    let currentCart =
      JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || [];
    const checkExist = find(currentCart, { id: product.item?.id });
    if (Object.keys(checkExist || {}).length < 1) {
      dispatch(shoppingCartAction.addAction({ ...product.item, quantity }));
    }
    routeProps.navigate("/checkout");
  };

  return (
    <Wrapper className={"mt-0 mt-lg-3"}>
      {!product.isFetching && Object.keys(product.item).length > 0 ? (
        <Wrapper className="row">
          <Wrapper className={"col-12 col-md-6"}>
            <Wrapper>
              {(product.item?.main_thumb || []).length > 0 && (
                <Slider {...settings} className="w-100">
                  {[
                    ...product.item?.main_thumb,
                    ...product.item?.sub_thumb,
                  ].map((thumb, index) => {
                    // console.log(thumb.uid)
                    return (
                      <div key={index} className="border">
                        <img
                          src={thumb?.url}
                          onError={onLoadErrorImage}
                          className="w-100 h-100 furniture_detail__thumb--sub"
                        />
                      </div>
                    );
                  })}
                </Slider>
              )}
            </Wrapper>
          </Wrapper>
          <Wrapper className={"col-12 col-md-6"}>
            {
              <Fragment>
                {/* <Wrapper className={"furniture_detail__info__divider mt-0"}></Wrapper> */}
                <span className="h1 fw-bolder">{product.item?.name}</span>
                <Wrapper className={"row mt-4"}>
                  <span className="h5 col">
                    Mã sản phẩm:{" "}
                    <span className="fw-bold">{product.item?.code}</span>
                  </span>
                  {/* <span className="h5 col-6 float-end">Tình trạng: <span className="fw-bold">Còn hàng</span></span> */}
                </Wrapper>
                {/* <Wrapper className={"furniture_detail__info__divider mt-3"}></Wrapper> */}
                <span className="h6">{product.item?.shortDescription}</span>
                {/* <Wrapper className={"furniture_detail__info__divider mt-3"}></Wrapper> */}
                <Wrapper>
                  {product.item?.discountPrice > 0 ? (
                    <Fragment>
                      <p className="h5 text-decoration-line-through">
                        {product.item?.price} VND
                      </p>
                      <p className="h3 fw-bold furniture_detail__info__price--discount mt-3">
                        {product.item?.discountPrice} VND
                      </p>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <p className="h3 fw-bold furniture_detail__info__price--discount mt-3">
                        {product.item?.price} VND
                      </p>
                    </Fragment>
                  )}
                  <Wrapper className={"mt-5"}>
                    <span className="h4">Số lượng:</span>
                    <Wrapper className="furniture_detail__info__quantity-input d-inline ms-3">
                      <button
                        className="furniture_detail__quantity-input__modify"
                        onClick={() => setQuantity(quantity - 1)}
                        disabled={quantity === 1}
                      >
                        &mdash;
                      </button>
                      <input
                        className="furniture_detail__quantity-input__screen"
                        type="text"
                        readOnly
                        value={quantity}
                      />
                      <button
                        className="furniture_detail__quantity-input__modify"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        &#xff0b;
                      </button>
                    </Wrapper>
                    <Wrapper className={"mt-5 mb-5 row"}>
                      <Wrapper className={"col-12 col-xl-6 mb-2"}>
                        <button
                          onClick={handleAddToCart}
                          className="furniture_detail__info__checkout center-content pt-2 furniture_detail__info__checkout--add-to-cart"
                        >
                          <Icon type="cart" className="fs-25 mb-2" />
                          <span className="h4">Thêm vào giỏ</span>
                        </button>
                      </Wrapper>
                      <Wrapper className={"col-12 col-xl-6"}>
                        <button
                          onClick={handleCheckout}
                          className="furniture_detail__info__checkout center-content pt-2 furniture_detail__info__checkout--payment"
                        >
                          <Icon type="credit-card" className="fs-25 mb-2" />
                          <span className="h4">Thanh toán</span>
                        </button>
                      </Wrapper>
                    </Wrapper>
                  </Wrapper>
                </Wrapper>
              </Fragment>
            }
          </Wrapper>
          <Wrapper className="col-12 mt-1">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane
                className="text-center"
                tab={<span className="h5">Thông số kỹ thuật</span>}
                key="1"
              >
                <Wrapper className={""}>
                  {Object.keys(product.item.attribute || {}).length > 0 &&
                    Object.keys(product.item.attribute || {}).map((item) => (
                      <Wrapper
                        key={item}
                        className="d-flex furniture_detail__attribute"
                      >
                        <h6>
                          {get(
                            find(attribute.all, { id: item }),
                            "name",
                            "Chưa có thông số"
                          )}
                        </h6>
                        <p>
                          {Array.isArray(product.item.attribute[item])
                            ? product.item.attribute[item]?.join(", ")
                            : product.item.attribute[item]}
                        </p>
                      </Wrapper>
                    ))}
                </Wrapper>
              </Tabs.TabPane>
              <Tabs.TabPane
                className="border p-5"
                tab={<span className="h5">Mô tả chi tiết</span>}
                key="2"
              >
                {product.item?.detailDescription && (
                  <Wrapper className="">
                    {parse(product.item?.detailDescription)}
                  </Wrapper>
                )}
              </Tabs.TabPane>
            </Tabs>
          </Wrapper>
          <Wrapper className={"mt-100 text-center"}>
            <span className="h1 border-bottom">Sản phẩm liên quan</span>
            {(relatedProduct || []).length > 0 && (
              <Wrapper
                className={
                  "mt-4 pt-3 position-relative furniture_detail__related"
                }
              >
                <Slider {...relatedSettings} className="ps-0">
                  {(relatedProduct || []).map((item) => (
                    <Wrapper
                      radius
                      shadow
                      bordered
                      key={item.id}
                      onClick={() =>
                        routeProps.navigate(`/san-pham/${item?.slug}`)
                      }
                      className={
                        "position-relative furniture_detail__related__item pb-5 w-100"
                      }
                    >
                      <img
                        src={item?.main_thumb[0]?.url}
                        onError={onLoadErrorImage}
                        className="furniture_product__item__thumb"
                      />
                      <Wrapper className={"p-4 text-center"}>
                        <p className="h6 word-wrap furniture_product__item__title mb-4">
                          {item.name}
                        </p>
                        <p className="word-wrap furniture_product__item__title">
                          Mã sp: {item.code}
                        </p>
                        {item.discountPrice ? (
                          <Fragment>
                            <p className="h6 fw-bold text-decoration-line-through">
                              {item.price} VND
                            </p>
                            <Tooltip title={`${item.discountPrice} VND`}>
                              <p className="h4 fw-bold furniture_product__item__price--discount">
                                {item.discountPrice} VND
                              </p>
                            </Tooltip>
                          </Fragment>
                        ) : (
                          <p className="h4 fw-bold furniture_product__item__price--discount">
                            {item.price} VND
                          </p>
                        )}
                      </Wrapper>
                      <Wrapper>
                        <Button type="primary">Xem sản phẩm</Button>
                      </Wrapper>
                    </Wrapper>
                  ))}
                  {/* {attribute.all.map((item) => (
                    <Wrapper
                      radius
                      shadow
                      bordered
                      // key={item.id}
                      // onClick={() =>
                      //   routeProps.navigate(`/san-pham/${item?.slug}`)
                      // }
                      className={
                        "position-relative furniture_detail__related__item pb-5"
                      }
                    >
                      <img
                        src={"asdasdasdasd"}
                        onError={onLoadErrorImage}
                        className="furniture_product__item__thumb"
                      />
                      <Wrapper className={"p-4 text-center"}>
                        <p className="h6 word-wrap furniture_product__item__title mb-4">
                          asdasd
                        </p>
                        <p className="word-wrap furniture_product__item__title">
                          Mã sp: asdasd
                        </p>
                        {item.discountPrice ? (
                          <Fragment>
                            <p className="h6 fw-bold text-decoration-line-through">
                              {item.price} VND
                            </p>
                            <Tooltip title={`${item.discountPrice} VND`}>
                              <p className="h4 fw-bold furniture_product__item__price--discount">
                                {item.discountPrice} VND
                              </p>
                            </Tooltip>
                          </Fragment>
                        ) : (
                          <p className="h4 fw-bold furniture_product__item__price--discount">
                            asdasdasd VND
                          </p>
                        )}
                      </Wrapper>
                      <Wrapper>
                        <Button type="primary">Xem sản phẩm</Button>
                      </Wrapper>
                    </Wrapper>
                  ))} */}
                </Slider>
              </Wrapper>
            )}
          </Wrapper>
          {(recentProduct || []).length > 0 && (
            <Wrapper className={"mt-100 text-center"}>
              <span className="h1 border-bottom">Sản phẩm đã xem qua</span>

              <Wrapper
                className={
                  "mt-4 pt-3 position-relative furniture_detail__related"
                }
              >
                <Slider {...recentSettings} className="ps-0">
                  {(recentProduct || []).map((item) => (
                    <Wrapper
                      radius
                      shadow
                      bordered
                      key={item.id}
                      onClick={() =>
                        routeProps.navigate(`/san-pham/${item?.slug}`)
                      }
                      className={
                        "position-relative furniture_detail__related__item pb-5 w-100"
                      }
                    >
                      <img
                        src={item?.main_thumb[0]?.url}
                        onError={onLoadErrorImage}
                        className="furniture_product__item__thumb"
                      />
                      <Wrapper className={"p-4 text-center"}>
                        <p className="h6 word-wrap furniture_product__item__title mb-4">
                          {item.name}
                        </p>
                        <p className="word-wrap furniture_product__item__title">
                          Mã sp: {item.code}
                        </p>
                        {item.discountPrice ? (
                          <Fragment>
                            <p className="h6 fw-bold text-decoration-line-through">
                              {item.price} VND
                            </p>
                            <Tooltip title={`${item.discountPrice} VND`}>
                              <p className="h4 fw-bold furniture_product__item__price--discount">
                                {item.discountPrice} VND
                              </p>
                            </Tooltip>
                          </Fragment>
                        ) : (
                          <p className="h4 fw-bold furniture_product__item__price--discount">
                            {item.price} VND
                          </p>
                        )}
                      </Wrapper>
                      <Wrapper>
                        <Button type="primary">Xem sản phẩm</Button>
                      </Wrapper>
                    </Wrapper>
                  ))}
                </Slider>
              </Wrapper>
            </Wrapper>
          )}
        </Wrapper>
      ) : (
        <Result
          status="404"
          title="404"
          subTitle="Sản phẩm này không tồn tại"
          extra={
            <Button onClick={() => routeProps.navigate("/")} type="primary">
              Về trang chủ
            </Button>
          }
        />
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer,
  attributes: state.accessoryReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getDetail: (slug) => productThunk.getDetail(slug),
      getListAllAttribute: () => AttributeThunk.getListAll(),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
