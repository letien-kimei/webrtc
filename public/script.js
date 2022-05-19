const socket = io('/')
const videoGrid = document.getElementById('video-grid')
const client_can_change = document.getElementById('client_can_change')
const remote_client = document.getElementById('remote_client')
const video_client_can_change = document.getElementById('video_client_can_change')
const myPeer = new Peer()
const myVideo = document.createElement('video')
myVideo.muted = true
const peers = {}
navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true
}).then(stream => {
  debugger;
  addVideoStream(video_client_can_change, stream)

  myPeer.on('call', call => {
    call.answer(stream)
    const video = document.createElement('video')
    debugger;
    call.on('stream', userVideoStream => {
      debugger;
      addVideoStream(video, userVideoStream, "new")
    })
  })

  socket.on('user-connected', objectClient => {
    var userId = objectClient.userId
    debugger;
    connectToNewUser(userId, stream)
  })
})

socket.on('user-disconnected', userId => {
  if (peers[userId]) peers[userId].close()
})

myPeer.on('open', id => {
  debugger;
  socket.emit('join-room', ROOM_ID, id)
})

function connectToNewUser(userId, stream) {
  const call = myPeer.call(userId, stream)
  const video = document.createElement('video')
  video.className = `remoteClient userid_${userId}`;
  debugger;
  call.on('stream', userVideoStream => {
    debugger;
    addVideoStream(video, userVideoStream,"new")
  })
  // remote_client.append(video)
  call.on('close', () => {
    video.remove()
  })

  peers[userId] = call
}

function addVideoStream(video, stream, status) {
  debugger;
  video.srcObject = stream
  video.addEventListener('loadedmetadata', () => {
    video.play()
  })

  if(status == "new"){
    const newDivRemote = document.createElement('div')
    newDivRemote.append(video)
    remote_client.append(newDivRemote)
  }
}