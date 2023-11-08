package jp.shachihata.sasatto.incomingcall;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;

import com.facebook.react.bridge.WritableNativeMap;

public class IncomingCallReceiver extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
        String action = intent.getAction();
        if (action.equals("decline")) {
            IncomingCallModule.dismissCall();
        }
        if (action.equals("answer")) {
            IncomingCallModule.sendEvent("answerCall", new WritableNativeMap());
            IncomingCallModule.answerCall();
            IncomingCallModule.showCallActivity();
        }
    }
}
