import { db, set, ref, onValue, push } from "./firebase.js";

//#region

// const branch = ref(db, "/name");
// document.querySelector("#AddBtn").addEventListener("click", function () {
//   var inputVal = document.querySelector("#A").value;

//   set(branch, {
//     ad: inputVal,
//   });
// });

// onValue(branch, function (snapshot) {
//     console.log("firebase deki melumat oxundu", snapshot.val());
// })

//#endregion

//#region // onValue nan deyerleri dom elementlerine yazmaq
// let name = prompt("enter name")
// const branch = ref(db, `${name}`);
// var count = 0;

// document.querySelector("#A").addEventListener("click", function () {
//     count++;

//       set(branch, {
//         count
//       });
//     });

//     onValue(branch, function (snapshot) {
//         var obj = snapshot.val()
//         console.log(snapshot.val());
//         count = obj.count || 0;
//         document.querySelector("#count").innerHTML = count
//         })

//#endregion

//#region // push nan random key generate

// let name = prompt("enter name")
// const branch = ref(db, `/students/Nicat`);

// document.querySelector("#A").addEventListener("click", function () {

//   var ad = document.querySelector("#ad").value;
//   // set(branch, {
//   //   count,
//   // });
//   // Imethod / random key altinda telebeAdi key ---  value
//   // push(branch, {
//   //   telebeninAdi: ad
//   // })

//   //II method / random key --- value
//   // push(branch, ad)

//   // III method
//   var obj = push(branch);
//   set(obj, ad)
// });

// onValue(branch, function (snapshot) {
//   var obj = snapshot.val();

//   var ul = document.querySelector("#students");
//   ul.innerHTML = '';

//   for (let [key, name] of Object.entries(obj)) {
//     var li = document.createElement("li");
//     li.innerHTML = name;
//     li.dataset.key = key;
//     ul.append(li);

//     li.onclick= function() {
//       let key = this.dataset.key;

//       set(ref(db, `/students/Nicat/${key}`), this.innerHTML.toUpperCase())
//     }
//   }
// });

//#endregion

//#region //chat app

// $('#chat').scrollTop($('#chat').height())

var name = prompt("Enter your name");
$("#inp-form").on("submit", function (e) {
  e.preventDefault();
  const message = $("#message").val();

  var messagePush = push(ref(db, `/messages`));
  set(messagePush, [message, name]);

  // var key = messagePush.key

  $("#message").val("");
});

$("#chat").animate({ scrollTop: $("#chat").prop("scrollHeight") }, 1000);
$("#color").val("#ffffff");

onValue(ref(db, `/messages`), function (snap) {
  const messages = snap.val();
  $("#chat").html("");
  let inputColor = $("#color").val();

  for (let [key, value] of Object.entries(messages)) {
    const messageNode = $(`<div class='message-node' data-key=${key}>`);
    messageNode.html(value[1] + " - " + value[0]);
    if (value[1] == name) {
      messageNode.css({ background: `${inputColor}` });
    }

    $("#chat").append(messageNode);
  }
});

//#endregion
