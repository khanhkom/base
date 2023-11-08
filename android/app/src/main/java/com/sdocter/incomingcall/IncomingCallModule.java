package jp.shachihata.sasatto.incomingcall;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.content.IntentFilter;
import android.media.AudioAttributes;
import android.media.AudioManager;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.VibrationEffect;
import android.os.Vibrator;
import android.util.Log;
import android.view.WindowManager;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.Timer;
import java.util.TimerTask;

import jp.shachihata.sasatto.R;


public class IncomingCallModule extends ReactContextBaseJavaModule {

    public static ReactApplicationContext reactContext;
    public static Vibrator v;
    private static long[] pattern = {0, 1000, 800};
    public static MediaPlayer player;
    private static String status = ""; // calling || answered || declined
    private WritableMap infor;
    private static Callback endCallHandler;
    private static BroadcastReceiver deviceModeReceiver;
    private static Timer timer;
    public static int incomingCallTime = 60000;

    IncomingCallModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
        infor = new WritableNativeMap();
    }

    @NonNull
    @Override
    public String getName() {
        return "IncomingCall";
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public String getStatus() {
        return status;
    }

    @ReactMethod
    public void showCall(String title, String body, String answer, String decline, String appState, String extra, Callback handler) {
        if (status.equals("calling")) {
            handler.invoke();
            return;
        }
        status = "calling";

        infor = new WritableNativeMap();
        infor.putString("title", title);
        infor.putString("body", body);
        infor.putString("extra", extra);

        vibrate();
        playSound();
        listenRingerModeChanged();
        showCallActivity();
        showNotification(title, body, answer, decline, appState, extra);
        endCallHandler = handler;

        timer = new Timer();
        timer.schedule(new TimerTask() {
            @Override
            public void run() {
                Log.i(null, "Incoming Call Timeout");
                dismissCall();
            }
        }, incomingCallTime);
    }

    @ReactMethod
    public static void dismissCall() {
        if (status.equals("declined")) {
            return;
        }
        status = "declined";
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        unListenRingerModeChanged();
        stopVibrate();
        stopSound();
        dismissCallActivity();
        dismissNotification();
        if (endCallHandler != null) {
            endCallHandler.invoke();
            endCallHandler = null;
        }
    }

    public void showNotification(String title, String body, String answer, String decline, String appState, String extra) {
        Intent i = new Intent(reactContext, IncomingCallService.class);
        i.putExtra("title", title);
        i.putExtra("body", body);
        i.putExtra("answer", answer);
        i.putExtra("decline", decline);
        i.putExtra("appState", appState);
        i.putExtra("extra", extra);
        reactContext.startService(i);
    }

    @ReactMethod(isBlockingSynchronousMethod = true)
    public WritableMap getDisplayNotification() {
        return infor.copy();
    }

    @ReactMethod
    public static void answerCall() {
        if (status.equals("answered")) {
            return;
        }
        status = "answered";
        if (timer != null) {
            timer.cancel();
            timer = null;
        }
        endCallHandler = null;
        stopVibrate();
        stopSound();
        dismissNotification();
    }

    public static void showCallActivity() {
        if (IncomingCallActivity.isShowing) {
            return;
        }
        Intent i = new Intent(reactContext, IncomingCallActivity.class);
        i.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_REORDER_TO_FRONT | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        i.addFlags(WindowManager.LayoutParams.FLAG_SHOW_WHEN_LOCKED + WindowManager.LayoutParams.FLAG_DISMISS_KEYGUARD + WindowManager.LayoutParams.FLAG_TURN_SCREEN_ON);
        reactContext.startActivity(i);
    }

    public static void dismissCallActivity() {
        if (IncomingCallActivity.activity != null) {
            IncomingCallActivity.activity.finishAndRemoveTask();
        }
    }

    public static void dismissNotification() {
        Intent i = new Intent(reactContext, IncomingCallService.class);
        i.setAction("cancel");
        reactContext.startService(i);
    }

    public static void vibrate() {
        v = (Vibrator) reactContext.getSystemService(Context.VIBRATOR_SERVICE);
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            v.vibrate(VibrationEffect.createWaveform(pattern, 0),
                    new AudioAttributes.Builder()
                            .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
                            .setUsage(AudioAttributes.USAGE_ALARM)
                            .build());
        } else {
            v.vibrate(pattern, 0);
        }
    }

    public static void stopVibrate() {
        if (v != null) {
            v.cancel();
            v = null;
        }
    }

    public static void playSound() {
        player = MediaPlayer.create(reactContext, R.raw.ding);
        player.setLooping(true);
        player.start();
    }

    public static void stopSound() {
        if (player != null) {
            player.stop();
            player.release();
            player = null;
        }
    }

    public static void listenRingerModeChanged() {
        // Handle vibration and sound when device toggles between silent, vibrate and normal modes
        deviceModeReceiver = new BroadcastReceiver() {
            @Override
            public void onReceive(Context context, Intent intent) {
                if (AudioManager.RINGER_MODE_CHANGED_ACTION.equals(intent.getAction())) {
                    AudioManager audioManager = (AudioManager) reactContext.getSystemService(Context.AUDIO_SERVICE);
                    int ringerMode = audioManager.getRingerMode();

                    if (player != null) {
                        player.setVolume(
                                ringerMode == AudioManager.RINGER_MODE_NORMAL ? 1 : 0,
                                ringerMode == AudioManager.RINGER_MODE_NORMAL ? 1 : 0
                        );
                    }

                    if (ringerMode == AudioManager.RINGER_MODE_SILENT) {
                        stopVibrate();
                    } else {
                        vibrate();
                    }
                }
            }
        };
        IntentFilter intentFilter = new IntentFilter(AudioManager.RINGER_MODE_CHANGED_ACTION);
        reactContext.registerReceiver(deviceModeReceiver, intentFilter);
    }

    public static void unListenRingerModeChanged() {
        if (deviceModeReceiver != null) {
            reactContext.unregisterReceiver(deviceModeReceiver);
            deviceModeReceiver = null;
        }
    }

    public static void sendEvent(String eventName, WritableMap params) {
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class).emit(eventName, params);
    }
}


