import React, { Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const formItemLayout = {
    labelCol: { span: 4, offset: 6 },
    wrapperCol: { span: 4 },
};

const PaymentInfo = (props) => {
    const { getFieldDecorator } = props.form;
    const cardRules = [{ required: true, whitespace: true, message: 'Required field' }]
    return (
        <Fragment>
            <Form.Item {...formItemLayout} label="Credit card number" style={{width: '100%'}}>
                {getFieldDecorator('cardNumber', {
                    rules: cardRules.concat({ pattern:/^[0-9]{16}$/ }),
                    initialValue: props.cardNumber
                })(<Input type="tel" placeholder="Please input your card number" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} style={{ marginBottom: 0 }} label="Expiration (MM/YY)" required={true}>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 3em)' }}>
                    {getFieldDecorator('expirationMonth', {
                        rules: cardRules.concat({ transform: val => Number(val), type: 'integer', min: 1, max: 12 }),
                        initialValue: props.expirationMonth
                    })(<Input type="tel" placeholder="MM" />)}
                </Form.Item>
                <span style={{ display: 'inline-block', width: '1em', textAlign: 'center', margin: '0 1em' }}>/</span>
                <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 3em)' }}>
                    {getFieldDecorator('expirationYear', {
                        rules: cardRules.concat({ transform: val => Number(val), type: 'integer', min: 20 }),
                        initialValue: props.expirationYear
                    })(<Input type="tel" placeholder="YY" />)}
                </Form.Item>
            </Form.Item>
            <Form.Item label="Security code" {...formItemLayout}>
                {getFieldDecorator('securityCode', {
                    rules: cardRules.concat({ pattern: /^[0-9]{3}$/ }),
                    initialValue: props.securityCode
                })(<Input type="tel" placeholder="cv2" />)}
            </Form.Item>
            <Button style={{ marginRight: 8 }} onClick={() => props.form.validateFields(props.onCancel)}>
                Previous
            </Button>
            <Button type="primary" onClick={() => { props.form.validateFields(props.onSubmit) }}>
                Next
            </Button>
        </Fragment>
    );
}


PaymentInfo.propTypes = {
    cardNumber: PropTypes.string,
    expirationMonth: PropTypes.string,
    expirationYear: PropTypes.string,
    securityCode: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

const WrappedPaymentInfo = Form.create()(PaymentInfo);

export default WrappedPaymentInfo;
