
export function saveAdminToken (state, payload) {
    state.adminToken = payload.token;
}

export function saveUserToken (state, payload) {
  // console.log(state);
  state.userToken = payload.token;
}

export function getDepartments (state, payload) {
  let arr = [];
  let userDeptId = localStorage.getItem("userDeptId");
  payload.departments.forEach(item => {
    (userDeptId !== item._id && item.abbr !== "ADMIN") && arr.push(item.abbr)
  })
  // console.log(arr)
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

export function setRequestsAndMails (state, payload) {
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
  // console.log(arr)
  // console.log(arrForForward)
  state.usersInDept = arr;
  state.usersInDeptForForward = arrForForward;
}

export function setLogs (state, payload) {
  state.logs = payload;
}

export function getAllUsersAdmin (state, payload) {
  // console.log(payload)
  state.usersList = payload.users;
}

export function logout(state){
  // console.log("Logout commited")
  state.userToken = null
}

export function getProfile (state, payload) {
  state.loggedUser = payload;
}

export function setAdminMails (state, payload) {
  let { mails } = payload;
  state.adminMails = mails;
}

export function setAdminSingleMail (state, payload) {
  let {mail} = payload;
  state.adminSingleMail=mail;
}

export function setConversations (state, payload) {
  state.conversations = payload
}
