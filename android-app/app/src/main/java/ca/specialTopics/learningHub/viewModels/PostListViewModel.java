package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;

import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PostListViewModel extends BaseViewModel {
    private static String TAG = PostListViewModel.class.getSimpleName();

    private MutableLiveData<Resource<List<Post>>> postListResource;

    public LiveData<Resource<List<Post>>> getPostListResource() {
        if (postListResource == null) {
            postListResource = new MutableLiveData<>();
            loadPostList();
        }
        return postListResource;
    }

    private void loadPostList() {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.getPostList(token).enqueue(new Callback<List<Post>>() {
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
