const size = ['Small', 'Medium', 'Large'].map(size => ({ value: size, label: size }))
const flavors = ['Margarita', 'Marinara', 'Salami'].map(flavor => {
    return { value: flavor, label: flavor, children: size }
})

function onChange(cascadeValues) {
    const row = flavors.findIndex(({value}) => {
        return value === cascadeValues[0]
    })
    const column = flavors[row].children.findIndex(({ value }) => {
        return value === cascadeValues[1]
    })

    delete flavors[row].children[column]
    if (flavors[row].children.length === 0) {
        delete flavors[row]
    }

    console.log(value, flavors);
}

onChange(['Margarita', 'Small'])
