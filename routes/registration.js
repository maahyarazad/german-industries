const express = require('express');
const router = express.Router();
const dbService = require("../services/dbService");
const {email_reset_password} = require("../services/emailService");
const multer = require("multer");
const bcrypt = require('bcrypt');


const path = require("path");
const fs = require("fs");

const hashPassword = async (plainPassword) => {
    const saltRounds = 10; // recommended 10–12
    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
    return hashedPassword;
};

function generatePassword(length = 5) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pwd = "";
  for (let i = 0; i < length; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return pwd;
}

const upload = multer({ 
    storage: multer.memoryStorage()
    , limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB max

router.post("/registration", upload.single('attachment_file'), async (req, res) => {
    try {
        
        const table_name = "users";
        req.body.role = "user";
        const initialPassword = generatePassword();
        req.body.password_hash = await hashPassword(initialPassword);
        const duplicateRecord = await dbService.countExact(table_name, 'email', req.body.email);
        if(duplicateRecord.count > 0){
           return res.json({ 
                status: false, 
                message: "This email has already been taken. Please use a different one." 
            });
        }

        const create_result = await dbService.createSafe(table_name, req.body);
       if (create_result.status) {
            await email_reset_password({ email: req.body.email, password: initialPassword });
            return res.json({
                status: true,
                message: "Your account has been created successfully. A temporary password has been sent to your email. Please use it to log in and reset your password.",
                create_result
            });
        }


        return res.json({ status: false, message: create_result.error });

    } catch (error) {
        console.error("Edit error:", error);
        res.status(500).json({ status: false, message: "Server error" });
    }
});

router.get('/registration', async (req, res) => {
  try {
  
    const { filters, data } = await dbService.QuerySqlConverter(req.query, "registration");
    
    const total = await dbService.getTotalCount("registration", filters);

    return res.json({
      status: true,
      data,
      total
    });
    
  } catch (error) {
    console.error("Error in /registration:", error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
});

router.get('/registration-csv-data', async (req, res) => {
  try {
  
    const data = await dbService.findAll("registration");
    
    const csv = await exportTableAsCSV(data); // Await CSV generation

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=registration-data-${Date.now()}.csv`
    );

    res.send(csv); // Send the actual CSV string
    
  } catch (error) {
    console.error("Error in fetching data from sql server:", error);
    res.status(500).json({ status: false, message: 'Server error' });
  }
});

function formatDateToMySQL(date) {
  const pad = (n) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ` +
         `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}



module.exports = router;