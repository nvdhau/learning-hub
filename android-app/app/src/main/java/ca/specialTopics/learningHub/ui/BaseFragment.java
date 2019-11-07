package ca.specialTopics.learningHub.ui;

import android.app.Activity;
import android.view.inputmethod.InputMethodManager;

import androidx.fragment.app.Fragment;

import ca.specialTopics.learningHub.R;

public abstract class BaseFragment extends Fragment {

    public BaseFragment() {
    }

    @Override
    public void onPause() {
        super.onPause();
        ((BaseActivity) requireActivity()).hideProgressBar();
    }

    void showProgressBar() {
        ((BaseActivity) requireActivity()).showProgressBar();
    }

    void hideProgressBar() {
        ((BaseActivity) requireActivity()).hideProgressBar();
    }

    void pushFragment(Fragment fragment) {
        requireActivity().getSupportFragmentManager().beginTransaction()
                .replace(R.id.fragmentDisplay, fragment)
                .addToBackStack(null)
                .commit();
    }

    //Hide keyboard for fragment
    void hideKeyboard() {
        InputMethodManager imm = (InputMethodManager) requireContext().getSystemService(Activity.INPUT_METHOD_SERVICE);
        if (imm != null)
            imm.hideSoftInputFromWindow(requireView().getWindowToken(), 0);
    }

    //Set the action bar title
    void setTitle(String title) {
        ((BaseActivity) requireActivity()).setTitle(title);
    }
}
