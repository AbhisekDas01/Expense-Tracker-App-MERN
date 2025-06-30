import mongoose from "mongoose";
import bcrypt  from "bcryptjs";

const UserSchema = new mongoose.Schema({

    fullName: {
        type : String,
        required : [true , 'Name is required'],
        trim : true
    },
    email : {
        type : String,
        required : [true , "Email is required"],
        unique : true,
        lowercase: true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    },
    password : {
        type: String,
        required : true
    },
    profileImageUrl : {
        type: String ,
        default : null
    }
} , {timestamps : true});


//hash passwords before saving 
UserSchema.pre('save' , async function(next){

    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password , salt);
    next();
})

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword , this.password);
    
}

const User = mongoose.model("User" , UserSchema);
export default User;