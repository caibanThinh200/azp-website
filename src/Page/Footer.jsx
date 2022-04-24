import Wrapper from "../Component/Wrapper";
import { Affix, Card, Descriptions, Divider, Input } from "antd";
import clsx from "clsx";
import React from 'react'

const Footer = props => {
    return (
        <Wrapper style={{ backgroundColor: "#8bd16d" }} className={clsx("furniture_footer__wrapper w-100 p-5 ", props.className)}>
            <Wrapper className="row footer">
                <Wrapper className="col-12 col-md-4">
                    <div className="furniture_footer__about">
                        <h3 className="furniture_footer__title">
                            Về chúng tôi
                        </h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum ipsa cum eum animi omnis minus reiciendis ullam necessitatibus debitis nesciunt obcaecati perferendis expedita quas, aut laudantium. Vel quia culpa nam!
                        </p>
                    </div>
                    <div className="furniture_footer__social-media">
                        <h3 className="furniture_footer__title">
                            Follow us
                        </h3>
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
                    <h3 className="furniture_footer__title">
                        Liên hệ
                    </h3>
                    <div className="d-flex mt-3 flex-column align-items-start furniture_footer__contact">
                        <p><i className="fas fa-phone"></i>+84.909.956.627</p>
                        <p><i className="fas fa-envelope"></i>Ngiachow@gmail.com</p>
                        <p><i className="fas fa-map-marker-alt"></i>206 Nghĩa Châu phường 6 Quận 10 TpHcm</p>
                    </div>
                </Wrapper>

                <Wrapper className="col-12 col-md-5">
                    <div className="furniture_footer__subcribe">
                        <h3 className="furniture_footer__title">
                            Đăng ký nhận ưu đãi
                        </h3>
                        <h6>Nhập email để đăng ký nhận các thông báo về ưu đãi của cửa hàng</h6>
                        <div className="d-flex">
                            <Input />
                            <button style={{background: "#189564"}}>Đăng ký</button>
                        </div>
                    </div>
                    <div>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4635771576955!2d106.665294750891!3d10.775762592284241!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f9023a3a85d%3A0xdee5c99a7b02feab!2sHuflit!5e0!3m2!1svi!2s!4v1633606156108!5m2!1svi!2s"
                            height="200"
                            style={{ width: '90%', marginTop: '40px' }}
                            loading="lazy">
                        </iframe>
                    </div>
                </Wrapper>
                <Wrapper className="col-12">
                    <div className="furniture_footer__end ">
                        <p>Copyright <i className="fal fa-copyright"></i> and written by Nguyen Quoc Thinh</p>
                    </div>
                </Wrapper>
            </Wrapper>
        </Wrapper>
    )
}

export default Footer;