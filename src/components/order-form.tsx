import React, { useState } from "react";
import { Steps, message } from 'antd';
import PizzaSelector from './pizza-selector'
import DeliveryAddress from './delivery-address'
import PaymentInfo from './payment-info'

const { Step } = Steps;
const steps = [
    { title: 'Select Pizza(s)' },
    { title: 'Specify Delivery Location' },
    { title: 'Provide Payment Info' },
    { title: 'Confirm Order' }
];

type PizzaForm = {
    keys: number[],
    pizzas: [string, string, number][]
}
type DeliveryAddressForm = {
    firstName: string,
    lastName: string,
    streetName: string,
    streetNumber: string,
    postalCode: string,
    city: string,
    phone: string
}
type PaymentInfoForm = {
    number: string,
    expirationMonth: string,
    expirationYear: string,
    securityCode: string
}
type ConsentForm = {
    tosConsent: boolean
}

const OrderForm = () => {
    const [currentStep, setCurrentStep] = useState(2);
    const [pizzaForm, setPizzaForm] = useState({
        "keys": [0, 1, 2],
        "pizzas": [["Margarita", "Small", 1], ["Margarita", "Medium", 1], ["Margarita", "Large", 1]]
    });
    const [deliveryForm, setDeliveryForm] = useState({
        firstName: 'Jonathan',
        lastName: 'Pollack',
        streetName: 'Prenz',
        streetNumber: '123',
        postalCode: '10963',
        city: 'Berlin',
        phone: '1234'
    });
    const [paymentInfoForm, setPaymentInfoForm] = useState({
        number: '1234123412341234',
        expirationMonth: '09',
        expirationYear: '20',
        securityCode: '023'
    });
    const [consentForm, setConsentForm] = useState({
        tosConsent: false
    });
    const submitPizzaSelection = (err: object, values: PizzaForm) => {
        if (!err) {
            const { keys, pizzas } = values;
            setPizzaForm({ keys, pizzas })
            console.log('Received values of pizza form: ', values);
            setCurrentStep(currentStep + 1)
        }
    }
    const submitDeliveryAddress = (err: object, values: DeliveryAddressForm) => {
        if (!err) {
            setDeliveryForm(values)
            console.log('Received values of delivery form: ', values);
            setCurrentStep(currentStep + 1)
        }
    }
    const cancelDeliveryAddress = (err: object, values: DeliveryAddressForm) => {
        setDeliveryForm(values)
        console.log('(cancelled) Received values of delivery form: ', values);
        setCurrentStep(currentStep - 1)
    }
    const submitPaymentInfo = (err: object, values: PaymentInfoForm) => {
        if (!err) {
            setPaymentInfoForm(values)
            console.log('Received values of payment info form: ', values);
            setCurrentStep(currentStep + 1)
        }
    }
    const cancelPaymentInfo = (err: object, values: PaymentInfoForm) => {
        setPaymentInfoForm(values)
        console.log('(cancelled) Received values of payment info form: ', values);
        setCurrentStep(currentStep - 1)
    }
    const submitOrder = (err: object, values: ConsentForm) => {
        if (!err) {
            setConsentForm(values)
            console.log('Received values of consent form: ', values);
            // setCurrentStep(currentStep + 1)
            message.success('Processing complete!')
        }
    }
    const cancelOrder = (err: object, values: ConsentForm) => {
        setConsentForm(values)
        console.log('(cancelled) Received values of consent form: ', values);
        setCurrentStep(currentStep - 1)
    }

    return (
        <div>
            <Steps current={currentStep}>
                {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                ))}
            </Steps>
            <div className="steps-content">
                {currentStep === 0 && <PizzaSelector {...pizzaForm} onSubmit={submitPizzaSelection} />}
                {currentStep === 1 && <DeliveryAddress {...deliveryForm} onSubmit={submitDeliveryAddress} onCancel={cancelDeliveryAddress}/>}
                {currentStep === 2 && <PaymentInfo {...paymentInfoForm} onSubmit={submitPaymentInfo} onCancel={cancelPaymentInfo} />}
                {/* {currentStep === 3 && <ConfirmationDialog {...pizzaForm} {...deliveryForm} {...paymentInfoForm} {...consentForm} onSubmit={submitOrder} onCancel={cancelOrder} /> */}
            </div>
        </div>
    )
}

export default OrderForm;
