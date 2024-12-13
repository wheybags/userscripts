// ==UserScript==
// @name        ACTUALLY SCROLL DOWN - github actions logs
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @grant       none
// @version     1.0
// @author      -
// @description 20/11/2024, 16:49:06
// ==/UserScript==



let following = false;
let interval = null;
let button = null;


function follow()
{
  following = true;
  button.innerHTML = "Stop Following"
  interval = setInterval(() =>
  {
    window.scrollBy(0, 99999);
  }, 100);
}

function stopFollowing()
{
  following = false;
  button.innerHTML = "Start Following";

  if (interval !== null)
  {
    clearInterval(interval);
    interval = null;
  }
}

function deactivate()
{
  stopFollowing();
  button.remove();
  button = null;
}

function activate()
{
  button = document.createElement("button");
  button.style.width = "150px";
  button.style.height = "50px";
  button.style.backgroundColor = "white";
  button.style.position = "fixed";
  button.style.left = "50vw";
  button.style.top = "0";
  button.style.color = "red";
  button.innerHTML = "Start Follow";
  button.onclick = () => { following ? stopFollowing() : follow(); };
  document.body.appendChild(button);
  follow();
}

setInterval(()=>
{
  const regex = /^https:\/\/github\.com\/[^\/]*\/[^\/]*\/actions\/runs\/[^\/]*\/job\/[^\/]*$/gm;
  const matches = !!window.location.toString().match(regex);

  if (button && !matches)
    deactivate();
  else if (!button && matches)
    activate();
}, 500)


window.addEventListener('wheel', (event) =>
{
  if (event.deltaY < 0 && following)
    stopFollowing();
})

window.addEventListener('keydown', (event) =>
{
  if ((event.key === 'PageUp' || event.key === 'Home') && following)
    stopFollowing();
})
