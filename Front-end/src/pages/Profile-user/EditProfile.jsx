import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useAuth } from "../../Authentication_Context/Auth_Provider";

const EditProfileForm = () => {
    const { user, updateUser } = useAuth();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        profileImage: null, // Store file here
    });
    const [imagePreview, setImagePreview] = useState(""); // Store preview for image

    // Pre-fill form data with current user info when the component mounts
    useEffect(() => {
        if (user) {
            setFormData({
                fullName: user.fullName || "",
                email: user.email || "",
                profileImage: null,
            });
        }
    }, [user]);

    // Handle text inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    // Handle image input and set image preview
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData((prevData) => ({
                    ...prevData,
                    profileImage: file,
                }));
                setImagePreview(reader.result); // Set image preview
            };
            reader.readAsDataURL(file); // Convert image to base64
        }
    };

    // Validate form fields
    const validateForm = () => {
        if (!formData.fullName || !formData.email) {
            alert("Full Name and Email are required.");
            return false;
        }
        return true;
    };

    // Handle form submission with FormData
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!validateForm()) return;
    
        const formDataToSend = new FormData();
        formDataToSend.append('fullName', formData.fullName);
        formDataToSend.append('email', formData.email);
        if (formData.profileImage) {
            formDataToSend.append('userAvatar', formData.profileImage);
        }
    
        try {
            const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: "PATCH",
                body: formDataToSend,
            });
    
            const responseText = await response.text();
            console.log('Response Text:', responseText);
    
            if (response.ok) {
                alert("Profile updated successfully!");
                // Update user in context
                const updatedUser = JSON.parse(responseText).findUser;
                updateUser(updatedUser);
                setFormData({
                    fullName: "",
                    email: "",
                    profileImage: null,
                });
                setImagePreview(""); // Clear image preview
            } else {
                alert(`Failed to update profile: ${responseText || "Unknown error"}`);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred while updating your profile.");
        }
    };
    

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Profile Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">Full Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="profileImage" className="form-label">Upload Profile Image</label>
                    <input
                        type="file"
                        className="form-control"
                        id="profileImage"
                        onChange={handleImageChange}
                    />
                </div>
                {imagePreview && (
                    <div className="mb-3">
                        <label className="form-label">Image Preview:</label>
                        <img
                            src={imagePreview}
                            alt="Profile Preview"
                            className="img-thumbnail"
                            style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
};

export default EditProfileForm;
