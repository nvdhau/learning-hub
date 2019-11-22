package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class PostViewModel extends BaseViewModel {
    private static String TAG = PostViewModel.class.getSimpleName();

    private MutableLiveData<Resource<Post>> postResource;
    private int id;

    public LiveData<Resource<Post>> getPostResource(int id) {
        if (postResource == null) {
            postResource = new MutableLiveData<>();
            this.id = id;
            loadPost();
        } else if (this.id != id) {
            this.id = id;
            loadPost();
        }
        return postResource;
    }

    private void loadPost() {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.getPost(token, id).enqueue(new Callback<Post>() {
                @Override
                public void onResponse(@NonNull Call<Post> call, @NonNull Response<Post> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "getPost:success");
                    } else {
                        Log.e(TAG, "getPost:failure");
                    }
                    postResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }

                @Override
                public void onFailure(@NonNull Call<Post> call, @NonNull Throwable t) {
                    Log.e(TAG, "Error", t);
                    isLoading.setValue(false);
                }
            });
        });
    }

    /*
    public void createPost(Post user) {
        isLoading.setValue(true);
        webService.createPost(user).enqueue(new Callback<Post>() {
            @Override
            public void onResponse(@NonNull Call<Post> call, @NonNull Response<User> response) {
                if (response.isSuccessful()) {
                } else {
                    userResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }
            }

            @Override
            public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {
                Log.e(TAG, "Error", t);
                isLoading.setValue(false);
            }
        });
    }

    public void updateUser(User user) {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.updateUser(token, user).enqueue(new Callback<User>() {
                @Override
                public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "updateUser:success");
                    } else {
                        Log.e(TAG, "updateUser:failure");
                    }
                    userResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }

                @Override
                public void onFailure(@NonNull Call<User> call, @NonNull Throwable t) {
                    Log.e(TAG, "Error", t);
                    isLoading.setValue(false);
                }
            });
        });
    }
    */

}
