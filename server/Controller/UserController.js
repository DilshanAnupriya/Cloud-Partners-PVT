const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../Model/UserModel');
const JWT_SECRET = process.env.JWT_SECRET;
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


// Email transporter configuration
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
    }
});

const signUp = async (req, res) => {
    try {
        const {username,password,email,role} = req.body;
        const userExist = await User.findOne({username});
        if (userExist) {
            return res.status(409).json({error: 'User already exists'});
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const userObj = new User({
            username,
            password:hashedPassword,
            email,
            role,
            isActive: true
        });
        await userObj.save();
        res.status(201).json({message:"User successfully registered...",data:userObj});
    }catch (e){
        res.status(500).json({error: e.message});
    }
}

const logIn = async (req, res) => {
    try {
        const {username,password} = req.body;
        const userExist = await User.findOne({username });
        if (!userExist) {
            return res.status(401).json({error: 'Invalid credentials'});
        }
        const isMatch = await bcrypt.compare(password, userExist.password);
        if (!isMatch) {
            return res.status(401).json({error: 'Invalid password !'});
        }
        const payload = {userId:userExist._id,username:username,role:userExist.role};
        const token = jwt.sign(payload,JWT_SECRET,{expiresIn: '10h'});
        res.status(200).json({message:"Login Success !",token:token});
    }catch (e){
        res.status(500).json({error: e.message});
    }
}

const getAllUsers = async (req, res) => {
    try{
        const { searchText='',page=1,size=10} = req.query;
        const filter= searchText?{$or:[
                {username:{$regex:searchText,$options:"i"}},
                {role:{$regex:searchText,$options:"i"}},
                {email:{$regex:searchText,$options:"i"}}

            ]}:{};
        const allUsers = await User.find(filter)
            .sort({ createdAt: -1 })
            .skip((page-1)*size)
            .limit(parseInt(size));
        const count = await User.countDocuments(filter);
        res.status(200).json({
            success: true,
            message:"Users List.....",
            data: allUsers,
            count: count
        });
    }catch(e){
        res.status(500).json({
            success: false,
            error: e.message
        });
    }
}

const getByUserId = async (req, res) => {
    try{
        const selectedUser = await User.findById(req.user._id);
        if(!selectedUser){
            return  res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"User found successfully.",User:selectedUser});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

const getByUserID = async (req, res) => {
    try{
        const selectedUser = await User.findById(req.params.id);
        if(!selectedUser){
            return  res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"User found successfully.",User:selectedUser});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

const updateUser = async (req, res) => {
    try {
        // Get user ID from authenticated user (from JWT token via middleware)
        const userId = req.user._id;

        console.log('Updating user:', userId);
        console.log('Update data:', req.body);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).select('-password'); // Exclude password but include everything else

        if (!updatedUser) {
            console.log('User not found with ID:', userId);
            return res.status(404).json({ message: "User not found" });
        }

        console.log('User updated successfully:', updatedUser);

        res.status(200).json({
            message: `${updatedUser.username} updated successfully`,
            updateUser: updatedUser
        });
    } catch (e) {
        console.error('Update user error:', e);
        res.status(500).json({ error: e.message });
    }
};

const deleteUser = async (req, res) => {
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if(!deleteUser){
            return res.status(404).json({message:"Not Found"});
        }
        res.status(200).json({message:"User deleted",user:deleteUser});
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

// Forgot Password - Send reset link to email
const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ error: 'Email is required' });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ error: 'No user found with this email address' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');

        // Hash token and save to database
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(resetToken)
            .digest('hex');

        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        // Email message
        const message = `
            <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #333;">Password Reset Request</h2>
                <p>Hi ${user.username},</p>
                <p>You requested to reset your password. Click the button below to reset it:</p>
                <div style="text-align: center; margin: 30px 0;">
                    <a href="${resetUrl}" 
                       style="background-color: #4CAF50; color: white; padding: 12px 30px; 
                              text-decoration: none; border-radius: 5px; display: inline-block;">
                        Reset Password
                    </a>
                </div>
                <p>Or copy and paste this link in your browser:</p>
                <p style="background-color: #f4f4f4; padding: 10px; word-break: break-all;">
                    ${resetUrl}
                </p>
                <p style="color: #666; font-size: 14px;">
                    This link will expire in 15 minutes.
                </p>
                <p style="color: #666; font-size: 14px;">
                    If you didn't request this password reset, please ignore this email.
                </p>
            </div>
        `;

        // Send email
        await transporter.sendMail({
            from: `"Your App" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Password Reset Request',
            html: message
        });

        res.status(200).json({
            message: `Password reset link has been sent to your email ${resetToken}`,
            success: true
        });
    } catch (e) {
        // Clear reset token if email fails
        if (user) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
            await user.save();
        }
        res.status(500).json({ error: 'Email could not be sent. Please try again later.' });
    }
};

// Reset Password - Update password with token
const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        if (password.length < 6) {
            return res.status(400).json({ error: 'Password must be at least 6 characters long' });
        }

        // Hash the token from URL
        const resetTokenHash = crypto
            .createHash('sha256')
            .update(token)
            .digest('hex');

        // Find user with valid token that hasn't expired
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({
                error: 'Password reset token is invalid or has expired'
            });
        }

        // Hash new password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Clear reset token fields
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({
            message: 'Password has been reset successfully. You can now login with your new password.',
            success: true
        });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};
const updateUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Get user ID from URL parameter
        const updateData = req.body;

        console.log('Updating user by ID:', userId);
        console.log('Update data:', updateData);

        // Hash password if it's being updated
        if (updateData.password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(updateData.password, salt);
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).select('-password');

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: `${updatedUser.username} updated successfully`,
            updateUser: updatedUser
        });
    } catch (e) {
        console.error('Update user by ID error:', e);
        res.status(500).json({ error: e.message });
    }
};


const googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        if (!credential) {
            return res.status(400).json({ error: 'Google credential is required' });
        }

        // Verify Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;

        // Check if email domain is allowed (optional - for cloudpartners.biz only)
        if (!email.endsWith('@cloudpartners.biz')) {
            return res.status(403).json({ 
                error: 'Only @cloudpartners.biz email addresses are allowed' 
            });
        }

        // Check if user exists
        let user = await User.findOne({ email });

        if (!user) {
            // Create new user with Google account
            const username = email.split('@')[0]; // Use email prefix as username
            
            // Generate a random secure password (user won't use it for Google login)
            const randomPassword = crypto.randomBytes(32).toString('hex');
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(randomPassword, salt);

            user = new User({
                username,
                email,
                password: hashedPassword,
                role: ['Developer'], // Default role, you can customize this
                isActive: true,
                googleId,
                profilePicture: picture,
                authProvider: 'google'
            });

            await user.save();
        } else {
            // Update existing user with Google ID if not set
            if (!user.googleId) {
                user.googleId = googleId;
                user.authProvider = user.authProvider || 'google';
                user.profilePicture = user.profilePicture || picture;
                await user.save();
            }
        }

        // Generate JWT token
        const jwtPayload = {
            userId: user._id,
            username: user.username,
            role: user.role,
            email: user.email
        };
        
        const token = jwt.sign(jwtPayload, JWT_SECRET, { expiresIn: '10h' });

        res.status(200).json({
            message: 'Google login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture
            }
        });
    } catch (e) {
        console.error('Google login error:', e);
        res.status(500).json({ 
            error: 'Google authentication failed. Please try again.' 
        });
    }
};

module.exports = {
    signUp,
    logIn,
    getAllUsers,
    getByUserId,
    updateUser,
    deleteUser,
    forgotPassword,
    resetPassword,
    updateUserById,
    googleLogin
}