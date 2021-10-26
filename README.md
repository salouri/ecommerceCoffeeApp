## Running the app

```bash
# development
$ npm run dev

```
```bash
# production
$ npm start

```

# Endpoints

Coffee Machine Endpoint:- 

````
All
/api/v1/coffee-machines

Large Coffee Machines
/api/v1/coffee-machines?productType=large

Small Coffee Machines
/api/v1/coffee-machines?productType=small

Espresso
/api/v1/coffee-machines?productType=espresso

Water Line Compatible 
/api/v1/coffee-machines?waterLineCompatible=true


Compined
/api/v1/coffee-machine?waterLineCompatible=true&productType=small

````


Coffee Pods Endpoint:- 

````
All
/api/v1/coffee-pods

Product Types
/api/v1/coffee-pods?productType=large
/api/v1/coffee-machines?productType=small
/api/v1/coffee-machines?productType=espresso

Coffee Flavors
/api/v1/coffee-machines?flavor=vanilla
/api/v1/coffee-machines?flavor=caramel
/api/v1/coffee-machines?flavor=psl
/api/v1/coffee-machines?flavor=mocha
/api/v1/coffee-machines?flavor=hazelnut

Pack Sizes
/api/v1/coffee-machines?packSize=1
/api/v1/coffee-machines?packSize=3
/api/v1/coffee-machines?packSize=5
/api/v1/coffee-machines?packSize=7
````

# Answers to Questions:

ALl Espresso Machines:- 
````
EM001, EM002, EM003
````

ALl Small Pods:- 
````
EP001, EP003, EP005, EP007
EP011, EP013, EP015, EP017
EP021, EP023, EP025, EP027
EP031, EP033, EP035, EP037
EP041, EP043, EP045, EP047
````

ALl Pods sold in 7 dozen packs:- 
````
EP007, EP017, EP027, EP037, EP047
CP007, CP017, CP027, CP037, CP047
````

