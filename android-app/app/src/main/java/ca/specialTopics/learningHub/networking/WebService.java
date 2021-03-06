package ca.specialTopics.learningHub.networking;

import java.util.List;

import ca.specialTopics.learningHub.models.CommentServerAnswer;
import ca.specialTopics.learningHub.models.Post;
import ca.specialTopics.learningHub.models.Tag;
import ca.specialTopics.learningHub.models.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface WebService {

    @POST("users/create")
    Call<User> createUser(@Body User user);

    @GET("users/{id}")
    Call<User> getUser(@Header("Authorization") String authorization, @Path("id") String id);

    @PUT("users")
    Call<User> updateUser(@Header("Authorization") String authorization, @Body User user);

    @GET("posts")
    Call<List<Post>> getPostList(@Header("Authorization") String authorization, @Query("is_blog") String filter, @Query("tags") String tag);

    @GET("posts/{id}")
    Call<Post> getPost(@Header("Authorization") String authorization, @Path("id") int id);

    @GET("posts/{id}/comments")
    Call<List<CommentServerAnswer>> getPostCommentList(@Header("Authorization") String authorization, @Path("id") int id);

    @GET("tags")
    Call<List<Tag>> getTagList(@Header("Authorization") String authorization);

}
