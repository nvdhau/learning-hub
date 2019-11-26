package ca.specialTopics.learningHub.utils;

import com.google.gson.FieldNamingPolicy;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

public class JSONParser {

    private static Gson buildGson() {
        GsonBuilder gsonBuilder = new GsonBuilder();
        gsonBuilder.setFieldNamingPolicy(FieldNamingPolicy.LOWER_CASE_WITH_UNDERSCORES);
        gsonBuilder.serializeNulls();
        return gsonBuilder.create();
    }

    public static JSONArray createJSONArray(List<String> objectList) {
        JSONArray jsonArray = new JSONArray();

        for (Object object : objectList) {
            jsonArray.put(object);
        }

        return jsonArray;
    }

    public static String toJson(Object object) {
        return buildGson().toJson(object);
    }

    public static boolean getSuccess(JSONObject jsonObject) {
        boolean success = false;
        try {
            success = jsonObject.getBoolean("success");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return success;
    }

    public static <T> T parseClass(String jsonString, Class<T> tClass) {
        Gson gson = buildGson();
        return gson.fromJson(jsonString, tClass);
    }

    public static <T> ArrayList<T> parseArrayList(String jsonString, Class<T> tClass) {
        Gson gson = buildGson();
        Type collectionType = TypeToken.getParameterized(ArrayList.class, tClass).getType();
        return gson.fromJson(jsonString, collectionType);
    }
}
