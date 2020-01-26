import React, { useState } from "react";
import { Form, Input, Icon, Button } from 'antd';
import { Cascader } from 'antd';

let id = 0;

// type: Enum('margarita', 'marinara', 'salami'), size: Enum('small', 'medium', 'large')
const size = ['Small', 'Medium', 'Large'].map(size => ({ value: size, label: size }))
let flavors = ['Margarita', 'Marinara', 'Salami'].map(flavor => {
    return { value: flavor, label: flavor, children: size }
})

function onChange(cascadeValues) {
    const row = flavors.findIndex(({ value }) => {
        return value === cascadeValues[0]
    })
    const column = flavors[row].children.findIndex(({ value }) => {
        return value === cascadeValues[1]
    })

    // delete flavors[row].children[column]
    // if (flavors[row].children.length === 0) {
    //     delete flavors[row]
    // }

    console.log(cascadeValues, flavors, '2');
}


class DynamicFieldSet extends React.Component {
    remove = k => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(id++);
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const { keys, pizza } = values;
                console.log('Received values of form: ', values);
                console.log('Merged values:', keys.map(key => pizza[key]));
            }
        });
    };

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        getFieldDecorator('keys', { initialValue: [] });
        const pizzaRules = [{ required: true, message: "Please specify pizza or delete this field." }]
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => (
            <Form.Item
                {...formItemLayout}
                label={'Pizza'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`pizza[${k}]`, {
                    // validateTrigger: ['onChange', 'onBlur'],
                    rules: pizzaRules,
                })(<Cascader options={flavors} onChange={onChange} placeholder="Please select" style={{width: '40%'}}/>)}
                {keys.length > 1 ? (
                    <Icon
                        className="dynamic-delete-button"
                        type="minus-circle-o"
                        onClick={() => this.remove(k)}
                    />
                ) : null}
            </Form.Item>
        ));
        return (
            <Form onSubmit={this.handleSubmit}>
                {formItems}
                <Form.Item {...formItemLayout}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add a pizza
                    </Button>
                </Form.Item>
                {/* <Form.Item {...formItemLayoutWithOutLabel}>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item> */}
            </Form>
        );
    }
}

const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet;
