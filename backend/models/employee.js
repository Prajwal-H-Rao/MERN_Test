import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
        }
    },
    mobile: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^\d{10}$/.test(v);
            },
            message: props => `${props.value} is not a valid mobile number!`
        }
    },
    designation: {
        type: String,
        enum:['HR','Manager','Sales'],
        required: true
    },
    gender: {
        type: String,
        enum: ['M', 'F'],
        required: true
    },
    course: {
        type: String,
        required: true
    },
    createdate: {
        type: Date,
        default: Date.now
    }
});

const employeeModel = mongoose.model('Employee',employeeSchema);

export default employeeModel;