import React, { useState } from "react";
import { Steps, Button, message } from 'antd';
import PizzaSelector from './pizza-selector'
const { Step } = Steps;

const steps = [
    {
        title: 'Select Pizza(s)',
        content: 'First-content',
    },
    {
        title: 'Specify Delivery Location',
        content: 'Second-content',
    },
    {
        title: 'Provide Payment Info',
        content: 'Last-content',
    },
];

type PizzaForm = {
    keys: number[],
    pizzas: [string, string, number]
}


const OrderForm = (props: any) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [pizzaForm, setPizzaForm] = useState({
        "keys": [0, 1, 2],
        "pizzas": [["Margarita", "Small", 1], ["Margarita", "Medium", 1], ["Margarita", "Large", 1]]
    })
    const submitPizzaSelection = (err: object, values: any) => {
        if (!err) {
            const { keys, pizzas } = values;
            setPizzaForm({ keys, pizzas })
            console.log('Received values of form: ', values);
            setCurrentStep(currentStep + 1)
            // console.log('Merged values:', keys.map((key: number) => pizzas[key]));
        }
    }
    const NextButton = () => (
        <Button type="primary" onClick={() => { /*this.props.form.validateFields(this.props.onSubmit)*/ }}>
            Next
        </Button>)
    const PreviousButton = () => (
        <Button style={{ marginLeft: 8 }} onClick={() => setCurrentStep(currentStep - 1)}>
            Previous
        </Button>)
    const DoneButton = () => (
        <Button type="primary" onClick={() => message.success('Processing complete!')}>
            Done
        </Button>
    )
    return (
        <div>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {currentStep === 0 && <PizzaSelector keys={pizzaForm.keys} pizzas={pizzaForm.pizzas} onSubmit={submitPizzaSelection} />}
                {currentStep === 1 && <PizzaSelector keys={pizzaForm.keys} pizzas={pizzaForm.pizzas} onSubmit={submitPizzaSelection}>
                    <NextButton />
                    <PreviousButton />
                </PizzaSelector>}
                {currentStep === 2 && <PizzaSelector keys={pizzaForm.keys} pizzas={pizzaForm.pizzas} onSubmit={submitPizzaSelection}>
                    <DoneButton />
                    <PreviousButton />
                </PizzaSelector>}
            </div>
        </div>
    )
}

export default OrderForm;
