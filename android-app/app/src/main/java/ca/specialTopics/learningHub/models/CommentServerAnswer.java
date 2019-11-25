package ca.specialTopics.learningHub.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;

public class CommentServerAnswer implements Serializable {
    private int id;
    private int postId;
    private Comment comment;
    @SerializedName("replies")
    private CommentReplies commentReplies;

    public int getId() {
        return id;
    }

    public int getPostId() {
        return postId;
    }

    public Comment getComment() {
        return comment;
    }

    public CommentReplies getCommentReplies() {
        return commentReplies;
    }

}
