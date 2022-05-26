<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <div class="p-3 m-0 bg-light rounded-3">
      <h1 class="display-10 fw-bold">Balance</h1>
      <canvas id="chart1" class="m-0 p-0 w-100" ref="chart1"></canvas>
    </div>
    <div class="p-3 mt-3 bg-light rounded-3" v-if="upcoming">
      <h1 class="display-10 fw-bold">Upcoming</h1>

      <div class="row row-cols-3 text-center">
        <div class="col" v-for="invoice in upcoming" :key="invoice.invoice_id">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">
                To: {{ invoice.pay_due }}
              </h4>
            </div>
            <div class="card-body">
              <h1 class="card-title pricing-card-title">{{ currency }}{{ this.suma(invoice.items) }}</h1>
              <ul class="list-unstyled mt-3 mb-4">
                <li>{{ invoice.name }}</li>
              </ul>
              <router-link class="w-100 btn btn-lg btn-outline-primary" :to="{ name: 'Invoice', params: { id: invoice.invoice_id }}">Check Invoice</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'
import annotationPlugin from 'chartjs-plugin-annotation';

export default {
  name: 'Home',
  data: () => ({
    paid: {},
    notPaid: {},
    late: {},
    upcoming: [],
    currency: String,
  }),
  methods: {
    suma: function (items){
      let sum = 0;
      for (let item in items){
        sum += items[item].cost_per_quantity * items[item].quantity;

      }
      return sum;
    }
  },
  mounted() {

    function sortObject(object){
      return Object.keys(object).sort().reduce(
          (obj, key) => {
            obj[key] = object[key];
            return obj;
          },
          {}
      );
    }

    function completeValues(object, labels){
      let ordered = sortObject(object);
      let allValues = [];

      labels.forEach(label=>{
        allValues.push(ordered[label]??0)
      })

      return allValues;
    }

    Chart.register(annotationPlugin);
    const incomeChart = new Chart(this.$refs.chart1.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [],
        datasets: [
          {
            label: 'Paid',
            data: [],
            backgroundColor: "#198754",
          },
          {
            label: 'in time',
            data: [],
            backgroundColor: "#ffc107",
          },
          {
            label: 'not in time',
            data: [],
            backgroundColor: "#dc3545",
          },
        ]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x'
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true,
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: false
          },
          annotation: {
            annotations: {
              line: {
                type: 'line',
                label: {
                  content: "Max Monthly",
                  enabled: true
                },
                value: 1505,
                endValue: 1505,
                scaleID: 'y',
                borderColor: 'rgb(255, 99, 132)',
                borderWidth: 2
              }
            }
          }
        }
      }
    });

    window.api.send('getCredentials')
    window.api.receive('getCredentials',(r) => {
      this.$data.currency = r.currency;
    })

    window.api.send('fetchAllInvoices')
    window.api.receive('fetchAllInvoices',(r) => {
      let labels = [];

      r.forEach(inv=>{
        if(!labels.includes(inv.invoice_date.substring(7,0))){
          labels.push(inv.invoice_date.substring(7,0))
        }

        if (inv.payed){
          if (this.$data.paid[inv.invoice_date.substring(7,0)]){
            this.$data.paid[inv.invoice_date.substring(7,0)] += Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
          }
          else {
            this.$data.paid[inv.invoice_date.substring(7,0)] = Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
          }
        }
        else {
          const today = new Date();
          if (new Date(inv.pay_due) <= today){
            if (this.$data.late[inv.invoice_date.substring(7,0)]){
              this.$data.late[inv.invoice_date.substring(7,0)] += Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
            }
            else {
              this.$data.late[inv.invoice_date.substring(7,0)] = Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
            }
          }
          else {
            if (this.$data.notPaid[inv.invoice_date.substring(7,0)]){
              this.$data.notPaid[inv.invoice_date.substring(7,0)] += Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
            }
            else {
              this.$data.notPaid[inv.invoice_date.substring(7,0)] = Number(inv.items.reduce((a,b)=>a+(b.quantity*b.cost_per_quantity), 0)) - inv.discount;
            }
          }

          if(new Date(inv.pay_due) <= new Date(today+588000000)){
            this.$data.upcoming.unshift(inv);
          }
        }
      })

      console.log(this.$data.paid)

      incomeChart.data.labels = labels.sort();
      incomeChart.data.datasets[0].data = completeValues(this.$data.paid, labels);
      incomeChart.data.datasets[1].data = completeValues(this.$data.notPaid, labels);
      incomeChart.data.datasets[2].data = completeValues(this.$data.late, labels);
      incomeChart.update();
    })

  }
}
</script>
