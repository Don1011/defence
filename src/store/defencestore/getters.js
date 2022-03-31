
export function getDepartments (state) {
  // console.log(state);
  return state.departments;
}

export function getAllDepartmentsAdmin (state) {
  // console.log(state);
  return state.departments;
}

export function getRequests (state) {
  console.log(state);
  return ({ incoming: state.incomingRequests, outgoing: state.outgoingRequests });
}

export function getMails (state) {
  return ({ inbox: state.inbox, sent: state.sent });
}

export function usersInDept (state) {
  return state.usersInDept;
}

export function usersInDeptForForward (state) {
  return state.usersInDeptForForward;
}

export function getLogs (state) {
  return state.logs;
}

export function getAllUsersAdmin (state) {
  console.log(state);
  return state.usersList;
}

export function rawDepartments (state) {
  return state.rawDepartments;
}

export function getProfile (state) {
  console.log(state)
  return state;
}
