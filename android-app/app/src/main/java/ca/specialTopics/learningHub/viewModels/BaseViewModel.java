package ca.specialTopics.learningHub.viewModels;

import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;
import androidx.lifecycle.ViewModel;

import com.google.android.gms.tasks.OnCompleteListener;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;
import com.google.firebase.auth.GetTokenResult;

import ca.specialTopics.learningHub.networking.RetrofitService;
import ca.specialTopics.learningHub.networking.WebService;

public abstract class BaseViewModel extends ViewModel {
    private static String TAG = BaseViewModel.class.getSimpleName();

    MutableLiveData<Boolean> isLoading = new MutableLiveData<>();
    WebService webService = RetrofitService.get();

    public LiveData<Boolean> getIsLoading() {
        return isLoading;
    }

    void getAuthorizationToken(@NonNull OnCompleteListener<GetTokenResult> onCompleteListener) {
        FirebaseUser firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        if (firebaseUser == null) {
            Log.e(TAG, "User not logged!!\nYou can get the user token");
        } else {
            firebaseUser.getIdToken(false).addOnCompleteListener(getTokenResultTask -> {
                if (getTokenResultTask.isSuccessful() && getTokenResultTask.getResult() != null) {
                    onCompleteListener.onComplete(getTokenResultTask);
                } else {
                    Log.e(TAG, "Error getting the token from firebase", getTokenResultTask.getException());
                }
            });
        }
    }

}
