import Icon from "../Component/Icon";
import Wrapper from "../Component/Wrapper";
import {
  Divider,
  Drawer,
  Menu,
  Cascader,
  Dropdown,
  Input,
  Space,
  Empty,
  Badge,
  Tooltip,
} from "antd";
import { useState, useEffect } from "react";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import queryString from "query-string";
import slugify from "slugify";
import { bindActionCreators } from "redux";
import CategoryThunk from "../thunk/categoryThunk";
import { connect, useSelector } from "react-redux";
import { onLoadErrorImage, removeObjectEmptyValue } from "../Util/function";
import productThunk from "../thunk/productThunk";
import categoryThunk from "../thunk/categoryThunk";

const ShoppingCartPopup = (props) => {
  return (
    <Wrapper
      className="p-3 pb-1"
      style={{ zIndex: 100, background: "white", width: 400 }}
      shadow
    >
      <Wrapper className="p-2 ps-0 border-bottom">
        <span className="h5">Giỏ hàng</span>
        <span className="float-end h6 mt-1">
          Tổng cộng:{" "}
          <span style={{ color: "#52c41a" }} className="fw-bold">
            {props?.total || 0} VND
          </span>
        </span>
      </Wrapper>
      <Wrapper className="mt-4">
        <ul className="shopping-cart-items ps-0">
          {(props.listProduct || []).length > 0 &&
            (props.listProduct || []).slice(0, 3).map((product) => (
              <li className="clearfix">
                <img
                  src={(product?.main_thumb || [])[0]?.url || ""}
                  onError={onLoadErrorImage}
                  // alt="item1"
                />
                <Tooltip title={product?.name}>
                  <span className="item-name">{product?.name}</span>
                </Tooltip>
                <span className="item-code">
                  Mã sp: <span className="fw-bold">{product?.code}</span>
                </span>
                <span>
                  Giá: <span className="item-price">{product?.price} VND</span>
                </span>
                <span className="item-quantity float-end">
                  Số lượng: {product?.quantity}
                </span>
              </li>
            ))}
        </ul>
        {props?.listProduct.slice(-(props?.listProduct?.length - 3)).length >
          0 && (
          <div className="text-center fw-bold mt-4 mb-2">
            <span>
              Và{" "}
              {
                props?.listProduct.slice(-(props?.listProduct?.length - 3))
                  .length
              }{" "}
              sản phẩm khác
            </span>
          </div>
        )}
      </Wrapper>
      <Link
        onClick={() => props.setVisible(false)}
        to={"/checkout"}
        className="button"
      >
        Checkout
      </Link>
    </Wrapper>
  );
};

const ProductPopup = (props) => {
  const [listItem, setListItem] = useState({
    isFetching: false,
    result: [],
  });

  const getProductPage = (params) => {
    const queryUrl = queryString.stringify(removeObjectEmptyValue(params));
    if (params?.productSlug) {
      props.navigate("/san-pham/" + params?.productSlug);
    } else {
      props.navigate("/san-pham?" + queryUrl);
    }
    props.setVisible(false);
  };

  useEffect(() => {
    setListItem({
      isFetching: props.loading,
      result: props.listItem,
    });
  }, [props.listItem, props.loading]);

  return (
    <Wrapper shadow>
      <Menu mode="vertical" className="fw-bold">
        {listItem.result.length > 0 ? (
          listItem.result.map((item) => (
            <Menu.SubMenu key={item?.id} title={item?.name}>
              {(item?.productTypes || []).length > 0 ? (
                (item?.productTypes || []).map((typeItem) => (
                  <Menu.SubMenu
                    onTitleClick={() =>
                      getProductPage({
                        category: item.id,
                        product_type: typeItem?.id,
                      })
                    }
                    key={typeItem?.id}
                    title={typeItem?.name}
                  >
                    {(typeItem?.products || []).length > 0 &&
                      (typeItem?.products || []).map((productItem) => (
                        <Menu.Item
                          onClick={() =>
                            getProductPage({ productSlug: productItem?.slug })
                          }
                          key={productItem?.id}
                        >
                          {productItem?.name}
                        </Menu.Item>
                      ))}
                  </Menu.SubMenu>
                ))
              ) : (
                <Empty
                  className="p-5"
                  description="Hiện tại chưa có sản phẩm trong danh mục này, mong quý khách thông cảm"
                />
              )}
            </Menu.SubMenu>
          ))
        ) : (
          <Empty
            className="p-5"
            description="Hiện tại chưa có sản phẩm trong danh mục này, mong quý khách thông cảm"
          />
        )}
      </Menu>
    </Wrapper>
  );
};

