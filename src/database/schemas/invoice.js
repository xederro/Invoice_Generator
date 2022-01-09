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
            type: 'string'
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
            type: 'string'
        },
    },
};

module.exports = invoiceSchema;
