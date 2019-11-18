package ca.specialTopics.learningHub.models;

import java.io.Serializable;

import ca.specialTopics.learningHub.networking.RetrofitService;

public class Post implements Serializable {
    private int id;
    private String userId;
    private int categoryId;
    private String title;
    private String description;
    private String tags;
    private String imageUrl;
    private String createdAt;
    private String updatedAt;
    private boolean isBlog;
    private User user;
    private Category category;

    public int getId() {
        return id;
    }

    public String getUserId() {
        return userId;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getTags() {
        return tags;
    }

    public String getImageUrl() {
        return RetrofitService.BASE_URL + imageUrl;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public String getUpdatedAt() {
        return updatedAt;
    }

    public boolean isBlog() {
        return isBlog;
    }

    public User getUser() {
        return user;
    }

    public Category getCategory() {
        return category;
    }
}
