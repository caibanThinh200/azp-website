import Wrapper from "../Component/Wrapper";
import Footer from "./Footer";
import Header from "./Header";
import * as AntCPN from "antd"
import { cloneElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { RotateLoader } from "react-spinners";
import { bindActionCreators } from "redux";
import categoryThunk from "../thunk/categoryThunk";

const Container = props => {
    const [loading, setLoading] = useState(false);
    const { categories, productTypes, products, attributes, orders } = props;
    const [category, setCategory] = useState({
        isFetching: false,
        result: [],
        item: {}
    });

    useEffect(() => {
        const checkLoading =
            categories.isCategoryFetching ||
            productTypes.isProductTypeFetching ||
            products.isProductFetching ||
            attributes.isAccessoryFetching ||
            orders.isOrderFetching;
        setLoading(checkLoading);
        if (!checkLoading) {
            window.scrollTo(0, 0);
        }
    }, [categories, productTypes, products, attributes, orders]);

    return <Wrapper>
        <LoadingOverlay
            // className="position-fixed w-100 h-100"
            active={loading}
            className="loading-custom"
            spinner
            text="Đang xử lí"
        >
            <Wrapper>
                <Header {...props} />
            </Wrapper>
            <AntCPN.Layout.Content style={{ minHeight: "calc(100vh - 70px)" }} className="h-100 mb-5">
                <Wrapper className={"container-lg p-lg-5 ps-3"}>
                    {props.children}
                </Wrapper>
            </AntCPN.Layout.Content>
            <AntCPN.Layout.Footer className="p-0">
                <Footer />
            </AntCPN.Layout.Footer>
        </LoadingOverlay>
    </Wrapper>
}

const mapStateToProps = state => ({
    categories: state.categoryReducer,
    productTypes: state.productTypeReducer,
    products: state.productReducer,
    attributes: state.accessoryReducer,
    orders: state.orderReducer
});

const mapDispatchToProps = dispatch => bindActionCreators({
    getListCategory: () => categoryThunk.getListAll()
})

export default connect(mapStateToProps, mapDispatchToProps)(Container);