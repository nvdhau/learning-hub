package ca.specialTopics.learningHub.ui.chat;

import android.content.Context;
import android.os.Bundle;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.ImageButton;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.Ack;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Message;
import ca.specialTopics.learningHub.models.User;
import ca.specialTopics.learningHub.networking.RetrofitService;
import ca.specialTopics.learningHub.ui.BaseFragment;
import ca.specialTopics.learningHub.utils.JSONParser;

public class ChatFragment extends BaseFragment {
    private static final String TAG = ChatFragment.class.getSimpleName();
    private static final String ARG_USER = "user";

    private FirebaseUser firebaseUser;
    private User toUser;
    private Socket mSocket;
    private List<Message> messageList = new ArrayList<Message>();

    private ChatRecyclerViewAdapter chatRecyclerViewAdapter;
    private RecyclerView recyclerViewMessageList;


    public static ChatFragment newInstance(User toUser) {
        ChatFragment fragment = new ChatFragment();
        Bundle args = new Bundle();
        args.putSerializable(ARG_USER, toUser);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        if (getArguments() != null) {
            toUser = (User) getArguments().getSerializable(ARG_USER);
        }
        firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        chatRecyclerViewAdapter = new ChatRecyclerViewAdapter(requireContext(), messageList, firebaseUser.getUid());

        try {
            mSocket = IO.socket(RetrofitService.BASE_URL);
        } catch (URISyntaxException e) {
            Log.e(TAG, "error with uri", e);
        }

        mSocket.on("receiveMsg", onNewMessage);
        mSocket.connect();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();

        mSocket.off("receiveMsg", onNewMessage);
        mSocket.disconnect();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_chat, container, false);

        recyclerViewMessageList = view.findViewById(R.id.recyclerViewMessageList);
        recyclerViewMessageList.setLayoutManager(new LinearLayoutManager(requireContext()));
        recyclerViewMessageList.setAdapter(chatRecyclerViewAdapter);

        subscribe();

        final TextView txtMessage = view.findViewById(R.id.message_input);

        ImageButton sendButton = view.findViewById(R.id.send_button);
        sendButton.setOnClickListener(view1 -> {
            String messageString = txtMessage.getText().toString().trim();
            if (messageString.isEmpty()) {
                txtMessage.requestFocus();
                return;
            }

            txtMessage.setText("");
            Message message = new Message(firebaseUser.getUid(), messageString);
            addMessage(message);
            mSocket.emit("sendMsg", firebaseUser.getUid(), toUser.getId(), messageString);
        });


        return view;
    }

    private void addMessage(Message message) {
        messageList.add(message);
        chatRecyclerViewAdapter.notifyItemInserted(messageList.size() - 1);
    }


    private void subscribe() {
        mSocket.emit("init", firebaseUser.getUid(), (Ack) args -> requireActivity().runOnUiThread(() -> {
            Message message = JSONParser.parseClass(args[0].toString(), Message.class);
            messageList.add(message);
            chatRecyclerViewAdapter.notifyItemInserted(messageList.size() - 1);
            scrollToBottom();
        }));
    }

    private Emitter.Listener onNewMessage = new Emitter.Listener() {
        @Override
        public void call(Object... args) {
            requireActivity().runOnUiThread(() -> {
                Message message = JSONParser.parseClass(args[0].toString(), Message.class);
                addMessage(message);
                scrollToBottom();
            });
        }
    };

    private void scrollToBottom() {
        recyclerViewMessageList.scrollToPosition(chatRecyclerViewAdapter.getItemCount() - 1);
    }

}
