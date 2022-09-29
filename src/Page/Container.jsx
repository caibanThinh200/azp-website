import Wrapper from "../Component/Wrapper";
import Footer from "./Footer";
import Header from "./Header";
import * as AntCPN from "antd";
import { cloneElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import LoadingOverlay from "react-loading-overlay";
import { RotateLoader } from "react-spinners";
import { bindActionCreators } from "redux";
import categoryThunk from "../thunk/categoryThunk";
import LayoutThunk from "../thunk/layoutThunk";

const Container = (props) => {
  const [loading, setLoading] = useState(false);
  const { categories, productTypes, products, attributes, orders } = props;
  const [category, setCategory] = useState({
    isFetching: false,
    result: [],
    item: {},
  });

  useEffect(() => {
    console.log(2222, props);
    props?.getLayout();
    console.log(333);
  }, []);

  useEffect(() => {
    const checkLoading =
        categories.isCategoryFetching ||
        productTypes.isProductTypeFetching ||
        products.isProductFetching ||
        attributes.isAccessoryFetching ||
        orders.isOrderFetching,
      disableScroll =
        categories.disable_scroll ||
        productTypes.disable_scroll ||
        products.disable_scroll ||
        attributes.disable_scroll ||
        orders.disable_scroll;

    setLoading(checkLoading);
    if (checkLoading && !disableScroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [categories, productTypes, products, attributes, orders]);

  return (
    <Wrapper>
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
        <AntCPN.Layout.Content
          style={{ minHeight: "calc(100vh - 300px)", marginBottom: "100px" }}
          className="h-100"
        >
          <Wrapper className={"container-lg main-container ps-3"}>
            {props.children}
          </Wrapper>
        </AntCPN.Layout.Content>
        <AntCPN.Layout.Footer className="p-0">
          <Footer />
        </AntCPN.Layout.Footer>
      </LoadingOverlay>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categoryReducer,
  productTypes: state.productTypeReducer,
  products: state.productReducer,
  attributes: state.accessoryReducer,
  orders: state.orderReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getListCategory: () => categoryThunk.getListAll(),
      getLayout: () => LayoutThunk.getDetail(),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Container);
