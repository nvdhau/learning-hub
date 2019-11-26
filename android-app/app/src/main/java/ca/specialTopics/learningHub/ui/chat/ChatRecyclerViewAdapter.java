package ca.specialTopics.learningHub.ui.chat;

import android.content.Context;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.List;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Message;

public class ChatRecyclerViewAdapter extends RecyclerView.Adapter<ChatRecyclerViewAdapter.ViewHolder> {

    private List<Message> mMessages;
    private Context context;
    private String userUid;

    public ChatRecyclerViewAdapter(Context context, List<Message> messages, String userUid) {
        mMessages = messages;
        this.context = context;
        this.userUid = userUid;
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        int layout = -1;
        switch (viewType) {
            case Message.TYPE_MESSAGE:
                layout = R.layout.chat_message;
                break;
            case Message.TYPE_LOG:
                layout = R.layout.chat_log;
                break;
            case Message.TYPE_ACTION:
                layout = R.layout.chat_action;
                break;
        }
        View v = LayoutInflater
                .from(parent.getContext())
                .inflate(layout, parent, false);
        return new ViewHolder(v);
    }

    @Override
    public void onBindViewHolder(ViewHolder viewHolder, int position) {
        Message message = mMessages.get(position);
        //viewHolder.txtUsername.setText(context.getString(R.string.usernameMask, message.getUser().getUsername()));
        viewHolder.txtMessage.setText(message.getContent());

        if (message.getType() == Message.TYPE_MESSAGE) {
            if (userUid.equals(message.getUserUid()))
                viewHolder.txtMessage.setGravity(Gravity.END);
            else
                viewHolder.txtMessage.setGravity(Gravity.START);
        }
    }

    @Override
    public int getItemCount() {
        return mMessages.size();
    }

    @Override
    public int getItemViewType(int position) {
        return mMessages.get(position).getType();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final TextView txtUsername;
        final TextView txtMessage;

        ViewHolder(View view) {
            super(view);
            txtUsername = view.findViewById(R.id.txtUsername);
            txtMessage = view.findViewById(R.id.txtMessage);
        }
    }
}
