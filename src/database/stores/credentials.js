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
        resolve(JSON.parse(fs.readFileSync('./credentials.json'))??{
          name: '',
          address: '',
          email: '',
          phone: '',
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
