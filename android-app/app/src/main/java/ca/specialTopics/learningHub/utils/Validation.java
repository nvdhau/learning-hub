package ca.specialTopics.learningHub.utils;

import android.content.Context;
import android.util.Patterns;

import com.google.android.material.textfield.TextInputLayout;

import java.util.regex.Pattern;

import ca.specialTopics.learningHub.R;

public class Validation {

    private Context c;

    public Validation(Context c) {
        this.c = c;
    }

    public static void setError(TextInputLayout field, String error) {
        field.setError(error);
    }

    public boolean required(TextInputLayout field, String value) {
        boolean result = false;
        if (value.length() == 0)
            setError(field, c.getString(R.string.required));
        else {
            setError(field, null);
            result = true;
        }
        return result;
    }

    public boolean isValidEmail(TextInputLayout field, String value) {
        boolean result = false;
        Pattern emailPattern = Patterns.EMAIL_ADDRESS;
        if (!emailPattern.matcher(value).matches())
            setError(field, c.getString(R.string.invalidEmail));
        else {
            setError(field, null);
            result = true;
        }
        return result;
    }

    public boolean isLongEnough(TextInputLayout field, String value, int length) {
        boolean result = false;
        if (value.length() < length)
            setError(field, c.getString(R.string.shortField, length));
        else {
            setError(field, null);
            result = true;
        }
        return result;
    }

}
