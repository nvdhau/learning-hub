package ca.specialTopics.learningHub.ui;

import androidx.lifecycle.ViewModelProviders;

import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.fragment.app.Fragment;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.viewModels.PostViewModel;

public class PostFragment extends BaseFragment {
    private static final String TAG = PostFragment.class.getSimpleName();
    private static final String ARG_POST_ID = "postId";

    @SuppressWarnings("FieldCanBeLocal")
    private PostViewModel postViewModel;
    private int postId;

    private TextView txtTitle, txtUsername, txtDate, txtDescription, txtCategory, txtTags;
    private ImageView imgPost;

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
                txtDescription.setText(post.getDescription());
                txtCategory.setText(post.getCategory().getName());
                txtTags.setText(post.getTags());

                Picasso.get()
                        .load(post.getImageUrl())
                        .placeholder(android.R.drawable.ic_menu_gallery)
                        .error(android.R.drawable.ic_delete)
                        .into(imgPost);


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
    }

}
