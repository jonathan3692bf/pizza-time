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

const OrderForm = (props: any) => {
    const [currentStep, setCurrentStep] = useState(0);

    return (
        <div>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {currentStep === 0 && <PizzaSelector />}
            </div>
            <div className="steps-action">
                {currentStep < steps.length - 1 && (
                    <Button type="primary" onClick={() => setCurrentStep(currentStep + 1)}>
                        Next
                    </Button>
                )}
                {currentStep === steps.length - 1 && (
                    <Button type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
                {currentStep > 0 && (
                    <Button style={{ marginLeft: 8 }} onClick={() => setCurrentStep(currentStep - 1)}>
                        Previous
                    </Button>
                )}
            </div>
        </div>
    )
}

export default OrderForm;
