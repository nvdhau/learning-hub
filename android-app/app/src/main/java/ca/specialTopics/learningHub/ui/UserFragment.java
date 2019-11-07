package ca.specialTopics.learningHub.ui;

import androidx.lifecycle.ViewModelProviders;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.User;
import ca.specialTopics.learningHub.utils.AlertHelper;
import ca.specialTopics.learningHub.utils.Validation;
import ca.specialTopics.learningHub.viewModels.UserViewModel;

public class UserFragment extends BaseFragment {

    private static String TAG = UserFragment.class.getSimpleName();

    private UserViewModel userViewModel;
    private LoginFragment.OnFragmentInteractionListener mListener;
    private FirebaseUser firebaseUser;
    private Validation validation;
    private boolean showEditToast = false;

    private EditText etEmail, etPassword, etUsername, etFullName;
    private TextInputLayout tiEmail, tiPassword, tiUsername, tiFullName;
    private Button btnSubmit;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        firebaseUser = FirebaseAuth.getInstance().getCurrentUser();
        validation = new Validation(getContext());
    }

    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container,
                             @Nullable Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.user_fragment, container, false);

        if (firebaseUser == null)
            setTitle(getString(R.string.register));
        else
            setTitle(getString(R.string.edit, getString(R.string.profile)));

        etEmail = view.findViewById(R.id.etEmail);
        etPassword = view.findViewById(R.id.etPassword);
        etUsername = view.findViewById(R.id.etUsername);
        etFullName = view.findViewById(R.id.etFullName);
        tiEmail = view.findViewById(R.id.tiEmail);
        tiPassword = view.findViewById(R.id.tiPassword);
        tiUsername = view.findViewById(R.id.tiUsername);
        tiFullName = view.findViewById(R.id.tiFullName);
        btnSubmit = view.findViewById(R.id.btnSubmit);

        if (firebaseUser != null) {
            etEmail.setText(firebaseUser.getEmail());
            etEmail.setEnabled(false);
            tiPassword.setVisibility(View.GONE);
        }

        btnSubmit.setOnClickListener(v -> {
            String email = etEmail.getText().toString();
            String password = etPassword.getText().toString();
            String username = etUsername.getText().toString();
            String fullName = etFullName.getText().toString();

            boolean isEmailValid = validation.required(tiEmail, email) &&
                    validation.isValidEmail(tiEmail, email);
            boolean isPasswordValid = validation.required(tiPassword, password)
                    && validation.isLongEnough(tiPassword, password, 6);
            boolean isUsernameValid = validation.required(tiUsername, username);
            boolean isFullNameValid = validation.required(tiFullName, fullName);

            boolean validCreate = isEmailValid && isPasswordValid && isUsernameValid && isFullNameValid;
            boolean validEdit = isEmailValid && isUsernameValid && isFullNameValid;
            boolean valid = firebaseUser == null ? validCreate : validEdit;

            hideKeyboard();
            if (valid) {
                User user = new User(email, password, username, fullName);
                if (firebaseUser == null)
                    userViewModel.createUser(user);
                else {
                    user.setId(firebaseUser.getUid());
                    showEditToast = true;
                    userViewModel.updateUser(user);
                }
            } else {
                AlertHelper.errorsInForm(getContext());
            }
        });

        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        userViewModel = ViewModelProviders.of(requireActivity()).get(UserViewModel.class);

        String id = firebaseUser == null ? null : firebaseUser.getUid();
        userViewModel.getUserResource(id).observe(getViewLifecycleOwner(), userNetworkResource -> {
            Log.d(TAG, "userNetworkResource code:" + userNetworkResource.code);
            if (userNetworkResource.code == 409) {
                tiEmail.setError(getString(R.string.existingEmail));
            } else if (userNetworkResource.data != null && firebaseUser == null) {
                mListener.logUser();
            } else if (userNetworkResource.data != null) {
                User user = userNetworkResource.data;
                etUsername.setText(user.getUsername());
                etFullName.setText(user.getFullName());

                if (showEditToast) {
                    AlertHelper.show(getContext(), getString(R.string.updated, getString(R.string.profile)));
                    showEditToast = false;
                }
            }
        });

        userViewModel.getIsLoading().observe(getViewLifecycleOwner(), isLoading -> {
            if (isLoading) {
                btnSubmit.setEnabled(false);
                showProgressBar();
            } else {
                btnSubmit.setEnabled(true);
                hideProgressBar();
            }
        });
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof LoginFragment.OnFragmentInteractionListener) {
            mListener = (LoginFragment.OnFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
}
