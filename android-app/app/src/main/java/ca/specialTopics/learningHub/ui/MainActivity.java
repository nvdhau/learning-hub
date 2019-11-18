package ca.specialTopics.learningHub.ui;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.Menu;
import android.view.MenuItem;
import android.view.SubMenu;
import android.view.View;
import android.widget.ImageView;
import android.widget.TextView;

import androidx.annotation.Nullable;
import androidx.appcompat.app.ActionBarDrawerToggle;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.ViewModelProviders;

import com.google.android.material.navigation.NavigationView;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;

import java.util.List;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Tag;
import ca.specialTopics.learningHub.ui.postList.PostListFragment;
import ca.specialTopics.learningHub.viewModels.TagListViewModel;

public class MainActivity extends BaseActivity implements LoginFragment.OnFragmentInteractionListener {
    private static final String TAG = MainActivity.class.getSimpleName();
    private static final int TAG_MENU_ID = 10000;
    //TAB INDEX
    //public static final String ARG_TAB_ITEM_ID = "tabItemId";

    private FirebaseAuth mAuth;
    private List<Tag> tagList;

    private DrawerLayout drawerLayout;
    private ActionBarDrawerToggle actionBarDrawerToggle;
    private NavigationView navigationView;
    private TextView emailInTheMenu;
    private ImageView menuImageView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        setProgressBarWithMenu();

        mAuth = FirebaseAuth.getInstance();

        drawerLayout = findViewById(R.id.drawer_layout);
        actionBarDrawerToggle = new ActionBarDrawerToggle(this, drawerLayout, R.string.openMenu, R.string.closeMenu);
        drawerLayout.addDrawerListener(actionBarDrawerToggle);

        navigationView = findViewById(R.id.nav_view);
        emailInTheMenu = navigationView.getHeaderView(0).findViewById(R.id.menuEmail);
        menuImageView = navigationView.getHeaderView(0).findViewById(R.id.menuImageView);
        navigationView.setNavigationItemSelectedListener(menuItem -> {
            menuItem.setChecked(true);
            itemSelectedOnMenu(menuItem);
            drawerLayout.closeDrawers();
            return true;
        });

        TagListViewModel tagListViewModel = ViewModelProviders.of(this).get(TagListViewModel.class);
        if (mAuth.getCurrentUser() != null) {
            tagListViewModel.getTagListResource().observe(this, tagListResource -> {
                Log.d(TAG, "tagListNetworkResource code:" + tagListResource.code);
                if (tagListResource.data != null) {
                    SubMenu subMenu = navigationView.getMenu().findItem(R.id.tags).getSubMenu();
                    tagList = tagListResource.data;
                    for (int i = 0; i < tagList.size(); i++) {
                        Tag tag = tagList.get(i);
                        int tagMenuId = TAG_MENU_ID + 1;
                        MenuItem menuItem = subMenu.add(R.id.trendingTags, tagMenuId, Menu.NONE, tag.getName());
                        menuItem.setCheckable(true);
                    }
                }
            });
        }

        setMenu();
    }

    private void setMenu() {
        FirebaseUser firebaseUser = mAuth.getCurrentUser();

        navigationView.getMenu().clear();
        menuImageView.setVisibility(View.GONE);
        if (firebaseUser == null) {
            emailInTheMenu.setText("");
            emailInTheMenu.setVisibility(View.GONE);

            navigationView.inflateMenu(R.menu.guest);
            navigationView.setCheckedItem(R.id.login);
        } else {
            emailInTheMenu.setText(firebaseUser.getEmail());
            emailInTheMenu.setVisibility(View.VISIBLE);

            navigationView.inflateMenu(R.menu.logged);
            navigationView.setCheckedItem(R.id.posts);
        }

        if (navigationView.getCheckedItem() != null)
            itemSelectedOnMenu(navigationView.getCheckedItem());
    }

    private void itemSelectedOnMenu(MenuItem menuItem) {
        Fragment fragmentToShow = null;

        int itemId = menuItem.getItemId();
        if (itemId == R.id.posts) {
            fragmentToShow = new PostListFragment();
        } else if (itemId == R.id.login) {
            fragmentToShow = new LoginFragment();
        } else if (itemId == R.id.profile) {
            fragmentToShow = new UserFragment();
        } else if (itemId == R.id.logout) {
            mAuth.signOut();
            startActivity(new Intent(this, MainActivity.class));
            finish();
        } else if (itemId >= TAG_MENU_ID) {
            int positionInTagList = itemId - TAG_MENU_ID;
            Tag tag = tagList.get(positionInTagList);

            fragmentToShow = PostListFragment.newInstance(tag);
        }

        if (fragmentToShow != null) {
            getSupportFragmentManager().beginTransaction()
                    .replace(R.id.fragmentDisplay, fragmentToShow)
                    .commit();
        }
    }

    @Override
    public void logUser() {
        setMenu();
    }

    //Static methods for starting this activity
    /*public static void startHomeActivityAtTab(Context context, int tabItemId) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra(ARG_TAB_ITEM_ID, tabItemId);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);//clear all top activity
        context.startActivity(intent);
    }

    public static void startHomeActivityAtTab(Context context, int tabItemId, int topItemsTabNavIndex) {
        Intent intent = new Intent(context, MainActivity.class);
        intent.putExtra(ARG_TAB_ITEM_ID, tabItemId);
        intent.putExtra("topItemsTabNavIndex", topItemsTabNavIndex);
        intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP);//clear all top activity
        context.startActivity(intent);
    }*/

    @Override
    protected void onPostCreate(@Nullable Bundle savedInstanceState) {
        super.onPostCreate(savedInstanceState);
        actionBarDrawerToggle.syncState();
    }

    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (actionBarDrawerToggle.onOptionsItemSelected(item))
            return true;
        return super.onOptionsItemSelected(item);
    }
}
