package com.segment.analytics.kotlin.destinations.bugsnag

import android.app.Activity
import android.app.Application
import android.content.Context
import android.content.Intent
import com.bugsnag.android.Client
import com.segment.analytics.kotlin.core.*
import com.segment.analytics.kotlin.core.platform.Plugin
import com.segment.analytics.kotlin.core.utilities.LenientJson
import io.mockk.*
import io.mockk.impl.annotations.MockK
import kotlinx.serialization.decodeFromString
import kotlinx.serialization.json.buildJsonObject
import kotlinx.serialization.json.put
import org.junit.Assert.assertEquals
import org.junit.Before
import org.junit.Test
import org.junit.jupiter.api.Assertions
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(manifest = Config.NONE)
class BugsnagDestinationTests {

    @MockK(relaxUnitFun = true)
    lateinit var mockApplication: Application
    @MockK(relaxUnitFun = true)
    lateinit var mockedClient: Client
    @MockK(relaxUnitFun = true)
    lateinit var mockedContext: Context
    @MockK(relaxUnitFun = true)
    lateinit var mockedAnalytics: Analytics
    lateinit var mockedBugsnagDestination: BugsnagDestination

    init {
        MockKAnnotations.init(this)
    }

    @Before
    fun setUp() {
        mockedBugsnagDestination = BugsnagDestination()
        mockedBugsnagDestination.analytics = mockedAnalytics
        mockedBugsnagDestination.client = mockedClient
        every { mockedAnalytics.configuration.application } returns mockedContext
        every { mockApplication.applicationContext } returns mockedContext
    }

    @Test
    fun `settings are updated correctly`() {
        // An Bugsnag example settings
        val sampleBugsnagSettings: Settings = LenientJson.decodeFromString(
            """
            {
              "integrations": {
                "Bugsnag": {
                  "apiKey": "APIKEY1234567890",
                  "releaseStage": "",
                  "useSSL": true
                }
              }
            }
        """.trimIndent()
        )
        val bugsnagSettings: Settings = sampleBugsnagSettings
        mockedBugsnagDestination.update(bugsnagSettings, Plugin.UpdateType.Initial)

        /* assertions Bugsnag config */
        Assertions.assertNotNull(mockedBugsnagDestination.bugsnagSettings)
        with(mockedBugsnagDestination.bugsnagSettings!!) {
            assertEquals(apiKey, "APIKEY1234567890")
            assertEquals(releaseStage, "")
            assertEquals(useSSL, true)
        }
    }

    @Test
    fun `activity created handled correctly`() {
        val activity: Activity = mockkClass(Activity::class)
        every { activity.localClassName } returns "MockActivity"
        val intent: Intent = mockkClass(Intent::class)
        every { activity.intent } returns intent
        mockedBugsnagDestination.onActivityCreated(activity, null)
        verify { mockedClient.context = "MockActivity" }
    }

    @Test
    fun `identify is handled correctly`() {
        val sampleEvent = IdentifyEvent(
            userId = "User-Id-123",
            traits = buildJsonObject {
                put("email", "email@.com")
                put("name", "First Last")
            }
        ).apply { context = emptyJsonObject }
        mockedBugsnagDestination.identify(sampleEvent)
        verify { mockedClient.setUser("User-Id-123", "email@.com", "First Last") }
        verify { mockedClient.addMetadata("User", "email", "email@.com") }
        verify { mockedClient.addMetadata("User", "name", "First Last") }
    }

    @Test
    fun `identify with traits is handled correctly`() {
        val sampleEvent = IdentifyEvent(
            userId = "User-Id-123",
            traits = buildJsonObject {
                put("email", "email@.com")
                put("name", "First Last")
                put("key1", "Value 1")
                put("key2", "Value 2")
            }
        ).apply { context = emptyJsonObject }
        mockedBugsnagDestination.identify(sampleEvent)
        verify { mockedClient.setUser("User-Id-123", "email@.com", "First Last") }
        verify { mockedClient.addMetadata("User", "email", "email@.com") }
        verify { mockedClient.addMetadata("User", "name", "First Last") }
        verify { mockedClient.addMetadata("User", "key1", "Value 1") }
        verify { mockedClient.addMetadata("User", "key2", "Value 2") }
    }

    @Test
    fun `screen is handled correctly`() {
        val sampleEvent = ScreenEvent(
            name = "Screen 1",
            properties = buildJsonObject {
            },
            category = ""
        ).apply {
            context = emptyJsonObject
        }
        mockedBugsnagDestination.screen(sampleEvent)
        verify { mockedClient.leaveBreadcrumb("Viewed Screen 1 Screen") }
    }

    @Test
    fun `track is handled correctly`() {
        val sampleEvent = TrackEvent(
            event = "Track 1",
            properties = buildJsonObject {
            }
        ).apply {
            context = emptyJsonObject
        }
        mockedBugsnagDestination.track(sampleEvent)
        verify { mockedClient.leaveBreadcrumb("Track 1") }
    }

}