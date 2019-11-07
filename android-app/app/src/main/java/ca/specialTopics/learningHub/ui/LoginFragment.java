package ca.specialTopics.learningHub.ui;

import android.content.Context;
import android.os.Bundle;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.google.android.material.textfield.TextInputLayout;
import com.google.firebase.auth.FirebaseAuth;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.utils.AlertHelper;
import ca.specialTopics.learningHub.utils.Validation;

public class LoginFragment extends BaseFragment {
    private FirebaseAuth mAuth;

    private static String TAG = LoginFragment.class.getSimpleName();
    private OnFragmentInteractionListener mListener;

    @Override
    public void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mAuth = FirebaseAuth.getInstance();
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_login, container, false);

        setTitle(getString(R.string.login));

        final Validation validation = new Validation(getContext());
        final EditText etEmail = view.findViewById(R.id.etEmail);
        final EditText etPassword = view.findViewById(R.id.etPassword);
        final TextInputLayout tiEmail = view.findViewById(R.id.tiEmail);
        final TextInputLayout tiPassword = view.findViewById(R.id.tiPassword);
        Button btnSubmit = view.findViewById(R.id.btnSubmit);
        Button btnRegister = view.findViewById(R.id.btnRegister);

        btnSubmit.setOnClickListener(v -> {
            String email = etEmail.getText().toString();
            String password = etPassword.getText().toString();

            boolean isEmailValid = validation.required(tiEmail, email) &&
                    validation.isValidEmail(tiEmail, email);
            boolean isPasswordValid = validation.required(tiPassword, password)
                    && validation.isLongEnough(tiPassword, password, 6);

            hideKeyboard();
            if (isEmailValid && isPasswordValid) {
                btnSubmit.setEnabled(false);
                showProgressBar();
                mAuth.signInWithEmailAndPassword(email, password)
                        .addOnCompleteListener(task -> {
                            if (task.isSuccessful()) {
                                // Sign in success, update UI with the signed-in user's information
                                Log.d(TAG, "signInWithEmail:success");
                                mListener.logUser();
                            } else {
                                // If sign in fails, display a message to the user.
                                Log.w(TAG, "signInWithEmail:failure", task.getException());
                                tiEmail.setError(getResources().getText(R.string.errorLogin));
                            }

                            btnSubmit.setEnabled(true);
                            hideProgressBar();
                        });
            } else {
                AlertHelper.errorsInForm(getContext());
            }
        });

        btnRegister.setOnClickListener(v -> pushFragment(new UserFragment()));
        return view;
    }

    @Override
    public void onAttach(@NonNull Context context) {
        super.onAttach(context);
        if (context instanceof OnFragmentInteractionListener) {
            mListener = (OnFragmentInteractionListener) context;
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

    /**
     * This interface must be implemented by activities that contain this
     * fragment to allow an interaction in this fragment to be communicated
     * to the activity and potentially other fragments contained in that
     * activity.
     * <p>
     * See the Android Training lesson <a href=
     * "http://developer.android.com/training/basics/fragments/communicating.html"
     * >Communicating with Other Fragments</a> for more information.
     */
    public interface OnFragmentInteractionListener {
        void logUser();
    }
}
