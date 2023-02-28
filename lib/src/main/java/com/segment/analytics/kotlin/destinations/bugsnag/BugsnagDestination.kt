package com.segment.analytics.kotlin.destinations.bugsnag

import android.app.Activity
import android.content.Context
import android.os.Bundle
import com.bugsnag.android.Client
import com.segment.analytics.kotlin.android.plugins.AndroidLifecycle
import com.segment.analytics.kotlin.core.*
import com.segment.analytics.kotlin.core.platform.DestinationPlugin
import com.segment.analytics.kotlin.core.platform.Plugin
import com.segment.analytics.kotlin.core.platform.plugins.logger.log
import com.segment.analytics.kotlin.core.utilities.toContent
import kotlinx.serialization.Serializable
import kotlinx.serialization.json.JsonObject

class BugsnagDestination : DestinationPlugin(), AndroidLifecycle {
    companion object {
        private const val BUGSNAG_FULL_KEY = "Bugsnag"
        private const val VIEWED_EVENT_FORMAT = "Viewed %s Screen"
    }
    internal var bugsnagSettings: BugsnagSettings? = null

    override val key: String = BUGSNAG_FULL_KEY
    internal var client: Client? = null

    override fun update(settings: Settings, type: Plugin.UpdateType) {
        super.update(settings, type)
        if (settings.hasIntegrationSettings(this)) {
            this.bugsnagSettings =
                settings.destinationSettings(key, BugsnagSettings.serializer())
            if (type == Plugin.UpdateType.Initial) {
                if(bugsnagSettings!=null) {
                    analytics.log("Client(context, ${bugsnagSettings?.apiKey})")
                    initializeBugsnagClient()
                }
            }
        }
    }

    override fun identify(payload: IdentifyEvent): BaseEvent {
        val traitsMap = payload.traits.asStringMap()
        val email: String = traitsMap["email"] ?: ""
        val name: String = traitsMap["name"]?: ""
        client?.setUser(payload.userId, email, name)
        analytics.log("client!!.setUser(${payload.userId}, $email, $name)")
        val userKey = "User"
        for((key, value) in traitsMap) {
            client?.addMetadata(userKey, key, value)
            analytics.log("client!!.addMetadata($userKey, $key, $value)")
        }
        return payload
    }

    override fun screen(payload: ScreenEvent): BaseEvent {
        leaveBreadcrumb(String.format(VIEWED_EVENT_FORMAT, payload.name))
        return payload
    }

    override fun track(payload: TrackEvent): BaseEvent {
        leaveBreadcrumb(payload.event)
        return payload
    }

    override fun onActivityCreated(activity: Activity?, savedInstanceState: Bundle?) {
        super.onActivityCreated(activity, savedInstanceState)
        analytics.log("client.context = ${activity?.localClassName}")
        client?.context = activity?.localClassName

    }

    private fun initializeBugsnagClient():Client {
        if(client == null) {
            client = Client(analytics.configuration.application as Context, bugsnagSettings!!.apiKey)
            client!!.context = (analytics.configuration.application as Context).packageName
        }
        return client!!
    }
    private fun leaveBreadcrumb(event: String) {
        client?.leaveBreadcrumb(event)
        analytics.log(" client?.leaveBreadcrumb($event)")
    }

    fun getUnderlyingInstance(): Client? {
        return client
    }
}
/**
 * Bugsnag Settings data class.
 */
@Serializable
data class BugsnagSettings(
//    Bugsnag API key
    var apiKey: String,
//    Distinguish errors that happen in different stages of app's release process e.g 'production', 'development', etc.
    var releaseStage: String,
//    Use SSL When Sending Data to Bugsnag, by default enabled in Segment dashboard
    var useSSL: Boolean
)
private fun JsonObject.asStringMap(): Map<String, String> = this.mapValues { (_, value) ->
    value.toContent().toString()
}