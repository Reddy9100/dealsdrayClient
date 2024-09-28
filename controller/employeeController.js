const Employee = require("../model/employeeModel");

// Controller to create an employee
exports.createEmployee = async (req, res) => {
  try {
    // Extract fields from req.body and req.file
    const { name, email, mobile, designation, gender, course } = req.body;
    console.log(req.body);

    // Ensure req.file exists
    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }

    // Construct image URL
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

    // Extract fields from the request body
    const { name, email, mobile, designation, gender, course } = req.body;

    // Prepare update object
    const updatedData = {
      name,
      email,
      mobile,
      designation,
      gender,
      course,
    };

    // Handle file upload if an image is provided
    if (req.file) {
      // Assuming you're saving the file path in the database
      const imagePath = req.file.filename;
      updatedData.image = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${imagePath}`; // Adjust as per your storage strategy
    }

    // Find and update the employee by ID
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true, 
      runValidators: true, 
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    // Send response with updated employee data
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
