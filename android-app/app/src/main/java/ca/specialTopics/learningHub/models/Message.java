package ca.specialTopics.learningHub.models;

public class Message {

    public static final int TYPE_MESSAGE = 0;
    public static final int TYPE_LOG = 1;
    public static final int TYPE_ACTION = 2;

    private Integer type;
    private String content;
    private String userUid;

    public Message(String userUid, String content) {
        this.userUid = userUid;
        this.content = content;
        type = TYPE_MESSAGE;
    }

    public int getType() {
        if (type == null)
            return -1;
        else
            return type;
    }

    public String getContent() {
        return content;
    }

    public String getUserUid() {
        return userUid;
    }
}
