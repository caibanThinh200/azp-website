import Wrapper from "../Component/Wrapper";
import { Affix, Card, Descriptions, Divider, Input } from "antd";
import clsx from "clsx";
import React from "react";
import { connect } from "react-redux";

const Footer = (props) => {
  return (
    <Wrapper
      style={{ backgroundColor: "#8bd16d" }}
      className={clsx("furniture_footer__wrapper w-100 p-5 ", props.className)}
    >
      <Wrapper className="row footer">
        <Wrapper className="col-12 col-md-4">
          <div className="furniture_footer__about">
            <h3 className="furniture_footer__title">Về chúng tôi</h3>
            <p>{props.layout?.item?.introduce}</p>
          </div>
          <div className="furniture_footer__social-media">
            <h3 className="furniture_footer__title">Follow us</h3>
            <div className="d-flex">
              <i className="fab fa-twitter"></i>
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-youtube"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-skype"></i>
            </div>
          </div>
        </Wrapper>
        <Wrapper className="col-12 col-md-3 mt-3 mt-md-0">
          <h3 className="furniture_footer__title">Liên hệ</h3>
          <div className="d-flex mt-3 flex-column align-items-start furniture_footer__contact">
            <p>
              <i className="fas fa-phone"></i>
              {props.layout?.item?.phones?.length > 0 &&
                props.layout?.item?.phones[0]}
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              {props.layout?.item?.emails?.length > 0 &&
                props.layout?.item?.emails[0]}
            </p>
            {props.layout?.item?.stores?.length > 0 && (
              <p>
                <i className="fas fa-map-marker-alt"></i>
                {props.layout?.item?.stores[0]?.address},{" "}
                {props.layout?.item?.stores[0]?.district},{" "}
                {props.layout?.item?.stores[0]?.city}
              </p>
            )}
          </div>
        </Wrapper>

        <Wrapper className="col-12 col-md-5">
          <div className="furniture_footer__subcribe w-100 mb-5">
            <h3 className="furniture_footer__title">Đăng ký nhận ưu đãi</h3>
            <h6>
              Nhập email để đăng ký nhận các thông báo về ưu đãi của cửa hàng
            </h6>
            <div className="d-flex">
              <Input />
              <button style={{ background: "#189564" }}>Đăng ký</button>
            </div>
          </div>
          {/* <div>
            {props.layout?.item?.stores?.length > 0 && props.layout?.item?.stores[0]?.address && (
              <iframe
                class="gmap_iframe"
                frameborder="0"
                scrolling="no"
                marginheight="0"
                marginwidth="0"
                src={`https://maps.google.com/maps?q=${props.layout?.item?.address}&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`}
              ></iframe>
            )}
          </div> */}
        </Wrapper>
        <Wrapper className="col-12">
          <div className="furniture_footer__end ">
            <p>
              Copyright <i className="fal fa-copyright"></i> and written by{" "}
              {props.layout?.item?.name}
            </p>
          </div>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  );
};

const mapStateToProps = (state) => ({
  layout: state.layoutReducer,
});

export default connect(mapStateToProps)(Footer);
