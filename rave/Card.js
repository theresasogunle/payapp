import Rave from "./library/RavePayment";

export default class Card {
  constructor({ chargedAmount, cardno, cvv, expiryMonth, expiryYear, user }) {
    const { email, firstname, lastname, phoneNumber } = user;

    this.chargedAmount = chargedAmount;
    this.cardno = cardno;
    this.cvv = cvv;
    this.expiryMonth = expiryMonth;
    this.expiryYear = expiryYear;
    this.rave = new Rave({
      publicKey: "FLWPUBK_TEST-1ba65cd2109b117eba7acc5d9dc79533-X",
      encryptionKey: "FLWSECK_TEST91579052f76f",
      amount: this.chargedAmount,
      email,
      firstname,
      lastname,
      phoneNumber
    });
  }

  async initiatecharge() {
    try {
      const charge = await this.rave.initiatecharge({
        cardno: this.cardno.replace(/\s/g, ""),
        cvv: this.cvv.replace(/\s/g, ""),
        expirymonth: this.expiryMonth.replace(/\s/g, ""),
        expiryyear: this.expiryYear.replace(/\s/g, "")
      });
      return charge;
    } catch (error) {
      throw new Error(error);
      console.log(error);
    }
  }
  async pinCharge(pin) {
    try {
      const charge = await this.rave.pinCharge({
        cardno: this.cardno.replace(/\s/g, ""),
        cvv: this.cvv.replace(/\s/g, ""),
        expirymonth: this.expiryMonth.replace(/\s/g, ""),
        expiryyear: this.expiryYear.replace(/\s/g, ""),
        pin,
        suggested_auth: 'PIN'
      })
      return charge;
    } catch (error) {
      throw new Error(error);
    }
  }
}
