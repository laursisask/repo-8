# Partner Connector Registration

1. [Overview](#overview)
2. [Glossary](#glossary)
3. [Partner Registration Process: High Level Overview](#partner-registration-process-high-level-overview) 
4. [Partner Onboarding: The Complete Workflow](#partner-onboarding-the-complete-workflow)
5. [Build a Connector and Start Using Events and APIs](#build-a-connector-and-start-using-events-and-apis)
6. [Globalization Content Service Reference](#globalization-content-service-reference)
# Overview
The Globalization Content Service is a collection of services that let you extend and integrate localization workflows within Adobe apps and services. This document prepares localization partners to integrate Globalization Content Service into their environments.

From registering an organization, to setting projects, and enabling end-to-end localization workflows that includes sharing, retrieving, localizing, previewing assets, Globalization Content Service APIs let you perform all localization tasks while staying within the Adobe ecosphere. 

# Glossary
In this guide, the following terms will be used.

| Glossary Term  | Definition                                                                                                                                                                                                                                             |
|----------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
|   **Org**         |   An enterprise that’s using Adobe products and services for globalization workflows.                                                                                                                                                                    |
| **IMS Token**      | An Identity Management System (IMS) token for the user in an organization that allows them to be authenticated by Adobe. These users can then use the services and products to which the org is entitled.                                              |
| **User**           | The end user in the Org who triggers the localization workflow. The user can trigger a task for localization, preview and approve a localized task.                                                                                                    |
| **Partner**        | Localization partner that the Org wants to work with. Partner might have an offline selection with Adobe. Once the contracts are signed, partner is authorized into the Globalization Content Service through the Adobe I/O.                            |
| **Authentication** | The process of validating the IMS token and the IMS client id to verify if it has access to the Globalization Content Service.                                                                                                                         |
| **Project**        | A project file is a list of unique properties that are used for managing the translation tasks. For example, a project can include the details of content system, locales, and providers.                                                              |
| **Task**           | A translation task is a group of translation assets which is being sent for translation as a unit. A task is sent to the partner in a XLIFF format for translation. |
| **Event**          | An event is a notification on an action required at your end. Adobe partners can subscribe to Globalization Content Service events and get notifications when new assets are available for translation.                                                |
| **Webhook**        | Webhook is an Adobe I/O event. Your application can sign up to be notified whenever certain events occur. For example, when a user uploads an asset, an event is generated, which can be recorded by a webhook.                                         |
| **Journaling**     | Journaling, in contrast to webhooks, is a pull model of consuming events, whereas webhooks are a push model. In journaling your application will issue a series of API calls to pull batches of one or more events from the journal.                   |
| **Complete asset** | Complete Asset is an action taken by a partner service after manual translation has been completed. It starts a workflow to convert the translated Xliff into the localized asset in the source format and returns it to the content system.           |
| **Normalization**  | Normalization is the process of converting an Adobe Asset into translation information in a XLIFF format.                                                                                                                                              |                                                                                                                                                 


# Partner Registration Process: High Level Overview
If your firm offers localization service, you may want to register with Adobe Globalization Content Service to provide your offerings to all Adobe users. Any enterprise that needs localization for content generated with Adobe tools can trigger a localization workflow from within Adobe products. 

By registering with Adobe Globalization Content Service, you can reach out to new customers and avail deeper more integrated, optimized localization workflows for better planning, increased leveraging, and optimized communication. Also, you save significant time and effort in leveraging, previewing, and normalizing content from Adobe assets.

Interested to be a localization partner listed in the Globalization Content Service partner directory. Read on.

The following workflow diagram describes the steps in the partner registration process.

![Partner Integration Workflow](resources/Partner_Integration_Workflow.png)

1. **Offline approval**: You can reach out to your contact in the Adobe’s globalization team. 


    Your contact point will work with you to get your firm’s details registered in the localization partners team. After necessary approvals, a contract would be signed. Based on the data you provide, such as Org Id, the name of organization, and services you will provide, an org would be created for you. This org will have predefined entitlements to the globalization content service. 
2. **Get an IMS token:** The Globalization Content Service team procures an IMS bearer token for your firm. Use this token to get authenticated through the Adobe I/O console. 
3. **Log on the Adobe I/O Console**: Use the IMS token to log in Adobe I/O console. Once verified, you can access the products and services based on the permissions granted to you. 
4. **Subscribe to APIs**: You can subscribe to the Adobe I/O Globalization Content Service APIs to manage projects, tasks, and assets. 
5. **Subscribe to events**: Using Adobe I/O journaling APIs, subscribe to events and get near real-time communication. Even if you have thousands of tasks needing localization every week, the event journal will help you get info as soon as tasks are being triggered at the product end. Based on task information received in events, retrieve assets, localize them, preview quality, and send final translated assets back to the product through the Adobe I/O Globalization Content Service APIs. 

# Partner Onboarding: The Complete Workflow

Here’s your guide to onboarding on the Adobe I/O console and accessing the Globalization Content Service APIs.

## Offline Approval
Get your IMS credential from the Globalization Content Service team. 

## Login 
1. Log in to your Adobe I/O console account. Browse to the site [https://www.adobe.io/](https://www.adobe.io/) in your favourite browser.

    ![Adobe IO Home](resources/SS_Adobe_io_home.png)
        
2. Click **Console**. 

3. Login using the IMS credentials you have received from the Globalization Content Service team.

    ![Adobe I/O Login](resources/SS_Adobeio_login.png)



## Create a Project and Configure Globalization Content Service APIs
1. Click **Create new project.**

    ![Create New Project](resources/ss_createnewproject.png)
2. Click **Add API** to associate APIs in your empty project.

    ![Click API](resources/ss_Click_API.png)

3. Click **Adobe Services** to access Globalization Content Service APIs.

    ![Add An API](resources/ss_Add_an_API.png)

4. Click **Globalization Content Service**.

    ![Globalization Content Service](resources/ss_Globalization_Content_Service.png)

5. Click **Next**.

    ![](resources/ss_Globalization_Content_Service_1.png)

6. Enable API integration. For this, create a new service account (JWT) credential. 
   A. Select **Generate a key pair** to generate a private/public key pair. The private key pair will be downloaded on your device. This key pair will be used to encrypt and decrypt session keys and digital signatures, as well as to validate your credentials with the identity management system.
   B. If you have created a private/public key pair, upload     it. 
   C. We haven’t created a key pair yet. So, select **Generate a key pair** when you’re ready.
   
    ![Configure API](resources/ss_Configure_API.png)

7. A public private key pair is created for you. The public key is displayed. [We have redacted it.]

    ![Create A JWT](resources/ss_Create_JWT.png)
            
    A file titled config.zip is downloaded in your system. It contains a private key (***private.key***) and a security certificate (***certificate\_pub.crt***). Keep these files secure.

8. Click here to see a [security certificate](#sample-certificate) or a private key.

9. Select **Save configured API** to save Globalization Content Service APIs enablement in the project.

    ![JWT Credentials](resources/ss_Service_Account.png)

10. Generate a JWT token by using the private key. Click Service Account (JWT). 

    You can see the Credential details. Some data is redacted for security.

    ![Generate JWT](resources/ss_Generate_JWT.png)
    
11. Click **Generate JWT** to generate the JWT token.

    ![Generate custom JWT](resources/ss_Generate_custom_JWT.png)

12. Scroll down the screen and add private key in the **Generate custom JWT** section. See step #7 to get the private key (private.key). 

    ![Generated JWT](resources/ss_Generated_JWT.png)

13. The JWT token is generated. Feel free to copy the Generated JWT or Sample Curl command.


## Onboard on to Adobe I/O Console to Consume Events

1. Login on the Adobe I/O Console. 
2. Create a new project.
3. Click on **Add Event.**

    ![Get started with your new project](resources/ss_new_project_creation.png)

4. Click on the **Experience Platform.**

    ![Add Events](resources/ss_Add_Events.png)

5. Select the **GCS Event** and click **Next**.

    ![Add GCS Events](resources/ss_Add_Events_GCS.png)

6. The **Configure event registration** screen shows four events that you can subscribe.      
   1. **LEVERAGE\_TM**: Used to extract text for localization out of an Adobe asset. Also, access the translation memory (TM) to enable the optimum re-use of a previously translated content. 
   2. **PROJECT\_UPDATE**: Used to update the project configuration information. The configuration data can include info on locales, content provider system and so on. 
   3. **TRANSATE**: Used to trigger an event when a task is sent for localization.
   4. **UPDATE\_TM**: Used to update the translation memory. During the asset completion of manual translation, translated strings are saved in TM so that they can be used later if similar strings appear in a future task. It helps to reduce the cost of manual translation.
   
   ![Configure events](resources/ss_Configure_event_registration.png)   

7. Select the events you want to subscribe and press **Next**.

    ![Select event](resources/ss_Configure_event_registration_2.png)      

    Create a new service account (JWT) credential. Here, you create a JSON Web Token (JWT) that includes your credentials. You’ll begin your sessions by exchanging the JWT for an access token at Adobe I/O console. Once access is granted, you start using GCS events. Since you created a public key while registering to Globalization Content Service APIs, you can use it to create JWT.

8. Select **Upload your public key.**

    ![Create JWT event](resources/ss_Create_JWT_event.png)

9. Drag and drop the public key (***certificate\_pub.crt***) and select **Next**.

    ![Upload Public Key](resources/ss_Upload_Public_Key.png)

10. A new JWT is created. You can use this as a credential to establish Globalization Content Service API sessions through the Adobe I/O console. Click **Next** to register the event.

    ![Create a new JWT credential](resources/ss_Create_a_new_JWT_credential.png)

11. The **Event registration details** form is displayed. Fill in the event details. You can change **Event registration name** and write a short description in the **Event registration description** box.

    ![Event registration details](resources/ss_Event_registration_details_1.png)

12. Notice that **Journaling** is selected in **How to receive events** section. Adobe’s journaling APIs work as a ledger recording all events for a specified time. Developers like you can create your own configuration to access the Adobe Journaling APIs and access events.

    ![Event registration details - journaling selected](resources/ss_Configure_event_registration_3.png)

13. Select **Save Configured events.**

    You get a message, “Your webhook is created successfully”. 

    Next, you see a summary screen where your journaling end point is confirmed. 
    
    ![Summary screen](resources/ss_Summary_screen.png)
    
    You can copy this end point and use at your end.

> The endpoint has the following URL structure:
    https://<events_on_ADOBE_io_path>/events/organizations/<unique_number>/integrations/<unique_number>/<unique_number>

# Build a Connector and Start Using Events and APIs
You have completed basic on-boarding preparation for Globalization Content Service. You can now build a connector at your end that will poll the Adobe I/O console indefinitely to pull events. Use the Adobe I/O Journaling APIs to consume and process events in bulk based on your need.

## Journaling APIs
The Adobe I/O Events Journaling API allows enterprise integration to consume and process events in bulk based on their own cadence. Every enterprise integration that is registered for events is enabled for journaling by default.

The journaling system functions as a ledger, storing all events. New entries (events) are added to the ledger, and the ledger continues to grow.

The enterprise that has registered for journaling receives near-real-time event notification. To gain access to the most recent events, the company can set up a continuous polling system. The journaling call functions similarly to a pull call. The first call retrieves events from the beginning of the serial number to the end of the last available data string.  The next pull call can begin at the endpoint of the previous call and retrieve newer events. When iterated, the journaling process retrieves all events at the predefined pull frequency.

Bookmark these two pages for understanding how to use Adobe I/O events and journaling APIs


- Adobe I/O Events: [https://www.Adobe.io/apis/experienceplatform/events/docs.html](https://www.adobe.io/apis/experienceplatform/events/docs.html)
- Journaling APIs: [Adobe I/O Events Journaling API](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/api/journaling_api.md). 

We recommend that you thoroughly research the Journaling APIs and create the connector that is best suited to your needs.

## Sample Connector 
Here is a sample Journaling connector to help you understand the polling concepts. Some key parameters are highlighted and some data is redacted (XX). Note that you are free to create your connector in any way to achieve desired results.

```java
package com.adobe.ws.consumer.resource;

import java.io.IOException;
import org.apache.http.Consts;
import org.apache.http.Header;
import org.apache.http.HeaderElement;
import org.apache.http.HttpEntity;
import org.apache.http.HttpHeaders;
import org.apache.http.HttpStatus;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.EntityBuilder;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.ContentType;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StringUtils;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class SampleConsumer extends Thread {
  private static Logger = LoggerFactory.getLogger(SampleConsumer.class);
  private static final String KEY_BEARER = "Bearer ";
  private static final String KEY_X_API_KEY = "x-api-key";
  private static final String KEY_X_IMS_ORG_ID = "x-ims-org-id";
  private static final String KEY_LINK = "link";
  private static final String KEY_EVENTS = "events";
  private static final String KEY_EVENT = "event";
  private static final String KEY_BODY = "body";
  private static final String KEY_EVENT_CODE = "eventCode";
  private static final String KEY_CLIENT_ID = "client_id";
  private static final String KEY_CLIENT_SECRET = "client_secret";
  private static final String KEY_JWT_TOKEN = "jwt_token";
  private static final String KEY_ACCESS_TOKEN = "access_token";
  private static final String KEY_REL = "rel";
  private static final String VAL_NEXT = "next";
  private static final String LEVERAGE_TM = "LEVERAGE_TM";
  private static final String UPDATE_TM = "UPDATE_TM";
  private static final String TRANSLATE = "TRANSLATE";
  private static final String PROJECT_UPDATE = "PROJECT_UPDATE";
  private static final String KEY_RETRY_AFTER = "retry-after";
  static String eventBaseUrl = "https://events-stage-va6.adobe.io/events/";
  static String eventFetchUrl =
      "organizations/XXXXX/integrations/XXXXX/864cXXXXXXXXXXXXXXXX080c?limit=1&latest=true";
  static String eventNextUrl =
      "organizations/XXXXX/integrations/XXXXX/864cc8d5-XXXXXXXXXXXXXXX0c?since=";
  static String eventClientId = "4bc0eXXXXXXXXXXXXXXX657a1";
  static String eventClientSecret = "<client_secret>";
  static String eventJwtToken = "<event_jwt_token>";
  static String eventImsOrgId = "<your_id>@AdobeOrg";
  static String eventAccessToken = "SampleAccessToken";
  static int eventFetchInterval = 1000;
  private static CloseableHttpClient imsClient = HttpClientBuilder.create().build();
  private CloseableHttpClient ioEventClient;
  private static ObjectMapper mapper = new ObjectMapper();

  public void run() {
    String ioEventUrl;
    String nextUrl = null;
    int count = 0;
    while (true) {
      if (StringUtils.isEmpty(nextUrl)) {
        ioEventUrl = eventBaseUrl + eventFetchUrl;
      } else {
        ioEventUrl = eventBaseUrl + nextUrl;
      }
      if (count % 1000 == 0) {
        logger.debug("Calling url = {}", ioEventUrl);
        count = 0;
      }
      count++;
      HttpGet httpGet = new HttpGet(ioEventUrl);
      httpGet.addHeader(HttpHeaders.AUTHORIZATION, KEY_BEARER + eventImsOrgId);
      httpGet.addHeader(KEY_X_API_KEY, eventClientId);
      httpGet.addHeader(KEY_X_IMS_ORG_ID, eventImsOrgId);
      Header[] linkHeaders = null;
      try (CloseableHttpResponse response = ioEventClient.execute(httpGet)) {
        int statusCode = response.getStatusLine().getStatusCode();
        linkHeaders = response.getHeaders(KEY_LINK);
        if (statusCode == HttpStatus.SC_OK) {
          HttpEntity entity = response.getEntity();
          if (entity != null) {
            String responseStr = EntityUtils.toString(entity);
            ObjectNode responseNode = mapper.readValue(responseStr, ObjectNode.class);
            logger.info(responseStr);
            JsonNode gcsMsgNode = responseNode.get(KEY_EVENTS).get(0).get(KEY_EVENT).get(KEY_BODY);
            String eventCode = gcsMsgNode.get(KEY_EVENT_CODE).asText();
            String gcsMsg = mapper.writeValueAsString(gcsMsgNode);
            logger.info("EventCode: {}, Message consumed:{}", eventCode, gcsMsg);
            if (PROJECT_UPDATE.equalsIgnoreCase(eventCode)) {
              // Call project update api to update project configuration in Provider system
            } else if (UPDATE_TM.equalsIgnoreCase(eventCode)) {
              // Call updateTM api to update translation memory
            } else if (LEVERAGE_TM.equalsIgnoreCase(eventCode)) {
              // Call leveraging api to leverage translation task
            } else if (TRANSLATE.equalsIgnoreCase(eventCode)) {
              // Call translation api to make the task available to vendor
            }
            nextUrl = getNextUrl(linkHeaders, nextUrl);
          }
        } else if (statusCode == HttpStatus.SC_NO_CONTENT) {
          Header retryHeader = response.getFirstHeader(KEY_RETRY_AFTER);
          if (retryHeader != null) {
            Thread.sleep(Long.parseLong(retryHeader.getValue()));
          }
          nextUrl = getNextUrl(linkHeaders, nextUrl);
        } else if (statusCode == HttpStatus.SC_UNAUTHORIZED) {
          eventAccessToken = getAccessToken(eventClientId, eventClientSecret, eventJwtToken);
          logger.debug("Access Token for event generated again successfully");
        } else {
          logger.error("{} \t {}", EntityUtils.toString(response.getEntity()),
              response.getStatusLine().getStatusCode());
        }
        Thread.sleep(eventFetchInterval);
      } catch (Exception e) {
        logger.error(e.getMessage(), e);
        nextUrl = getNextUrl(linkHeaders, nextUrl);
      }
    }

  }

  public static String getAccessToken(String clientId, String clientSecret, String jwtToken)
      throws IOException {
    HttpPost httpPost = new HttpPost("https://ims-na1-stg1.adobelogin.com/ims/exchange/jwt/");
    httpPost.addHeader(HttpHeaders.CONTENT_TYPE, "application/x-www-form-urlencoded");
    HttpEntity requestEntity = EntityBuilder.create()
        .setContentType(ContentType.APPLICATION_FORM_URLENCODED.withCharset(Consts.UTF_8))
        .setParameters(new BasicNameValuePair(KEY_CLIENT_ID, clientId),
            new BasicNameValuePair(KEY_JWT_TOKEN, jwtToken),
            new BasicNameValuePair(KEY_CLIENT_SECRET, clientSecret))
        .build();
    httpPost.setEntity(requestEntity);
    try (CloseableHttpResponse response = imsClient.execute(httpPost)) {
      if (response.getStatusLine().getStatusCode() == 200) {
        HttpEntity responseEntity = response.getEntity();
        if (responseEntity != null) {
          String responseStr = EntityUtils.toString(response.getEntity());
          ObjectNode responseNode = mapper.readValue(responseStr, ObjectNode.class);
          return responseNode.get(KEY_ACCESS_TOKEN).asText();
        } else {
          throw new IOException("Empty response entity");
        }
      } else {
        throw new IOException(EntityUtils.toString(response.getEntity()));
      }
    }
  }

  private String getNextUrl(Header[] headers, String currentUrl) {
    for (Header : headers) {
      HeaderElement firstElement = header.getElements()[0];
      NameValuePair pair = firstElement.getParameterByName(KEY_REL);
      if (pair != null && VAL_NEXT.equals(pair.getValue())) {
        return eventNextUrl + firstElement.getValue().replace(">", "");
      }
    }
    return currentUrl;
  }
}
```
            
The key parameters in the code above are as follows:

| Calling the Journaling API                                                                                 | Fetching events with Journaling API                                                                        |
|------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------|
| 1.	**eventClientSecret**: The Client_Secret key in the JWT token. <br/>2.	**eventJwtToken**: The JWT token that you will use to access Journaling APIs. This token lasts for 24 hours. <br/>3.	**eventIMSOrgId**: The IMS Org ID against which your org is authenticated into the Adobe I/O console.  | 1.	**eventBaseUrl**: The URL end point for calling the events. Eg, "https://events-stage-va6.adobe.io/events/"  <br/>2.	**eventFetchUrl**:  The journaling end point that you get when you onboard on to Adobe I/O. <br/>3.	**eventFetchInterval**: Define the interval to fetch the next event.<br/> |


> **Note**: To understand how you can use Adobe I/O events to build your own connector that calls the journaling APIs, see [Adobe I/O Events Journaling API.](https://www.adobe.io/apis/experienceplatform/events/docs.html#!adobedocs/adobeio-events/master/api/journaling_api.md)

Based on your operation, you can get the following response types.

1. **200 OK**: Successful operation and the list of events are added in the response body. To see a typical event, click [here](#event).

    Now use [Get Asset API](../api/index.md#get-all-asset-api) to fetch assets. Go ahead and localize them. Next, update the assets with [Put Asset API](../api/index.md#get-all-asset-api#update-asset-and-initiate-asset-complete-api). 

1. **204 No Content**: No event is returned. You might have already reached the end of the journal. You will get a 200 OK response in a subsequent poll provided a new event is added in the journal at the client’s end. 


# Globalization Content Service Reference

## Event 
A typical event will have the following information.


```java
{
  "eventCode": "TRANSLATE",
  "orgId": "test-org",
  "projectName": "test-project",
  "taskName": "test-task",
  "sourceLocale": "test-locale",
  "translationProviderOrgId": "test-translationProviderOrgId"
}
```


You can configure the following:

1. Define the **event code**: Trigger an event when the following action occurs:
   1. **Translate**: Send an asset for localization
   2. **Project update:** Update the project configuration in the localization provider system. 
   3. **Leverage**: Leverage an asset and get the content to be localized in a Xliff format. 
   4. **Update**: Receive the localized task back. Update starts a workflow to convert the translated Xliff into the localized asset in the source format and returns it to the content system
2. Specify the **Organization Id**: The unique ID of the customer’s org initiating localization
3. Define the **project name** and **task name**.
4. Set the **source locale**
4. Connect the **translation provider ID**

## Sample Certificate
A sample certificate is displayed below. Some data is redacted with letter X.

```java
-----BEGIN CERTIFICATE-----
MIIDTzCCAjegAwIBAgIJAJaci/JX77ivMA0GCSqGSIb3DQEBCwUAMGcxCzAJBgNVBAYTAlVTMQsw
CQYDVQQIEwJDQTEWMBQGA1UEBxMNU2FuIEZyYW5jaXNjbzEOMAwGA1UEChMFQWRvYmUxETAPBgNV
BAsTCFNlY3VyaXR5MRAwDgYDVQQDEwdDb25zb2xlMB4XDTIxMDgyNzA4NDczNloXDTIyMDgyNzA4
NDczNlowZzELMAkGA1UEBhMCVVMxCzAJBgNVBAgTAkNBMRYwFAYDVQQHEw1TYW4gRnJhbmNpc2Nv
MQ4wDAYDVQQKEwVBZG9iZTERMA8GA1UECxMIU2VjdXJpdHkxEDAOBgNVBAMTB0NvbnNvbGUwggEi
MA0GCSqGSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCXu4+HXMM4FCs5KeZ3sp4jDGA0ju9Kk5wjwHBi
/hm2KvBsvnFvyN0LFej9ppyjplk7JmOtrRJ6r39bqlvF8pg8hq2z+juvCABh/hYo6GK60H71JT7L
z1mDmEP5yyye6NasqV8FLIdMlQ+zpHg2d7h/+yf4XXTLUOghnY7F7M8htblug7kQwQ7Oan6qOQxc
ijpCLkE05CbLG8crW1lw5f39GtykmK1A7OWHoeu/Jp233iSriDa8eskNxqhT/JfXme3eQEkwNWWW
X0r9WDiux3zKM3IbcHlwU2mV34EyF+EedzAEeT7L2Ur5OkHnKOlqVdpVuC4lwdNg/JPWYd2pNXvZ
AgMBAAEwDQYJKoZIhvcNAQELBQADggEBAC5LFyXfW8rtGivLBQxxseImD5UN4THHuwUt8U0Qcfe4
+ZZYUujkUIvSkvISI3cGR4ZrJkY2UPpeZYsH9IT+qKaPrGdmbaom5fh2/fY4FczlC9hJZSm3H0D1
R6Qs3rQFVvS13DqsVBVlAKRYLtZbrOYF6zzmN8bkhtfCVxaGAHfiezLaLhELKx3x2QK+mtUH7j8o
eQhbx1ktXlQjXyyjEMq4pyUNjisRJSfpg04xO8ZVWfDv+Btdz9l8vd8LHoeHlvXNp7cbfwaZs9kj
u3RhPWxvMhHg9tLTRiG9UZ5p+jc6KGDW67Nhr0if/Lm/mVpengtMlaeBcMt50TP4ZGcRDtM=
-----END CERTIFICATE-----
```


## Sample Private Key
Find below a sample private key. Some data is redacted with letter X.

```
-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggXXXXXXXXXXAQCXu4+HXMM4FCs5KeZ3sp4jDGA0
ju9Kk5wjwHBi/hm2KvBsvnFvyN0LFej9ppyjplk7JmOtrRJ6r39bqlvF8pg8hq2z+juvCABh/hYo
PGK60H71JT7Lz1mDmEP5yyye6NasqV8XXXXXXXXXXHg2d7h/+yf4XXTLUOghnY7F7M8htblug7kQ
wQ7Oan6qOQxcijpCLkE05CbLG8crW1lw5f39GtykmK1A7OWHoeu/Jp233iSriDa8eskNxqhT/JfX
me3eQEkwNWWWX0r9WDiux3zKM3IbcHlwU2mV34EyF+EedzAEeT7L2Ur5OkHnKOlqXXXXXXXXXXNg
/JPWYd2pNXvZAgMBAAECggEAVWdk6jP0TeRMT+idqFIJYIDexbaOSdO71wPCPnX30uloWkz3XIwa
ntq+Qcc98372SqzY/jCkbhnJ/bZt4YUi2y6TJvJ6FZLTZFS39F6Y873XN/S229Dh+YgC+t65RtiX
vKe4rBjcLubX561zXHUWjDK51LoFu0rXXXXXXXXXX92bKNqmktyNjuvJpmNWHhOBmRwftc1c86QK
MwsA1mqhEt77cRW8rTSeRB0qMkoHKhjTo7HZfOLSbd/iqGtF6V/Fgzh0MOoPh/VXMjFC79GV74ZI
WArQ7OiT8BP/GKyjcNg3QOfEL2Ry//JA3fG7iyq1ssxUlcTmh8xSmZIK2iQxgQKBgQDSBxUe8hIU
VM607sFabQ+pqI/Tcwui0HoaJ0Tq8jpXXXXXXXXXXH9R2Q4z41zvfbkCvesWHolflsl8xizRv9bI
Z+Ot7bOYsEaTE+ZrVHy9e9GnCXM0eXwqjSMW/DdNqLj3c0NQTR2nIPRnvKxL+HE74Sny1HZa/fgn
QN9uRpkhtQKBgQC48emjE2Qw3CVqqv/MIX2Qrdf/JjCM2uxPFV+igbMTUd1G3gRp9zjPMZQ6xvBP
Rvt0Ao/guQ/lmfM6fI83YCz5W/LYmWgz7j+qerxUQeM4G9R/TENFzIZLBZJkdaSkWvUSzmZdX4bT
D7NGe6NbdC50KrNg476kqJ5rGYCgtoHYFQKBgAOMMRQjvKBxSkiOG9/+JZyVB1DoCZNHeDiG30gk
rU4p7coJZrnQbz4fr3i652/JLK7aLGVkQKfHsUGVS16Dogoijxr5/+WdXKPRWzwG4lCFDeaHZ1XE
k49YcPZLble2eOFdJg7uLokLKnWyHyrtWGRNilraseEZlx56nwuKz71dAoGBALNWcZYesaLndqju
PEjfmOD4kmDqaV3M1CUDts7gMgPj+ExF8cXHYyEXFIPCcTkiIncmHNpu2cls9XybWEz8R+Atl1kN
uQvSVY48oe6aTXkVE4O1Me63GuoYpxIfOd3eDZOE7aJRhW2Y5eDM92UxTfJ7jaHAdhc5IxT7j81H
MLTZAoGABBBtyVUqrRXj8t+LhblWvZkQLgr2tk+n7cKI56ztc3R5TAG0rMPDy7XJ9Mb6t0DCHtCA
FsxGx1+W6u7/PG9Hrp6L8N3ONLeS4//cCIT2Qu+6ZiSaCLtglaPwBeUQclpM0DtQmHbrq53a2CIt
FPFUIzEwtY8zhZRPnCeBO62uMsA=
-----END PRIVATE KEY-----
```



## Sample JWT
A sample JWT is displayed below. 

```java
{
"CLIENT_SECRET":"s8e-glpSghksnMgQdg8sHYQ18UZUxP8ejOFK",
"ORG_ID":"<your_org>@ADOBEOrg",
"API_KEY":"3f5f26c871ac45e985867adcfa84d180",
"TECHNICAL_ACCOUNT_ID":"<your_account>@techacct.ADOBE.com",
"TECHNICAL_ACCOUNT_EMAIL":"<your_email>@techacct.ADOBE.com",
"PUBLIC_KEYS_WITH_EXPIRY":{"84a06e0e6ad1bb822b2b14f6e628d6f46099f06d":"08/27/2022"}
}
```

The JWT includes:
* A client secret key pair
* Details of Org ID
* An API key
* Details of tracking the technical account
* E-mail
* The expiry date time stamp of the public keys.

## Where do I find more information?

Follow these guides to work effectively with the Globalization Content Service:

* Get an overview of the Globalization Content Service: 
    Follow this [guide](../overview/index.md). 
    
* Use Globalization Content Service APIs for partners: 
    Follow this [guide](../api/index.md) to find information about APIs available for partners.