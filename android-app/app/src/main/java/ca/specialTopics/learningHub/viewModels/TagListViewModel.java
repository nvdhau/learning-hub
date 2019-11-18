package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import java.util.List;

import ca.specialTopics.learningHub.models.Tag;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class TagListViewModel extends BaseViewModel {
    private static String TAG = TagListViewModel.class.getSimpleName();

    private MutableLiveData<Resource<List<Tag>>> tagListResource;

    public LiveData<Resource<List<Tag>>> getTagListResource() {
        if (tagListResource == null) {
            tagListResource = new MutableLiveData<>();
            loadTagList();
        }
        return tagListResource;
    }

    private void loadTagList() {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.getTagList(token).enqueue(new Callback<List<Tag>>() {
                @Override
                public void onResponse(@NonNull Call<List<Tag>> call, @NonNull Response<List<Tag>> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "getTag:success");
                    } else {
                        Log.e(TAG, "getTag:failure");
                    }
                    tagListResource.setValue(new Resource<>(response));
                    isLoading.setValue(false);
                }

                @Override
                public void onFailure(@NonNull Call<List<Tag>> call, @NonNull Throwable t) {
                    Log.e(TAG, "Error", t);
                    isLoading.setValue(false);
                }
            });
        });
    }
}
