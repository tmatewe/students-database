let formAdd = document.querySelector("#formAdd");
let formUpdate = document.querySelector("#formUpdate");
let students = document.querySelector("#students");
let table = document.querySelector("table");
let edit = document.querySelector("#edit");
let importantId = document.querySelector("#importantId");
const tableUsers = document.querySelector(".table-users");
//dodal

// Get the modal

var modalAdd = document.getElementById("myModal");
var modalUpdate = document.getElementById("myModalUpdate");
// Get the button that opens the modal
var btnAdd = document.querySelector("#btnAdd");
// Get the <span> element that closes the modal
var spanAdd = document.querySelector(".close");
var spanUpdate = document.querySelector(".closeUpdate");

// When the user clicks the button, open the modal
btnAdd.addEventListener("click", () => {
  modalAdd.style.display = "block";
});

// When the user clicks on <span> (x), close the modal
spanAdd.addEventListener("click", () => {
  modalAdd.style.display = "none";
  (formAdd.name.value = ""),
    (formAdd.studentNo.value = ""),
    (formAdd.password.value = ""),
    (formAdd.amount.value = "");
});

spanUpdate.addEventListener("click", () => {
  modalUpdate.style.display = "none";
  (formUpdate.name.value = ""),
    (formUpdate.studentNo.value = ""),
    (formUpdate.password.value = ""),
    (formUpdate.amount.value = "");
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", (event) => {
  if (event.target == modalAdd) {
    modalAdd.style.display = "none";
    (form.name.value = ""),
      (form.studentNo.value = ""),
      (form.password.value = ""),
      (form.amount.value = "");
  }
});
window.addEventListener("click", (event) => {
  if (event.target == modalUpdate) {
    modalUpdate.style.display = "none";
    (form.name.value = ""),
      (form.studentNo.value = ""),
      (form.password.value = ""),
      (form.amount.value = "");
  }
});
//modal
formAdd.addEventListener("submit", (e) => {
  e.preventDefault();
  if (
    formAdd.name.value == !"" ||
    formAdd.studentNo.value !== "" ||
    formAdd.password.value !== "" ||
    formAdd.amount.value !== ""
  ) {
    db.collection("users")
      .add({
        //you can create an object the pass it here for example students={name:tawanda,password:mat@1999}
        name: formAdd.name.value,
        studentNo: formAdd.studentNo.value,
        password: formAdd.password.value,
        amount: formAdd.amount.value,
      })
      .then(function (docRef) {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    formAdd.name.value = "";
    formAdd.studentNo.value = "";
    formAdd.password.value = "";
    formAdd.amount.value = "";
    modalAdd.style.display = "none";
  } else {
    alert("No blanks allowed!!!");
  }
});

// db.collection("users")
//   .get()
//   .then((querySnapshot) => {
//     querySnapshot.docs.forEach((doc) => {
//       console.log(doc.id);
//       students.innerHTML += `<tr data-id=${change.doc.id}><td>${
//         doc.data().name
//       }</td><td>${change.doc.data().studentNo}</td><td>${
//         doc.data().password
//       }</td><td>R${
//         doc.data().amount
//       }</td><td><button class="btn btn-danger">delete</button><span class="btn btn-info">Edit</span></td></tr>`;
//       console.log(`${change.doc.id} => ${change.doc.data()}`);
//     });
//   });

// Real time listener
db.collection("users").onSnapshot((snapshot) => {
  snapshot.docChanges().forEach((change) => {
    if (change.type === "added") {
      students.innerHTML += `<tr data-id=${change.doc.id}><td>${
        change.doc.data().name
      }</td><td>${change.doc.data().studentNo}</td><td>${
        change.doc.data().password
      }</td><td>R${
        change.doc.data().amount
      }</td><td><button class="btn btn-outline-danger btn-sm">delete</button><span class="btn btn-outline-info btn-sm">Edit</span></td></tr>`;
      console.log(`${change.doc.id} => ${change.doc.data()}`);
    }
    if (change.type === "removed") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
    }
    if (change.type === "modified") {
      let tr = document.querySelector(`[data-id='${change.doc.id}']`);
      let tbody = tr.parentElement;
      tableUsers.removeChild(tbody);
      students.innerHTML += `<tr data-id=${change.doc.id}><td>${
        change.doc.data().name
      }</td><td>${change.doc.data().studentNo}</td><td>${
        change.doc.data().password
      }</td><td>R${
        change.doc.data().amount
      }</td><td><button class="btn btn-outline-danger btn-sm">delete</button><span class="btn btn-outline-info btn-sm">Edit</span></td></tr>`;
      console.log(`${change.doc.id} => ${change.doc.data()}`);
    }
  });
});

table.addEventListener("click", (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === "BUTTON") {
    const id = e.target.parentElement.parentElement.getAttribute("data-id");
    console.log(id);
    db.collection("users")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  }
  if (e.target.tagName === "SPAN") {
    const idEdit = e.target.parentElement.parentElement.getAttribute("data-id");
    console.log(idEdit);
    importantId.value = idEdit;
    db.collection("users")
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs.forEach((doc) => {
          if (idEdit === doc.id) {
            console.log(doc.data().name);
            formUpdate.name.value = doc.data().name;
            formUpdate.studentNo.value = doc.data().studentNo;
            formUpdate.password.value = doc.data().password;
            formUpdate.amount.value = doc.data().amount;
          }
        });
      });
    modalUpdate.style.display = "block";
  }
});

function editStudent(e) {
  e.preventDefault();
  console.log(importantId.value);
  db.collection("users")
    .doc(importantId.value)
    .update({
      name: formUpdate.name.value,
      studentNo: formUpdate.studentNo.value,
      password: formUpdate.password.value,
      amount: formUpdate.amount.value,
      capital: true,
    })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      console.error("Error updating document: ", error);
    });

  (formUpdate.name.value = ""),
    (formUpdate.studentNo.value = ""),
    (formUpdate.password.value = ""),
    (formUpdate.amount.value = "");
  modalUpdate.style.display = "none";
}

edit.addEventListener("click", editStudent);
