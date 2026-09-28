let reviews = JSON.parse(localStorage.getItem("bookReviews")) || [];


function addReview() {

    let bookName = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;
    let rating = document.getElementById("rating").value;
    let review = document.getElementById("review").value;

    if (
        bookName === "" ||
        author === "" ||
        rating === "" ||
        review === ""
    ) {
        alert("Please fill all fields!");
        return;
    }

    let newReview = {
        id: Date.now(),
        bookName: bookName,
        author: author,
        rating: Number(rating),
        review: review
    };

    reviews.push(newReview);

    localStorage.setItem(
        "bookReviews",
        JSON.stringify(reviews)
    );

    alert("Book review added successfully!");

    clearForm();

    displayReviews();
}


function displayReviews() {

    let list = document.getElementById("reviewList");

    let searchText =
        document.getElementById("search").value.toLowerCase();

    list.innerHTML = "";

    let filteredReviews = reviews.filter(function(item) {

        return item.bookName
            .toLowerCase()
            .includes(searchText);

    });


    filteredReviews.forEach(function(item) {

        let stars = "⭐".repeat(item.rating);

        list.innerHTML += `

            <div class="review-card">

                <h2>📖 ${item.bookName}</h2>

                <p>
                    <strong>Author:</strong>
                    ${item.author}
                </p>

                <div class="stars">
                    ${stars}
                </div>

                <p>
                    <strong>Review:</strong>
                    ${item.review}
                </p>

                <button
                    class="delete-btn"
                    onclick="deleteReview(${item.id})">

                    Delete Review

                </button>

            </div>

        `;
    });

    updateStats();
}


function deleteReview(id) {

    if (
        confirm("Are you sure you want to delete this review?")
    ) {

        reviews = reviews.filter(function(item) {

            return item.id !== id;

        });

        localStorage.setItem(
            "bookReviews",
            JSON.stringify(reviews)
        );

        displayReviews();
    }
}


function updateStats() {

    document.getElementById("totalBooks").innerText =
        reviews.length;


    if (reviews.length === 0) {

        document.getElementById("averageRating").innerText =
            "0";

        return;
    }


    let totalRating = reviews.reduce(
        function(sum, item) {

            return sum + item.rating;

        },
        0
    );


    let average =
        totalRating / reviews.length;


    document.getElementById("averageRating").innerText =
        average.toFixed(1) + " ⭐";
}


function clearForm() {

    document.getElementById("bookName").value = "";

    document.getElementById("author").value = "";

    document.getElementById("rating").value = "";

    document.getElementById("review").value = "";
}


displayReviews();
