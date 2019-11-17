package ca.specialTopics.learningHub.ui.postList;

import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Context;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Post;

import java.util.ArrayList;
import java.util.List;

public class PostRecyclerViewAdapter extends RecyclerView.Adapter<PostRecyclerViewAdapter.ViewHolder> {

    private final Context context;
    private final List<Post> postList;
    private final PostListFragment.OnListClickListener mListener;

    PostRecyclerViewAdapter(Context context, PostListFragment.OnListClickListener listener) {
        this.context = context;
        postList = new ArrayList<>();
        mListener = listener;
    }

    void setData(List<Post> postList) {
        this.postList.clear();
        this.postList.addAll(postList);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.adapter_post, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(final ViewHolder holder, int position) {
        Post post = postList.get(position);
        holder.post = post;

        Picasso.get()
            .load(post.getImageUrl())
            .placeholder(android.R.drawable.ic_menu_gallery)
            .error(android.R.drawable.ic_delete)
            .into(holder.imgPost);

        holder.txtTitle.setText(post.getTitle());
        holder.txtUsername.setText(context.getString(R.string.usernameMask, post.getUser().getUsername()));
        holder.txtCategory.setText(post.getCategory().getName());
        holder.txtDate.setText(post.getCreatedAt());

        holder.mView.setOnClickListener(view -> {
            if (null != mListener) {
                mListener.onListClick(holder.post);
            }
        });
    }

    @Override
    public int getItemCount() {
        return postList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        final ImageView imgPost;
        final TextView txtTitle;
        final TextView txtUsername;
        final TextView txtCategory;
        final TextView txtDate;

        Post post;

        ViewHolder(View view) {
            super(view);
            mView = view;
            imgPost = view.findViewById(R.id.imgPost);
            txtTitle = view.findViewById(R.id.txtTitle);
            txtUsername = view.findViewById(R.id.txtUsername);
            txtCategory = view.findViewById(R.id.txtCategory);
            txtDate = view.findViewById(R.id.txtDate);
        }
    }
}
