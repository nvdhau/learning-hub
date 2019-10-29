package ca.specialTopics.learningHub.ui;

import android.app.Activity;
import android.view.inputmethod.InputMethodManager;

import androidx.fragment.app.Fragment;

public class BaseFragment extends Fragment {

    public BaseFragment() {
    }

    @Override
    public void onPause() {
        super.onPause();
        ((BaseActivity) getActivity()).hideProgressBar();
    }

    public void showProgressBar() {
        BaseActivity baseActivity = ((BaseActivity) getActivity());
        if (baseActivity != null)
            baseActivity.showProgressBar();
    }

    public void hideProgressBar() {
        BaseActivity baseActivity = ((BaseActivity) getActivity());
        if (baseActivity != null)
            baseActivity.hideProgressBar();
    }
    //Hide keyboard for fragment
    public void hideKeyboard() {
        InputMethodManager imm = (InputMethodManager) getContext().getSystemService(Activity.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(getView().getWindowToken(), 0);
    }
}
