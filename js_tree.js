"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3
   Author: Hesbon Osoro
   Date: 12/10/22    
   Filename: js_tree.js
   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document
   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document
   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.
   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

// Global Variables
var nodeCount = 0;
var elemCount = 0;
var textCount = 0;
var wsCount = 0;

// Event handler for the page load event
window.onload = makeTree;

/* JavaScript Functions */

function makeTree() {
  var treeBox = document.createElement("aside");
  treeBox.setAttribute("id", "treeBox");
  treeBox.innerHTML = "<h1>Node Tree</h1>";
  document.getElementById("main").appendChild(treeBox);
  var nodeList = document.createElement("ol");
  treeBox.appendChild(nodeList);
  var sourceArticle = document.querySelector("#main article");
  makeBranches(sourceArticle, nodeList);
  document.getElementById("totalNodes").textContent = nodeCount;
  document.getElementById("elemNodes").textContent = elemCount;
  document.getElementById("textNodes").textContent = textCount;
  document.getElementById("wsNodes").textContent = wsCount;
}

function makeBranches(treeNode, nestedList) {
  nodeCount++;
  var liElem = document.createElement("li");
  liElem.innerHTML = "+--<span></span>";
  var spanElem = liElem.firstElementChild;

  nestedList.appendChild(liElem);
  if (treeNode.nodeType === 1) {
    elemCount++;
    spanElem.setAttribute("class", "elementNode");
    spanElem.textContent = "<" + treeNode.nodeName + ">";
    for (var n = treeNode.firstChild; n !== null; n = n.nextSibling) {
      var newList = document.createElement("ol");
      newList.innerHTML = "|";
      nestedList.appendChild(newList);
      makeBranches(n, newList);
    }
  } else if (treeNode.nodeType === 3) {
    textCount++;
    var textString = treeNode.nodeValue;
    if (isWhiteSpaceNode(textString)) {
      wsCount++;
      spanElem.setAttribute("class", "whiteSpaceNode");
      spanElem.textContent = "#text";
    } else {
      spanElem.setAttribute("class", "textNode");
      spanElem.textContent = textString;
    }
  }
}

function isWhiteSpaceNode(tString) {
  return !/[^\t\n\r ]/.test(tString);
}
