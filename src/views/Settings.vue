<template>
  <div class="container-sm mx-sm-auto p-sm-0 my-5">
    <form @submit.prevent="handleSet" class="row g-3">
      <div class="form-floating col-6">
        <input v-model="credentials.name" type="text" class="form-control" maxlength="500" id="name" required>
        <label for="name" class="form-label">Name</label>
      </div>
      <div class="form-floating col-3">
        <input v-model="credentials.email" type="email" maxlength="500" class="form-control" id="email" pattern="[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?" required>
        <label for="email" class="form-label">Email address</label>
      </div>
      <div class="form-floating col-3">
        <input v-model="credentials.phone" pattern="^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$" type="text" class="form-control" id="phone" required>
        <label for="phone" class="form-label">Phone number</label>
      </div>
      <div class="form-floating col-4">
        <input v-model="credentials.address.street" type="text" maxlength="250" class="form-control" id="street" required>
        <label for="street" class="form-label">Street</label>
      </div>
      <div class="form-floating col-2">
        <input v-model="credentials.address.number" type="text" class="form-control" maxlength="15" id="number" required>
        <label for="street" class="form-label">Building Number</label>
      </div>
      <div class="form-floating col-2">
        <input v-model="credentials.address.zip" maxlength="15" pattern="(^\d{1,5}([ \-]\d{1,5})?$)|(^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1}[ \-]\d{1}[A-Z]{1}\d{1}$)" type="text" class="form-control" id="zip" required>
        <label for="zip" class="form-label">ZIP code</label>
      </div>
      <div class="form-floating col-2">
        <input v-model="credentials.address.city" maxlength="250" type="text" pattern="^\D*$" class="form-control" id="city" required>
        <label for="city" class="form-label">City, State</label>
      </div>
      <div class="form-floating col-2">
        <select v-model="credentials.currency" class="form-select" id="currency" required>
          <option value='AFA'>Afghanistan afghani</option>
          <option value='ALL'>Albanian lek</option>
          <option value='DZD'>Algerian dinar</option>
          <option value='AOR'>Angolan kwanza reajustado</option>
          <option value='ARS'>Argentine peso</option>
          <option value='AMD'>Armenian dram</option>
          <option value='AWG'>Aruban guilder</option>
          <option value='AUD'>Australian dollar</option>
          <option value='AZN'>Azerbaijanian new manat</option>
          <option value='BSD'>Bahamian dollar</option>
          <option value='BHD'>Bahraini dinar</option>
          <option value='BDT'>Bangladeshi taka</option>
          <option value='BBD'>Barbados dollar</option>
          <option value='BYN'>Belarusian ruble</option>
          <option value='BZD'>Belize dollar</option>
          <option value='BMD'>Bermudian dollar</option>
          <option value='BTN'>Bhutan ngultrum</option>
          <option value='BOB'>Bolivian boliviano</option>
          <option value='BWP'>Botswana pula</option>
          <option value='BRL'>Brazilian real</option>
          <option value='GBP'>British pound</option>
          <option value='BND'>Brunei dollar</option>
          <option value='BGN'>Bulgarian lev</option>
          <option value='BIF'>Burundi franc</option>
          <option value='KHR'>Cambodian riel</option>
          <option value='CAD'>Canadian dollar</option>
          <option value='CVE'>Cape Verde escudo</option>
          <option value='KYD'>Cayman Islands dollar</option>
          <option value='XOF'>CFA franc BCEAO</option>
          <option value='XAF'>CFA franc BEAC</option>
          <option value='XPF'>CFP franc</option>
          <option value='CLP'>Chilean peso</option>
          <option value='CNY'>Chinese yuan renminbi</option>
          <option value='COP'>Colombian peso</option>
          <option value='KMF'>Comoros franc</option>
          <option value='CDF'>Congolese franc</option>
          <option value='CRC'>Costa Rican colon</option>
          <option value='HRK'>Croatian kuna</option>
          <option value='CUP'>Cuban peso</option>
          <option value='CZK'>Czech koruna</option>
          <option value='DKK'>Danish kronev</option>
          <option value='DJF'>Djibouti franc</option>
          <option value='DOP'>Dominican peso</option>
          <option value='XCD'>East Caribbean dollar</option>
          <option value='EGP'>Egyptian pound</option>
          <option value='SVC'>El Salvador colon</option>
          <option value='ERN'>Eritrean nakfa</option>
          <option value='EEK'>Estonian kroon</option>
          <option value='ETB'>Ethiopian birr</option>
          <option value='EUR' selected>EU euro</option>
          <option value='FKP'>Falkland Islands pound</option>
          <option value='FJD'>Fiji dollar</option>
          <option value='GMD'>Gambian dalasi</option>
          <option value='GEL'>Georgian lari</option>
          <option value='GHS'>Ghanaian new cedi</option>
          <option value='GIP'>Gibraltar pound</option>
          <option value='XAU'>Gold (ounce)</option>
          <option value='XFO'>Gold franc</option>
          <option value='GTQ'>Guatemalan quetzal</option>
          <option value='GNF'>Guinean franc</option>
          <option value='GYD'>Guyana dollar</option>
          <option value='HTG'>Haitian gourde</option>
          <option value='HNL'>Honduran lempira</option>
          <option value='HKD'>Hong Kong SAR dollar</option>
          <option value='HUF'>Hungarian forint</option>
          <option value='ISK'>Icelandic krona</option>
          <option value='XDR'>IMF special drawing right</option>
          <option value='INR'>Indian rupee</option>
          <option value='IDR'>Indonesian rupiah</option>
          <option value='IRR'>Iranian rial</option>
          <option value='IQD'>Iraqi dinar</option>
          <option value='ILS'>Israeli new shekel</option>
          <option value='JMD'>Jamaican dollar</option>
          <option value='JPY'>Japanese yen</option>
          <option value='JOD'>Jordanian dinar</option>
          <option value='KZT'>Kazakh tenge</option>
          <option value='KES'>Kenyan shilling</option>
          <option value='KWD'>Kuwaiti dinar</option>
          <option value='KGS'>Kyrgyz som</option>
          <option value='LAK'>Lao kip</option>
          <option value='LVL'>Latvian lats</option>
          <option value='LBP'>Lebanese pound</option>
          <option value='LSL'>Lesotho loti</option>
          <option value='LRD'>Liberian dollar</option>
          <option value='LYD'>Libyan dinar</option>
          <option value='LTL'>Lithuanian litas</option>
          <option value='MOP'>Macao SAR pataca</option>
          <option value='MKD'>Macedonian denar</option>
          <option value='MGA'>Malagasy ariary</option>
          <option value='MWK'>Malawi kwacha</option>
          <option value='MYR'>Malaysian ringgit</option>
          <option value='MVR'>Maldivian rufiyaa</option>
          <option value='MRO'>Mauritanian ouguiya</option>
          <option value='MUR'>Mauritius rupee</option>
          <option value='MXN'>Mexican peso</option>
          <option value='MDL'>Moldovan leu</option>
          <option value='MNT'>Mongolian tugrik</option>
          <option value='MAD'>Moroccan dirham</option>
          <option value='MZN'>Mozambique new metical</option>
          <option value='MMK'>Myanmar kyat</option>
          <option value='NAD'>Namibian dollar</option>
          <option value='NPR'>Nepalese rupee</option>
          <option value='ANG'>Netherlands Antillian guilder</option>
          <option value='NZD'>New Zealand dollar</option>
          <option value='NIO'>Nicaraguan cordoba oro</option>
          <option value='NGN'>Nigerian naira</option>
          <option value='KPW'>North Korean won</option>
          <option value='NOK'>Norwegian krone</option>
          <option value='OMR'>Omani rial</option>
          <option value='PKR'>Pakistani rupee</option>
          <option value='XPD'>Palladium (ounce)</option>
          <option value='PAB'>Panamanian balboa</option>
          <option value='PGK'>Papua New Guinea kina</option>
          <option value='PYG'>Paraguayan guarani</option>
          <option value='PEN'>Peruvian nuevo sol</option>
          <option value='PHP'>Philippine peso</option>
          <option value='XPT'>Platinum (ounce)</option>
          <option value='PLN'>Polish zloty</option>
          <option value='QAR'>Qatari rial</option>
          <option value='RON'>Romanian new leu</option>
          <option value='RUB'>Russian ruble</option>
          <option value='RWF'>Rwandan franc</option>
          <option value='SHP'>Saint Helena pound</option>
          <option value='WST'>Samoan tala</option>
          <option value='STD'>Sao Tome and Principe dobra</option>
          <option value='SAR'>Saudi riyal</option>
          <option value='RSD'>Serbian dinar</option>
          <option value='SCR'>Seychelles rupee</option>
          <option value='SLL'>Sierra Leone leone</option>
          <option value='XAG'>Silver (ounce)</option>
          <option value='SGD'>Singapore dollar</option>
          <option value='SBD'>Solomon Islands dollar</option>
          <option value='SOS'>Somali shilling</option>
          <option value='ZAR'>South African rand</option>
          <option value='KRW'>South Korean won</option>
          <option value='LKR'>Sri Lanka rupee</option>
          <option value='SDG'>Sudanese pound</option>
          <option value='SRD'>Suriname dollar</option>
          <option value='SZL'>Swaziland lilangeni</option>
          <option value='SEK'>Swedish krona</option>
          <option value='CHF'>Swiss franc</option>
          <option value='SYP'>Syrian pound</option>
          <option value='TWD'>Taiwan New dollar</option>
          <option value='TJS'>Tajik somoni</option>
          <option value='TZS'>Tanzanian shilling</option>
          <option value='THB'>Thai baht</option>
          <option value='TOP'>Tongan pa'anga</option>
          <option value='TTD'>Trinidad and Tobago dollar</option>
          <option value='TND'>Tunisian dinar</option>
          <option value='TRY'>Turkish lira</option>
          <option value='TMT'>Turkmen new manat</option>
          <option value='AED'>UAE dirham</option>
          <option value='UGX'>Uganda new shilling</option>
          <option value='XFU'>UIC franc</option>
          <option value='UAH'>Ukrainian hryvnia</option>
          <option value='UYU'>Uruguayan peso uruguayo</option>
          <option value='USD'>US dollar</option>
          <option value='UZS'>Uzbekistani sum</option>
          <option value='VUV'>Vanuatu vatu</option>
          <option value='VEF'>Venezuelan bolivar fuerte</option>
          <option value='VND'>Vietnamese dong</option>
          <option value='YER'>Yemeni rial</option>
          <option value='ZMK'>Zambian kwacha</option>
          <option value='ZWL'>Zimbabwe dollar</option>

        </select>
        <label for="currency" class="form-label">Currency</label>
      </div>
      <div class="col-6">
        <div class="input-group input-group-lg">
          <label class="input-group-text" for="logo">Upload logo</label>
          <input @change="changeImg" type="file" class="form-control" id="logo" accept="image/*" ref="fileInput">
        </div>

        <span class="input-group-text bg-white mt-3">
          <img class="img-fluid" :src="credentials.img" alt="Logo">
        </span>
      </div>
      <div class="form-floating col-2">
        <input v-model="credentials.tax" type="number" class="form-control" id="tax" step=".1" min="0" max="100" required>
        <label for="tax" class="form-label">Tax [%]</label>
      </div>
      <div class="form-floating col-12">
        <button type="submit" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script>

