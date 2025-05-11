const Admin = require("../../models/Authentication/Admin-schema");
const Officers = require("../../models/Authentication/Officer-schema");
const Complaints = require("../../models/Complaint-schema");
const mongoose = require("mongoose");

exports.login = async (req, res) => {
    try {
        console.log(req.body); // Log the request body to see received data

        const { name, password } = req.body; // Extract name and password from request

        // Find admin by name
        const admin = await Admin.findOne({ name });

        if (!admin) {
            return res.status(401).send("Unauthorized: Admin not found");
        }

        // Check password
        if (admin.password !== password) {
            return res.status(401).send("Unauthorized: Incorrect password");
        }

        // Fetch complaints and officers
        const complaints = await Complaints.find();
        const officers = await Officers.find();

        // Render the Admin Dashboard with complaints and officers
        res.render("AdminDashboard", { complaints, officers });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send("Internal Server Error");
    }
};