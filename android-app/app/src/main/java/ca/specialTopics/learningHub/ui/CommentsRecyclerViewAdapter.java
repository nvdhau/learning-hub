package ca.specialTopics.learningHub.ui;

import android.os.Build;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Comment;
import ca.specialTopics.learningHub.utils.PixelsHelper;

public class CommentsRecyclerViewAdapter extends RecyclerView.Adapter<CommentsRecyclerViewAdapter.ViewHolder> {

    private final List<Comment> commentList;

    CommentsRecyclerViewAdapter() {
        commentList = new ArrayList<>();
    }

    void setData(List<Comment> commentList) {
        this.commentList.clear();
        this.commentList.addAll(commentList);
        notifyDataSetChanged();
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.adapter_comment, parent, false);
        return new ViewHolder(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Comment comment = commentList.get(position);
        holder.comment = comment;

        holder.txtFullNameImage.setText(comment.getAuthorFullNameImage());
        holder.txtFullName.setText(comment.getAuthorFullName());
        holder.txtContent.setText(comment.getContent());

        int marginStart;
        if (comment.isReply()) {
            marginStart = PixelsHelper.dpToPx(56);
        } else {
            marginStart = PixelsHelper.dpToPx(0);
        }

        ConstraintLayout.LayoutParams layoutParams = (ConstraintLayout.LayoutParams) holder.txtFullNameImage.getLayoutParams();
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.JELLY_BEAN_MR1) {
            layoutParams.setMarginStart(marginStart);
        }
        layoutParams.leftMargin = marginStart;
    }

    @Override
    public int getItemCount() {
        return commentList.size();
    }

    class ViewHolder extends RecyclerView.ViewHolder {
        final View mView;
        final TextView txtFullNameImage;
        final TextView txtFullName;
        final TextView txtContent;

        Comment comment;

        ViewHolder(View view) {
            super(view);
            mView = view;
            txtFullNameImage = view.findViewById(R.id.txtFullNameImage);
            txtFullName = view.findViewById(R.id.txtFullName);
            txtContent = view.findViewById(R.id.txtContent);
        }
    }
}
