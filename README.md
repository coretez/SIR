# SIR
Simple Incident Response

# Purpose
Simple Incident Response is to be a stand alone incident response tracking system.  With the use of Security, Orcheteration and Response (SOAR) systems, there tracking of incidents no longer should be kept in the Security Information and Event Management (SIEM) system.

# Installation
To install SIR:
* Clone the project to your system `git clone https://github.com/coretez/SIR.git`
* Run `npm install`
* Install MongoDB, please refer to mongo for proper instructions for your system.
* To start SIR run `npm start`

# Development
This project aims to use a correct Open RESTful API, using common tools, such as NodeJS and MongoDB. Development wil use unit testing and keep a single npm build (exception is the mongodb installation).
In the end this project will allow other to quickly integrate solutions with a low chance of dependancy and platfor specific build issues.

## Status
The project is in the early stages of development. The objetives are:
* Define the base Scheme
* Create an RESTful API to the object of that scheme (current)
* Implement basic functions
* Add a site for interface
* Add proper authentication

## Project Structure
The project uses the folling directory structure for development:
* Application (app.js) runs from the root direcotry
* Database models reside in `models`
* Express routes reside in `routes`
* The code that bridges the route to the database are kept in `controllers`
* Unit testing scritps are to be placed in `tests`.  Tests are to end in `Tests.js`

## Data Models
A documented API can be access on Postman: https://documenter.getpostman.com/view/1117493/SVSHs9hS?version=latest

### Incidents
This is the json for an incident object that gets used by /incidents:
```
{
  "detection": Number,
  "actor": String,
  "plan": String,
  "file_set": [String],
  "date": Date,
  "is_starred": Boolean,
  "subject": String,
  "description": String,
  "severity": Number,
  "is_incident": Boolean,
  "is_major": Boolean,
  "status": String,
  "confidentiality": Number,
  "category": Number,
  "opened_by": Number,
  "concerned_business_lines": [String]
}
```

### Users
```
{
    "url": String,
    "username": String,
    “password”: String,
    "email": String,
    "groups": [String]
}
```

### Artifacts
```
{
	“name”: String,
	“artifact”: Object
}
```
