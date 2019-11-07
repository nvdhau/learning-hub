package ca.specialTopics.learningHub.networking;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitService {

    private static Retrofit retrofit = null;

    public static WebService get() {
        if (retrofit == null) {
            String BASE_URL = "http://10.0.2.2:8000/api/";

            retrofit = new Retrofit
                    .Builder()
                    .baseUrl(BASE_URL)
                    .addConverterFactory(GsonConverterFactory.create())
                    .build();
        }
        return retrofit.create(WebService.class);
    }

}
