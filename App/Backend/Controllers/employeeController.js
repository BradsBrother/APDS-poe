const axios = require('axios');
const employeeModel = require("../Models/employeeModel");
const jwt = require("jsonwebtoken");

const createToken = (employee) => {
    const payload = {
        name: employee.name,
        employee_id: employee.employee_id,
    };

    return jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "15m" });
};

const getEmployeePassword = async (req, res) => {
    const { password } = req.body;

    try {
        const output = await employeeModel.getEmployeePassword(password);
        res.status(200).json({ output });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const loginEmployee = async (req, res) => {
    const { employee_id, password } = req.body;
    const recaptchaToken = req.headers['recaptcha-token'];

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    const recaptchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaToken}`;

    try {
        const response = await axios.post(recaptchaUrl);
        const { success, score, 'error-codes': errorCodes } = response.data;

        if (!success || score < 0.5) {
            console.error('Failed CAPTCHA verification', errorCodes);
            throw new Error('Failed CAPTCHA verification');
        }

        const user = await employeeModel.loginEmployee(employee_id, password);
        const token = createToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 15 * 60 * 1000,
            sameSite: "strict",
        });

        res.status(200).json({ message: "Success" });
    } catch (error) {
        console.error("Error in loginEmployee:", error.message); // Log detailed error
        res.status(400).json({ error: error.message });
    }
};

const logoutEmployee = (req, res) => {
    res.cookie("token", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
    });

    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
};

module.exports = {
    loginEmployee,
    logoutEmployee,
    getEmployeePassword
};



