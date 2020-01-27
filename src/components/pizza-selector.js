import React from "react";
import PropTypes from 'prop-types';
import { Form, Cascader, Icon, Button } from 'antd';

export const QUANTITY = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const SIZE = ['Small', 'Medium', 'Large']
export const PRICE_MAP = [300, 500, 800].reduce((prev, curr, index) => {
    prev[SIZE[index]] = curr
    return prev;
}, {})
export const FLAVORS = ['Margarita', 'Marinara', 'Salami']

let id = 0;

class PizzaSelector extends React.Component {
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
    };
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

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 4, offset: 6 },
            wrapperCol: { span: 12 },
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
                required={true}
                key={k}
            >
                {getFieldDecorator(`pizzas[${k}]`, {
                    rules: pizzaRules,
                    initialValue: this.props.pizzas && this.props.pizzas[k]
                })(<Cascader options={this.calcRemainingPizzaCombos(k)} placeholder="Please select" style={{width: '40%', marginRight: '2em'}}/>)}
                {keys.length > 1 ? (
                    <Icon className="dynamic-delete-button" type="minus-circle-o" onClick={() => this.remove(k)} />
                ) : null}
            </Form.Item>
        ));
        return (
            <Form>
                {formItems}
                {keys.length < 9 && <Form.Item wrapperCol={{offset: 6, span: 10 }}>
                    <Button type="dashed" onClick={this.add} style={{ width: '100%' }}>
                        <Icon type="plus" /> Add a pizza
                    </Button>
                </Form.Item>}
                <Button type="primary" onClick={() => { this.props.form.validateFields(this.props.onSubmit) }}>
                    Next
                </Button>
            </Form>
        );
    }
}

PizzaSelector.propTypes = {
    keys: PropTypes.array,
    pizzas: PropTypes.array,
    onSubmit: PropTypes.func
};

const WrappedPizzaSelector = Form.create()(PizzaSelector);

export default WrappedPizzaSelector;
