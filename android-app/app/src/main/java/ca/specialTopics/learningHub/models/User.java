package ca.specialTopics.learningHub.models;

import java.io.Serializable;

public class User implements Serializable {
    private String id;
    private String username;
    private String fullName;
    private boolean isActive;
    private transient String fullNameImage;

    //They are only not null in the user registration
    private String email;
    private String password;


    public User() {
    }

    public User(String email, String password, String username, String fullName) {
        this.email = email;
        this.password = password;
        this.username = username;
        this.fullName = fullName;
        this.isActive = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getFullNameImage() {
        if (fullNameImage == null) {
            StringBuilder stringBuilder = new StringBuilder("");
            String[] names = fullName.split(" ");
            for (String name : names) {
                stringBuilder.append(name.charAt(0));
            }
            fullNameImage = stringBuilder.toString();
        }
        return fullNameImage;
    }

}
