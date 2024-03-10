const midtransClient = require("midtrans-client");
const { User } = require("../models");
// Create Snap API instance

module.exports = class MidtransController {
  static async getMidtransToken(req, res, next) {
    try {
        const {id} = req.user
        const userToPaid = await User.findByPk(id)

      let snap = new midtransClient.Snap({
        // Set to true if you want Production Environment (accept real transaction).
        isProduction: false,
        serverKey: process.env.MIDTRANS_SERVER_KEY,
      });
      let num = Math.floor(Math.random() * 90000) + 10000;

      let parameter = {
        transaction_details: {
          order_id: `YOUR-ORDERID-${num}`,
          gross_amount: 10000,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          email: userToPaid.email,
          phone: userToPaid.phoneNumber,
        },
      };

      snap.createTransaction(parameter).then((transaction) => {
        // transaction token
        let transactionToken = transaction.token;
        res.json({transactionToken});
        // console.log("transactionToken:", transactionToken);
      });

    } catch (err) {
      next(err);
    }
  }
};
