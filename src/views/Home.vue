<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <div class="p-3 m-0 bg-light rounded-3">
      <h1 class="display-10 fw-bold">Income</h1>
      <canvas id="myChart" class="m-0 p-0 w-100" ref="chart1"></canvas>
    </div>
    <div class="p-3 mt-3 bg-light rounded-3">
      <h1 class="display-10 fw-bold">Upcoming</h1>

      <div class="row row-cols-3 text-center">
        <div class="col" v-for="invoice in upcoming" :key="invoice.invoice_id">
          <div class="card mb-4 rounded-3 shadow-sm">
            <div class="card-header py-3">
              <h4 class="my-0 fw-normal">
                {{ invoice.pay_due.toString() }}
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

export default {
  name: 'Home',
  data: () => ({
    income: {},
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
    const incomeChart = new Chart(this.$refs.chart1.getContext('2d'), {
      type: 'bar',
      data: {
        labels: [],
        datasets: [{
          data: [],
          backgroundColor: 'rgba(13, 110, 253,.5)'
        }]
      },
      options: {
        responsive: true,
        interaction: {
          intersect: false,
          axis: 'x'
        },
        scales: {
          y: {
            beginAtZero: false
          }
        },
        plugins: {
          legend: {
            display: false
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
      for (let inv in r){
        const today = new Date();
        if (r[inv].pay_due <= today){
          if (this.$data.income[r[inv].pay_due.toLocaleString().substring(7,0)]){
            this.$data.income[r[inv].pay_due.toLocaleString().substring(7,0)] += this.sum(r[inv].items);
          }
          else {
            this.$data.income[r[inv].pay_due.toLocaleString().substring(7,0)] = this.sum(r[inv].items);
          }
        }
        else if(new Date(r[inv].pay_due) >= new Date(today+588000000)){
          this.$data.upcoming.unshift(r[inv]);
        }
      }
      incomeChart.data.labels = Object.keys(this.$data.income);
      incomeChart.data.datasets[0].data = Object.values(this.$data.income);
      incomeChart.update();
    })

  }
}
</script>
