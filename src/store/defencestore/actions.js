
import { Notify } from 'quasar';
import axios from 'axios';
import env from '../../../env.js';

// const route = useRoute();
// const baseurl = "https://edefense.herokuapp.com/api";
const baseurl = env.backend;

export function adminLogin (context, data) {
    return new Promise((resolve, reject) => {
        axios({
            method: "POST",
            url: baseurl + '/login',
            data: {
                username: data.username,
                password: data.password
            }
        })
        .then(response => {
            // console.log(response);
            if(response.status === 201 || response.status === 200){
              if (response.data.data.doc.role === "Admin") {
                console.log(response.data.data);
                let token = response.data.data.token;
                localStorage.setItem('adminToken', token);
                context.commit('saveAdminToken', {token})
                Notify.create({
                    message: 'Login Success.',
                    caption: 'Admin successfully authenticated.',
                    color: 'blue'
                })
                resolve();
              }else{
                Notify.create({
                  message: "Unauthorized.",
                  caption: "User is not an Admin.",
                  color: 'red'
                })
                reject();
              }
            }else{
                Notify.create({
                    message: "Login Failure.",
                    caption: "Authentication error, check credentials.",
                    color: 'red'
                })
                reject();
            }
        })
        .catch(err => {
          if(err.response?.status === 401){
            context.dispatch("logout")
          }
          Notify.create({
              message: 'Login Failure.',
              caption: "Authentication error, check credentials.",
              color: 'red'
          })
        })
    })
}

export function userLogin (context, data) {
  return new Promise((resolve, reject) => {
      axios({
          method: "POST",
          url: baseurl + '/login',
          data: {
            username: data.username,
            password: data.password
          }
      })
      .then(response => {
          if(response.status === 200 || response.status === 201){
              let token = response.data.data.token;
              localStorage.setItem('userToken', token);
              let department = response.data.data.doc.department;
              let username = response.data.data.doc.username;
              let userId = response.data.data.doc._id;
              localStorage.setItem('userDeptId', department._id);
              localStorage.setItem('userDeptAbbr', department.abbr);
              localStorage.setItem('userDeptName', department.name);
              localStorage.setItem('username', username);
              localStorage.setItem('userId', userId);
              context.commit('saveUserToken', {token})
              Notify.create({
                  message: 'Login Success.',
                  caption: 'User successfully authenticated.',
                  color: 'blue'
              })
              resolve();
              /*
                USER DETAILS
                _id: "61bb47b0dfc25d42011b4b63"​​
                avi: ""​​
                department: "61b40ca89627d34b67535126"​​
                isAdmin: false​​
                name: ""​​
                password: "$2a$10$skyLOwVl6o2hg8e4.rN/qeHsMRZqPIzPneoj/9Z87qqhBAX//dDZS"​​
                rank: ""​​
                role: "Registry"​​
                username: "reg@DDI"
               */
          }else{
              Notify.create({
                  message: "Login Failure.",
                  caption: "Authentication error, check credentials.",
                  color: 'red'
              })
              reject();
          }
      })
      .catch(err => {
        Notify.create({
            message: 'Login Failure.',
            caption: "Authentication error, check credentials.",
            color: 'red'
        })
        reject();
      })
  })

}

export function sendRequest (context, data) {
  // const { to, text, reference, title } = data;
  // console.log(data);
  const { formData } = data;
  // const { to, text, files, reference, title } = data;
  console.log(files);
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/user/request',
      // data: { to, text, reference, title }
      data: formData,
      // data: { to, text, files, reference, title },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201){
        Notify.create({
            message: "Request successfully sent.",
            color: 'blue'
        })
        resolve();
      }else{
        Notify.create({
          message: "Error sending request. Please retry.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
        Notify.create({
          message: 'Error sending request. Please retry.',
          color: 'red'
        })
        reject();
    })
  })

}

export function getDepartments (context, data) {

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/user/department',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response.data.data);
      if(response.status === 201 || response.status === 200){
          context.commit('getDepartments', {departments: response.data.data})
          resolve();
      }else{
          Notify.create({
              message: "Error fetching departments.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
        Notify.create({
            message: 'Error fetching departments.',
            color: 'red'
        })
    })
  })

}

export function getAllUserDepartments (context, data) {

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/user/department',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response.data.doc);
      if(response.status === 201 || response.status === 200){
          context.commit('getAllUserDepartments', {departments: response.data.data})
          resolve();
      }else{
          Notify.create({
              message: "Error fetching departments.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
        Notify.create({
            message: 'Error fetching departments.',
            color: 'red'
        })
    })
  })

}

