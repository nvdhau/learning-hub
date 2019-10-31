package ca.specialTopics.learningHub.utils;

import android.content.Context;
import android.widget.Toast;

import ca.specialTopics.learningHub.R;

public class Helper {
    public static void errorsInForm(Context c) {
        Toast.makeText(c, c.getString(R.string.someErrors), Toast.LENGTH_SHORT).show();
    }
}
