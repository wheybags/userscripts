// ==UserScript==
// @name        Local timezone on steamworks
// @namespace   Violentmonkey Scripts
// @match       https://partner.steamgames.com/apps/builds/*
// @grant       none
// @require     https://cdn.jsdelivr.net/npm/luxon@3.3.0/build/global/luxon.min.js
// @version     1.0
// @author      -
// @description 10/04/2023, 23:02:23
// ==/UserScript==


function patchElem(elem)
{
  // format: "Apr 10, 2023 @ 1:53pm"
  const parsableString = elem.innerHTML.trim() + " America/Los_Angeles"
  const time = luxon.DateTime.fromFormat(parsableString, "MMM d, yyyy @ h:mma z");

  const localTime = time.toFormat("d MMM, yyyy @ ") + time.toFormat("h:mma ").toLowerCase();
  elem.innerHTML = '<font style="color:green">' + localTime + '</font>';
}

const rows = document.getElementsByClassName("build_row");
for (const row of rows)
{
  const elem = row.children[2];
  patchElem(elem);
}

const bs = document.getElementsByTagName("b");
for (const b of bs)
{
  if (b.innerHTML.trim() == "App build history:")
  {
    const table = b.parentElement.nextElementSibling;

    let skippedHeader = false;
    for (const row of table.getElementsByTagName("tr"))
    {
      if (!skippedHeader)
      {
        skippedHeader = true;
        continue;
      }

      patchElem(row.children[0]);
    }
    break;
  }
}
