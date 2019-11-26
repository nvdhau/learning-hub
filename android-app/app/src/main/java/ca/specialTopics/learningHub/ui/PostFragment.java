package ca.specialTopics.learningHub.ui;

import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;
import java.util.List;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Comment;
import ca.specialTopics.learningHub.models.CommentServerAnswer;
import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.ui.chat.ChatFragment;
import ca.specialTopics.learningHub.viewModels.CommentListViewModel;
import ca.specialTopics.learningHub.viewModels.PostViewModel;
import io.noties.markwon.Markwon;
import io.noties.markwon.image.picasso.PicassoImagesPlugin;

public class PostFragment extends BaseFragment {
    private static final String TAG = PostFragment.class.getSimpleName();
    private static final String ARG_POST_ID = "postId";

    @SuppressWarnings("FieldCanBeLocal")
    private PostViewModel postViewModel;
    private int postId;
    @SuppressWarnings("FieldCanBeLocal")
    private CommentListViewModel commentListViewModel;

    private TextView txtTitle, txtUsername, txtDate, txtDescription, txtCategory, txtTags;
    private ImageView imgPost;
    private Markwon markwon;
    private CommentsRecyclerViewAdapter commentsRecyclerViewAdapter;

    public static PostFragment newInstance(int postId) {
        PostFragment postFragment = new PostFragment();
        Bundle args = new Bundle();
        args.putSerializable(ARG_POST_ID, postId);
        postFragment.setArguments(args);
        return postFragment;
    }

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            postId = getArguments().getInt(ARG_POST_ID);
        }
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.post_fragment, container, false);

        txtTitle = view.findViewById(R.id.txtTitle);
        txtUsername = view.findViewById(R.id.txtUsername);
        txtDate = view.findViewById(R.id.txtDate);
        txtDescription = view.findViewById(R.id.txtDescription);
        txtCategory = view.findViewById(R.id.txtCategory);
        txtTags = view.findViewById(R.id.txtTags);
        imgPost = view.findViewById(R.id.imgPost);

        markwon = Markwon.builder(requireContext())
                .usePlugin(PicassoImagesPlugin.create(Picasso.get()))
                .build();

        // Set Comments
        // Set Recycler View
        Context context = view.getContext();
        RecyclerView commentsRecyclerView = view.findViewById(R.id.commentsRecyclerView);
        commentsRecyclerView.setLayoutManager(new LinearLayoutManager(context));
        commentsRecyclerViewAdapter = new CommentsRecyclerViewAdapter();
        commentsRecyclerView.setAdapter(commentsRecyclerViewAdapter);

        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        postViewModel = ViewModelProviders.of(requireActivity()).get(PostViewModel.class);

        postViewModel.getPostResource(postId).observe(getViewLifecycleOwner(), postNetworkResource -> {
            Log.d(TAG, "postNetworkResource code:" + postNetworkResource.code);
            if (postNetworkResource.data != null) {
                Post post = postNetworkResource.data;

                txtTitle.setText(post.getTitle());
                txtUsername.setText(requireContext().getString(R.string.usernameMask, post.getUser().getUsername()));
                txtDate.setText(post.getCreatedAt());
                txtCategory.setText(post.getCategory().getName());
                txtTags.setText(post.getTags());

                markwon.setMarkdown(txtDescription, post.getDescription());

                Picasso.get()
                        .load(post.getImageUrl())
                        .placeholder(android.R.drawable.ic_menu_gallery)
                        .error(android.R.drawable.ic_delete)
                        .into(imgPost);

                // Chat
                txtUsername.setOnClickListener(view1 -> {
                    ChatFragment chatFragment = ChatFragment.newInstance(post.getUser());
                    pushFragment(chatFragment);
                });
            }
        });

        postViewModel.getIsLoading().observe(getViewLifecycleOwner(), isLoading -> {
            if (isLoading) {
                //btnSubmit.setEnabled(false);
                showProgressBar();
            } else {
                //btnSubmit.setEnabled(true);
                hideProgressBar();
            }
        });

        commentListViewModel = ViewModelProviders.of(requireActivity()).get(CommentListViewModel.class);

        commentListViewModel.getCommentServerAnswerResource(postId).observe(getViewLifecycleOwner(), commentServerAnswerResource -> {
            Log.d(TAG, "commentServerAnswerResource code:" + commentServerAnswerResource.code);
            if (commentServerAnswerResource.data != null) {
                List<Comment> commentList = new ArrayList<>();
                for (CommentServerAnswer commentServerAnswer : commentServerAnswerResource.data) {
                    commentList.add(commentServerAnswer.getComment());
                    for (Comment comment: commentServerAnswer.getCommentReplies().getComments()) {
                        comment.setReply(true);
                        commentList.add(comment);
                    }
                }
                commentsRecyclerViewAdapter.setData(commentList);
            }
        });
    }

}
