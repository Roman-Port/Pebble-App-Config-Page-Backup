var dojoConfig = {
    baseUrl: "/jslib/",
    parseOnLoad: true,
    tlmSiblingOfDojo: false,
    async: true,
    packages: [
	{ name: "dojo", location: "dojo/1.10.4/dojo" },
	{ name: "dijit", location: "dojo/1.10.4/dijit" },
	{ name: "dojox", location: "dojo/1.10.4/dojox" },
	{ name: 'd3', location: "d3/3.4.13" },
	{ name: 'c3', location: "c3/0.4.5" },
	{ name: 'atnf', location: "atnf" },
	{ name: 'mathjax', location: "mathjax/2.5" }
    ]
};
