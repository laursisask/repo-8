# Globalization Content Service APIs

What do you want to understand today?
1. [Overview of Globalization Content Service APIs ](#overview)
2. [APIs for Globalization Partners](#apis-for-globalization-partners)
3. [Get All Asset API](#get-all-asset-api)
4. [Update Asset and Initiate Asset Complete API](#update-asset-and-initiate-asset-complete-api)
5. [Update Service Provider API](#update-service-provider-api)
6. [Asset Preview API](#asset-preview-api)
7. [Cancel Existing Assets API](#cancel-existing-assets-api)

## Overview
Globalization Content Service APIs are divided into four categories: admin, asset, project, and task.

### Admin-related APIs
- Onboard a new enterprise to Globalization Content Service. Register a new organization or retrieve an existing organization.
- Authenticate a user by getting IMS orgs and groups for the specified userToken.
- Add or retrieve content systems, products, locales, service providers, or workflows.
- Find assets and get scoping reports.
### Asset-related APIs
- Get all assets for specified projects and tasks. Dive deeper and retrieve asset details that include info on locales, projects, tasks, and Org Id. 
- Based on where you are in the localization workflow, you can update an asset, preview an asset, and then update and complete the asset or cancel the asset and restart localization process.
### Project-related APIs
- Create or update a new project. 
- Get a list of all projects that you can access or dive deeper and get the project details. 
- Plan your work by getting all projects with task counts.
### Task-related APIs
- Create, retrieve, or update a task.
- Want to plan how many tasks you have, easy get a list of all tasks.
- Fine-tune your search by looking for assets or tasks that meet certain criteria, such as locale, project name, status, or workflow. You can also zoom in on a task and retrieve more information.
- Create a new task asynchronously for batch processing or out of sync scheduled localization tasks. Update these tasks asynchronously.

> **Note**: See Globalization Content Service **API Cheat Sheet** for a list of all APIs, including their path, parameters, method, and responses.

# APIs for Globalization Partners

A localization partner typically uses two types of APIs. 

### One time setup
Register to Globalization Content Service and setup a task polling framework/connector. See [how to register to Globalization Content Service](../partner/index.md#partner-onboarding-the-complete-workflow).

### APIs for continual localization
These include:
* [Get all assets for the project](#get-all-asset-api)
* [Preview the localization quality of an asset](#asset-preview-api)
* [Update Asset and Initiate Asset Complete](#update-asset-and-initiate-asset-complete-api)
* [Cancel existing assets](#cancel-existing-assets-api)
* [Update an existing service provider in the content system](#update-service-provider-api)


[](#_Update_Service_Provider_1)In the section below, you will learn about these APIs.

## Get All Asset API
This API finds all the assets for the specified project and task. It returns information such as locale name, strings to be localized, last modified information and metadata. 

`Path: /v1/projects/{project}/tasks/{task}/assets`
### Key Parameters
1. **orgId**: The IMS organization id associated with the client. 
1. **project**: The name of the project under which tasks are created
1. **task:** Unique string that defines the task name. 
### Curl Command

```java
curl -X GET "https://gcscore-dev-va7.stage.cloud.ADOBE.io /v1/projects/DemoProject/tasks/<task_name>/assets?orgId=<your_org>ADOBEOrg" -H "accept: application/json"
```


### Request URL

```java
curl -X GET "https://gcscore-dev-va7.stage.cloud.ADOBE.io /v1/projects/DemoProject/tasks/<your_task>/assets?orgId=<your_org>ADOBEOrg" -H "accept: application/json"
```


### Responses
You get the following responses:

1. **200 OK**: The 200 OK status code indicates that the request has been processed successfully on the server
1. **401 Unauthorized**: The 401 unauthorized error status response code indicates that the request was not processed because the destination resource's authentication credentials were invalid. Reauthenticating with right credentials is recommended. 
1. **403 Forbidden**: The 403 Forbidden error status code indicates that the server has received the request but has refused to allow it. The client may have insufficient rights to a resource.
1. **404 Not Found**: The 404 error is returned when the server can’t find the requested resource. It could be broken or dead link because of file movements or entering a non-existent task name.
### Understanding the successful response
The following is the successful response with the 200 Response code.

```java
{
  "context": {
    "headers": {},
    "configuration": null,
    "entity": [
      {
        "name": "UserTest.html",
        "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
        "orgId": "2A484C4460C1D0310A49411B@ADOBEOrg",
        "taskName": "TestTask806_1",
        "projectName": "DemoProject",
        "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
        "status": "CREATED",
        "mimeType": null,
        "data": null,
        "createdDate": "2021-08-05T18:35:58Z",
        "assetMetadata": [
          {
            "name": "assetPath",
            "value": "files/Assets/sample_html.html"
          }
        ],
        "scopingReports": [],
        "assetLocales": [
          {
            "locale": "fr-FR",
            "status": "CREATED",
            "updatedDate": "2021-08-05T18:35:59Z"
          }
        ],
        "assetUrls": []
      }
    ],
    "entityType": "java.util.ArrayList",
    "entityAnnotations": [],
    "entityStream": {
      "closed": false,
      "committed": false
    },
    "lengthLong": -1,
    "responseCookies": {},
    "requestCookies": {},
    "entityClass": "java.util.ArrayList",
    "mediaType": null,
    "length": -1,
    "location": null,
    "language": null,
    "lastModified": null,
    "date": null,
    "acceptableLanguages": [
      "*"
    ],
    "committed": false,
    "allowedMethods": [],
    "stringHeaders": {},
    "entityTag": null,
    "links": [],
    "acceptableMediaTypes": [
      {
        "type": "*",
        "subtype": "*",
        "parameters": {},
        "quality": 1000,
        "wildcardType": true,
        "wildcardSubtype": true
      }
    ]
  },
  "status": 200,
  "cookies": {},
  "mediaType": null,
  "entity": [
    {
      "name": "UserTest.html",
      "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
      "orgId": "2A484C4460C1D0310A49411B@ADOBEOrg",
      "taskName": "TestTask806_1",
      "projectName": "DemoProject",
      "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
      "status": "CREATED",
      "mimeType": null,
      "data": null,
      "createdDate": "2021-08-05T18:35:58Z",
      "assetMetadata": [
        {
          "name": "assetPath",
          "value": "files/Assets/sample_html.html"
        }
      ],
      "scopingReports": [],
      "assetLocales": [
        {
          "locale": "fr-FR",
          "status": "CREATED",
          "updatedDate": "2021-08-05T18:35:59Z"
        }
      ],
      "assetUrls": []
    }
  ],
  "length": -1,
  "location": null,
  "language": null,
  "lastModified": null,
  "date": null,
  "metadata": {},
  "statusInfo": "OK",
  "allowedMethods": [],
  "stringHeaders": {},
  "entityTag": null,
  "links": [],
  "headers": {}
}
```

Here are the key sections in the response:

- **assetId**: A unique ID that is used by the content system to track assets if needed.
- **orgId**: The IMS organization id associated with client creating the project and its assets
- **taskName**: A unique name for the translation task
- **projectName**: The name of the project containing the tasks
- **sourceURL**: Publicly available URLs (S3 or Azure) for downloading the source asset
- status: 200 ok, indicating request has been executed successfully
- **mimeType**: [Planned for future] Defines the nature and format of the asset (media type)
- **createdDate**: Date when the asset was created; represented in ISO 8601 spec; e.g. format 2021-08-05T18:35:58Z 
- **assetMetadata**: Details of the asset name and asset path 
- **assetLocale**: Information that helps define the source asset language. Details locale as fr-FR, status as Created and updatedDate value.
- **entityType** is a java array list object

> **Note**: To know more about the Get Asset API, see [Get All Assets in Swagger](https://gcscore-dev-va7.stage.cloud.adobe.io/swagger-ui/index.html#/Asset%20Service/getAssetsUsingGET).

## Update Asset and Initiate Asset Complete API
This Put API updates an existing asset and initiates asset completion for the specified asset and locale. If a source asset is being translated in three locales, then you need to call this API three times to complete asset localization. 

When you call Update asset and initiate asset complete, Globalization Content Service runs the denormalization workflow that converts the translated [XLIFF](#_A_Sample_XLiff) file into the original file format and save it in the asset repository. The customer will get a URL of the target locale asset.

> **Path**: /v1/projects/{project}/tasks/{task}/assets/{asset}/locales/{locale}/complete
### Key Parameters
1. **asset name**: Unique string identifying the asset name. 
1. **assetInfo**: A JSON object that describes asset properties. See the details of the assetinfo object below.
1. **locale**: Defines the target locale
1. **project:** Sets the project name.
1. **task:** Sets the task name. 

### Sample assetBean

```apache
{
 "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
 "assetMetadata": [
     {
      "name": "assetPath",
      "value": "files/Assets/UserTest.html"
     }
     ],
 "assetName": "UserTest.html",
 "orgId": "<your_org>@ADOBEOrg",
 "sourceLocale": "en-US",
 "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
 "targetAssetLocale": {
    "locale": "fr-FR",
    "status": "TRANSLATED"
    },
"targetAssetUrl": {
            "locale": "fr-FR",
            "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
            "createdDate": "2021-09-16T08:14:25Z",
            "urlType": "TRANSLATED"
          }
}
```

### Request URL

```java
https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/projects/DemoProject/tasks/TestTask916_1/assets/UserTest.html/locales/fr-FR/complete
```


### Responses
You get the following responses:

1. **200 OK**: The 200 OK status code indicates that the request has been processed successfully on the server
1. **201 Created**: The 201 Created success status code indicates that the request is successful, and it has created a resource.
1. **401 Unauthorized**: The 401 unauthorized error status response code indicates that the request was not processed because the destination resource's authentication credentials were invalid. Reauthenticating with right credentials is recommended. 
1. **403 Forbidden**: The 403 Forbidden error status code indicates that the server has received the request but has refused to allow it. The client may have insufficient rights to a resource.
1. **404 Not Found**: The 404 error is returned when the server can’t find the requested resource. It could be broken or dead link because of file movement.
### Understanding the successful response
Here’s a successful response:

```java
{
  "context": {
    "headers": {},
    "configuration": null,
    "entity": {
      "orgId": "<your_org>@ADOBEOrg",
      "projectName": null,
      "taskName": null,
      "assetName": "UserTest.html",
      "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
      "assetMetadata": [
        {
          "name": "assetPath",
          "value": "files/Assets/UserTest.html"
        }
      ],
      "sourceLocale": "en-US",
      "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
      "mimeType": null,
      "data": null,
      "targetAssetLocale": {
        "locale": "fr-FR",
        "status": "TRANSLATED",
        "updatedDate": null
      },
      "targetAssetUrl": {
        "locale": "fr-FR",
        "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
        "createdDate": "2021-09-16T08:14:25Z",
        "urlType": "TRANSLATED"
      },
      "workflowInstanceId": "3d5f9f13-64a3-4659-bafe-fbadf7927c36"
    },
    "entityType": "com.ADOBE.gcsservices.dto.AssetInfo",
    "entityAnnotations": [],
    "entityStream": {
      "closed": false,
      "committed": false
    },
    "lengthLong": -1,
    "responseCookies": {},
    "requestCookies": {},
    "entityClass": "com.ADOBE.gcsservices.dto.AssetInfo",
    "mediaType": null,
    "length": -1,
    "location": null,
    "language": null,
    "lastModified": null,
    "date": null,
    "acceptableLanguages": [
      "*"
    ],
    "committed": false,
    "allowedMethods": [],
    "stringHeaders": {},
    "entityTag": null,
    "links": [],
    "acceptableMediaTypes": [
      {
        "type": "*",
        "subtype": "*",
        "parameters": {},
        "quality": 1000,
        "wildcardType": true,
        "wildcardSubtype": true
      }
    ]
  },
  "status": 200,
  "cookies": {},
  "mediaType": null,
  "entity": {
    "orgId": "<your_org>@ADOBEOrg",
    "projectName": null,
    "taskName": null,
    "assetName": "UserTest.html",
    "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
    "assetMetadata": [
      {
        "name": "assetPath",
        "value": "files/Assets/UserTest.html"
      }
    ],
    "sourceLocale": "en-US",
    "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
    "mimeType": null,
    "data": null,
    "targetAssetLocale": {
      "locale": "fr-FR",
      "status": "TRANSLATED",
      "updatedDate": null
    },
    "targetAssetUrl": {
      "locale": "fr-FR",
      "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
      "createdDate": "2021-09-16T08:14:25Z",
      "urlType": "TRANSLATED"
    },
    "workflowInstanceId": "3d5f9f13-64a3-4659-bafe-fbadf7927c36"
  },
  "length": -1,
  "location": null,
  "language": null,
  "lastModified": null,
  "date": null,
  "metadata": {},
  "statusInfo": "OK",
  "allowedMethods": [],
  "stringHeaders": {},
  "entityTag": null,
  "links": [],
  "headers": {}
}
```




### Understanding the properties 

|**Property**|**Type**|**Description**|
| :- | :- | :- |
|**assetId**|String|A unique ID that is used by the content system to track assets if needed.|
|**assetMetadata**|[...]|[optional] An array of additional properties that can be added by the content system for easy asset retrieval, such as asset path. The project creation team can also use assetMetadata to pass information about the asset that can help in efficient localization.|
|**assetName**|string|Unique name of the asset in a task. In our example, it’s “UserTest.html”|
|**Data**|Blob...}|[optional] Additional data parameters|
|**mimeType**|string|[optional] Defines the nature and format of the asset (media type)|
|**orgId**|String|The IMS Org ID against which an org is authenticated into the Adobe I/O console. |
|**projectName**|String|The name of the project containing the tasks|
|**sourceLocale**|String|Source locale for the task|
|**sourceUrl**|String|Publicly available URLs (S3 or Azure) for downloading the source asset|
|**targetAssetLocale**|AssetLocaleBean...}|Defines the target asset locale, includes locale, status and updatedDate. The asset information for each target asset locale is different. We have as many assets locale information as the number of locales for the assets. To retrieve assets for multiple locales make multiple API calls with asset and target locale.|
|**targetAssetUrl**|AssetUrlBean...}|Publicly available URLs (S3 or Azure) for downloading the translated locale assets. This URL represents the Xliff file that includes the source locale value and target locale information. Includes information on locale, creation date, url and urlType. <br/><br/>The system will use the denormalization worker to (1) download the translated information (2) convert it to the source format, (3) upload it to the storage system (S3 or Azure) and (4) send the denormalized system back to the content system.|
|**taskName**|String|A unique name for the translation task. In our example, it’s “TestTask916\_1”|
|**workflowInstanceId**|String|Useful when the AssetInfo bean is used as output. Unique string for the current workflow instance.|

> **Note**: To know more about updating an asset and initiating the asset complete process, see [Update Asset and Initiate Asset Complete API in Swagger](https://gcscore-dev-va7.stage.cloud.adobe.io/swagger-ui/index.html#/Asset%20Service/completeAssetUsingPUT).

### A Sample XLIFF File
See a sample XLIFF file.

```java
<?xml version="1.0" encoding="UTF-8"?>
<xliff version="1.2" xmlns="urn:oasis:names:tc:xliff:document:1.2" xmlns:okp="okapi-framework:xliff-extensions" xmlns:its="http://www.w3.org/2005/11/its" xmlns:itsxlf="http://www.w3.org/ns/its-xliff/" its:version="2.0">
<file original="UserTest.html" source-language="en-US" target-language="en-XX" datatype="html">
<body>
<trans-unit id="tu1" restype="x-title">
<source xml:lang="en-US">Steps - Raw Document to Filter Events</source>
<target xml:lang="en-XX">Steps - Raw Document to Filter Events</target>
</trans-unit>
<trans-unit id="tu2" restype="x-td">
<source xml:lang="en-US"></source>
<target xml:lang="en-XX"></target>
</trans-unit>
<trans-unit id="tu3" restype="x-h1">
<source xml:lang="en-US">Okapi Framework - Steps</source>
<target xml:lang="en-XX">Okapi Framework - Steps</target>
</trans-unit>
<trans-unit id="tu4" restype="x-h2">
<source xml:lang="en-US">Raw Document to Filter Events Step</source>
<target xml:lang="en-XX">Raw Document to Filter Events Step</target>
</trans-unit>
</body>
</file>
</xliff>
```

## Update Service Provider API
This Put API updates an existing service provider in the content system.

> Path: /v1/providers/{provider}
### Key Parameters
1. **provider**: Unique name provided to the provider by the GCS team
1. **providerBean**: The name of the project under which tasks are created

### Sample Provider Bean

```java
{
        "name": "TestProvider",
        "url": "https://ws-dev.corp.ADOBE.com",
        "orgId": "<your_org>@ADOBEOrg",
        "status": "ACTIVE",
        "supportedTypes": [
          "LEVERAGING",
          "MT"
        ],
        "providerAttributes": null,
        "csOrgId": "<your_org>@ADOBEOrg"
}
```





The parameters in the provider bean are:

|**Property**|**Type**|**Description**|
| :- | :- | :- |
|**csOrgId**|string|This is content system's orgId for which the service provider is being added. Examples of content system include AMS or Marketo. The customer would be using the content system and the customer's orgId would be the content system's orgId.|
|**Name**|string|The name of the translation service provider; for example TestProvider.|
|**orgId**|string|The IMS organization ID of the service provider|
|**providerAttributes**|[...]|Any additional attribute that might need be needed to enable Globalization Content Service API calls for the provider|
|**Status**|string|Determines the activity status of service provider. Values include REQUESTED and ACTIVE. The initial status is REQUESTED and when the service provider is approved and enlisted service providers list then it changes to ACTIVE.|
|**supportedTypes**|[...]|The list of services that the provider support: Leveraging, Translation, and MT. |
|**url**|string|The URL or Endpoint on the provider's system making requests to the Globalization Content Service.|

### Curl Command


```java
curl -X PUT "https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/providers/TestProvider" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"name\": \"TestProvider\", \"url\": \"https://ws-dev.corp.ADOBE.com\", \"orgId\": \"<your_org>@ADOBEOrg\", \"status\": \"ACTIVE\", \"supportedTypes\": [ \"LEVERAGING\", \"MT\" ], \"providerAttributes\": null, \"csOrgId\": \"2A484C4460C1D0310A49411B@ADOBEOrg\" }"
```

### Request URL

```java
https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/providers/TestProvider
```

### Responses
You get the following responses:

1. **200 OK**: The 200 OK status code indicates that the request has been processed successfully on the server
1. **201 Created**: The 201 Created success status code indicates that the request is successful, and it has created a resource.
1. **401 Unauthorized**: The 401 unauthorized error status response code indicates that the request was not processed because the destination resource's authentication credentials were invalid. Reauthenticating with right credentials is recommended. 
1. **403 Forbidden**: The 403 Forbidden error status code indicates that the server has received the request but has refused to allow it. The client may have insufficient rights to a resource.
1. **404 Not Found**: The 404 error is returned when the server can’t find the requested resource. It could be broken or dead link because of file movements or entering a non-existent task name.

### Understanding the successful response

```java
{
  "context": {
    "headers": {},
    "configuration": null,
    "entity": {
      "name": "TestProvider ",
      "url": "https://ws-dev.corp.ADOBE.com",
      "orgId": "<your_org>@ADOBEOrg",
      "status": "ACTIVE",
      "supportedTypes": [
        "LEVERAGING",
        "MT"
      ],
      "providerAttributes": null,
      "csOrgId": "<your_org>@ADOBEOrg"
    },
    "entityType": "com.ADOBE.gcsservices.dto.ProviderBean",
    "entityAnnotations": [],
    "entityStream": {
      "closed": false,
      "committed": false
    },
    "lengthLong": -1,
    "responseCookies": {},
    "requestCookies": {},
    "entityClass": "com.ADOBE.gcsservices.dto.ProviderBean",
    "mediaType": null,
    "length": -1,
    "location": null,
    "language": null,
    "lastModified": null,
    "date": null,
    "acceptableLanguages": [
      "*"
    ],
    "committed": false,
    "allowedMethods": [],
    "stringHeaders": {},
    "entityTag": null,
    "links": [],
    "acceptableMediaTypes": [
      {
        "type": "*",
        "subtype": "*",
        "parameters": {},
        "quality": 1000,
        "wildcardType": true,
        "wildcardSubtype": true
      }
    ]
  },
  "status": 200,
  "cookies": {},
  "mediaType": null,
  "entity": {
    "name": "TestProvider ",
    "url": "https://ws-dev.corp.ADOBE.com",
    "orgId": "<your_org>@ADOBEOrg",
    "status": "ACTIVE",
    "supportedTypes": [
      "LEVERAGING",
      "MT"
    ],
    "providerAttributes": null,
    "csOrgId": "<your_org>@ADOBEOrg"
  },
  "length": -1,
  "location": null,
  "language": null,
  "lastModified": null,
  "date": null,
  "metadata": {},
  "statusInfo": "OK",
  "allowedMethods": [],
  "stringHeaders": {},
  "entityTag": null,
  "links": [],
  "headers": {}
}
```

> **Note**: To know more about the updating an existing service provider, see [Update Service Provider API in Swagger](https://gcscore-dev-va7.stage.cloud.adobe.io/swagger-ui/index.html#/Admin%20Service/updateProviderUsingPUT).

## Asset Preview API
This Put API initiates an asset preview for translation QA and approval. If a source asset is being translated in 3 locales, then you need to call this API three times in each locale to preview the asset. 

When you call Update asset and initiate asset complete, Globalization Content Service runs the denormalization workflow. This workflow converts the translated content into the original file format, for example, .html or md, and have the content in the target language. The localization provider will get a URL of the target locale asset for preview.

> **Path**: /v1/projects/{project}/tasks/{task}/assets/{asset}/locales/{locale}/preview

### Key Parameters
1. **asset**: Unique string identifying the asset name. 
1. **assetInfo**: A JSON object that describes asset properties. See details of assetinfo object below.
1. **locale**: Defines the target locale
1. **project:** Sets the project name.
1. **task:** Sets the task name. 

### Curl Command
```java
curl -X PUT "https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/projects/DemoProject/tasks/TestTask916_1/assets/UserTest.html/locales/fr-FR/preview" -H "accept: application/json" -H "Content-Type: application/json" -d "{ \"assetId\": \"urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e\", \"assetMetadata\": [ { \"name\": \"assetPath\", \"value\": \"files/Assets/UserTest.html\" } ], \"assetName\": \"UserTest.html\", \"orgId\": \"<your_org>@ADOBEOrg\", \"sourceLocale\": \"en-US\", \"sourceUrl\": \"https://<user_name>.github.io/static-files/doc/sample_html.html\", \"targetAssetLocale\": { \"locale\": \"fr-FR\", \"status\": \"TRANSLATED\" }, \"targetAssetUrl\": { \"locale\": \"fr-FR\", \"url\": \"https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b\", \"createdDate\": \"2021-09-16T08:14:25Z\", \"urlType\": \"TRANSLATED\" }} "
```

### Request URL
```java
https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/projects/DemoProject/tasks/TestTask916_1/assets/UserTest.html/locales/fr-FR/preview
```


### Sample assetInfo Bean


```java
{
 "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
 "assetMetadata": [
     {
      "name": "assetPath",
      "value": "files/Assets/UserTest.html"
     }
     ],
 "assetName": "UserTest.html",
 "orgId": "<your_org>@ADOBEOrg",
 "sourceLocale": "en-US",
 "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
 "targetAssetLocale": {
    "locale": "fr-FR",
    "status": "TRANSLATED"
    },
"targetAssetUrl": {
            "locale": "fr-FR",
            "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
            "createdDate": "2021-09-16T08:14:25Z",
            "urlType": "TRANSLATED"
          }
}
```

### Responses
You get the following responses:

1. **200 OK**: The 200 OK status code indicates that the request has been processed successfully on the server
1. **201 Created**: The 201 Created success status code indicates that the request is successful, and it has created a resource.
1. **401 Unauthorized**: The 401 unauthorized error status response code indicates that the request was not processed because the destination resource's authentication credentials were invalid. Reauthenticating with right credentials is recommended. 
1. **403 Forbidden**: The 403 Forbidden error status code indicates that the server has received the request but has refused to allow it. The client may have insufficient rights to a resource.
1. **404 Not Found**: The 404 error is returned when the server can’t find the requested resource. It could be broken or dead link because of file movement.

### Understanding the successful response


```java
{
  "context": {
    "headers": {},
    "configuration": null,
    "entity": {
      "orgId": "<your_org>@ADOBEOrg",
      "projectName": null,
      "taskName": null,
      "assetName": "UserTest.html",
      "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
      "assetMetadata": [
        {
          "name": "assetPath",
          "value": "files/Assets/UserTest.html"
        }
      ],
      "sourceLocale": "en-US",
      "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
      "mimeType": null,
      "data": null,
      "targetAssetLocale": {
        "locale": "fr-FR",
        "status": "TRANSLATED",
        "updatedDate": null
      },
      "targetAssetUrl": {
        "locale": "fr-FR",
        "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
        "createdDate": "2021-09-16T08:14:25Z",
        "urlType": "TRANSLATED"
      },
      "workflowInstanceId": "123e3a10-8185-4c7f-8d49-8d8a26cbd963"
    },
    "entityType": "com.ADOBE.gcsservices.dto.AssetInfo",
    "entityAnnotations": [],
    "entityStream": {
      "closed": false,
      "committed": false
    },
    "lengthLong": -1,
    "responseCookies": {},
    "requestCookies": {},
    "entityClass": "com.ADOBE.gcsservices.dto.AssetInfo",
    "mediaType": null,
    "length": -1,
    "location": null,
    "language": null,
    "lastModified": null,
    "date": null,
    "acceptableLanguages": [
      "*"
    ],
    "committed": false,
    "allowedMethods": [],
    "stringHeaders": {},
    "entityTag": null,
    "links": [],
    "acceptableMediaTypes": [
      {
        "type": "*",
        "subtype": "*",
        "parameters": {},
        "quality": 1000,
        "wildcardType": true,
        "wildcardSubtype": true
      }
    ]
  },
  "status": 200,
  "cookies": {},
  "mediaType": null,
  "entity": {
    "orgId": "<your_org>@ADOBEOrg",
    "projectName": null,
    "taskName": null,
    "assetName": "UserTest.html",
    "assetId": "urn:aaid:sc:AP:9e10e51e1-ea8e-4911-9499-881922052823e",
    "assetMetadata": [
      {
        "name": "assetPath",
        "value": "files/Assets/UserTest.html"
      }
    ],
    "sourceLocale": "en-US",
    "sourceUrl": "https://<user_name>.github.io/static-files/doc/sample_html.html",
    "mimeType": null,
    "data": null,
    "targetAssetLocale": {
      "locale": "fr-FR",
      "status": "TRANSLATED",
      "updatedDate": null
    },
    "targetAssetUrl": {
      "locale": "fr-FR",
      "url": "https://gcsstorage1.blob.core.windows.net/gcstest1/<your_org>@ADOBEOrg/DemoProject/TestTask916_1/translated/UserTest.html/fr-FR/UserTest.html?sig=4xUEXwpfUG3TeAls8DY%2Bobhu6%2FCB3gqeF0ewZXxUX7M%3D&se=2021-09-16T09%3A14%3A24Z&sv=2019-02-02&sp=r&sr=b",
      "createdDate": "2021-09-16T08:14:25Z",
      "urlType": "TRANSLATED"
    },
    "workflowInstanceId": "123e3a10-8185-4c7f-8d49-8d8a26cbd963"
  },
  "length": -1,
  "location": null,
  "language": null,
  "lastModified": null,
  "date": null,
  "metadata": {},
  "statusInfo": "OK",
  "allowedMethods": [],
  "stringHeaders": {},
  "entityTag": null,
  "links": [],
  "headers": {}
}
```

### Understanding the properties

|**Property**|**Type**|**Description**|
| :- | :- | :- |
|**assetId**|string|A unique ID that is used by the content system to track assets if needed.|
|**assetMetadata**|[...]|[optional] An array of additional properties that can be added by the content system for easy asset retrieval, such as asset path. The project creation team can also use assetMetadata to pass information about the asset that can help in efficient localization.|
|**assetName**|string|Unique name of the asset per locale. Here asset name: UserTest.html|
|**Data**|Blob...}|[optional] Additional data parameters|
|**mimeType**|string|Defines the nature and format of the asset (media type)|
|**orgId**|string|The IMS Org ID against which an org is authenticated into the Adobe I/O console. |
|**projectName**|string|The name of the project containing the tasks. Here asset name: DemoProject|
|**sourceLocale**|string|Source locale for the task|
|**sourceUrl**|string|Publicly available URLs (S3 or Azure) for downloading the source asset|
|**targetAssetLocale**|AssetLocaleBean...}|Defines the target asset locale, includes locale, status and updatedDate. The asset information for each target asset locale is different. We have as many assets locale information as the number of locales for the assets. To retrieve assets for multiple locales make multiple API calls with asset and target locale. The locale in our example is fr-FR.|
|**targetAssetUrl**|AssetUrlBean...}|Publicly available URLs (S3 or Azure) for downloading the translated locale assets. This URL represents the Xliff file that includes the source locale value and target locale information. Includes information on locale, creation date, url and urlType. <br/><br/>GCS system will use the denormalization worker to (1) download the translated information (2) convert it to the source format, (3) upload it to the storage system (S3 or Azure) and (4) send the denormalized system back to the content system.|
|**taskName**|string|A unique name for the translation task. Here task name: TestTask916\_1|
|**workflowInstanceId**|string|Useful when the AssetInfo bean is used as output. Unique string for the current workflow instance.|

> **Note**: To know more about the asset preview, see [Initiate Asset preview API in Swagger](https://gcscore-dev-va7.stage.cloud.adobe.io/swagger-ui/index.html#/Asset%20Service/previewAssetUsingPUT).

## Cancel Existing Assets API
[In development] This Put API cancels an existing asset and a locale. The cancelled asset is removed from the task list.

> **Path**: /v1/projects/{project}/tasks/{task}/assets/{asset}/locales/{locale}
### Key Parameters
1. **asset**: The IMS organization id associated with your account. 
1. **locale**: The locale information of asset that needs to be cancelled. 
1. **orgId** The IMS organization id associated with your account. 
1. **project**: The name of the project under which tasks are created
1. **task:** Unique string that defines the task name. 
### Curl Command

```java
curl -X PUT "https://gcscore-dev-va7.stage.cloud.ADOBE.io/v1/projects/DemoProject/tasks/TestTask806_2/assets/UserTest.html/locales/fr-FR/cancel?orgId=<your_org>ADOBEOrg" -H "accept: application/json"
```

### Request URL

```java
https:// //gcscore-dev-va7.stage.cloud.ADOBE.io/v1/projects/DemoProject/tasks/TestTask806_2/assets/UserTest.html/locales/fr-FR/cancel?orgId=<your_org>ADOBEOrg
```

### Responses
You get the following responses:

1. **200 OK**: The 200 OK status code indicates that the request has been processed successfully on the server
1. **401 Unauthorized**: The 401 unauthorized error status response code indicates that the request was not processed because the destination resource's authentication credentials were invalid. Reauthenticating with right credentials is recommended. 
1. **403 Forbidden**: The 403 Forbidden error status code indicates that the server has received the request but has refused to allow it. The client may have insufficient rights to a resource.
1. **404 Not Found**: The 404 error is returned when the server can’t find the requested resource. It could be broken or dead link because of file movements or entering a non-existent task name.

### Understanding the Successful Response
```java
{
  "context": {
    "headers": {},
    "configuration": null,
    "entity": {
      "locale": "fr-FR",
      "status": "CANCELLED",
      "updatedDate": "2021-09-16T04:02:32.969Z"
    },
    "entityType": "com.ADOBE.gcsservices.dto.AssetLocaleBean",
    "entityAnnotations": [],
    "entityStream": {
      "closed": false,
      "committed": false
    },
    "lengthLong": -1,
    "responseCookies": {},
    "requestCookies": {},
    "entityClass": "com.ADOBE.gcsservices.dto.AssetLocaleBean",
    "mediaType": null,
    "length": -1,
    "location": null,
    "language": null,
    "lastModified": null,
    "date": null,
    "acceptableLanguages": [
      "*"
    ],
    "committed": false,
    "allowedMethods": [],
    "stringHeaders": {},
    "entityTag": null,
    "links": [],
    "acceptableMediaTypes": [
      {
        "type": "*",
        "subtype": "*",
        "parameters": {},
        "quality": 1000,
        "wildcardType": true,
        "wildcardSubtype": true
      }
    ]
  },
  "status": 200,
  "cookies": {},
  "mediaType": null,
  "entity": {
    "locale": "fr-FR",
    "status": "CANCELLED",
    "updatedDate": "2021-09-16T04:02:32.969Z"
  },
  "length": -1,
  "location": null,
  "language": null,
  "lastModified": null,
  "date": null,
  "metadata": {},
  "statusInfo": "OK",
  "allowedMethods": [],
  "stringHeaders": {},
  "entityTag": null,
  "links": [],
  "headers": {}
}
```


The key parameters in response are:

- **Project name**: DemoProject
- **Asset name**: UserTest.html
- **Task name**: TestTask806\_2
- **Locale**: fr-FR [the locale of the asset to be cancelled]
- **Status**: CANCELLED
- **updatedDate**: 2021-09-16T04:02:32.969Z [date time of the cancellation]
- **entityType**: com.Adobe.gcsservices.dto.AssetLocaleBean [an asset locale bean]

> **Note**: To know more about canceling an existing asset, see [Cancel an existing asset API in Swagger](https://gcscore-dev-va7.stage.cloud.adobe.io/swagger-ui/index.html#/Asset%20Service/cancelAssetUsingPUT).


## Where do I find more information?

Follow these guides:

* Get an overview of the Globalization Content Service: 
    Follow this [guide](../overview/index.md). 
  

* Enable a partner to use the Globalization Content Service: Follow this [ guide](../partner/index.md) to onboard on the Adobe I/O console and access the Globalization Content Service APIs.
    