import bcrypt from 'bcrypt'
// bcrypt use to create encripted password

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds)  //bcrypt   password hash function 
        return hashedPassword;
    } catch (error) {
        console.log(error)
    }
};


export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);  // bcrypt password compare function 
}