export default {
  name: 'Settings',
  data: () => ({
    credentials: {
      name: '',
      address: {
        street: '',
        city: '',
        number: '',
        zip: '',
      },
      email: '',
      phone: '',
      currency: 'EUR',
      img: 'data:image/png;base64,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',
      tax: 0,
    }
  }),
  methods: {
    readFile(file) {
      return new Promise((resolve, reject) => {
        let reader = new FileReader();

        reader.onload = () => {
          resolve(reader.result);
        };

        reader.onerror = reject;

        reader.readAsDataURL(file);
      })
    },
    handleSet() {
      window.api.send('setCredentials', JSON.stringify(this.$data.credentials))
      window.api.receive('setCredentials', (r) => {
        if (r==1){
          this.$router.push('/list');
          window.api.send('toast', 'success');
        }
        else window.api.send('toast', 'error');
      })
    },
    handleGet() {
      window.api.send('getCredentials')
      window.api.receive('getCredentials', (r) => this.$data.credentials = r)
    },
    changeImg() {
      this.readFile(this.$refs.fileInput.files[0])
          .then((r) => this.$data.credentials.img = r);
    }
  },
  mounted() {
    this.handleGet()
  }
}
</script>

<style scoped>
::-webkit-file-upload-button {
  display: none;
}

.img-fluid{
  max-height: 200px;
}

input[type=file]{
  height: 3.7rem
}
</style>
