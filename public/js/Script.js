// const ip = document.getElementById("ip");
// const save = document.getElementById("addtodo");
// const parent = document.getElementById("parent");

// // save.addEventListener("click", function()
// // {
// // console.log(ip.value);
// // ip.value="";
// // })

// save.addEventListener("click", function () {
//     if (ip.value) {
//          if (ip.hasAttribute("class")) {
//             ip.removeAttribute("class")
//          }

//         const value = ip.value;

//         const request = new XMLHttpRequest();

//         request.open("POST", "http://localhost:3000/todo");
//         request.setRequestHeader("content-type", "application/json")
//         request.send(JSON.stringify({ todo: value }));

//         request.addEventListener("load", function () {
//             if (request.status === 200) {
//                 ip.value = "";
//                 document.location.reload();
//             }
//             else {
//                 console.log("error occured");
//             }
//         })


//     }
//     else{
//         ip.setAttribute("class","redbg");
//     }
// })



// const getAllTodosRequest = new XMLHttpRequest();

// getAllTodosRequest.open("GET", "http://localhost:3000/todo");

// getAllTodosRequest.send();


// getAllTodosRequest.addEventListener("load", function () {
//     if (getAllTodosRequest.status === 200) {

//         var todos = JSON.parse(getAllTodosRequest.responseText);

//         todos.forEach(function (value) {

//             var ele = document.createElement("div");
//             ele.setAttribute("class", "formdiv")
//             var p = document.createElement("p");
//             var b = document.createElement("button");
//             b.setAttribute("class", "button")
//             p.innerText = value.text;
//             b.innerText = "X";
//             ele.appendChild(p);
//             ele.appendChild(b);


//             b.addEventListener("click", function () {
//                 parent.removeChild(ele);
//                 deletetodo(todos.indexOf(value));
//                 // console.log(todos.indexOf(value));


//             })

//             parent.appendChild(ele);

//         })

//     }
//     else {
//         console.log("error occured");
//     }
// })


// function deletetodo(index) {

//     const reqst = new XMLHttpRequest();

//     reqst.open("POST", "http://localhost:3000/dltodo");
//     reqst.setRequestHeader("content-type", "application/json")
//     reqst.send(JSON.stringify({ index: index }));

//     reqst.addEventListener("load", function () {
//         if (reqst.status === 200) {
//             document.location.reload();
//         }
//         else {
//             console.log("error occured");
//         }
//     })

// }