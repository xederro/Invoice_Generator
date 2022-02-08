const Ajv = require('ajv')
const credentialsSchema = require('../schemas/credentials')
const fs = require('fs')

class Credentials {

  constructor() {
    this.ajv = new Ajv({
      allErrors: true,
      useDefaults: true
    });

    this.schemaValidator = this.ajv.compile(credentialsSchema)
  }

  getCredentials () {
    return new Promise((resolve, reject) => {
      try {
        let cred = fs.readFileSync('./credentials.json');
        if (cred) {
          resolve(JSON.parse(cred))
        }
        else resolve({
          name: '',
          address: {
            street: '',
            city: '',
            zip: '',
            number: '',
          },
          email: '',
          phone: '',
          currency: '',
          tax: 0,
          img: 'data:image/png;base64,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',
        })
      }
      catch (e) {
        reject(e)
      }
    });
  }

  setCredentials (payload) {
    if (this.schemaValidator(payload)){
      return new Promise((resolve, reject) => {
        try {
          fs.writeFileSync('./credentials.json', JSON.stringify(payload))
          resolve(1)
        }
        catch (e) {
          reject(e)
        }
      });
    }
  }
}

export default new Credentials()
