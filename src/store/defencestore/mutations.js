
export function saveAdminToken (state, payload) {
    state.adminToken = payload.token;
}

export function saveUserToken (state, payload) {
  state.userToken = payload.token;
}

export function getDepartments (state, payload) {
  let arr = [];
  let userDept = localStorage.getItem("userDept");
  payload.departments.forEach(item => {
    userDept !== item._id && arr.push(item.abbr)
  })
  console.log(arr)
  state.departments = arr;
}

export function setRequests (state, payload) {
  state.outgoingRequests = payload.outgoing;
  state.incomingRequests = payload.incoming;
}

export function setMails (state, payload) {
  state.inbox = payload.inbox;
  state.sent = payload.sent;
}

export function getUsersInDepartment (state, payload) {
  let arr = [];
  let username = localStorage.getItem("username");
  payload.users.forEach(item => {
    username !== item.username && arr.push(item.username)
  })
  console.log(arr)
  state.usersInDept = arr;
}

export function setLogs (state, payload) {
  state.logs = payload;
}

export function logout(state){
  console.log("Logout commited")
  state.userToken = null
}
