package ca.specialTopics.learningHub.networking;

import ca.specialTopics.learningHub.models.User;
import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface WebService {

    @POST("users/create")
    Call<User> createUser(@Body User user);

    @GET("users/{id}")
    Call<User> getUser(@Header("Authorization") String authorization, @Path("id") String id);

    @PUT("users")
    Call<User> updateUser(@Header("Authorization") String authorization, @Body User user);

}