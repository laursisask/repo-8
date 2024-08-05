# Analytics-Kotlin BugSnag

Add Bugsnag support to your applications via this plugin for [Analytics-Kotlin](https://github.com/segmentio/analytics-kotlin)

⚠️ **Github Issues disabled in this repository** ⚠️

Please direct all issues, bug reports, and feature enhancements to `friends@segment.com` so they can be resolved as efficiently as possible. 

## Adding the dependency
To install the Segment-bugsnag integration, simply add this line to your gradle file:

```
implementation 'com.segment.analytics.kotlin.destinations:bugsnag:<latest_version>'
```
Or the following for Kotlin DSL
```
implementation("com.segment.analytics.kotlin.destinations:bugsnag:<latest_version>")
```

Also add the BugSnag Gradle plugin dependency to your project level build.gradle.
```
buildscript {
    dependencies {
        // ...
        classpath "com.bugsnag:bugsnag-android-gradle-plugin:7.4.1"
    }
}
```
Or the following for Kotlin DSL
```
buildscript {
    dependencies {
        // ...
        classpath("com.bugsnag:bugsnag-android-gradle-plugin:7.4.1")
    }
}
```

## Using the Plugin in your App

Open the file where you setup and configure the Analytics-Kotlin library. Add this plugin to the list of imports.

```
import com.segment.analytics.kotlin.destinations.bugsnag.BugsnagDestination
```

Just under your Analytics-Kotlin library setup, call `analytics.add(plugin = ...)` to add an instance of the plugin to the Analytics timeline.

```
    analytics = Analytics("<YOUR WRITE KEY>", applicationContext) {
        this.flushAt = 3
        this.trackApplicationLifecycleEvents = true
    }
    analytics.add(plugin = BugsnagDestination())
```

Your events will now begin to flow to bugsnag in device mode.


## Integrating with Segment

Interested in integrating your service with us? Check out our [Partners page](https://segment.com/partners/) for more details.
Please see [our documentation](https://segment.com/docs/connections/destinations/catalog/bugsnag/) for more information.


## Support

Please use Github issues, Pull Requests, or feel free to reach out to our [support team](https://segment.com/help/).


## License
```
MIT License

Copyright (c) 2021 Segment

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
