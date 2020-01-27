import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Checkbox, Button } from 'antd';
import { PRICE_MAP } from './pizza-selector'
const { Title, Text } = Typography;


const ConfirmationDialog = (props) => {
    const [ checked, setChecked ] = useState(props.checked)
    const [error, setError] = useState('');
    const handleChange = (e) => {
        if (e.target.checked) {
            setChecked(true)
            setError('')
        } else {
            setChecked(false)
        }
    }
    const handleCancel = () => {
        props.onCancel(checked)
    }
    const handleSubmit = () => {
        if (checked) {
            props.onSubmit(checked)
        } else {
            setError('Please confirm that you agree to the terms of service!')
        }
    }
    return (
        <Fragment>
            <Title level={4}>Selected Items</Title>
                {JSON.stringify(props.pizzas)}
            <Title level={4}>Delivery Address</Title>
            <Text>
                {`${props.firstName} ${props.lastName}`}
                <br/>
                {`${props.streetName} ${props.streetNumber}`}
                <br />
                {`${props.postalCode} ${props.city}`}
            </Text>
            <Title level={3}>Payment Info</Title>
            <Text>
                {`Credit card: ${props.cardNumber}`}
                <br />
                {`Expiration date: ${props.expirationMonth}/${props.expirationYear}`}
                <br />
                {`Security code: ${props.securityCode}`}
            </Text>
            <div>
                <Checkbox onChange={handleChange} checked={checked}>
                    I have read the terms of service
                </Checkbox>
                {error.length > 0 && <div>
                    <Text type="danger">{error}</Text>
                </div>}
            </div>
            <div style={{ marginTop: '1em' }}>
                <Button style={{ marginRight: 8 }} onClick={handleCancel}>
                    Previous
                </Button>
                <Button type="primary" onClick={handleSubmit}>
                    Confirm order
                </Button>
            </div>

        </Fragment>
    )
}

ConfirmationDialog.propTypes = {
    pizzas: PropTypes.array,
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    streetName: PropTypes.string,
    streetNumber: PropTypes.string,
    postalCode: PropTypes.string,
    city: PropTypes.string,
    phone: PropTypes.string,
    cardNumber: PropTypes.string,
    expirationMonth: PropTypes.string,
    expirationYear: PropTypes.string,
    securityCode: PropTypes.string,
    checked: PropTypes.bool,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func
}

export default ConfirmationDialog
