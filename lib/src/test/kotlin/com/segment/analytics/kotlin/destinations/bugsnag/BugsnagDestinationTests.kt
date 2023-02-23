package com.segment.analytics.kotlin.destinations.bugsnag

import android.os.Bundle
import io.mockk.every
import io.mockk.mockk
import org.junit.Before
import org.junit.Test
import org.junit.runner.RunWith
import org.robolectric.RobolectricTestRunner
import org.robolectric.annotation.Config

@RunWith(RobolectricTestRunner::class)
@Config(manifest = Config.NONE)

class BugsnagDestinationTests {
    @Before
    fun setUp() {

    }

    @Test
    fun `sample mock test`() {
        val bundle = mockk<Bundle>()
        every { bundle.get("key") }.returns("value")
    }

}