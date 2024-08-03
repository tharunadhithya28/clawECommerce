const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  user_id: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
},
  session_start: 
  { 
    type: Date, 
    default: Date.now 
},
  session_end: 
  { 
    type: Date 
},
  ip_address: 
  { 
    type: String 
}
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
