const invoiceSchema = {
    type: 'object',
    properties: {
        name: {
            type: 'string'
        },
        address: {
            type: 'object',
            properties: {
                street: {
                    type: 'string'
                },
                city: {
                    type: 'string'
                },
                number: {
                    type: 'string'
                },
                zip: {
                    type: 'string'
                },
            },
        },
        email: {
            type: 'string'
        },
        phone: {
            type: 'string'
        },
        currency: {
            type: 'string'
        },
        tax: {
            type: 'number'
        },
        img: {
            type: 'string'
        }
    },
};

module.exports = invoiceSchema;
