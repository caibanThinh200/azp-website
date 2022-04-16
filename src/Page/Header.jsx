import Icon from "../Component/Icon";
import Wrapper from "../Component/Wrapper"
import { Divider, Drawer, Menu, Cascader, Dropdown, Input, Space, Empty } from "antd"
import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import queryString from "query-string";
import slugify from "slugify";
import { bindActionCreators } from "redux";
import CategoryThunk from "../thunk/categoryThunk";
import { connect } from "react-redux";
import { removeObjectEmptyValue } from "../Util/function";

const ProductPopup = props => {
    const [listItem, setListItem] = useState({
        isFetching: false,
        result: []
    });

    const getProductPage = params => {
        const queryUrl = queryString.stringify(removeObjectEmptyValue(params));
        if (params?.productSlug) {
            props.navigate("/san-pham/" + params?.productSlug);
        } else {
            props.navigate("/san-pham?" + queryUrl);
        }
    }

    useEffect(() => {
        setListItem({
            isFetching: props.loading,
            result: props.listItem
        })
    }, [props.listItem, props.loading]);

    return <Menu mode="vertical" className="fw-bold">
        {
            listItem.result.length > 0 ? listItem.result.map(item => <Menu.SubMenu key={item?.id} title={item?.name}>
                {
                    (item?.productTypes || []).length > 0 ? (item?.productTypes || []).map(typeItem => <Menu.SubMenu onTitleClick={() => getProductPage({ category: item.id, product_type: typeItem?.id })} key={typeItem?.id} title={typeItem?.name}>
                        {
                            (typeItem?.products || []).length > 0 && (typeItem?.products || []).map(productItem => <Menu.Item onClick={() => getProductPage({ productSlug: productItem?.slug })} key={productItem?.id}>{productItem?.name}</Menu.Item>)
                        }
                    </Menu.SubMenu>) : <Empty className="p-5" description="Hiện tại chưa có sản phẩm trong danh mục này, mong quý khách thông cảm" />
                }
            </Menu.SubMenu>) : <Empty className="p-5" description="Hiện tại chưa có sản phẩm trong danh mục này, mong quý khách thông cảm" />
        }
    </Menu>
}

const Header = props => {
    const [visible, setVisible] = useState(false),
        [searchValue, setSearchValue] = useState(""),
        [category, setCategory] = useState({
            isFetching: false,
            result: [],
            item: {}
        });
    
    useEffect(() => {
        setCategory({
            isFetching: props.categories?.isCategoryFetching,
            result: props.categories?.result,
            item: props.categories?.item
        });
    }, [props.categories]);

    const handleChange = (e) => {
        let value = e.target?.value;
        setSearchValue(value);
    }

    const onSearch = (value, name) => {
        let params = { [name]: slugify(value) },
            queryUrl = queryString.stringify(params);
        props.navigate(`/san-pham?${queryUrl}`);
    }

    return <Wrapper className="row">
        <Wrapper className={"p-1 furniture_navigation__contact ps-5 pe-5 d-none d-md-block"}>
            <span className="white float-end ms-3"><Icon type="phone" />09183209182039</span>
            <span className="white float-end ms-3"><Icon type="facebook" />AZP.COM</span>
            <span className="white float-end ms-3"><Icon type="instagram" />AZP.SHOP</span>
            <span className="white float-end ms-3"><Icon type="home" />211 Thoại Ngọc Hầu</span>
        </Wrapper>

        <nav className="navbar navbar-expand-lg navbar-light border-bottom">
            <div className="container-fluid">
                <img src="/define/181003-logo-azp-final_1c6d8f34a5fa30_995.jpg" className="furniture_navigation__logo float-start " />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse mt-4 mt-lg-0" id="navbarSupportedContent">
                    <ul style={{ transform: "translateY(0)" }} className="navbar-nav me-auto mb-2 ms-3 furniture_navigation__nav-list">
                        <Link to={"/"} className="d-inline nav-link me-3">
                            <span className="h5 fw-bold black">Trang chủ</span>
                        </Link>
                        <Dropdown forceRender overlay={<ProductPopup {...props} listItem={category.result} loading={category.isFetching} />} className="d-inline nav-link me-3">
                            <a className="d-inline nav-link me-3">
                                <span className="h5 fw-bold black">Sản phẩm</span>
                            </a>
                        </Dropdown>
                        <Link to={"/"} className="d-inline nav-link me-3">
                            <span className="h5 fw-bold black">Giới thiệu</span>
                        </Link>
                        <Link to={"/"} className="d-inline nav-link me-3">
                            <span className="h5 fw-bold black">Liên hệ</span>
                        </Link>
                        <Link to={"/checkout"} className="d-inline nav-link me-3">
                            <span className="h5 fw-bold black">Giỏ hàng</span>
                        </Link>
                    </ul>
                    <div>
                        <Input.Search
                            name="slug"
                            size="large"
                            onChange={handleChange}
                            className="float-end mt-3 mt-lg-0"
                            style={{ transform: "translateY(-10px)" }}
                            onSearch={value => onSearch(value, "slug")}
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
}

export default Header;