# Answers to Technical questions

##### What would you add to your solution if you had more time?

* Implemented a proper Cache Store with redis or equivalent for better performance
* Handled all kinds of exceptions throughout the aplication properly along with the ability to sending high severity alert emails on unknown exceptions. 
    * controllers/Customer.controller (lines 64-70)
        ```
        catch (err) {
            if(!(err instanceof ApplicationError)){
                err = new ApplicationError();
            }
            reply.code(err.httpStatusCode);
            return {
                message: err.message,
            };
        }
      ```   
    * services/Customer.service (lines 76-80)
        ```
        catch (err) {
          if (err instanceof ForeignKeyConstraintError) {
            throw new ApplicationError(APP_ERROR_CODES.CST_SVC_1);
          } else {
            throw new ApplicationError(
              APP_ERROR_CODES.UNKNOWN_0,
              JSON.stringify({ input: customerObj, function: "createCustomer" })
            );
          }
      ```
* Written unit tests with jest


##### What's your favourite programming language? Why?
* Javascript. It is pretty flexible, simpler and supports functional programming naturally. Rust is my next favorite that I started learning which is exact opposite to Javascript. Its interesting to compare the programming models and trying to implement the concepts learnt from Rust into Javascript.

##### How would you track down a performance bottleneck in an application? Have you ever had to do this?
* Node.js native profiling provides pretty fair insights and I am getting to know clinic.js another profiling tool created by Matteo Colina (I am an ardent follower of him. I brush up programming by going through his OSS projects).
* In some cases, snapshots/checkpoints with Node.js native process.memoryUsage() also would help.

##### How would you deploy your API in a production environment?
* With Gitlab runners/ Github actions be it to AWS Lambda(aws-sam-cli)/ EC2.
* Eager to build a full custom pipeline on AWS Code build, Code Deploy.

##### Please describe yourself using either XML or JSON.

```
{
    "firstName" : "Sachithanandham",
    "lastName" : "Kumaraguruparan",
    "dateOfBirth" : "1987-09-27",
    "location" : "Chennai",
    "education":[{type : "graduation","institute":"VIT University","location":"Vellore, TN, India"}],
    "workExperiences":[[
  {
    "startDate": "2016-04-01",
    "endDate": "",
    "companyName": "Optanium IT Services Private Limited",
    "location": "Chennai",
    "role": "Lead Architect",
    "designation": "Consultant"
    "technologies":['Node.js','React JS','Mongo DB','Postgres','AWS','jQuery','Angular']
  },
  {
    "startDate": "2013-10-10",
    "endDate": "2016-03-20",
    "companyName": "Caterpillar India Private Limited",
    "location": "Chennai",
    "role": "Development Team Lead",
    "designation": "Senior Analyst"
    "technologies":['Salesforce','Javascript','HTML','jQuery','Backbone','AngularJS','Node.js']
  },
  {
    "startDate": "2013-06-01",
    "endDate": "2013-10-01",
    "companyName": "Flextronics India Private Limited",
    "location": "Chennai",
    "role": "Individual Consultant",
    "designation": "Consultant",
    "technologies":['Salesforce','Javascript','HTML','jQuery']
  },
  {
    "startDate": "2010-10-10",
    "endDate": "2013-05-20",
    "companyName": "Polaris FT Private Limited",
    "location": "Chennai",
    "role": "Senior Developer",
    "designation": "Consultant",
    "technologies":['Salesforce','Javascript','HTML','jQuery']
  },
  {
    "startDate": "2008-07-30",
    "endDate": "2010-10-01",
    "companyName": "Tata Consultany Services Limited",
    "location": "Mumbai",
    "role": "Developer",
    "designation": "Assistant System Engineer",
    "technologies":['Salesforce','Javascript','HTML','jQuery']
  }
]],
    "technicalInterests":['Node.js','Postgres','Cloud Computing','Salesforce','Rust', 'MQTT', 'React', 'Svelte', 'FoundationDB','WebAssembly'],
    "personalInterests":['Cricket','Movies']
}
```
