const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');



const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /.+\@.+\..+/
    },
    phoneno:{
        type:String,
    },
    role: {
        type: String,
        enum: ['admin', 'student','counsellor'],
        default: 'student'
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
 isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpiry: Date,
    
})


// Hash password before saving
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};      

module.exports = mongoose.model('User', userSchema);