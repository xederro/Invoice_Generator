const invoiceSchema = {
    type: 'object',
    properties: {
        invoice_id: {
            type: 'string'
        },
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
        invoice_date: {
            type: 'string',
            default: new Date().toISOString().split('T')[0]
        },
        pay_due: {
            type: 'string',
            default: new Date(Date.now()+588000000).toISOString().split('T')[0]
        },
        description: {
            type: 'string'
        },
        email: {
            type: 'string'
        },
        items: {
            type: 'array',
            additionalItems: {type: "object"}
        },
        discount: {
            type: 'number'
        }
    },
};

module.exports = invoiceSchema;
