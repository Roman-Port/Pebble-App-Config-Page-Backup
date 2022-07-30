var MAX_ELEMENT_LEN = 12;
var MAX_PAIR_LEN = 10;
var MAX_LEAVES = 6;
var DEFAULT_PRIORITY = 1;

function btnImageHTML(name, image, visibility, action) {
	return "<img =\"" + name + action + "\" style=\"display:" + (visibility ? "block" : "none")
		+ ";padding:2px 4px\" src=\"" + image + "\" onclick=" + action + "(\"" + name + "\")>";
}

function prioritySelectHTML(node) {
	var priorityHtml = "";
	if (node.text.priority != null) {
		priorityHtml = "<select name=\"" + node.text.name + "\" onchange=priorityChanged(this)>";
		for(var i = 1; i <= MAX_LEAVES; i++) {
			if (i != node.text.priority)
				priorityHtml += "<option>" + i + "</option>";
			else
				priorityHtml += "<option selected>" + i + "</option>";
		}
		priorityHtml += "</select>";
	}
	return priorityHtml;
}

function totalInputHTML(total, accTotal) {
	return "<div><label>Total</label></div>" +
	       "<div><input type=number id=total value=" + total + " onchange=totalChanged(this) /><div>" +
	       "<div><label>Accum</label><div>" +
	       "<div><input type=number id=accTotal value=" + accTotal + " onchange=totalChanged(this) /></div>";
}

function nodeHTML(root, child) {
	var rName = root.text.name;
	var cName = child.text.name;
	var rChildren = root.children;
	var create = rChildren[rChildren.length - 1].text ? 0 : 1;
	var lastIndex = rChildren.length - 1 - create;

	var removeVisible = !rName && (child.children || (rChildren[2] && rChildren[2].text));
	var downVisible = rChildren.indexOf(child) < lastIndex;
	var upVisible = rChildren.indexOf(child) > 0;
	var unionVisible = !rName && rChildren.length > 2 + create && rChildren.indexOf(child) < lastIndex;

	return "<input type=input value=" + child.text.value
		+ " name=\"" + cName + "\" maxlength=" + (child.children ? MAX_PAIR_LEN : MAX_ELEMENT_LEN)
		+ " size=10 onchange=textChanged(this)></input>"
		+ "<p>"
		+ btnImageHTML(cName, "remove.png", removeVisible, "removeClick")
		+ btnImageHTML(cName, "down.png", downVisible, "downClick")
		+ btnImageHTML(cName, "up.png", upVisible, "upClick")
		+ btnImageHTML(cName, "union.png", unionVisible, "unionClick")
		+ prioritySelectHTML(child)
		+ "</p>"
}

function init(node) {
	if (node.children) {
		for(var i = 0; i < node.children.length; i++) {
			var child = node.children[i];
			if (!child.text) {
				hasInsertNode = true;
			}
			else {
				if (!child.text.value)
					child.text.value = child.text.name;
				child.innerHTML = nodeHTML(node, child);
				child.parent = node;
				init(child);
			}
		}
	}
	else {
		leavesCount++;
	}

	if (node.text.name == "") {
		node.innerHTML = totalInputHTML(node.text.total, node.text.accTotal);
		if (!hasInsertNode && leavesCount < MAX_LEAVES) {
			var createNode = {
				innerHTML: "<img src=\"create.png\" onclick=createClick()>",
				HTMLclass: "insert"
			};
			node.children.splice(node.children.length, 0, createNode);
		}
	}
}

function clean(node) {
	if (node.children) {
		var len = node.children.length;
		for(var i = 0; i < len; i++) {
			var child = node.children[i];
			delete child['innerHTML'];
			delete child['parent'];
			clean(child);
		}
		if (node.children[len - 1]['HTMLclass']) {
			node.children.splice(len - 1, 1);
		}
	}
}

function rebuildTree() {
	treant.destroy();
	leavesCount = 0;
	hasInsertNode = false;
	init(chartConfig.nodeStructure);
	treant = new Treant(chartConfig);
}

function findNodeByName(node, name) {
	if (node.text.name == name) {
		return node;
	}
	if (node.children) {
		for(var i = 0; i < node.children.length; i++) {
			childNode = findNodeByName(node.children[i], name);
			if (childNode) {
				return childNode;
			}
		}
	}
	return undefined;
}

function textChanged(input) {
	var node = findNodeByName(chartConfig.nodeStructure, input.name);
	input.name = input.value;
	node.text.value = input.value;
}

function priorityChanged(input) {
	var node = findNodeByName(chartConfig.nodeStructure, input.name);
	node.text.priority = parseInt(input.value);
}

function totalChanged(input) {
	var isAccTotal = input.id == "accTotal";
	if (!input.value) {
		input.value = isAccTotal ? chartConfig.nodeStructure.text.accTotal : chartConfig.nodeStructure.text.total;
	}
	else if (isAccTotal) {
		if (input.value < 8)
			input.value = 8;
		if (input.value > 500)
			input.value = 500;
		chartConfig.nodeStructure.text.accTotal = input.value;
	}
	else {
		if (input.value < 2)
			input.value = 2;
		if (input.value > 90)
			input.value = 90;
		chartConfig.nodeStructure.text.total = input.value;
	}
}

function createClick() {
	var node = chartConfig.nodeStructure;
	var newNode = {
		text: { name: "work" + itemCounter++, priority: DEFAULT_PRIORITY }
	};
	node.children.splice(node.children.length - 1, 1, newNode);

	rebuildTree();
}

function removeClick(name) {
	var node = findNodeByName(chartConfig.nodeStructure, name);
	var index = node.parent.children.indexOf(node);
	if (node.children) {
		node.children[0].parent = node.parent;
		node.children[1].parent = node.parent;
		node.parent.children.splice(index, 1, node.children[0], node.children[1]);
	}
	else {
		node.parent.children.splice(index, 1);
	}

	rebuildTree();
}

function unionClick(name) {
	var node1 = findNodeByName(chartConfig.nodeStructure, name);
	var children = node1.parent.children;
	var index = children.indexOf(node1);
	var node2 = children[index + 1];

	var node = {
		text: {
			name: node1.text.name + node2.text.name,
			value: node1.text.value.substring(0, MAX_PAIR_LEN / 2) + node2.text.value.substring(0, MAX_PAIR_LEN / 2)
		},
		children: [node1, node2],
	};
	node1.parent.children.splice(index, 2, node);

	rebuildTree();
}

function moveNode(name, down) {
	var node = findNodeByName(chartConfig.nodeStructure, name);
	var children = node.parent.children;
	var index = children.indexOf(node);
	var inc = down ? 1 : -1;
	children[index] = children[index + inc];
	children[index + inc] = node;

	rebuildTree();
}

function upClick(name) {
	return moveNode(name, false);
}

function downClick(name) {
	return moveNode(name, true);
}

function getUriParamByName(name) {
    var match = new RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
    return match && decodeURIComponent(match[1]);
}

var leavesCount = 0;
var itemCounter = 0;
var hasInsertNode = false;
var chartConfig = {
	chart: {
		container: "#taskTreeChart",
		levelSeparation: 20,
		rootOrientation: "WEST",
		connectors: {
			type: "curve",
			style: { "stroke-width": 2, stroke: "#aaa" }
		},
		node: { HTMLclass: "cell" }
	},
	nodeStructure: {
		text: { name: "", total: getUriParamByName("total"), accTotal: getUriParamByName("acctotal") },
		HTMLclass: "root",
		children: JSON.parse(getUriParamByName("tree"))
	}
};

init(chartConfig.nodeStructure);
var treant = new Treant(chartConfig);
