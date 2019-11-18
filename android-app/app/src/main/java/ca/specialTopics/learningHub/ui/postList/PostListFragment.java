package ca.specialTopics.learningHub.ui.postList;

import android.content.Context;
import android.os.Bundle;

import androidx.annotation.Nullable;
import androidx.lifecycle.ViewModelProviders;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;

import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import ca.specialTopics.learningHub.R;
import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.ui.BaseFragment;
import ca.specialTopics.learningHub.viewModels.PostListViewModel;

public class PostListFragment extends BaseFragment {
    private static final String TAG = PostListFragment.class.getSimpleName();
    private static final String ARG_COLUMN_COUNT = "column-count";

    private int mColumnCount = 1;
    private PostListViewModel postListViewModel;
    private PostRecyclerViewAdapter postRecyclerViewAdapter;
    private SwipeRefreshLayout swipeRefreshLayout;

    // private OnListFragmentInteractionListener mListener;

    @SuppressWarnings("unused")
    public static PostListFragment newInstance(int columnCount) {
        PostListFragment fragment = new PostListFragment();
        Bundle args = new Bundle();
        args.putInt(ARG_COLUMN_COUNT, columnCount);
        fragment.setArguments(args);
        return fragment;
    }

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        if (getArguments() != null) {
            mColumnCount = getArguments().getInt(ARG_COLUMN_COUNT);
        }
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View view = inflater.inflate(R.layout.fragment_post_list, container, false);

        setTitle(getString(R.string.posts));

        // Set Recycler View
        Context context = view.getContext();
        RecyclerView recyclerView = view.findViewById(R.id.list);
        if (mColumnCount <= 1) {
            recyclerView.setLayoutManager(new LinearLayoutManager(context));
        } else {
            recyclerView.setLayoutManager(new GridLayoutManager(context, mColumnCount));
        }
        postRecyclerViewAdapter = new PostRecyclerViewAdapter(requireContext(), null);
        recyclerView.setAdapter(postRecyclerViewAdapter);

        swipeRefreshLayout = view.findViewById(R.id.swipe_refresh);

        return view;
    }

    @Override
    public void onActivityCreated(@Nullable Bundle savedInstanceState) {
        super.onActivityCreated(savedInstanceState);
        postListViewModel = ViewModelProviders.of(requireActivity()).get(PostListViewModel.class);

        postListViewModel.getPostListResource().observe(getViewLifecycleOwner(), postListResource -> {
            Log.d(TAG, "userNetworkResource code:" + postListResource.code);
            if (postListResource.data != null) {
                postRecyclerViewAdapter.setData(postListResource.data);
            }
        });

        postListViewModel.getIsLoading().observe(getViewLifecycleOwner(), isLoading -> {
            if (isLoading) {
                showProgressBar();
            } else {
                hideProgressBar();
            }
        });

        swipeRefreshLayout.setOnRefreshListener(() -> {
            swipeRefreshLayout.setRefreshing(false);
            postListViewModel.loadPostList();
        });
    }

    /*
    @Override
    public void onAttach(Context context) {
        super.onAttach(context);
        if (context instanceof OnListFragmentInteractionListener) {
            mListener = (OnListFragmentInteractionListener) context;
        } else {
            throw new RuntimeException(context.toString()
                    + " must implement OnListFragmentInteractionListener");
        }
    }

    @Override
    public void onDetach() {
        super.onDetach();
        mListener = null;
    }
    */

    public interface OnListClickListener {
        void onListClick(Post post);
    }
}
