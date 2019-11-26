package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;

import ca.specialTopics.learningHub.models.CommentServerAnswer;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class CommentListViewModel extends BaseViewModel {
    private static String TAG = CommentListViewModel.class.getSimpleName();

    private MutableLiveData<Resource<List<CommentServerAnswer>>> commentServerAnswerResource;
    private Integer postId;

    public LiveData<Resource<List<CommentServerAnswer>>> getCommentServerAnswerResource(int postId) {
        if (commentServerAnswerResource == null) {
            commentServerAnswerResource = new MutableLiveData<>();
            this.postId = postId;
            loadCommentServerAnswerResource(postId);
        } else if (this.postId != postId) {
            this.postId = postId;
            loadCommentServerAnswerResource(postId);
        }
        return commentServerAnswerResource;
    }

    public void loadCommentServerAnswerResource(int postId) {
        this.postId = postId;
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.getPostCommentList(token, postId).enqueue(new Callback<List<CommentServerAnswer>>() {
                @Override
                public void onResponse(@NonNull Call<List<CommentServerAnswer>> call, @NonNull Response<List<CommentServerAnswer>> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "getPostCommentList:success");
                    } else {
                        Log.e(TAG, "getPostCommentList:failure");
                    }
                    commentServerAnswerResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }

                @Override
                public void onFailure(@NonNull Call<List<CommentServerAnswer>> call, @NonNull Throwable t) {
                    Log.e(TAG, "Error", t);
                    isLoading.setValue(false);
                }
            });
        });
    }
}
