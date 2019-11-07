package ca.specialTopics.learningHub.utils;

import android.content.Context;
import android.widget.Toast;

import androidx.annotation.StringRes;

import ca.specialTopics.learningHub.R;

public class AlertHelper {
    public static void errorsInForm(Context c) {
        show(c, R.string.someErrors);
    }

    public static void show(Context c, @StringRes int stringRes) {
        Toast.makeText(c, stringRes, Toast.LENGTH_SHORT).show();
    }

    public static void show(Context c, String message) {
        Toast.makeText(c, message, Toast.LENGTH_SHORT).show();
    }
}
