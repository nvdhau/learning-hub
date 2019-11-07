package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.google.firebase.auth.FirebaseAuth;

import ca.specialTopics.learningHub.models.User;
import ca.specialTopics.learningHub.networking.Resource;
import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class UserViewModel extends BaseViewModel {
    private static String TAG = UserViewModel.class.getSimpleName();

    private MutableLiveData<Resource<User>> userResource = new MutableLiveData<>();

    public LiveData<Resource<User>> getUserResource(String id) {
        if (id != null) {
            loadUser(id);
        }
        return userResource;
    }

    public void createUser(User user) {
        isLoading.setValue(true);
        webService.createUser(user).enqueue(new Callback<User>() {
            @Override
            public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                if (response.isSuccessful()) {
                    FirebaseAuth.getInstance().signInWithEmailAndPassword(user.getEmail(), user.getPassword())
                            .addOnCompleteListener(task -> {
                                if (task.isSuccessful()) {
                                    Log.d(TAG, "signInWithEmail:success");
                                    userResource.setValue(new Resource<>(response));
                                    isLoading.setValue(false);
                                } else {
                                    Log.e(TAG, "signInWithEmail:failure", task.getException());
                                }
                            });
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

    private void loadUser(String userId) {
        isLoading.setValue(true);
        getAuthorizationToken(task -> {
            String token = task.getResult() != null ? task.getResult().getToken() : "";
            webService.getUser(token, userId).enqueue(new Callback<User>() {
                @Override
                public void onResponse(@NonNull Call<User> call, @NonNull Response<User> response) {
                    if (response.isSuccessful()) {
                        Log.d(TAG, "getUser:success");
                    } else {
                        Log.e(TAG, "getUser:failure");
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
}
