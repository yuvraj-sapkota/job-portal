// const User = require("../models/userSchema");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const register = async (req, res) => {
//   try {
//     const { fullname, email, phone, password, role } = req.body;
//     if (!fullname || !email || !phone || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "Please fill all the field", success: false });
//     }

//     const userExist = await User.findOne({ email });
//     if (userExist)
//       return res.status(400).josn({
//         message: "User already exists with this email",
//         success: false,
//       });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phone,
//       password: hashedPassword,
//       role,
//     });

//     return res
//       .status(201)
//       .json({ message: "Account created successfully", success: true });
//   } catch (error) {
//     console.log("error while creating account", error);
//     res
//       .status(500)
//       .json({ message: "Internal server error", error: error.message });
//   }
// };

// const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res
//         .status(400)
//         .json({ message: "Please fill all the field", success: false });
//     }
//     let user = await User.findOne({ email });
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "Incorrect email or password", success: false });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);

//     if (!isPasswordMatch) {
//       return res
//         .status(400)
//         .json({ message: "Incorrect email or password", success: false });
//     }

//     // check role is correct or not
//     if (role !== user.role) {
//       return res.status(400).json({
//         message: "Account do not exist with current role",
//         success: false,
//       });
//     }
//     const tokenData = {
//       userId: user._id,
//     };
//     const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
//       expiresIn: "1d",
//     });

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };
//     return res
//       .status(200)
//       .cookie("token", token, {
//         httpOnly: true, // prevents JS access (security)
//         secure: false, // set to true in production with HTTPS
//         sameSite: "strict", // CSRF protection
//         maxAge: 3600000, // 1 hour})
//       })
//       .json({ message: `Welcome back ${user.fullname}`, user, success: true });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Internal server error", error });
//   }
// };

// const logout = async (req, res) => {
//   try {
//     return res
//       .status(200)
//       .cookie("token", "", { maxAge: 0 })
//       .json({ message: "Logged out successfully", success: true });
//   } catch (error) {
//     console.log("Error while loggin out", error);
//   }
// };

// const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     const file = req.file;
//     if (!fullname || !email || !phoneNumber || !bio || !skills) {
//       return res
//         .status(400)
//         .json({ message: "Please fill all the field", success: false });
//     }

//     const skillsArray = skills.split(",");
//     const userId = req.id; // middleware authentication
//     let user = await User.findById(userId);
//     if (!user) {
//       return res
//         .status(400)
//         .json({ message: "User not found", success: false });
//     }

//     // updating data
//     (user.fullname = fullname), (user.email = email);
//     (user.phoneNumber = phoneNumber),
//       (user.profile.bio = bio),
//       (user.profile.skills = skillsArray);

//     await user.save();

//     user = {
//       _id: user._id,
//       fullname: user.fullname,
//       email: user.email,
//       phoneNumber: user.phoneNumber,
//       role: user.role,
//       profile: user.profile,
//     };

//     return res
//       .status(200)
//       .json({ message: "Profile updated successfully", user, success: true });
//   } catch (error) {
//     console.log("Error while updating the profile", error);
//   }
// };

// module.exports = { register, login, logout, updateProfile };

const User = require("../models/userSchema");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  try {
    const { fullname, email, password, phoneNumber, role } = req.body;
    if (!fullname || !email || !password || !phoneNumber || !role) {
      return res.status(401).json({ message: "something is missing" });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email",
        success: false,
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    await User.create({
      fullname,
      email,
      phoneNumber,
      role,
      password: hashPassword,
    });

    return res
      .status(200)
      .json({ message: "Account created successfully", success: true });
  } catch (error) {
    console.log("Error while creating account", error);
  }
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(401).json({ message: "something is missing" });
    }

    let user = await user.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Incorrect email or password", success: false });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ message: "Password don't mactch", success: false });
    }
    if (role !== user.role) {
      return res
        .status(400)
        .json({ message: "Account doesnot exist with the current role" });
    }
    const tokenData = {
      userId: user._id,
    };
    const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: `Welcome back ${user.fullname}`, user, success: true });
  } catch (error) {
    console.log("Error while login", error);
  }
};

const logout = async (req, res) => {
  try {
    return res
      .status(200)
      .cookie("token", "", { maxAge: 0 })
      .json({ message: "Logged out successfully", success: true });
  } catch (error) {
    console.log("Error while logging out", error);
  }
};

const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;
    if (!fullName || !email || !phoneNumber || !bio || !skills) {
      return res
        .status(400)
        .json({ message: "Please fill all the field", success: false });
    }

    const skillsArray = skills.split(",");
    const userId = req.id;

    let user = await User.findById(userId);
    if (!user) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }

    (user.fullname = fullname),
      (user.email = email),
      (user.phoneNumber = phoneNumber),
      (user.profile.bio = bio),
      (user.profile.skills = skillsArray);

    await user.save();

    user = {
      _id: user._id,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .json({ message: "Profile updated successfully", user, success: true });
  } catch (error) {
    console.log("Error while updating profile", error);
  }
};

module.exports = { register, login, logout };
