# Loopback Application

The project is generated by [LoopBack](http://loopback.io).

---
## _Install Application_
---

1.  Ensure Node.js is installed on machine that can access both the target and the source.  You can download and follow instructions [here](https://nodejs.org/en/download/).
2.  Clone this repo onto on machine that can access both the target and the source locations.
3.	In the root folder of the repo install all dependencies by running a npm install command at a command prompt.
	> **npm install**

---
## _Configure Application_
---
4.	Identify source and target instances based on requirements and add these to the /server/datasources file, using existing files as templates.
5.	Identify data to be transferred i.e. what table are we interested in transferring
6.	Define model for source and target tables.  There are 2 means to do this:
	-	By running the discover process while will automatically create a JSON file in the /common/models folder as well as a stub of JS file.  The ‘discover’ scripts can be found in the /server/bin folder under the project root.
	- 	Manually creating the JSON and JS files in the /common/models folder.
7.	Include the new model(s) in the model-config, so that they appear in the Loopback explorer ensuring to make relevant models ‘public’.  Those models specified as public in model-config.json ensure that only those models that are of interest to the customer are available

---
## _Run Application_
---
8.	In the root of the repo run a node . command to start the loopback server
	> **node .**
9.	The loopback explorer is now available to you through a browser and you should be able to access all the out-of-the-box apis as well as any customer APIs added.  Use the ‘moveAllData’ api to move data from source to target.  This api is a customised api.
	> **[MyApp](http://localhost:3000/explorer)**
10.	Benchmark data transfer activity with a view to provide customer with a time to implement as well as determining the optimal chunk size for data transfer
11.	Plan transfers accordingly
12.	Transfer Data!