export function getRequests (context, data) {
  console.log(context);
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: baseurl + '/user/request',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        }
      })
      .then(response => {
        // console.log(response);
        if(response.status === 201 || response.status === 200){
            let outgoing = [];
            let incoming = [];
            let userDeptId = localStorage.getItem('userDeptId');
            let username = localStorage.getItem('username');
            let userId = localStorage.getItem('userId');
            let requests = response.data.data;
            requests.forEach(item => {
              if(item.metaData.status !== "Completed"){
                if(item.from._id === userDeptId || item.to._id === userDeptId){
                  console.log("If statement crossed");
                  let seenByIds = [];
                  item.metaData.seen.forEach(element => {
                    seenByIds.push(element.by);
                  });
                  console.log(seenByIds);
                  if(username.split('@')[0] === "reg" || seenByIds.includes(userId)){
                    if(item.from._id === userDeptId){
                      // if(seenByIds[seenByIds.length-1] === userId){
                        outgoing.push(item);
                      // }else{
                      //   outgoing.push(item);
                      // }
                    }else{
                     incoming.push(item);
                    }
                  }
                }
              }
            });
            context.commit('setRequests', {outgoing, incoming})
            resolve();
        }else{
            Notify.create({
                message: "Error fetching requests.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
          context.dispatch("logout")
        }
        // console.log(err);

        Notify.create({
            message: 'Error fetching requests.',
            color: 'red'
        })
        reject();
      })
    })

}

export function sendMail (context, data) {
    // const { to, text, reference, title } = data;
    // console.log(data);
    const { to, text, files, title } = data;

    return new Promise((resolve, reject) => {
      axios({
        method: "POST",
        url: baseurl + '/user/mail',
        data: { to, text, files, title },
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        }
      })
      .then(response => {
        // console.log(response);
        if(response.status === 201){
          Notify.create({
              message: "Mail successfully sent.",
              color: 'blue'
          })
          resolve();
        }else{
            Notify.create({
                message: "Error sending mail. Please retry.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
    context.dispatch("logout")
        }
          Notify.create({
              message: 'Error sending mail. Please retry.',
              color: 'red'
          })
          reject();
      })
    })

}

export function sendSupportMessage (context, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/user/support',
      data,
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "Message successfully sent.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error sending message. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error sending message. Please retry.',
            color: 'red'
        })
        reject();
    })
  })

}

export function loginSupport (context, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/problem',
      data
      // headers: {
      //   'Authorization': 'Bearer '+localStorage.getItem('userToken')
      // }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "Message successfully sent.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error sending message. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error sending message. Please retry.',
            color: 'red'
        })
        reject();
    })
  })

}

export function getUsersInDepartment (context, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/user/users',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
        // console.log(response);
      if(response.status === 201 || response.status === 200){
          context.commit('getUsersInDepartment', {users: response.data.data})
          resolve();
      }else{
          Notify.create({
              message: "Error fetching users in your department.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error fetching users in your department.',
            color: 'red'
        })
    })
  })

}

export function getMails (context, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: baseurl + '/user/mail',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        }
      })
      .then(response => {
        if(response.status === 201 || response.status === 200){
          let sent = [];
          let inbox = [];
          let username = localStorage.getItem('username');
          // console.log(username);
          let requests = response.data.data;
          requests.forEach(item => {
              if(item.from.username === username){
                  sent.push(item);
              }else{
                  inbox.push(item);
              }
          });
          context.commit('setMails', {sent, inbox});
          resolve();
        }else{
            Notify.create({
                message: "Error fetching users in your department.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
    context.dispatch("logout")
        }
          Notify.create({
              message: 'Error fetching mails.',
              color: 'red'
          })
      })
    })

}

export function getLogs (context, data) {
    return new Promise((resolve, reject) => {
      axios({
        method: "GET",
        url: baseurl + '/user/logs',
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('userToken')
        }
      })
      .then(response => {
        // console.log(response.data.data);
        if(response.status === 201 || response.status === 200){
            context.commit('setLogs', response.data.data)
            resolve();
        }else{
            Notify.create({
                message: "Error fetching logs.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
    context.dispatch("logout")
        }
          Notify.create({
              message: 'Error fetching logs.',
              color: 'red'
          })
      })
    })
}


export function forwardRequest (context, data) {
  // const { to, text, reference, title } = data;
  // console.log(data);
  const { userId, requestId } = data;

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + `/user/request/forward/${userId}/${requestId}`,
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201 || response.status === 200){
        if(response.data.doc !== undefined){
          Notify.create({
              message: "Request successfully forwarded.",
              color: 'blue'
          })
          resolve();
        }else{
          Notify.create({
            message: "Message has already been forwarded to this user.",
            color: 'blue'
          })
          reject();
        }
      }else{
          Notify.create({
              message: "Error forwarding request. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
          message: "Error forwarding request. Please retry.",
          color: 'red'
        })
        reject();
    })
  })

}

