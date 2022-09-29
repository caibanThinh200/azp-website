import Wrapper from "../../Component/Wrapper";
import clsx from "clsx";
import Masonry from "react-masonry-component";
import { Button, Divider, message } from "antd";
import Slider from "react-slick";
import Icon from "../../Component/Icon";
import { bindActionCreators } from "redux";
import categoryThunk from "../../thunk/categoryThunk";
import { connect } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { generateDuplicateArray, onLoadErrorImage } from "../../Util/function";
import queryString from "query-string";
import { useOutletContext } from "react-router-dom";
import { useTransition, animated } from "react-spring";
import { animateScroll as scroll } from "react-scroll";
import { find } from "lodash";
import LayoutThunk from "../../thunk/layoutThunk";

const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
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
const HomePage = (props) => {
  const [category, setCategory] = useState({
      title: "Danh mục sản phẩm",
      isFetching: false,
      result: [],
      item: {},
      isFull: false,
    }),
    [productType, setProductType] = useState({
      title: "Danh mục sản phẩm",
      isFetching: false,
      result: [],
      item: {},
    }),
    productTypeTransition = useTransition(productType.result, {
      from: {
        opacity: 0,
        transform: "translateY(-50px)",
      },
      enter: (item, index) => (next) =>
        next({
          opacity: 1,
          transform: "translateY(0)",
          delay: index * 200,
        }),
      leave: {
        opacity: 0,
        transform: "translateY(-50px)",
      },
    }),
    [cateSelected, setCateSelected] = useState(false),
    [layoutInfo, setLayoutInfo] = useState({}),
    [limitCategory, setLimitCategory] = useState(0),
    [wrapperHeight, setWrapperHeight] = useState("auto"),
    ref = useRef([]),
    routeProps = useOutletContext();

  useEffect(() => {
    const currentWidth = Math.max(
      document.documentElement.clientWidth,
      window.innerWidth || 0
    );
    let limit = 0;
    if (currentWidth >= 1400) {
      limit = 10;
    }
    if (
      (currentWidth < 1400 && currentWidth >= 952) ||
      (currentWidth < 746 && currentWidth >= 577)
    ) {
      limit = 8;
    }
    if (currentWidth < 952 && currentWidth >= 746) {
      limit = 6;
    }
    setLimitCategory(limit);
    props.getListCategories({ limit });
  }, [Math.max(document.documentElement.clientWidth, window.innerWidth || 0)]);

  // useEffect(() => {
  //   props.getLayout();
  // }, []);
  

  useEffect(() => {
    setLayoutInfo(props.layout.item);
  }, [props.layout]);

  useEffect(() => {
    setCategory({
      title: category.title,
      isFetching: props.categories?.isCategoryFetching,
      result: generateDuplicateArray(
        [...category.result, ...props.categories?.result],
        "id"
      ),
      item: props.categories?.item,
      isFull: props.categories?.isFull,
    });
  }, [props.categories]);

  useEffect(() => {
    const child = document.getElementById("product-type");
    window.scrollTo({
      top: child.clientHeight + child.scrollHeight,
      behavior: "smooth",
    });
  }, [productType.result]);

  const getProductType = (categorySelect) => {
    if ((categorySelect.productTypes || []).length < 1) {
      message.error(
        "Hiện tại chưa có sản phẩm trong danh mục này, mong quý khách thông cảm"
      );
    }
    setCateSelected(true);
    setCategory({
      ...category,
      item: categorySelect,
    });
    setProductType({
      ...productType,
      result: categorySelect.productTypes,
    });
  };

  const getProducts = (productTypeSelect) => {
    // const categoryId = category.item?.id || "",
    // productTypeId  = productTypeSelect?.id || "";
    const queryParams = {
      category: category.item?.id || "",
      product_type: productTypeSelect?.id || "",
    };
    routeProps.navigate(`/san-pham?${queryString.stringify(queryParams)}`);
  };

  return (
    <Wrapper {...props} className={clsx(props.className)}>
      {/* <Wrapper className={"row furniture_homepage__introduce"}>
            <Wrapper className={"col-lg-8 col-12 text-center"}>
                <div className="mt-5"></div>
                <p className="mb-4 h3 fw-bold furniture_homepage__title">AZ PRICE FURNITURE</p>
                <p className="mb-4 h5 fw-bold furniture_homepage__title--sub">Cam kết dịch vụ tốt nhất</p>
                <Divider></Divider>
                <p className="mb-4 h4 ps-5 pe-5 furniture_homepage__introduce--text">
                    "Tự hào là đơn vị cung cấp Nội Thất hàng đầu tại Việt Nam với dịch vụ Chuyên Nghiệp, Ân Cần, Tận Tâm với Khách Hàng. Chúng tôi luôn hy vọng sẽ đáp ứng được nhu cầu ngày càng cao của thị trường và mọi góp ý của Khách Hàng chính là giá trị giúp chúng tôi ngày càng hoàn thiện hơn."
                </p>
            </Wrapper>
            <Wrapper className={"col-4 rounded d-none d-lg-block"}>
                <img
                    src="/define/banner.png"
                    className="image_cover furniture_homepage__main-thumb rounded-circle float-end"
                />
            </Wrapper>
        </Wrapper> */}
      {/* <div id="wrapper"> */}
      <div className={clsx("text-center furniture_homepage__category w-100")}>
        <p
          className={clsx(
            "mb-4 h1 fw-bold furniture_homepage__title--category furniture_homepage__title--category--open"
          )}
        >
          {category.title?.toUpperCase()}
        </p>
        <Wrapper className={"d-none d-sm-block row gx-0"}>
          {category.result.length > 0 &&
            category.result.map((item, index) => (
              <Wrapper
                key={item.id}
                onClick={() => getProductType(item)}
                style={{
                  "--time": cateSelected
                    ? 0
                    : index >= limitCategory
                    ? `${200 * (index - limitCategory)}ms`
                    : `${200 * index}ms`,
                }}
                className={clsx(
                  "position-relative d-inline-block furniture_homepage__category__item furniture_homepage__category__item--open"
                )}
              >
                <span className="furniture_homepage__category__title h2">
                  {item.name}
                </span>
                <img
                  src={item.thumb?.url}
                  onError={onLoadErrorImage}
                  className="furniture_mansonry__thumb image_cover"
                />
              </Wrapper>
            ))}
        </Wrapper>

        <Wrapper className={"d-none d-sm-block row gx-0"}>
          {/* {showCategoryTransition((style, item) => {
                        return item && (
                            <animated.div
                                key={item.id}
                                style={style}
                                onClick={() => getProductType(item)}
                                // style={{ "--time": cateSelected ? 0 : `${500 * (index + 1)}ms` }}
                                className={clsx("position-relative d-inline-block furniture_homepage__category__item ")}
                            >
                                <span className="furniture_homepage__product-type__title h2">{item.name}</span>
                                <img src={item.thumb?.url} onError={onLoadErrorImage} className="furniture_mansonry__thumb image_cover" />
                            </animated.div>)
                    })}
                    {showProductTypeTransition((style, item) => {
                        return item && (
                            <animated.div
                                key={item.id}
                                style={style}
                                onClick={() => getProductType(item)}
                                // style={{ "--time": cateSelected ? 0 : `${500 * (index + 1)}ms` }}
                                className={clsx("position-relative d-inline-block furniture_homepage__category__item ")}
                            >
                                <span className="furniture_homepage__product-type__title h2">{item.name}</span>
                                <img src={item.thumb?.url} onError={onLoadErrorImage} className="furniture_mansonry__thumb image_cover" />
                            </animated.div>)
                    })} */}
          {/* {transitions((style, item, index) => {
                        return cateSelected ? (
                            <animated.div
                                key={item.id}
                                style={style}
                                onClick={() => getProductType(item)}
                                // style={{ "--time": cateSelected ? 0 : `${500 * (index + 1)}ms` }}
                                className={clsx("position-relative d-inline-block furniture_homepage__category__item ")}
                            >
                                <span className="furniture_homepage__product-type__title h2">{item.name}</span>
                                <img src={item.thumb?.url} onError={onLoadErrorImage} className="furniture_mansonry__thumb image_cover" />
                            </animated.div>) : 
                            <animated.div
                            key={item.id}
                            style={style}
                            onClick={() => getProductType(item)}
                            // style={{ "--time": cateSelected ? 0 : `${500 * (index + 1)}ms` }}
                            className={clsx("position-relative d-inline-block furniture_homepage__category__item ")}
                        >
                            <span className="furniture_homepage__product-type__title h2">{item.name}</span>
                            <img src={item.thumb?.url} onError={onLoadErrorImage} className="furniture_mansonry__thumb image_cover" />
                        </animated.div>
                    })} */}
        </Wrapper>
        <Wrapper className={"d-block d-sm-none"}>
          {category.result.length > 0 &&
            category.result.map((item, index) => (
              <Wrapper
                key={item.id}
                onClick={() => getProductType(item)}
                style={{
                  "--time": cateSelected
                    ? 0
                    : index > limitCategory
                    ? `${200 * (index - limitCategory)}ms`
                    : `${200 * index}ms`,
                }}
                className={clsx(
                  "position-relative d-inline-block furniture_homepage__category__item furniture_homepage__category__item--open"
                )}
              >
                <span className="furniture_homepage__category__title h2">
                  {item.name}
                </span>
                <img
                  src={item.thumb?.url}
                  onError={onLoadErrorImage}
                  className="furniture_mansonry__thumb image_cover"
                />
              </Wrapper>
            ))}
        </Wrapper>
      </div>
      {!category.isFull && (
        <Wrapper className="text-center mt-5">
          <Button
            onClick={() =>
              props.getListCategories({
                limit: 8,
                skip: category.result.length,
                disable_scroll: true,
              })
            }
            shape="round"
            type="primary"
            size="large"
          >
            Xem thêm <Icon type="down-arrow" />
          </Button>
        </Wrapper>
      )}
      <Wrapper id="product-type" ref={ref}>
        {productType.result.length > 0 && (
          <Wrapper
            className={"w-100 text-center furniture_homepage__product-type"}
          >
            <p
              className={clsx(
                "mb-4 h1 fw-bold furniture_homepage__title--product-type furniture_homepage__title--product-type--open"
              )}
            >
              SẢN PHẨM {category.item?.name.toUpperCase()}
            </p>
            <div className={"d-none d-sm-block row gx-0"}>
              {productType.result.length > 0 &&
                productType.result.map((item, index) => (
                  <Wrapper
                    key={item.id}
                    onClick={() => getProducts(item)}
                    style={{ "--time-2": `${200 * index}ms` }}
                    className={clsx(
                      "position-relative d-inline-block furniture_homepage__product-type__item furniture_homepage__product-type__item--open"
                    )}
                  >
                    <span className="furniture_homepage__product-type__title h2">
                      {item.name}
                    </span>
                    <img
                      src={item.thumb?.url}
                      onError={onLoadErrorImage}
                      className="furniture_mansonry__thumb image_cover"
                    />
                  </Wrapper>
                ))}
              {/* {productTypeTransition((style, item) => {
                            return item && (
                                <animated.div
                                    key={item.id}
                                    style={style}
                                    onClick={() => getProductType(item)}
                                    // style={{ "--time": cateSelected ? 0 : `${500 * (index + 1)}ms` }}
                                    className={clsx("position-relative furniture_homepage__category__item", style?.display ? "display-none" : "d-inline-block")}
                                >
                                    <span className="furniture_homepage__product-type__title h2">{item.name}</span>
                                    <img src={item.thumb?.url} onError={onLoadErrorImage} className="furniture_mansonry__thumb image_cover" />
                                </animated.div>)
                        })} */}
            </div>
            <Wrapper className={"d-block d-sm-none"}>
              {productType.result.length > 0 &&
                productType.result.map((item, index) => (
                  <Wrapper
                    key={item.id}
                    onClick={() => getProducts(item)}
                    style={{ "--time-2": `${200 * index}ms` }}
                    className={clsx(
                      "position-relative d-inline-block furniture_homepage__product-type__item furniture_homepage__product-type__item--open"
                    )}
                  >
                    <span className="furniture_homepage__product-type__title h2">
                      {item.name}
                    </span>
                    <img
                      src={item.thumb?.url}
                      onError={onLoadErrorImage}
                      className="furniture_mansonry__thumb image_cover"
                    />
                  </Wrapper>
                ))}
            </Wrapper>
          </Wrapper>
        )}
      </Wrapper>

      {/* </div> */}
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  categories: state.categoryReducer,
  layout: state.layoutReducer,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getListCategories: (filter) => categoryThunk.getList(filter),
      getLayout: () => LayoutThunk.getDetail(),
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
