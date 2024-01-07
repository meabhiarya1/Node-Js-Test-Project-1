// const URL =
//   "https://crudcrud.com/api/dbbd1fca214547688740780b24f48758/bookData";

// function to display user data

const displayData = async () => {
  await axios
    .get("http://localhost:4000/book/get-books")
    .then((res) => {
      const bookDetails = res.data;
      // console.log(bookDetails);

      const ul1 = document.getElementById("bookData");
      ul1.textContent = "";

      const ul2 = document.getElementById("removedData");
      ul2.textContent = "";

      bookDetails.forEach((data, index) => {
        if (data.bookValue === 1) {
          const formattedDate = new Date(data.createdAt).toLocaleDateString();
          const formattedTime = new Date(data.createdAt).toLocaleTimeString();
          const li = document.createElement("li");
          li.textContent = `Book Name: ${data.name} - Current Fine: ${data.currentFine} - Book Rent Time & Date: ${formattedTime} - ${formattedDate}   `;

          const removeButton = document.createElement("button");
          removeButton.textContent = "Return Book";
          removeButton.onclick = () => updateData(data);
          li.appendChild(removeButton);
          ul1.appendChild(li);
        } else {
          const returnTime = new Date();
          const li = document.createElement("li");
          li.textContent = `Book Name: ${data.name} - Current Fine: ${
            data.currentFine
          } - Book Return Time & Date: ${returnTime.toLocaleDateString()} ${returnTime.toLocaleTimeString()} `;
          ul2.appendChild(li);
        }
      });
    })
    .catch((err) => {
      console.log(err.data);
    });
};

// function to handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();

  let currentFine = 0;
  let bookValue = 1;

  const newData = {
    name: document.getElementById("name").value,
    currentFine: currentFine,
    bookValue: bookValue,
  };
  addData(newData);
  document.getElementById("name").value = "";
};

//function to add book data

const addData = async (data) => {
  await axios
    .post("http://localhost:4000/book/add-book", data)
    .then((res) => {
      displayData();
      // console.log(newData.bookValue);
      // console.log(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
};

// function to update book data

const updateData = async (data) => {
  const bookDetails = data;
  deleteData(data.id);

  const updatedData = {
    name: bookDetails.name,
    currentFine: bookDetails.currentFine,
    bookValue: 0,
  };
  // console.log(updatedData);
  addData(updatedData);
};

// function to delete user data

const deleteData = async (id) => {
  await axios
    .delete(`http://localhost:4000/book/delete-book/${id}`)
    .then((res) => {
      console.log(res.data);
      displayData();
    })
    .catch((err) => {
      console.log(err.data);
    });
  displayData();
};

// event listener for form submission
document.querySelector(".form").addEventListener("submit", handleSubmit);

// call displayData to show initial data
displayData();
