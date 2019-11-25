package ca.specialTopics.learningHub.models;

import java.io.Serializable;

public class Comment implements Serializable {
    private String content;
    private String authorId;
    private String authorFullName;
    private transient String authorFullNameImage;
    private transient boolean reply;

    public String getContent() {
        return content;
    }

    public String getAuthorId() {
        return authorId;
    }

    public String getAuthorFullName() {
        return authorFullName;
    }

    public String getAuthorFullNameImage() {
        if (authorFullNameImage == null) {
            StringBuilder stringBuilder = new StringBuilder("");
            String[] names = authorFullName.split(" ");
            for (String name : names) {
                stringBuilder.append(name.charAt(0));
            }
            authorFullNameImage = stringBuilder.toString();
        }
        return authorFullNameImage;
    }

    public boolean isReply() {
        return reply;
    }

    public void setReply(boolean reply) {
        this.reply = reply;
    }
}
