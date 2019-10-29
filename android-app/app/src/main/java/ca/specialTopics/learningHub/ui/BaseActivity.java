package ca.specialTopics.learningHub.ui;

import android.os.Bundle;
import android.view.MenuItem;
import android.view.View;
import android.widget.ProgressBar;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.Toolbar;

import ca.specialTopics.learningHub.R;

public class BaseActivity extends AppCompatActivity {

    protected ProgressBar progressBar;

    protected void setProgressBarWithMenu() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        progressBar = findViewById(R.id.toolbarprogress);
        progressBar.setVisibility(View.GONE);

        // Set the home icon
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
    }

    protected void setProgressBar() {
        Toolbar toolbar = findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        progressBar = findViewById(R.id.toolbarprogress);
        progressBar.setVisibility(View.GONE);
    }

    public void hideProgressBar() {
        progressBar.setVisibility(View.GONE);
    }

    public void showProgressBar() {
        progressBar.setVisibility(View.VISIBLE);
    }

    @Override
    protected void onPause() {
        super.onPause();
        this.hideProgressBar();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if(item.getItemId() == android.R.id.home) {
            onBackPressed();
            return true;
        }
        return super.onOptionsItemSelected(item);
    }

    public void setTitleActionBar(String title) {
        getSupportActionBar().setTitle(title);
    }


}
