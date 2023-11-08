package jp.shachihata.sasatto.incomingcall;


import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;

import com.facebook.react.ReactActivity;

public class IncomingCallActivity extends ReactActivity {
    public static Activity activity;
    public static Boolean isShowing = false;

    @Override
    protected String getMainComponentName() {
        return "IncomingCall";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        activity = this;
    }

    @Override
    protected void onStart() {
        super.onStart();
        isShowing = true;
        updateNotification();
    }

    @Override
    protected void onPause() {
        super.onPause();
        isShowing = false;
        updateNotification();
    }

    private void updateNotification() {
        Intent i = new Intent(this, IncomingCallService.class);
        i.setAction("update");
        startService(i);
    }
}