export function setCompleted (context, data) {
  // const { to, text, reference, title } = data;
  // console.log(data);
  const { requestId, status } = data;

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + `/user/metadata/${requestId}/${status}`,
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201 || response.status === 200){
        Notify.create({
            message: "Status changed to completed.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error changing status to completed.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
          message: "Error changing status to completed.",
          color: 'red'
        })
        reject();
    })
  })

}

export function createUser (context, data) {
  console.log(data);
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/admin/users/create',
      data:{
        username: data.username,
        password: data.password,
        role: data.role,
        rank: data.rank,
        department: data.department,
        name: data.name
      },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "User Created Successfully.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error creating User. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error creating User. Please retry.',
            color: 'red'
        })
        reject();
    })
  })

}

export function adminEditUser (context, data) {
  console.log(data);
  const {id, name, rank} = data;
  return new Promise((resolve, reject) => {
    if (name !== "" && rank !== "") {
      axios({
        method: "PATCH",
        url: baseurl + `/admin/users/${id}/update`,
        data:{
          name, rank
        },
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('adminToken')
        }
      })
      .then(response => {
        if(response.status === 201){
          Notify.create({
              message: "User Edited Successfully.",
              color: 'blue'
          })
          resolve();
        }else{
            Notify.create({
                message: "Error editing user. Please retry.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
          context.dispatch("logout")
        }
        Notify.create({
            message: 'Error editing profile.',
            color: 'red'
        })
        reject();
      })
    }else{
      Notify.create({
        message: "Data fields cannot be empty.",
        color: 'red'
      })
      reject();
    }
  })
}

export function adminEditUserPassword (context, data) {
  console.log(data);
  const {id, newPassword, confirmNew} = data;
  return new Promise((resolve, reject) => {
    if ((newPassword === confirmNew) && (newPassword !== "" && confirmNew !== "")) {
      axios({
        method: "PATCH",
        url: baseurl + `/admin/users/${id}/password`,
        data:{
          newPassword
        },
        headers: {
          'Authorization': 'Bearer '+localStorage.getItem('adminToken')
        }
      })
      .then(response => {
        if(response.status === 201){
          Notify.create({
              message: "Password Changed Successfully.",
              color: 'blue'
          })
          resolve();
        }else{
            Notify.create({
                message: "Error changing password. Please retry.",
                color: 'red'
            })
            reject();
        }
      })
      .catch(err => {
        if(err.response?.status === 401){
          context.dispatch("logout")
        }
        Notify.create({
            message: 'Error changing password.',
            color: 'red'
        })
        reject();
      })
    }else{
      Notify.create({
        message: "Either the passwords either don't correlate or you have left a password field empty.",
        color: 'red'
      })
      reject();
    }
  })
}

export function saveComment (context, data) {
  // console.log(data)
  let { text, request }  = data;
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/user/metadata/'+request,
      data:{
        comment: text
      },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response)
      if(response.status === 201 || response.status === 200){
        Notify.create({
            message: "Comment Saved Successfully.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error Saving Comment. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error Saving Comment. Please retry.',
            color: 'red'
        })
        reject();
    })
  })
}

export function createDepartment (context, data) {
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/admin/dept/create',
      data:{
        name: data.name,
        abbr: data.abbr,
      },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "Department Created Successfully.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
            message: "Error creating Department. Please retry.",
            color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error Saving Comment. Please retry.',
            color: 'red'
        })
        reject();
    })
  })
}

export function getAllDepartmentsAdmin (context, data) {

  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/admin/dept',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201 || response.status === 200){
        let departments=response.data.data.reverse();
        context.commit('getAllDepartmentsAdmin', {departments})
        context.commit('getAllRawDepartments', {departments: response.data.data})
        resolve();
      }else{
          Notify.create({
              message: "Error fetching departments.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error fetching departments.',
            color: 'red'
        })
    })
  })

}

export function getAllUsersAdmin (context, data) {

  return new Promise((resolve, reject) => {
    // console.log('response');
    axios({
      method: "GET",
      url: baseurl + '/admin/users',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201 || response.status === 200){
        response = response.data.data;
        let usefulresponse = [];
        response.forEach(item=>{
          if(item.role !== "Admin"){
            usefulresponse.push(item)
          }
        })
        // console.log(usefulresponse);
        usefulresponse=usefulresponse.reverse();
        context.commit('getAllUsersAdmin', {users: usefulresponse})
        resolve();
      }else{
          Notify.create({
              message: "Error fetching Users.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
    context.dispatch("logout")
      }
        Notify.create({
            message: 'Error fetching Users.',
            color: 'red'
        })
    })
  })

}

export function getProfile (context, data) {
  // console.log(baseurl);
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl + '/user/user',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201 || response.status === 200){
          context.commit('getProfile', response.data.data)
          resolve();
      }else{
          Notify.create({
              message: "Error fetching logs.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
        Notify.create({
            message: 'Error fetching logs.',
            color: 'red'
        })
    })
  })
}

