package ca.specialTopics.learningHub.models;

import com.google.gson.annotations.SerializedName;

import java.io.Serializable;
import java.util.ArrayList;

public class CommentReplies implements Serializable {
    private int commentId;
    @SerializedName("data")
    private ArrayList<Comment> comments;

    public int getCommentId() {
        return commentId;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }
}
