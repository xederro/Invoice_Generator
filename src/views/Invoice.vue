<template>
  <div class="container-fluid d-flex justify-content-evenly flex-wrap mt-4" ref="print">
    <div class="shadow-lg mb-5 bg-body rounded p-5 a4" id="1">
      <div class="row">
        <div class="col-6">
          <h3>Company name: <span class="nbs">{{this.$data.credentials.name}}</span></h3>
          <p>Street Address: {{this.$data.credentials.address.street}} {{this.$data.credentials.number}}</p>
          <p>City, State: {{this.$data.credentials.address.city}}</p>
          <p>ZIP Code: {{this.$data.credentials.address.zip}}</p>
          <p>Phone: {{this.$data.credentials.phone}}</p>
          <p>E-mail: {{this.$data.credentials.email}}</p>
        </div>
        <div class="col-6 text-end">
          <h1>Software Developer Service&nbsp;Invoice</h1>
        </div>
      </div>

      <div class="row">
        <div class="col-6 text-start">Invoice #{{this.$data.invoice.invoice_id}}</div>
        <div class="col-6 text-end">Date: {{this.$data.invoice.invoice_date}}</div>
      </div>

      <div class="row">
        <div class="col-6">
          <h5>Client / Customer</h5>
          <p>Company name: <span class="nbs">{{this.$data.invoice.name}}</span></p>
          <p>Street Address: {{this.$data.invoice.address.street}} {{this.$data.invoice.address.number}}</p>
          <p>City, State: {{this.$data.invoice.address.city}}</p>
          <p>ZIP Code: {{this.$data.invoice.address.zip}}</p>
          <p>Phone: {{this.$data.invoice.phone}}</p>
          <p>E-mail: {{this.$data.invoice.email}}</p>
        </div>
      </div>
      <div class="row">
        <table class="table table-striped table-hover col-12">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Description</th>
              <th scope="col">Quantity</th>
              <th scope="col">Cost per Quantity</th>
              <th scope="col">Cost</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, key) in invoice.items" :key="item.id">
              <th scope="row">{{key+1}}</th>
              <td>{{item.name}}</td>
              <td>{{item.quantity}}</td>
              <td>{{item.cost_per_quantity}}{{item.per}}</td>
              <td>{{item.quantity*item.cost_per_quantity}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="row">
        <div class="col text-break">
            <div class="col-4 float-end border ms-5 mb-4">
              <div class="row">
                <div class="col-5 text-end">Subtotal:</div>
                <div class="col-7 text-start">{{subtotal}}</div>
              </div>
              <div class="row">
                <div class="col-5 text-end">Discount:</div>
                <div class="col-7 text-start">{{discount}}</div>
              </div>
              <div class="row">
                <div class="col-5 text-end">Tax:</div>
                <div class="col-7 text-start">{{tax}}</div>
              </div>
              <div class="row">
                <div class="col-5 text-end">Total:</div>
                <div class="col-7 text-start">{{total}}</div>
              </div>
            </div>

          <p class="fw-bold mt-2">Description:</p>
          <p>{{invoice.description}}</p>
          <p class="fw-bold">Payment due: {{invoice.pay_due}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import db from '@/database/stores/invoice'
import cred from "@/database/stores/credentials";

export default {
  name: "Edit",
  data: () => ({
    invoice: {
      invoice_id: '',
      name: '',
      address: {
        street: '',
        city: '',
        number: '',
        zip: '',
      },
      invoice_date: new Date().toISOString().split('T')[0],
      pay_due: new Date(Date.now()+588000000).toISOString().split('T')[0],
      description: '',
      email: '',
      items: [],
    },
    credentials: {
      name: '',
      address: {
        street: '',
        city: '',
        zip: '',
        number: '',
      },
      email: '',
      phone: '',
    }
  }),
  mounted() {
    db.fetchInvoice(this.$route.params.id).then(r => this.$data.invoice = r);
    cred.getCredentials().then(r => this.$data.credentials = r);
  },
  computed:{
    subtotal: function () {
      return this.$data.invoice.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0);
    },
    discount: function () {
      return 1;
    },
    tax: function () {
      return Number((this.subtotal*0.23).toFixed(2));
    },
    total: function () {
      return this.subtotal-this.discount+this.tax;
    },
  },
  methods:{
    check: function (nb = 1) {

      let page = document.getElementById(nb);


      if(page.clientHeight < page.scrollHeight){

        if (document.getElementById(nb+1)){
          let next = document.getElementById(nb+1);

          if (page.lastChild.lastChild.tagName=='TABLE'){
            if (next.firstChild.firstChild.tagName=='TABLE'){
              let tbody = next.firstChild.lastChild.lastChild;
              tbody.prepend(page.lastChild.lastChild.lastChild.lastElementChild);
            }
            else {
              let tableClone = page.lastChild.cloneNode(true);
              tableClone.lastChild.lastChild.innerHTML = '';
              tableClone.lastChild.lastChild.prepend(page.lastChild.lastChild.lastChild.lastElementChild);
              next.prepend(tableClone);
            }
          }
          else next.prepend(page.lastChild);

        }
        else {
          let p = this.$refs.print.firstChild.cloneNode(false);
          p.id = nb+1;

          p.appendChild(page.lastChild);

          this.$refs.print.appendChild(p);
        }
      }


      //jeżeli jest overflow powtarza,
      //w przeciwnym razie jezeli jest kolejna strona to uporządkowuje ją
      //i na końcu gdy nie ma overflow i kolejnej strony dodaje page break do ostatniego elementu każdej strony
      if(page.clientHeight < page.scrollHeight && page.childElementCount > 1) {
        this.check(nb);
      }
      else if(document.getElementById(nb+1)) {
        this.check(nb+1);
      }
      else {
        for (let i = 1; i <= nb; i++) document.getElementById(i).lastChild.style = "page-break-after: always";
      }

    }
  },
  updated() {
    this.check();
  }
}
</script>

<style scoped>

  @page {
    size: A4;
    margin: 35mm;
  }

  .a4{
    width: 21cm;
    height: 29.7cm;
    max-width: 21cm;
    max-height: 29.7cm;
    min-width: 21cm;
    min-height: 29.7cm;
  }

  .nbs{
    white-space: nowrap;
  }

  h1 {
    font-size: 2.5em;
  }
  h2 {
    font-size: 2em;
  }
  h3 {
    font-size: 1.75em;
  }
  h4 {
    font-size: 1.5em;
  }
  h5 {
    font-size: 1.25em;
  }
  h6 {
    font-size: 1em;
  }
  p {
    font-size: 1em;
  }

</style>
