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
          const rentedDate = new Date(data.createdAt).toLocaleDateString();
          const rentedTime = new Date(data.createdAt).toLocaleTimeString();

          const formattedTime = new Date(data.createdAt);
          formattedTime.setHours(formattedTime.getHours() + 1);
          const returnTime = formattedTime.toLocaleTimeString();
          // console.log(returnTime)

          const timeDifference = getTimeAgo(data.createdAt);
          // console.log(timeDifference)

          if (timeDifference > 0) {
            data.currentFine += timeDifference * 10;
            console.log(data.currentFine);
          }

          const li = document.createElement("li");
          li.textContent = `Book Name: ${data.name} - Current Fine: ${data.currentFine} - Book Rent Time & Date: ${rentedTime} - ${rentedDate} - Return Date & Time: ${rentedDate} - ${returnTime} `;

          const removeButton = document.createElement("button");
          removeButton.textContent = "Return Book";
          removeButton.onclick = () => payFine(data);
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

const getTimeAgo = (createdAt) => {
  const localTime = new Date(); /* string to date object*/
  const createdDate = new Date(createdAt);

  const timeDifference = localTime - createdDate;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours >= 24) {
    return createdDate.toLocaleString(); // If more than 24 hours, return the full date and time
  } else if (hours > 0) {
    return hours;
  }
};

const payFine = async (data) => {
  // console.log(data);
  const popup = document.getElementById("popup");
  const payFineButton = document.getElementById("pay-fine");
  popup.style.display = "block";

  document.getElementById("fine-amount").value = data.currentFine;

  // Add an event listener to the Pay Fine button to handle payment logic
  payFineButton.addEventListener("click", async () => {
    // Get the hardcoded fine amount from the disabled input field
    console.log("Processing payment of:", data.currentFine);
    // Simulate payment processing (replace with your actual payment logic)
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay

    popup.style.display = "none";
    await updateData(data); // Call updateData after payment completion
  });
};

// function to update book data

const updateData = async (data) => {
  const bookDetails = { ...data };
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
