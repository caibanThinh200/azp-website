import React from 'react';
import { Form as AntForm, FormProps } from 'antd';
// import './styles.less';

const Form = (props) => {
    const layout = {
        labelCol: { span: 2 },
        wrapperCol: { span: 8 },
    };
    return (
        <AntForm {...props}
            size={props.size || "large"}
            form={props.form}
            // labelCol={{ span: 8 }}
            // wrapperCol={{ span: 16 }}
            {...props.layout || layout}
            className={`${props.className ? props.className : ""}`}
        >
            {props.children}
        </AntForm>
    )
}
export default Form;
export const Function = AntForm;
export const FormItem = AntForm.Item;
export const FormList = AntForm.List;
