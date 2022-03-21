
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
    (userDept !== item._id && item.abbr !== "ADMIN") && arr.push(item.abbr)
  })
  console.log(arr)
  state.departments = arr;
}

export function getAllUserDepartments (state, payload) {
  let arr = [];
  payload.departments.forEach(item => {
    (item.abbr !== "ADMIN") && arr.push(item.abbr)
  })
  // console.log(arr)
  state.departments = arr;
}

export function getAllDepartmentsAdmin (state, payload) {
  let arr = [];
  payload.departments.forEach(item => {
    (item.abbr !== "ADMIN") && arr.push(item.abbr)
  })
  // console.log(arr)
  state.departments = arr;
}

export function getAllRawDepartments (state, payload) {
  let arr = [];
  payload.departments.forEach(item => {
    (item.abbr !== "ADMIN") && arr.push(item)
  })
  // console.log(arr)
  // state.departments = arr;
  state.rawDepartments = arr
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
  let arrForForward=[];
  let username = localStorage.getItem("username");
  payload.users.forEach(item => {
    username !== item.username && arr.push(item.username)
    username !== item.username && arrForForward.push(item)

  })
  console.log(arr)
  console.log(arrForForward)
  state.usersInDept = arr;
  state.usersInDeptForForward = arrForForward;
}

export function setLogs (state, payload) {
  state.logs = payload;
}

export function getAllUsersAdmin (state, payload) {
  console.log(payload)
  state.usersList = payload.users;
}

export function logout(state){
  console.log("Logout commited")
  state.userToken = null
}
