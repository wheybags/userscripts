// ==UserScript==
// @name        Not now, not ever
// @namespace   Violentmonkey Scripts
// @match       https://deliveroo.fr/en/orders/*/status
// @grant       none
// @version     1.0
// @author      -
// @description 01/07/2024, 22:01:46
// ==/UserScript==


function run()
{
  for (const elem of document.getElementsByTagName("button"))
  {
    if (elem.getAttribute("aria-label") == "Not now")
      elem.click();
  }
}

setInterval(run, 1000)
