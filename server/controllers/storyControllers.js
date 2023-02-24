import User from "../models/User.js";
import Story from "../models/Story.js";
import Comment from "../models/Comment.js";
import Topic from "../models/Topic.js";
import { cloudinary, uploadImage } from "../index.js";
import path from "path";

const getStoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    res.status(200).json(story);
  } catch (err) {
    res.status(500).json({ err: "Error on handling getStory: " + err });
  }
};

const getAllStoriesControllers = async (req, res) => {
  try {
    const stories = await Story.find();
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json({ err: "Error on handling getAlStories: " + err });
  }
};

const getUserStoriesController = async (req, res) => {
  try {
    const { userId } = req.params;
    const stories = await Story.find(userId);
    res.status(200).json(stories);
  } catch (err) {
    res.status(400).json({ err: "Error on handling stories by user: " + err });
  }
};

const getStoryCommentsController = async (req, res) => {
  try {
    const { id } = req.params;
    const story = await Story.findById(id);
    const comments = Promise.all(
      story.comments.map((id) => {
        Comment.findById(id);
      })
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(400).json({ err: "Error on getting story comments: " + err });
  }
};

const getStoriesByTopicController = async (req, res) => {
  try {
    const { name } = req.params;
    const stories = await Story.find({ topics: { $in: [name] } });
    res.status(200).json(stories);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Error on handling get stories by topic: " + err });
  }
};

const newStoryController = async (req, res) => {
  try {
    const { userId, title, content, topics, response } = req.body;
    const user = await User.findById(userId);
    const story = new Story({
      userId,
      username: user.username,
      userPicturePath: user.userPicturePath,
      title,
      content,
      topics,
      response,
    });
    if (req.file.buffer) {
      uploadImage(req.file.buffer).then(async (secure_url) => {
        story.imagePath = secure_url;
        const savedStory = await story.save();
        res.status(200).json(savedStory);
      });
    } else {
      const savedStory = await story.save();
      res.status(200).json(savedStory);
    }
  } catch (err) {
    res.status(400).json({ err: "Error on creating a new story: " + err });
  }
};

const newCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { text, userId } = req.body;
    const story = await Story.findById(id);
    const user = await User.findById(userId);
    const comment = new Comment({
      userId: user._id,
      username: user.username,
      userPicturePath: user.userPicturePath,
      storyId: id,
      text,
    });
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(400).json({ err: "Error on new comment: " + err });
  }
};

const agreeController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const story = await Story.findById(id);
    const alreadyAgree = story.agree.get(userId);
    const isDisagree = story.disagree.get(userId);
    if (alreadyAgree) {
      story.agree.delete(userId);
    } else {
      if (isDisagree) {
        story.disagree.delete(userId);
      }
      story.agree.set(userId, true);
    }
    const savedStory = await story.save();
    res.status(200).json(savedStory);
  } catch (err) {
    res.status(400).json({ err: "Error on agree controller: " + err });
  }
};

const disagreeController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const story = await Story.findById(id);
    const alreadyDisagree = story.disagree.get(userId);
    const isAgree = story.agree.get(userId);
    if (alreadyDisagree) {
      story.disagree.delete(userId);
    } else {
      if (isAgree) {
        story.agree.delete(userId);
      }
      story.disagree.set(userId, true);
    }
    const savedStory = await story.save();
    res.status(200).json(savedStory);
  } catch (err) {
    res.status(400).json({ err: "Error on agree controller: " + err });
  }
};

const rateController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, value } = req.body;
    const story = await Story.findById(id);
    story.rating.set(userId, value);
    const savedStory = await story.save();
    res.status(200).json(savedStory);
  } catch (err) {
    res.status(500).json("Error on rate controller: " + err);
  }
};

const commentAgreeController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const alreadyAgree = comment.agree.get(userId);
    const isDisagree = comment.disagree.get(userId);
    if (alreadyAgree) {
      comment.agree.delete(userId);
    } else {
      if (isDisagree) {
        comment.disagree.delete(userId);
      }
      comment.agree.set(userId, true);
    }
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(400).json({ err: "Error on agree comment controller: " + err });
  }
};

const commentDisagreeController = async (req, res) => {
  try {
    const { userId } = req.body;
    const { id } = req.params;
    const comment = await Comment.findById(id);
    const alreadyDisagree = comment.disagree.get(userId);
    const isAgree = comment.agree.get(userId);
    if (alreadyDisagree) {
      comment.disagree.delete(userId);
    } else {
      if (isAgree) {
        comment.agree.delete(userId);
      }
      comment.disagree.set(userId, true);
    }
    const savedComment = await comment.save();
    res.status(200).json(savedComment);
  } catch (err) {
    res.status(400).json({ err: "Error on agree comment controller: " + err });
  }
};

const deleteStoryController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const story = await Story.findById(id);
    if (userId === story.userId) {
      await Story.deleteOne({ _id: id });
    } else {
      res
        .status(500)
        .json({
          err: "Fatal, deleting foreign story, DO NOT BYPASS OWNER MATCHING, warning: ",
        });
    }
    res.status(200).json({ msg: "Deleted story succesfully" });
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error on delete story, cannot delete: " + errr });
  }
};

const deleteCommentController = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const story = Story.findById(id);
    if (userId === story.userId) {
      await Story.deleteOne({ _id: id });
    } else {
      res
        .status(500)
        .json({
          err: "Fatal, deleting foreign comment, DO NOT BYPASS OWNER MATCHING, warning: ",
        });
    }
    res.status(200).json({ msg: "Deleted comment succesfully" });
  } catch (err) {
    res
      .status(500)
      .json({ err: "Error on delete comment, cannot delete: " + err });
  }
};

export {
  getStoryController,
  getAllStoriesControllers,
  getUserStoriesController,
  getStoriesByTopicController,
  getStoryCommentsController,
  newCommentController,
  newStoryController,
  agreeController,
  disagreeController,
  commentAgreeController,
  commentDisagreeController,
  rateController,
  deleteStoryController,
  deleteCommentController,
};
