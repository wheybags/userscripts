// ==UserScript==
// @name        Youtube: Remove "Includes Paid Promotion" button
// @namespace   Violentmonkey Scripts
// @match       https://www.youtube.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 3/8/2025, 3:20:59 PM
// ==/UserScript==

setInterval(() =>
{
  const elem = document.getElementById("disablePaidContentOverlayStyleElem");

  if (elem == null)
  {
    const newElem = document.createElement("style");
    newElem.id = "disablePaidContentOverlayStyleElem";
    newElem.innerHTML = ".ytmPaidContentOverlayHost { display: none; }"
    document.head.append(newElem);
  }

}, 1000)
