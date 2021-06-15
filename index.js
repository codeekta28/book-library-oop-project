console.log("This is index.js");
// Todos"
// 1. Store all the data to the localStorage
// 2. Give another column as an option to delete the book
// 3. Add a scroll bar to the view

let counter=0;
// collect Data class
class collectData {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}
// UI class
class UI {
    static displayBooks() {
        let storedBooks = Store.getItem();
        storedBooks.forEach((book) => {
            UI.addBookToList(book);
        })

    }
    static addBookToList(book) {
        let tbody = document.querySelector("#tableBody");
        let tRow = document.createElement("tr");
        tRow.innerHTML = `<td>${book.name}</td>
                          <td>${book.author}</td>
                          <td>${book.type}</td>  
                          <td><a href=""class="${counter} btn btn-danger btn-sm delete">X</a></td>`
        tbody.appendChild(tRow);
        counter++;
    }
    clearFields(){
        document.querySelector("#name").value="";
        document.querySelector("#author").value="";
    }
    showAlert(message,status){
        let msg = document.querySelector("#message");
         msg.className = `alert alert-${status}`;
         msg.innerHTML = message;
         setTimeout(() => {
             msg.style.display="none";
         }, 3000);
    }
    static delete(el){
      el.parentElement.parentElement.remove();
    }

}
// store data class
class Store {
    //  get Item
    static getItem() {
        let books;
        let getLocalStorageBooks = localStorage.getItem("books");
        if (getLocalStorageBooks == null) {
            books = [];
        } else {
            books = JSON.parse(getLocalStorageBooks)
        }
        return books
    }
    // add Item
    static addItem(book) {
        let books = Store.getItem();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))
    }
    static removeItem(index){
        let storedData = Store.getItem();
        storedData.splice(index,1)
        localStorage.setItem("books",JSON.stringify(storedData))
    }

}
// domContentLoaded event
document.addEventListener("DOMContentLoaded", UI.displayBooks())
// add Book event
document.querySelector("#libraryForm").addEventListener("submit", (e) => {
    e.preventDefault();
    let name = document.querySelector("#name").value;
    console.log(name);
    let author = document.querySelector("#author").value;
    let type;
    let fiction = document.querySelector("#fiction");
    let programming = document.querySelector("#programming");
    let cooking = document.querySelector("#cooking");
    if (fiction.checked) {
        type = fiction.value;
    } else if (programming.checked) {
        type = programming.value;
    } else if (cooking.checked) {
        type = cooking.value;
    }
    // instantiate the class
    let libraryDetail = new collectData(name, author, type);
    let UIDetail = new UI();
    if(name==""||author==""){
        UIDetail.showAlert("Dont Keep The Box Empty","danger")
    }else{
    //   add book in local storage
    Store.addItem(libraryDetail);
    // add book to UI
    UI.addBookToList(libraryDetail);
    UIDetail.showAlert("Row Added","success");
    // clearfields
    UIDetail.clearFields();
    }

})
// delete book event
document.querySelector(".table").addEventListener("click",(e)=>{
    e.preventDefault();
    let UIDetail = new UI();
    if(e.target.classList.contains("delete")){
        console.log("deleted");
        UI.delete(e.target);
    }
    let index = parseInt(e.target.className);
       Store.removeItem(index);
       UIDetail.showAlert("Row Removed","success")

})

// search Book Event
document.querySelector(".searchForm").addEventListener("submit",(e)=>{
 e.preventDefault();
 console.log("search");
 let searchValue = document.querySelector("#searchTxt").value;
 searchValue = searchValue.trim().toLowerCase();
 let tBody = document.querySelector("#tableBody");
 console.log(tBody);

})