const Header = (props) => {
  const [visible, setVisible] = useState(false),
    [searchValue, setSearchValue] = useState(""),
    [category, setCategory] = useState({
      isFetching: false,
      result: [],
      item: {},
    }),
    [shoppingCartVisible, setShoppingCartVisible] = useState(false),
    [productVisible, setProductVisible] = useState(false),
    location = useLocation(),
    cartState = useSelector((state) => state.shoppingCartReducer);

  useEffect(() => {
    if (location.pathname !== "/") {
      props.getListCategories();
    }
  }, []);

  useEffect(() => {
    setCategory({
      isFetching: props.categories?.isCategoryFetching,
      result: props.categories?.result,
      item: props.categories?.item,
    });
  }, [props.categories]);

  //   useEffect(() => {
  //     window.addEventListener("click", () => {
  //       const navBarCollapse = document.getElementById("navbarSupportedContent");
  //       navBarCollapse.classList.remove("show");
  //     });
  //   });

  const handleChange = (e) => {
    let value = e.target?.value;
    setSearchValue(value);
  };

  const onSearch = (value, name) => {
    let params = { [name]: slugify(value) },
      queryUrl = queryString.stringify(params);
    props.navigate(`/san-pham?${queryUrl}`);
  };

  return (
    <Wrapper className="row">
      <Wrapper
        className={
          "p-1 furniture_navigation__contact ps-5 pe-5 d-none d-md-block"
        }
      >
        <span className="white float-end ms-3">
          <Icon type="phone" />
          09183209182039
        </span>
        <span className="white float-end ms-3">
          <Icon type="facebook" />
          AZP.COM
        </span>
        <span className="white float-end ms-3">
          <Icon type="instagram" />
          AZP.SHOP
        </span>
        <span className="white float-end ms-3">
          <Icon type="home" />
          211 Thoại Ngọc Hầu
        </span>
      </Wrapper>

      <nav
        style={{}}
        className="navbar navbar-expand-lg navbar-light furniture_navigation"
      >
        <div
          // style={{ alignItems: "flex-start" }}
          className="container-lg container-fluid h-100 p-1"
        >
          <Link className="ms-5" to="/">
            <img
              src="/define/271067783_343104124008134_3550196135801547111_n.png"
              className="furniture_navigation__logo float-start "
            />
          </Link>
          <button
            className="navbar-toggler me-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            style={{ zIndex: 100, background: "white" }}
            className="collapse navbar-collapse pe-2 ps-2 pb-4 pb-lg-0"
            id="navbarSupportedContent"
          >
            <ul
              style={{ alignItems: "flex-start" }}
              className="navbar-nav me-auto mt-2 ps-5 ps-lg-0 furniture_navigation__nav-list"
            >
              <Link to={"/"} className="d-inline nav-link me-3">
                <span className="h6 fw-bold black">Trang chủ</span>
              </Link>
              <Dropdown
                arrow
                // forceRender
                visible={productVisible}
                onVisibleChange={(flag) => setProductVisible(flag)}
                overlay={
                  <ProductPopup
                    {...props}
                    setVisible={setProductVisible}
                    listItem={category.result}
                    loading={category.isFetching}
                  />
                }
                className="d-inline nav-link me-3"
              >
                <a className="d-inline nav-link me-3">
                  <span className="h6 fw-bold black">Sản phẩm</span>
                </a>
              </Dropdown>
              <Link to={"/"} className="d-inline nav-link me-3">
                <span className="h6 fw-bold black">Giới thiệu</span>
              </Link>
              <Link to={"/"} className="d-inline nav-link me-3">
                <span className="h6 fw-bold black">Liên hệ</span>
              </Link>
              <Dropdown
                arrow
                // trigger={["click"]}
                visible={shoppingCartVisible}
                onVisibleChange={(flag) => setShoppingCartVisible(flag)}
                overlay={
                  <ShoppingCartPopup
                    setVisible={setShoppingCartVisible}
                    {...props}
                    listProduct={cartState.result}
                    total={cartState.price}
                  />
                }
              >
                <Link to={"/checkout"} className="d-inline nav-link me-3">
                  <Badge
                    style={{ backgroundColor: "#52c41a" }}
                    count={(cartState.result || []).length}
                  >
                    <span className="h6 fw-bold black">Giỏ hàng</span>
                  </Badge>
                </Link>
              </Dropdown>
            </ul>
            <div>
              <Input.Search
                name="code"
                size="large"
                onChange={handleChange}
                className="float-end mt-3 mt-lg-0"
                // style={{ transform: "translateY(-10px)" }}
                onSearch={(value) => onSearch(value, "code")}
                placeholder="Tìm kiếm sản phẩm tại đây"
              />
            </div>
          </div>
        </div>
      </nav>
      {/* <Wrapper className={"d-lg-none pt-4 d-flex justify-content-between border-bottom p-4"}>
            <img src="/define/181003-logo-azp-final_1c6d8f34a5fa30_995.jpg" style={{}} />
            <Icon type="search" className="furniture_navigation__wrapper__mobile--icon" />
            <Icon type="cart" className="furniture_navigation__wrapper__mobile--icon" />
            <Icon type="mobile-menu" className="furniture_navigation__wrapper__mobile--icon" onClick={() => setVisible(true)} />
            <Drawer
                title="Menu"
                placement={"right"}
                closable
                onClose={() => setVisible(false)}
                visible={visible}
                key={"right"}
            >
                <Wrapper>
                    <Menu
                        // onClick={this.handleClick}
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                    >
                        <Menu.Item className="mb-4 pt-2" key={1}>
                            <span className="h1">Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item className="mb-4 pt-2">
                            <span className="h1">Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item className="mb-4 pt-2">
                            <span className="h1">Trang chủ</span>
                        </Menu.Item>
                        <Menu.Item className="mb-4 pt-2">
                            <span className="h1">Trang chủ</span>
                        </Menu.Item>
                    </Menu>
                </Wrapper>
            </Drawer>
        </Wrapper> */}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  products: state.productReducer,
  categories: state.categoryReducer,
  // productTypes: state.productTypeReducer
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getList: (filter) => productThunk.getList(filter),
      getListCategories: (filter) => categoryThunk.getList(filter),
      // getProductTypeDetail: id => ProductTypeThunk.getDetail(id)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Header);
