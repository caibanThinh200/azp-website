import Wrapper from "../../Component/Wrapper";
import { Badge, Button, Divider, Drawer, List as AntList, message, Pagination, Select, Tag } from "antd";
import { checkLoadedImage, onLoadErrorImage } from "../../Util/function";
import Icon from "../../Component/Icon";
import { TwitterPicker } from 'react-color'
import ProductThunk from "../../thunk/productThunk";
import ProductTypeThunk from "../../thunk/productTypeThunk";
import { bindActionCreators } from "redux";
import { connect, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import queryString from "query-string";
import { find, get } from "lodash";
import FilterOptions from "../../Component/Filter";
import slugify from "slugify";
import INFO_DEFINE from "../../Constant/infoDefine";
import shoppingCartAction from "../../action/shoppingCartAction";

const Item = props => {
    const routeProps = useOutletContext();
    
    return <AntList.Item>
        <Badge.Ribbon text={`${props?.discount_value}%`}>
        <Wrapper
            radius
            shadow
            // bordered
            className={"position-relative furniture_product__item"}
        >
            <Wrapper className={"furniture_product__item__overlay d-none d-lg-block"}></Wrapper>
            <Wrapper className="d-none d-lg-block furniture_product__item__overlay__icon">
                <Icon type="cart" className="fs-25" onClick={props.handleAddToCart} />
                <Icon type="eye-out-lined" className="fs-25" onClick={() => routeProps.navigate("/san-pham/" + props?.slug)} />
            </Wrapper>
            {props.discountPercent && <Wrapper
                style={{
                    width: "40px",
                    height: "40px",
                    backgroundColor: "orange",
                    right: "0",
                    transform: "translate(30%, -30%)"
                }}
                className={"rounded-circle position-absolute text-center pt-2"}
            >
                {props.discount_value}
            </Wrapper>}
            <img src={props.main_thumb[0]?.url} onError={onLoadErrorImage} className="furniture_product__item__thumb" />
            <Wrapper className={"p-4 pb-1 mt-lg-4 pt-0 text-center item-content"}>
                <p className="h6 word-wrap furniture_product__item__title mb-4">{props.name}</p>
                <p className="h6 fw-bold text-decoration-line-through">{props.price} VND</p>
                <p className="h4 fw-bold furniture_product__item__price--discount mb-0">{props.discount_price} VND</p>
            </Wrapper>
            <Wrapper
                style={{
                    bottom: "0px",
                    left: "0",
                    right: "0"
                }}
                className="d-block d-lg-none"
            >
                <Wrapper className="">
                <Button
                        type="link"
                        onClick={() => routeProps.navigate("/san-pham/" + props?.slug)}
                        size="large"
                        className="w-100"
                    >
                        Xem chi tiết
                    </Button>
                    <Button
                        onClick={props.handleAddToCart}
                        type="primary"
                        size="large"
                        className="w-100"
                    >
                        Thêm vào giỏ
                    </Button>
                </Wrapper>
            </Wrapper>
        </Wrapper>
        </Badge.Ribbon>
    </AntList.Item>
}

const RowItem = props => {
    const routeProps = useOutletContext();
    return <AntList.Item>
        <Wrapper></Wrapper>
    </AntList.Item>
}

const List = props => {
    const routeProps = useOutletContext(),
        cartList = JSON.parse(localStorage.getItem(INFO_DEFINE.KEY.cart)) || [],
        dispatch = useDispatch(),
        [product, setProduct] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [productType, setProductType] = useState({
            isFetching: false,
            result: [],
            item: {}
        }),
        [filterPopup, setFilterPopup] = useState(false),
        [filter, setFilter] = useState([]),
        [filterParams, setFilterParams] = useState({});

    useEffect(() => {
        let queryParams = {};
        if ((routeProps.location?.search || "").length > 0) {
            queryParams = queryString.parse(routeProps.location?.search);
            // if (queryParams.product_type) {
            //     props.getProductTypeDetail(queryParams.product_type);
            // }
            setFilterParams({ ...filterParams, ...queryParams })
            props.getList(queryParams);
        }
    }, [routeProps.location]);
    // console.log(product.isFetching, props.products.isProductFetching)
    useEffect(() => {
        if (props.products.result.length > 0) {
            const typeIds = (props.products.result || []).map(item => item.product_type);
            const uniqueIds = [...new Set(typeIds)];
            props.getProductTypeDetail(uniqueIds[0]);
        }
        setProduct({
            isFetching: props.products.isProductFetching,
            result: props.products.result,
            item: props.products.item
        });
    }, [props.products]);

    useEffect(() => {
        setProductType({
            isFetching: props.productTypes.isProductTypeFetching,
            result: props.productTypes.result,
            item: props.productTypes.item
        });
        const filter = { ...props.productTypes.item?.filter };
        if (Object.keys(filter).length > 0) {
            let newFilterParams = [];
            Object.keys(filter).map(item => {
                const attributeName = find(props.productTypes.item.attribute, { id: item });
                newFilterParams.push({
                    name: get(attributeName, "id"),
                    title: get(attributeName, "name"),
                    filterValues: filter[item].value,
                    filterType: get(attributeName, "filter.option")
                });
            });
            setFilter(newFilterParams);
        }
    }, [props.productTypes]);

    const onFilterChange = e => {
        let newFilterParams = {
            attribute: {
                [e?.name]: e?.value || ""
            }
        };
        const queryParams = { ...filterParams, attribute: { ...filterParams?.attribute, ...newFilterParams.attribute } };
        setFilterParams({ ...queryParams });
        props.getList(queryParams);
    }

    const onPaginationChange = (page, pageSize) => {
        const paginationParams = { page_index: page, page_size: pageSize };
        const queryParams = { ...filterParams, paginationParams };
        setFilterParams({ ...queryParams });
        props.getList(queryParams);
    }

    const onSortChange = (name, value) => {
        const queryParams = {
            ...filterParams,
            [name]: value
        }
        setFilterParams({ ...queryParams });
        props.getList(queryParams);
    }

    const handleAddToCart = item => {
        const currentItem = { ...item, quantity: 1 };
        let currentCart = cartList;
        const existProduct = find(currentCart, { id: currentItem?.id });
        if (cartList.length > 0 && Object.keys(existProduct || {}).length > 0) {
            message.error("Sản phẩm đã có trong giỏ hàng");
            return
        } 
        dispatch(shoppingCartAction.addAction(currentItem));
        // message.success(`Sản phẩm ${item?.code} đã được thêm vào giỏ hàng`)
    }

    const pagination = {
        total: props.products.page_count,
        current: props.products.page_index,
        pageSize: props.products.page_size
    }

    return <Wrapper className={"row"}>
        <Wrapper className={"col-12 row p-4 pb-5 pt-0 furniture_product__sort gy-0"}>
            <p className="h3 mb-4">
                <Icon type="sort" /> Sắp xếp
            </p>
            <Select placeholder="Chọn giá tiền" size="large" onSelect={e => onSortChange("price", e)} className="col ms-3">
                <Select.Option value={1}>Trên 10 triệu</Select.Option>
                <Select.Option value={2}>10 triệu - 5 triệu</Select.Option>
                <Select.Option value={3}>5 triệu - 3 triệu</Select.Option>
                <Select.Option value={4}>Dưới 3 triệu</Select.Option>
            </Select>
            <Select placeholder="Chọn thời gian" size="large" onSelect={e => onSortChange("date", e)} className="col ms-3">
                <Select.Option value={1}>Mới nhất</Select.Option>
                <Select.Option value={2}>Cũ nhất</Select.Option>
            </Select>
        </Wrapper>
        <Wrapper className="d-block d-lg-none p-4 pt-0">
            <Button icon={<Icon type="filter-outlined" />} type="primary" onClick={() => setFilterPopup(!filterPopup)}>
                <span className="h6">Bộ lọc</span>
            </Button>
            <Drawer
                title="Bộ lọc"
                visible={filterPopup}
                onClose={() => setFilterPopup(false)}
                placement="right"
            >
                <Wrapper>
                    {
                        filter.length > 0 && filter.map((item, index) => <Wrapper
                            key={index}
                            bordered
                            className={"p-3 mb-4"}
                        >
                            <p className="h4 fw-bold">{item.title}</p>
                            <Divider />
                            <Wrapper className={"mt-3"} hasBackground>
                                <FilterOptions
                                    allowClear
                                    name={item.name}
                                    type={item.filterType}
                                    dataFilter={item.filterValues}
                                    onFilterChange={onFilterChange}
                                />
                            </Wrapper>
                        </Wrapper>)
                    }
                </Wrapper>
            </Drawer>
        </Wrapper>
        {
            filter.length > 0 && <Wrapper className={"col-3 d-lg-block d-none"}>
                <Wrapper className={"p-4 furniture_product__filter"}>
                    <Wrapper>
                        <span className="h2">
                            <Icon className="h2 ms-1" type="filter-outlined" />
                            Bộ lọc
                        </span>
                    </Wrapper>
                    <Divider />
                    {
                        filter.map((item, index) => <Wrapper hasBackground key={index} className={"p-3 mb-4"}>
                            <p className="h4 fw-bold">{item.title}</p>
                            <Divider />
                            <Wrapper className={"mt-3"}>
                                <FilterOptions
                                    allowClear
                                    name={item.name}
                                    type={item.filterType}
                                    dataFilter={item.filterValues}
                                    onFilterChange={onFilterChange}
                                />
                            </Wrapper>
                        </Wrapper>)
                    }
                </Wrapper>
            </Wrapper>
        }
        <Wrapper className={"col ms-2 ms-lg-5 furniture_product__list"}>
            <AntList
                loading={product.isFetching}
                grid={{ gutter: 10, xs: 2, sm: 3, md: 3, lg: 3, column: 4 }}
                dataSource={product.result}
                renderItem={item => <Item {...item}
                    handleAddToCart={() => handleAddToCart(item)}
                />}
            />
            <Pagination {...pagination}
                className="mt-5"
                onChange={onPaginationChange}
                pageSizeOptions={[5, 10, 15, 20]}
            />
        </Wrapper>
    </Wrapper>
}

const mapStateToProps = state => ({
    products: state.productReducer,
    productTypes: state.productTypeReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getList: filter => ProductThunk.getList(filter),
    getProductTypeDetail: id => ProductTypeThunk.getDetail(id)
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(List);