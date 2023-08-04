import userModel from '../models/userModel.js'
import { hashPassword } from './../helpers/authHelper.js';


export const registerController = async (req, res) => {

    try {
        const { name, email, password, phone, address } = req.body

        //validations
        if (!name) {
            return res.send({ error: "Name is Required" });
        }
        if (!email) {
            return res.send({ message: "Email is Required" });
        }
        if (!password) {
            return res.send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.send({ message: "Phone no is Required" });
        }
        if (!address) {
            return res.send({ message: "Address is Required" });
        }
        //check user 
        const existingUser = await userModel.findOne({ email });  // findone method

        //extisting user

        if (existingUser) {
            return res.status(200).send({
                success: true,
                message: 'Already Registerd please Login'
            })
        };

        //register user 
        const hashedPassword = await hashPassword(password)
        // save
        const user = await new userModel({ name, email, phone, address, password, password: hashedPassword }).save();
        res.status(201).send({
            success: true,
            message: "User Register Successfully",
            user,
        });



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Registration not Succesfull',
            error
        })
    }
}

