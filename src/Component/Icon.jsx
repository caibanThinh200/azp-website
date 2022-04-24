import React, { Component } from 'react';
import {
    DeleteOutlined,
    FormOutlined,
    MoreOutlined,
    CloseCircleOutlined,
    IdcardOutlined,
    SyncOutlined,
    FilterOutlined,
    ZoomInOutlined,
    CloseOutlined,
    LoadingOutlined,
    PlusOutlined,
    PlusCircleOutlined,
    EyeOutlined,
    InfoCircleOutlined,
    PercentageOutlined,
    PaperClipOutlined,
    MinusCircleOutlined,
    MoneyCollectOutlined,
    DashboardOutlined,
    InboxOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    WarningOutlined,
    FacebookOutlined,
    InstagramOutlined,
    PhoneOutlined,
    HomeOutlined,
    SearchOutlined,
    ShoppingCartOutlined,
    BarsOutlined,
    ArrowDownOutlined,
    SortDescendingOutlined,
    CreditCardOutlined,
    DownOutlined
} from "@ant-design/icons";
import { omit } from 'lodash';

export default class Icon extends Component {

    render() {
        const { className, type } = this.props;
        const props = omit(this.props, ['className']);
        switch (type) {
            case "minus-circle-outlined":
                return (
                    <MinusCircleOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</MinusCircleOutlined>
                );
            case "paper-clip-outlined":
                return (
                    <PaperClipOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</PaperClipOutlined>
                );
            case "percent-age-outlined":
                return (
                    <PercentageOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</PercentageOutlined>
                );
            case "info-circle-outlined":
                return (
                    <InfoCircleOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</InfoCircleOutlined>
                );
            case "eye-out-lined":
                return (
                    <EyeOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</EyeOutlined>
                );
            case "search":
                return (
                    <SearchOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</SearchOutlined>
                );
            case "plus-circle":
                return (
                    <PlusCircleOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</PlusCircleOutlined>
                );
            case "delete":
                return (
                    <DeleteOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</DeleteOutlined>
                );
            case "form":
                return (
                    <FormOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</FormOutlined>
                );
            case "more":
                return (
                    <MoreOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</MoreOutlined>
                );
            case "close-circle":
                return (
                    <CloseCircleOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</CloseCircleOutlined>
                );
            case "id-card-outlined":
                return (
                    <IdcardOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</IdcardOutlined>
                );
            case "sync-outlined":
                return (
                    <SyncOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</SyncOutlined>
                );
            case "filter-outlined":
                return (
                    <FilterOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</FilterOutlined>
                );
            case "zoom-in":
                return (
                    <ZoomInOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</ZoomInOutlined>
                );
            case "close-outlined":
                return (
                    <CloseOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</CloseOutlined>
                );
            case "loading-outlined":
                return (
                    <LoadingOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</LoadingOutlined>
                );
            case "plus-outlined":
                return (
                    <PlusOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</PlusOutlined>
                );
            case "cash":
                return (
                    <MoneyCollectOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</MoneyCollectOutlined>
                );
            case "product":
                return (
                    <InboxOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</InboxOutlined>
                );
            case "dashboard":
                return (
                    <DashboardOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</DashboardOutlined>
                );
            case "toogle-off":
                return (
                    <MenuFoldOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</MenuFoldOutlined>
                );
            case "toogle-on":
                return (
                    <MenuUnfoldOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</MenuUnfoldOutlined>
                );
            case "warning":
                return (
                    <WarningOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</WarningOutlined>
                );
            case "facebook":
                return (
                    <FacebookOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</FacebookOutlined>
                );
            case "instagram":
                return (
                    <InstagramOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</InstagramOutlined>
                );
            case "phone":
                return (
                    <PhoneOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</PhoneOutlined>
                );
            case "home":
                return (
                    <HomeOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</HomeOutlined>
                );
            case "cart":
                return (
                    <ShoppingCartOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</ShoppingCartOutlined>
                );
            case "mobile-menu":
                return (
                    <BarsOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</BarsOutlined>
                );
            case "arrow-down":
                return (
                    <ArrowDownOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</ArrowDownOutlined>
                );
            case "sort":
                return (
                    <SortDescendingOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</SortDescendingOutlined>
                );
            case "credit-card":
                return (
                    <CreditCardOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</CreditCardOutlined>
                );
            case "down-arrow":
                return (
                    <DownOutlined {...props}
                        className={`${className || ''} furniture_icon`}>{this.props.children}</DownOutlined>
                );
            default:
                return "";
        }
    }
}
