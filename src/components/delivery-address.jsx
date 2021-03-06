import React, { Fragment } from 'react';
import { Form, Input, Button } from 'antd';
import PropTypes from 'prop-types';

const formItemLayout = {
    labelCol: { span: 4, offset: 5 },
    wrapperCol: { span: 7 },
};

const DeliveryAddress = (props) => {
    const { getFieldDecorator } = props.form;
    const addressRules = [{ required: true, whitespace: true, message: 'Required field' }]
    return (
        <Fragment>
            <Form.Item {...formItemLayout} label="First name">
                {getFieldDecorator('firstName', {
                    rules: addressRules,
                    initialValue: props.firstName
                })(<Input placeholder="Please input your first name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Last name">
                {getFieldDecorator('lastName', {
                    rules: addressRules,
                    initialValue: props.lastName
                })(<Input placeholder="Please input your last name" />)}
            </Form.Item>
            <Form.Item {...formItemLayout} label="Street name & number" style={{ marginBottom: 0 }} required={true}>
                <Form.Item style={{ display: 'inline-block', width: 'calc(70% - 12px)', marginRight: '24px' }}>
                    {getFieldDecorator('streetName', {
                        rules: addressRules,
                        initialValue: props.streetName
                    })(<Input placeholder="Street name" />)}
                </Form.Item>

                <Form.Item style={{ display: 'inline-block', width: 'calc(30% - 12px)' }}>
                    {getFieldDecorator('streetNumber', {
                        rules: addressRules,
                        initialValue: props.streetNumber
                    })(<Input placeholder="number" />)}
                </Form.Item>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Post-code & city" style={{ marginBottom: 0 }} required={true}>
                <Form.Item style={{ display: 'inline-block', width: 'calc(30% - 12px)', marginRight: '24px' }}>
                    {getFieldDecorator('postalCode', {
                        rules: addressRules,
                        initialValue: props.postalCode
                    })(<Input placeholder="Post code" />)}
                </Form.Item>

                <Form.Item style={{ display: 'inline-block', width: 'calc(70% - 12px)' }}>
                    {getFieldDecorator('city', {
                        rules: addressRules,
                        initialValue: props.city
                    })(<Input placeholder="City" />)}
                </Form.Item>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Phone number">
                {getFieldDecorator('phone', {
                    rules: addressRules.concat({pattern: /^\+?[0-9 ]+$/}),
                    initialValue: props.phone
                })(<Input placeholder="Please input your phone number" />)}
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


DeliveryAddress.propTypes = {
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    streetName: PropTypes.string,
    streetNumber: PropTypes.string,
    postalCode: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
};

const WrappedDeliveryAddress = Form.create()(DeliveryAddress);

export default WrappedDeliveryAddress;
