const Datastore = require('nedb-promises')
const Ajv = require('ajv')
const invoiceSchema = require('../schemas/invoice')

class InvoiceStore {
    constructor() {
        this.perPage = 25;

        this.ajv = new Ajv({
            allErrors: true,
            useDefaults: true
        });

        this.schemaValidator = this.ajv.compile(invoiceSchema);

        try {
            this.db = Datastore.create('./invoice.db');
        }
        catch (e) {
            this.db = Datastore.create('./invoice.db');
        }
    }

    validate (payload){
        return this.schemaValidator(payload);
    }

    addInvoice (payload) {
        if (this.validate(payload)) {
            return this.db.insert(payload)
        }
    }

    paginate (page = 1) {
        return this.db.find()
            .sort({ pay_due: -1 })
            .limit(this.perPage)
            .skip(page * this.perPage)
    }

    pageCount () {
        return this.db.count()
    }

    fetchAllInvoices () {
        return this.db.find()
            .sort({ pay_due: -1 })
    }

    fetchInvoice (invoice_id) {
        return this.db.findOne({ invoice_id: invoice_id });
    }

    deleteInvoice (invoice_id) {
        return this.db.remove({ invoice_id: invoice_id }, {})
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
                    discount: payload.discount,
                },
            })
        }
    }
}

export default new InvoiceStore()
