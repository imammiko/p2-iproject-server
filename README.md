# p2-iproject-server

Individual Portfolio Server

## server

### https://iot-imammiko-individual.herokuapp.com

## client

### https://iot-ip-imammiko-h8.web.app

&nbsp;

### This app has :

- Get Data Sensor Temperature and Humidity
- Post Control Lamp
- JSON formatted response

&nbsp;

## API endpoints

### GET/dataSensorTemperature?rangeData= "{option}"

> value average range time

_Request Header_

```
not needed

```

_Request Params_

```
rangeData : hour/day/month

```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "day": "<dateStamp Temperature>",
        "AVG": "<AVG Temperature>"
    },
    {
        "day": "<dateStamp Temperature>",
        "AVG": "<AVG Temperature>"
    }
[
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---

### GET/dataSensorHumidity?rangeData= "{option}"

> values average Humidity are on range time

_Request Header_

```
not needed

```

_Request Params_

```
rangeData : hour/day/month

```

_Request Body_

```
not needed
```

_Response (200)_

```
[
    {
        "day": "<dateStamp Humidity>",
        "AVG": "<AVG Humidity>"
    },
    {
        "day": "<dateStamp Humidity>",
        "AVG": "<AVG Humidity>"
    }
[
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---

### GET/lastDataSensor

> last time Values Temperature and humidity

_Request Header_

```
not needed

```

_Request Params_

```
not needed

```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": <id Data Sensor>,
    "temperature": <value Temperature>,
    "humidity": <value humidity>,
    "timeStamp": <TimeStamp on antarest>,
    "createdAt": "2021-09-23T05:51:18.902Z",
    "updatedAt": "2021-09-23T05:51:18.902Z"
}
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---

### GET/weather

> curent weather on jakarta

_Request Header_

```
not needed

```

_Request Params_

```
not needed

```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "weather": [
        {
            "id": 802,
            "main": <data weather>,
            "description": "<description weather>",
            "icon": "<icon image>"
        }
    ]
}
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---

---

### GET/controlLampu

> curent Lamp Status

_Request Header_

```
not needed

```

_Request Params_

```
not needed

```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "id": <id Status Lamp>,
    "lamp": <Status Lamp>,
    "timeStamp": "<timeStamp antarest>",
    "createdAt": "2021-09-23T05:57:46.056Z",
    "updatedAt": "2021-09-23T05:57:46.059Z"
}
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---

### POST/controlLampu

> POST Lamp Status

_Request Header_

```
not needed

```

_Request Params_

```
not needed

```

_Request Body_

```
lamp: 1/0
```

_Response (200)_

```
{
    "id": <id Status Lamp>,
    "lamp": <Status Lamp>,
    "timeStamp": "<timeStamp antarest>",
    "createdAt": "2021-09-23T05:57:46.056Z",
    "updatedAt": "2021-09-23T05:57:46.059Z"
}
```

_Response (500 - internal Server Error)_

```
{
  "message": "internal server Error"
}
```

---
