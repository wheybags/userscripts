// ==UserScript==
// @name        get twitch id from video
// @namespace   Violentmonkey Scripts
// @match       https://www.twitch.tv/videos/*
// @grant       none
// @version     1.0
// @author      -
// @description 20/08/2024, 17:43:56
// ==/UserScript==


const CLIENT_ID = 'kimne78kx3ncx6brgo4mv6wki5h1ko'

const TWITCH_GQL_URL = 'https://gql.twitch.tv/gql'

const OPERATION_HASHES = {
  CollectionSideBar: '27111f1b382effad0b6def325caef1909c733fe6a4fbabf54f8d491ef2cf2f14',
  FilterableVideoTower_Videos: 'a937f1d22e269e39a03b509f65a7490f9fc247d7f83d6ac1421523e3b68042cb',
  ClipsCards__User: 'b73ad2bfaecfd30a9e6c28fada15bd97032c83ec77a0440766a56fe0bd632777',
  ChannelCollectionsContent: '07e3691a1bad77a36aba590c351180439a40baefc1c275356f40fc7082419a84',
  StreamMetadata: '1c719a40e481453e5c48d9bb585d971b8b372f8ebb105b17076722264dfa5b3e',
  ComscoreStreamingQuery: 'e1edae8122517d013405f237ffcc124515dc6ded82480a88daef69c83b53ac01',
  VideoAccessToken_Clip: '36b89d2507fce29e5ca551df756d27c1cfe079e2609642b4390aa4c35796eb11',
  VideoPreviewOverlay: '3006e77e51b128d838fa4e835723ca4dc9a05c5efd4466c1085215c6e437e65c',
  VideoMetadata: '49b5b8f268cdeb259d75b58dcb0c1a748e3b575003448a2333dc5cdafd49adad',
  ClipsDownloadButton: '6e465bb8446e2391644cf079851c0cb1b96928435a240f07ed4b240f0acc6f1b',
  PlaybackAccessToken: '0828119ded1c13477966434e15800ff57ddacf13ba1911c129dc2200705b0712',
}


const postOperations = async (ops) => {
  const body = ops.map((op) => {
    return {
      operationName: op.operationName,
      variables: op.variables,
      extensions: {
        persistedQuery: {
          version: 1,
          sha256Hash: OPERATION_HASHES[op.operationName],
        },
      },
    }
  })

  const response = await fetch(TWITCH_GQL_URL, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      'Client-ID': CLIENT_ID,
    },
  })

  return await response.text()
}

async function run()
{
  const videoId = window.location.pathname.split('/').slice(-1)[0]

  const data = JSON.parse(await postOperations([
    {
      operationName: 'VideoMetadata',
      variables: {
        channelLogin: '',
        videoID: videoId,
      },
    },
  ]))

  console.log("====================== GAME ID: " + data[0].data.video.game.id)
}

run()
