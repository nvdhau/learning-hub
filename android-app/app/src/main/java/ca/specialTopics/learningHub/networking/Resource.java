package ca.specialTopics.learningHub.networking;

import retrofit2.Response;

public class Resource<T> {
    public T data = null;
    public int code;

    public Resource(Response<T> response) {
        this.code = response.code();
        if (response.isSuccessful())
            this.data = response.body();
    }

}
