var firebaseConfig = {
    apiKey: "AIzaSyByhuSkrp_v68JY__Ws9QxTR4SGvckClr4",
    authDomain: "project1-19981.firebaseapp.com",
    projectId: "project1-19981",
    storageBucket: "project1-19981.appspot.com",
    messagingSenderId: "909773987193",
    appId: "1:909773987193:web:919ee5faf1cb165ffe23a8"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.database();

const username = prompt("Please Tell Us Your Name");

document.getElementById("message-form").addEventListener("submit", sendMessage);

function sendMessage(e) {
    e.preventDefault();

    // get values to be submitted
    const timestamp = Date.now();
    const messageInput = document.getElementById("message-input");
    const message = messageInput.value;

    // document.getElementById("message-form").addEventListener("submit", sendMessage);

    // clear the input box
    messageInput.value = "";

    //auto scroll to bottom
    document
        .getElementById("messages")
        .scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });

    // create db collection and send in the data
    db.ref("messages/" + timestamp).set({
        username,
        message,
    });
}

const fetchChat = db.ref("messages/");

fetchChat.on("child_added", function(snapshot) {
    const messages = snapshot.val();
    const message = `<li class=${
      username === messages.username ? "sent" : "receive"
    }><span>${messages.username}: </span>${messages.message}</li>`;
    // append the message on the page
    document.getElementById("messages").innerHTML += message;
});