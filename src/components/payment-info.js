import React, { Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const formItemLayout = {
    labelCol: { span: 4, offset: 6 },
    wrapperCol: { span: 4 },
};

class PaymentInfo extends React.Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        const cardRules = [{ required: true, whitespace: true, message: 'Required field' }]
        return (
            <Fragment>
                <Form.Item {...formItemLayout} label="Credit card number" style={{width: '100%'}}>
                    {getFieldDecorator('number', {
                        rules: cardRules.concat({ pattern:/^[0-9]{16}$/ }),
                        initialValue: this.props.number
                    })(<Input type="tel" placeholder="Please input your card number" />)}
                </Form.Item>
                <Form.Item {...formItemLayout} style={{ marginBottom: 0 }} label="Expiration (MM/YY)" required={true}>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 3em)' }}>
                        {getFieldDecorator('expirationMonth', {
                            rules: cardRules.concat({ transform: val => Number(val), type: 'integer', min: 1, max: 12 }),
                            initialValue: this.props.expirationMonth
                        })(<Input type="tel" placeholder="MM" />)}
                    </Form.Item>
                    <span style={{ display: 'inline-block', width: '1em', textAlign: 'center', margin: '0 1em' }}>/</span>
                    <Form.Item style={{ display: 'inline-block', width: 'calc(50% - 3em)' }}>
                        {getFieldDecorator('expirationYear', {
                            rules: cardRules.concat({ transform: val => Number(val), type: 'integer', min: 20 }),
                            initialValue: this.props.expirationYear
                        })(<Input type="tel" placeholder="YY" />)}
                    </Form.Item>
                </Form.Item>
                <Form.Item label="Security code" {...formItemLayout}>
                    {getFieldDecorator('securityCode', {
                        rules: cardRules.concat({ pattern: /^[0-9]{3}$/ }),
                        initialValue: this.props.securityCode
                    })(<Input type="tel" placeholder="cv2" />)}
                </Form.Item>
                <Button style={{ marginRight: 8 }} onClick={() => this.props.form.validateFields(this.props.onCancel)}>
                    Previous
                </Button>
                <Button type="primary" onClick={() => { this.props.form.validateFields(this.props.onSubmit) }}>
                    Next
                </Button>
            </Fragment>
        );
    }
}


PaymentInfo.propTypes = {
    number: PropTypes.string,
    expirationMonth: PropTypes.string,
    expirationYear: PropTypes.string,
    securityCode: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

const WrappedPaymentInfo = Form.create()(PaymentInfo);

export default WrappedPaymentInfo;
