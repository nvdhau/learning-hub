package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;

import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.models.Tag;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PostListViewModel extends BaseViewModel {
    private static String TAG = PostListViewModel.class.getSimpleName();

    private MutableLiveData<Resource<List<Post>>> postListResource;
    private Tag tag;

    public LiveData<Resource<List<Post>>> getPostListResource(@Nullable Tag tag) {
        if (postListResource == null) {
            postListResource = new MutableLiveData<>();
            loadPostList(tag);

        } else if (this.tag != tag) {
            this.tag = tag;
            loadPostList(tag);
        }
        return postListResource;
    }

    public void loadPostList(@Nullable Tag tag) {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            String tagName = tag != null ? tag.getName() : "";
            webService.getPostList(token, "blog", tagName).enqueue(new Callback<List<Post>>() {
                @Override
                public void onResponse(@NonNull Call<List<Post>> call, @NonNull Response<List<Post>> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "getPosts:success");
                    } else {
                        Log.e(TAG, "getPosts:failure");
                    }
                    postListResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }

                @Override
                public void onFailure(@NonNull Call<List<Post>> call, @NonNull Throwable t) {
                    Log.e(TAG, "Error", t);
                    isLoading.setValue(false);
                }
            });
        });
    }
}
