package jp.shachihata.sasatto.incomingcall;

import android.app.IntentService;
import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.widget.RemoteViews;

import androidx.annotation.Nullable;
import androidx.core.app.NotificationCompat;

import jp.shachihata.sasatto.R;


public class IncomingCallService extends IntentService {
    public static String CHANNEL_ID_HIGH = "incoming_call_high";
    private CharSequence CHANNEL_NAME_HIGH = "Incoming Call Hight Priority";
    public static String CHANNEL_ID_LOW = "incoming_call_low";
    private CharSequence CHANNEL_NAME_LOW = "Incoming Call Low Priority";
    public static int CALL_ID = 1;
    private static String title, body, answer, decline, appState, extra;
    private static Boolean isShowing = false;

    public IncomingCallService() {
        super("IncomingCallService");
    }

    @Override
    protected void onHandleIntent(@Nullable Intent intent) {
        String action = intent.getAction();
        if (action != null) {
            if (action.equals("cancel")) {
                NotificationManager mNotificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
                mNotificationManager.cancel(CALL_ID);
                isShowing = false;
                return;
            }
            if (action.equals("update")) {
                if (isShowing) {
                    showNotification(false);
                }
                return;
            }
        }

        Bundle bundle = intent.getExtras();
        title = bundle.getString("title", "");
        body = bundle.getString("body", "");
        answer = bundle.getString("answer", "");
        decline = bundle.getString("decline", "");
        appState = bundle.getString("appState", "");
        extra = bundle.getString("extra", "");

        createNotificationChannel();
        showNotification(true);
    }

    private void showNotification(boolean isFirstTime) {
        NotificationManager mNotificationManager = (NotificationManager) getSystemService(NOTIFICATION_SERVICE);
        mNotificationManager.notify(CALL_ID, generateIncomingCall(isFirstTime));
        isShowing = true;
    }

    private Notification generateIncomingCall(boolean isFirstTime) {
        RemoteViews notificationLayout = new RemoteViews(getPackageName(), R.layout.incoming_call_notification);
        RemoteViews notificationLayoutExpand = new RemoteViews(getPackageName(), R.layout.incoming_call_notification_expand);

        notificationLayout.setTextViewText(R.id.tv_title, title);
        notificationLayout.setTextViewText(R.id.tv_body, body);
        notificationLayoutExpand.setTextViewText(R.id.tv_answer, answer);
        notificationLayoutExpand.setTextViewText(R.id.tv_decline, decline);

        notificationLayoutExpand.setTextViewText(R.id.tv_title, title);
        notificationLayoutExpand.setTextViewText(R.id.tv_body, body);

        Intent declineClickIntent = new Intent(this, IncomingCallReceiver.class);
        declineClickIntent.setAction("decline");
        PendingIntent declineClickPendingIntent = PendingIntent.getBroadcast(this, 0, declineClickIntent, PendingIntent.FLAG_IMMUTABLE);
        notificationLayoutExpand.setOnClickPendingIntent(R.id.tv_decline, declineClickPendingIntent);

        Intent answerClickIntent = new Intent(this, IncomingCallReceiver.class);
        answerClickIntent.setAction("answer");
        answerClickIntent.putExtra("extra", extra);
        PendingIntent answerClickPendingIntent = PendingIntent.getBroadcast(this, 0, answerClickIntent, PendingIntent.FLAG_IMMUTABLE);
        notificationLayoutExpand.setOnClickPendingIntent(R.id.tv_answer, answerClickPendingIntent);

        Intent fullScreenIntent = new Intent(this, IncomingCallActivity.class);
        PendingIntent fullScreenPendingIntent = PendingIntent.getActivity(this, 0,
                fullScreenIntent, PendingIntent.FLAG_UPDATE_CURRENT +
                        Intent.FLAG_ACTIVITY_CLEAR_TASK +
                        Intent.FLAG_ACTIVITY_NEW_TASK +
                        Intent.FLAG_ACTIVITY_CLEAR_TOP);

        Boolean isHeadUpNotification = isFirstTime ? !IncomingCallActivity.isShowing && !appState.equals("active") : !IncomingCallActivity.isShowing;

        Notification incomingCallNotification = new NotificationCompat.Builder(this,
                isHeadUpNotification ? CHANNEL_ID_HIGH : CHANNEL_ID_LOW)
                .setSmallIcon(R.drawable.ic_notification)
                .setStyle(new NotificationCompat.DecoratedCustomViewStyle())
                .setCustomContentView(notificationLayout)
                .setCustomBigContentView(notificationLayoutExpand)
                .setCustomHeadsUpContentView(notificationLayoutExpand)
                .setFullScreenIntent(fullScreenPendingIntent, true)
                .setPriority(isHeadUpNotification ? NotificationCompat.PRIORITY_MAX : NotificationCompat.PRIORITY_MIN)
                .setCategory(NotificationCompat.CATEGORY_CALL)
                .setVisibility(NotificationCompat.VISIBILITY_PUBLIC)
                .setOngoing(true)
                .setAutoCancel(false)
                .setTimeoutAfter(IncomingCallModule.incomingCallTime)
                .build();

        return incomingCallNotification;
    }

    private void createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel highChannel = new NotificationChannel(CHANNEL_ID_HIGH, CHANNEL_NAME_HIGH, NotificationManager.IMPORTANCE_HIGH);
            NotificationChannel lowChannel = new NotificationChannel(CHANNEL_ID_LOW, CHANNEL_NAME_LOW, NotificationManager.IMPORTANCE_MIN);
            NotificationManager notificationManager = getSystemService(NotificationManager.class);
            notificationManager.createNotificationChannel(highChannel);
            notificationManager.createNotificationChannel(lowChannel);
        }
    }
}
