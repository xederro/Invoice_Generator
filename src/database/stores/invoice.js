const Datastore = require('nedb-promises');
const Ajv = require('ajv');
const invoiceSchema = require('../schemas/invoice');

class invoiceStore {

    constructor() {
        this.ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = this.ajv.compile(invoiceSchema);

        this.db = Datastore.create('/invoice.db');
    }

    validate (payload){
        return this.schemaValidator(payload);
    }

    addInvoice (payload) {
        if (this.validate(payload)) {
            return this.db.insert(payload)
        }
    }

    fetchAllInvoices () {
        return this.db.find()
    }

    fetchInvoice (invoice_id) {
        return this.db.findOne({ invoice_id: invoice_id });
    }

    deleteInvoice (invoiceId) {
        return this.db.remove({ invoice_id: invoiceId }, {})
    }

    editInvoice (payload) {
        if (this.validate(payload)){
            return this.db.update({ invoice_id: payload.invoice_id }, {
                $set: {
                    invoice_id: payload.invoice_id,
                    name: payload.name,
                    address: payload.address,
                    invoice_date: payload.invoice_date,
                    pay_due: payload.pay_due,
                    description: payload.description,
                    email: payload.email,
                    items: payload.items,
                },
            })
        }
    }
}

export default new invoiceStore()
