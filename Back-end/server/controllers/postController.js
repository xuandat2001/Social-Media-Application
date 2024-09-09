const postModel = require('../models/postModel.js');
const fs = require('fs');
const { matchedData, validationResult } = require('express-validator');
const userModel = require('../models/userModel');  // Assuming user model has friends/followers
const groupModel = require('../models/groupModel'); // Assuming group model exists
const { createPostNotificationForFriends, createPostNotificationForGroup } = require('../controllers/notificationController');
const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.find().populate('user', 'fullName userAvatar');
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching posts' });
    }
};
const getPostsByUser = async (req, res) => {
    const userId = req.params.userId;
    try {
      // Find all posts by the user
      const posts = await postModel.find({ user: userId }).populate('user');
      if (posts.length === 0) {
        return res.status(404).json({ message: 'No posts found for this user' });
      }
      res.status(200).json(posts);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
};
const getOnePost =  async(req, res) => {
    const { findPost } = req;
    if (!findPost) {
        return res.status(400).send({ msg: "post Not Found" });
    }
    res.send(findPost);
};
const createNewPost = async (req, res) => {
    try {
        const data = req.body;

        // Check if required fields are present
        if (!data.content || !data.user) {
            return res.status(400).json({ msg: "Content and user are required" });
        }

        let imageHash = null;

        // Check if an image was uploaded
        if (req.file) {
            // Read the image file from the temporary location
            imageHash = fs.readFileSync(req.file.path, { encoding: 'base64' }); // Convert image file to Base64
    
            // Remove the file from the temporary folder
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting temporary file:', err);
            });
        }

        // Set default values for optional fields
        const postData = {
            content: data.content,
            numberOfReaction: data.numberOfReaction || 0,
            numberOfComment: data.numberOfComment || 0,
            post_access_right: data.post_access_right || 'public',
            image_url: imageHash,  // Store the image hash in the `image_url` field
            user: data.user
        };

        // Create and save the post
        const newPost = new postModel(postData);
        const savedPost = await newPost.save();
        
        // // Notify friends/followers if the post is public and not in a group
        // if (!data.group_id && postData.post_access_right === 'public') {
        //     const user = await userModel.findById(data.user).populate('friends'); // Assuming user has friends
        //     if (user && user.friends) {
        //         for (const friend of user.friends) {
        //             await createPostNotificationForFriends({
        //                 body: { triggered_by: data.user, received_by: friend._id, post_id: savedPost._id }
        //             }, res);
        //         }
        //     }
        // }
        // if (data.group_id) {
        //     const group = await groupModel.findById(data.group_id).populate('members'); // Assuming group has members
        //     if (group && group.members) {
        //         for (const member of group.members) {
        //             await createPostNotificationForGroup({
        //                 body: { triggered_by: data.user, received_by: member._id, post_id: savedPost._id, group_id: data.group_id }
        //             }, res);
        //         }
        //     }
        // }
        return res.status(201).json(savedPost);
    } catch (error) {
        console.error('Error creating post:', error);
        return res.status(500).json({ msg: "Failed to create post", error: error.message });
    }
};

const editPost = async (req, res) => {
    const { findPost } = req; // Post is retrieved by the middleware
    const { content } = req.body;
    let imageHash = findPost.image_url; // Keep existing image hash if no new image is uploaded

    // Check if a new image file is uploaded
    if (req.file) {
        // Convert the new image to Base64 and update `imageHash`
        imageHash = fs.readFileSync(req.file.path, { encoding: 'base64' });

        // Remove the temporary file after reading it
        fs.unlink(req.file.path, (err) => {
            if (err) console.error('Error deleting temp file:', err);
        });
    }

    // Update post content and image (if changed)
    findPost.content = content || findPost.content;
    findPost.image_url = imageHash;

    // Save the updated post
    try {
        await findPost.save();
        return res.status(200).json(findPost); // Return the updated post
    } catch (error) {
        console.error('Error saving post:', error);
        return res.status(500).json({ msg: 'Failed to update post', error: error.message });
    }
};
const sharePost = async (req, res) => {
    const { content, accessRight, originalPostId } = req.body;
  
    try {
      // Find the original post
      const originalPost = await Post.findById(originalPostId).populate('user', 'userName avatar');  // Get user info
      if (!originalPost) {
        return res.status(404).json({ message: 'Original post not found' });
      }
  
      // Create a new post referencing the original one
      const newPost = new Post({
        content,
        accessRight,
        originalPost: originalPostId,
        user: req.user.id,  // The user sharing the post
        createdAt: new Date(),
      });
  
      // Save the new post to the database
      await newPost.save();
  
      // Send back the new post along with original post data
      res.status(201).json({ newPost, originalPost });
    } catch (error) {
      console.error('Error sharing post:', error);
      res.status(500).json({ message: 'Failed to share post' });
    }
  };
  const deletePost = async (req, res) => {
    try {
        const { findPost } = req; // Access the post found by findPostById middleware
        await findPost.deleteOne(); 
        return res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const  reportPost = async (req, res) => {
    const { postId } = req.params;
    const { reportReason, reportedBy } = req.body;

    try {
        // Find the post and update its report details
        const post = await postModel.findByIdAndUpdate(
            postId,
            {
                $set: {
                    isReported: true,
                    "reportDetails.reportedBy": reportedBy,
                    "reportDetails.reportReason": reportReason,
                    "reportDetails.reportDate": new Date(),
                },
            },
            { new: true } // Return the updated post
        );

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        return res.status(200).json({ message: "Post reported successfully", post });
    } catch (error) {
        console.error("Error reporting post:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
const getReportedPost = async (req, res) => {
    // console.log(req.session.user); 

    // if (!req.session.user) {
    //     return res.status(401).json({ message: "Unauthorized. Please log in." });
    // }

    // const userId = req.session.user.id; 

    try {
        const reportedPosts = await postModel.find({
            isReported: true,
            
        })

        if (!reportedPosts || reportedPosts.length === 0) {
            return res.status(404).json({ message: "No reported posts found." });
        }

        return res.status(200).json(reportedPosts);
    } catch (error) {
        console.error("Error fetching reported posts:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};


  


module.exports = {getAllPosts, getOnePost, createNewPost, editPost, deletePost, sharePost,getPostsByUser,reportPost,getReportedPost};
