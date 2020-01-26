import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Form, Input, Icon, Button } from 'antd';
import { Cascader } from 'antd';

let id = 0;

const QUANTITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const SIZE = ['Small', 'Medium', 'Large']
const FLAVORS = ['Margarita', 'Marinara', 'Salami']

function onChange(cascadeValues) {
    console.log(cascadeValues);
}


class DynamicFieldSet extends React.Component {
    calcRemainingPizzaCombos = (currentPizza) => {
        const { form } = this.props;
        const keys = form.getFieldValue('keys');
        let remainingFlavors = FLAVORS.map(flavor => ({
            value: flavor,
            label: flavor,
            children: SIZE.map(size => ({
                value: size,
                label: size,
                children: QUANTITY.map(quant => ({
                    value: quant,
                    label: quant
                }))
            }))
        }))
        console.log(keys)
        keys.forEach(key => {
            const pizza = form.getFieldValue(`pizzas[${key}]`)
            if (Number(key) !== currentPizza && pizza) {
                // iterate through all the pizzas which are not the current cascader
                // and remove all of the selected combinations (except the current)
                const [type, size] = pizza
                for (let i = 0; i < remainingFlavors.length; i++) {
                    if (remainingFlavors[i].value === type) {
                        remainingFlavors[i].children = remainingFlavors[i].children.filter(({ value }) => value !== size)

                        if (remainingFlavors[i].children.length === 0) {
                            remainingFlavors = remainingFlavors.filter(({ value }) => value !== type)
                        }
                    }
                }

            }
        })

        return remainingFlavors;
    }
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

    // handleSubmit = e => {
    //     e.preventDefault();
    //     this.props.form.validateFields((err, values) => {
    //         if (!err) {
    //             const { keys, pizza } = values;
    //             console.log('Received values of form: ', values);
    //             console.log('Merged values:', keys.map(key => pizzas[key]));
    //         }
    //     });
    // };

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
        getFieldDecorator('keys', { initialValue: this.props.keys || [] });
        if (id === 0 && this.props.keys && this.props.keys.length) {
            id = this.props.keys[this.props.keys.length - 1] + 1
        }
        const pizzaRules = [{ required: true, message: "Please specify pizza or delete this field." }]
        const keys = getFieldValue('keys');

        const formItems = keys.map((k, index) => (
            <Form.Item
                {...formItemLayout}
                label={'Pizza (type / size / quantity)'}
                required={false}
                key={k}
            >
                {getFieldDecorator(`pizzas[${k}]`, {
                    // validateTrigger: ['onBlur'],
                    rules: pizzaRules,
                    initialValue: this.props.pizzas && this.props.pizzas[k]
                })(<Cascader options={this.calcRemainingPizzaCombos(k)} onChange={onChange} placeholder="Please select" style={{width: '40%', marginRight: '2em'}}/>)}
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
                {keys.length < 9 && <Form.Item {...formItemLayout}>
                    <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
                        <Icon type="plus" /> Add a pizza
                    </Button>
                </Form.Item>}
                <Form.Item>
                    <Button type="primary" onClick={() => { this.props.form.validateFields(this.props.onSubmit) }}>
                        Next
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

DynamicFieldSet.propTypes = {
    keys: PropTypes.array,
    pizzas: PropTypes.array,
    onSubmit: PropTypes.func
};
const WrappedDynamicFieldSet = Form.create({ name: 'dynamic_form_item' })(DynamicFieldSet);

export default WrappedDynamicFieldSet;
