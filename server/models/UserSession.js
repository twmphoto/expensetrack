const mongoose = require('mongoose');

const UserSessionSchema = new mongoose.Schema({
  userId: {
    type: String,
    default: ''
  },
  timeStamp: {
    type: Date,
    default: Date.now()
  },
  itemName:{
    type: String,
    default: ''
  },
  date: {
    type: Date,
    min: '2000-01-01',
    max: '2022-12-31'  
  },
  price: {
    type: Number,
    get: getPrice,
    set: setPrice,
    default: 0 
  },
  category: {
    type: String,
    default: ''
  },

  isDeleted: {
      type: Boolean,
      default: false
  }



});

function getPrice(num){
    return (num/100).toFixed(2);
}

function setPrice(num){
    return num*100
}


module.exports = mongoose.model('UserSession', UserSessionSchema);
