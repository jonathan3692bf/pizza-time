type Pizza = [string, string, number, number][]
type PizzaForm = {
    keys: number[],
    pizzas: Pizza,
    total: number
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
    cardNumber: string,
    expirationMonth: string,
    expirationYear: string,
    securityCode: string
}