export function logout (context) {
  localStorage.clear();
}

export function editProfile (context, data) {
  // console.log(data);
  const { name, rank } = data;

  return new Promise((resolve, reject) => {
    axios({
      method: "PATCH",
      url: baseurl + '/user/profile/update',
      data: { name, rank },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "Profile updated successfully.",
            color: 'blue'
        })
        resolve();
      }else if(response.status === 401){
        context.dispatch("logout");
      }else{
          Notify.create({
            message: "Error editing profile.",
            color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
        Notify.create({
          message: 'Error editing profile.',
          color: 'red'
        })
        reject();
    })
  })

}

export function changePassword (context, data) {
  // console.log(data);
  const { oldPassword, newPassword, confirmPassword } = data;
  // console.log(oldPassword);
  // console.log(newPassword);
  // console.log(confirmPassword);

  return new Promise((resolve, reject) => {
    axios({
      method: "PATCH",
      url: baseurl + '/user/profile/password',
      data: { oldPassword, newPassword, confirmPassword },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
            message: "New password saved.",
            color: 'blue'
        })
        resolve();
      }else if(response.status === 401){
        context.dispatch("logout");
      }else{
          Notify.create({ message: "Error changing password.", color: 'red' })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: 'Error changing password.',
        color: 'red'
      })
      reject();
    })
  })

}

export function updateAvatar(context, data) {
  let { formData } = data;
  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/user/profile/avatar',
      data:formData,
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('userToken')
      }
    })
    .then(response => {
      if(response.status === 201){
        Notify.create({
          message: "Avatar successfully changed.",
          color: 'blue'
        })
        resolve();
      }else{
        Notify.create({
          message: "Error updating avatar.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: "Error updating avatar.",
        color: 'red'
      })
      reject();
    })
  })
}

export function fetchAdminMails(context, data){
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl+'/admin/mail',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201){
        context.commit('setAdminMails', {mails: response.data.data})
        resolve();
      }else if(response.status === 401){
        context.dispatch('logout');
      }else{
        Notify.create({
          message: "Error fetching admin's mails.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: "Error fetching admin's mails.",
        color: 'red'
      })
      reject();
    })
  })
}

export function fetchAdminSingleMail(context, data) {
  let {id} = data;
  return new Promise((resolve, reject) => {
    axios({
      method: "GET",
      url: baseurl+'/admin/mail/'+id,
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      console.log(response);
      if(response.status === 201){
        context.commit('setAdminSingleMail', {mail: response.data.data})
        resolve();
      }else if(response.status === 401){
        context.dispatch('logout');
      }else{
        Notify.create({
          message: "Error fetching mail.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: "Error fetching mail.",
        color: 'red'
      })
      reject();
    })
  })
}

export function adminDeleteUser (context, data) {
  let {id} = data;
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: baseurl+'/admin/users/'+id+'/delete',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201){
        resolve();
      }else if(response.status === 401){
        context.dispatch('logout');
        reject();
      }else{
        Notify.create({
          message: "Error deleting user.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: "Error deleting user.",
        color: 'red'
      })
      reject();
    })
  })
}

export function adminDeleteDept (context, data) {
  let {id} = data;
  return new Promise((resolve, reject) => {
    axios({
      method: "DELETE",
      url: baseurl+'/admin/dept/'+id+'/delete',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201){
        resolve();
      }else if(response.status === 401){
        context.dispatch('logout');
        reject();
      }else{
        Notify.create({
          message: "Error deleting depatment.",
          color: 'red'
        })
        reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
        message: "Error deleting department.",
        color: 'red'
      })
      reject();
    })
  })
}

export function sendAdminMail (context, data) {
  // const { to, text, reference, title } = data;
  // console.log(data);
  const { to, text, file, title } = data;

  return new Promise((resolve, reject) => {
    axios({
      method: "POST",
      url: baseurl + '/admin/mail',
      data: { to, text, file, title },
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('adminToken')
      }
    })
    .then(response => {
      // console.log(response);
      if(response.status === 201){
        Notify.create({
            message: "Mail successfully sent.",
            color: 'blue'
        })
        resolve();
      }else{
          Notify.create({
              message: "Error sending mail. Please retry.",
              color: 'red'
          })
          reject();
      }
    })
    .catch(err => {
      if(err.response?.status === 401){
        context.dispatch("logout")
      }
      Notify.create({
          message: 'Error sending mail. Please retry.',
          color: 'red'
      })
      reject();
    })
  })

}
