const Employee = require("../model/employeeModel");


exports.createEmployee = async (req, res) => {
  try {
    
    const { name, email, mobile, designation, gender, course } = req.body;
    console.log(req.body);

    if (!name) {
      return res.status(400).json({ message: "Name is required." });
    }

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }
    
    if (!mobile) {
      return res.status(400).json({ message: "Mobile number is required." });
    }

    if (mobile.length < 10 || mobile.length > 15) {
      return res.status(400).json({ message: "Invalid mobile number." });
    }

    if (!designation) {
      return res.status(400).json({ message: "Designation is required." });
    }

    if (!gender) {
      return res.status(400).json({ message: "Gender is required." });
    }

    if (!course) {
      return res.status(400).json({ message: "Course is required." });
    }

    
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ message: "Employee with this email already exists." });
    }

    
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    
    const imagePath = req.file.filename;
    const imageUrl = `${req.protocol}://${req.get(
      "host"
    )}/uploads/${imagePath}`;

    const employee = new Employee({
      name,
      email,
      mobile,
      designation,
      gender,
      course,
      image: imageUrl,
    });
    await employee.save();

    res
      .status(201)
      .json({ message: "Employee created successfully", employee });
  } catch (error) {
    res.status(400).json({ message: "Error creating employee", error });
  }
};

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    
    const { name, email, mobile, designation, gender, course } = req.body;

    
    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    };

    
    if (req.file) {
      
      const imagePath = req.file.filename;
      updatedData.image = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${imagePath}`; 
    }

    
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    
    res
      .status(200)
      .json({
        message: "Employee updated successfully",
        data: updatedEmployee,
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};

exports.DeleteEmployee = async (req, res) => {
  try {
    const id = req.params.id;
    
    const deletedEmployee = await Employee.findByIdAndDelete(id,{
        new:true
    }
    );
    if (!deletedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};



exports.adminLogin = async(req,res)=>{
    const{text,password}  = req.body
    console.log(req.body)
    if( password === "DealsDray@123"){
        res.status(200).json({message : "Login Success"})
    }
    else{
        res.status(401).json({message : "Invalid Credentials"})
    }
}
