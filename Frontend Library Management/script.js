const URL =
  "https://crudcrud.com/api/dbbd1fca214547688740780b24f48758/bookData";

// function to display user data

const displayData = async () => {
  await axios
    // .get("http://localhost:4000/book/get-books")
    .get(URL)
    .then((res) => {
      const userDetails = res.data;
      console.log(userDetails);

      const ul = document.getElementById("bookData");
      ul.textContent = "";

      userDetails.forEach((data, index) => {
        const li = document.createElement("li");
        li.textContent = `Book Name: ${data.name}`;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Return Book";
        removeButton.onclick = () => deleteData(data._id); // rectify the id
        li.appendChild(removeButton);
        ul.appendChild(li);
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
  const newData = {
    name: document.getElementById("name").value,
    currentFine: currentFine,
  };
  console.log(newData);

  await axios
    .post(URL, newData)
    .then((res) => {
      displayData();
      // console.log(newData);
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });

  document.getElementById("name").value = "";
};

// function to delete user data
const ul = document.getElementById("removedData");
ul.textContent = "";
const deleteData = async (id) => {
  await axios.get(URL + "/" + `${id}`).then((res) => {
    const bookDetails = res.data;
    // console.log(bookDetails.name);

    const li = document.createElement("li");
    li.textContent = `Book Name: ${bookDetails.name} - Current Fine: ${bookDetails.currentFine}`;
    ul.appendChild(li);
  });

  axios
    // .delete(`http://localhost:4000/book/delete-book/${id}`)
    .delete(URL + "/" + `${id}`)
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
