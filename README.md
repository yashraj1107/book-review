# Book Review API

This project is a RESTful API for managing books and their reviews. It allows users to register, log in, add books, retrieve book details, search for books, and submit/update/delete reviews for books.

[**Interactive API Manual: Book Review System**]([link-to-your-hosted-interactive-manual-here-if-available-otherwise-mention-the-local-html-file](https://book-review-89829.web.app/))


## 🚀 How to Run Locally

Follow these steps to get the API up and running on your local machine.

### Prerequisites

Before you start, make sure you have the following installed:

* **Node.js** (LTS version recommended)
* **npm** (comes with Node.js)
* **PostgreSQL** (database server)
* **Git**

### Setup Instructions

1.  **Clone the repository:**
    Open your terminal or command prompt and run:
    ```bash
    git clone [https://github.com/yashraj1107/book-review.git](https://github.com/yashraj1107/book-review.git)
    ```
    (Replace `yashraj1107` with your actual GitHub username if different, or use the repository URL you're using).

2.  **Navigate into the project directory:**
    ```bash
    cd book-review
    ```

3.  **Install dependencies:**
    This will install all required Node.js packages:
    ```bash
    npm install
    ```

4.  **Set up environment variables:**
    * Create a file named `.env` in the root of the project directory.
    * Copy the content from `.env.example` into your new `.env` file.
    * Update the `DATABASE_URL` with your PostgreSQL credentials (e.g., `postgresql://user:password@localhost:5432/bookreviewdb?sslmode=disable`).
    * Set a strong `JWT_SECRET` for authentication.

    Example `.env` file:
    ```
    PORT=5000
    DATABASE_URL="postgresql://your_user:your_password@localhost:5432/bookreviewdb?sslmode=disable"
    JWT_SECRET="super_secret_jwt_key_here"
    ```

5.  **Prepare your PostgreSQL database:**
    * Ensure your PostgreSQL server is running.
    * Create an empty database named `bookreviewdb` (or whatever you specified in `DATABASE_URL`). The application will automatically create the necessary tables (`users`, `books`, `reviews`) when it starts.

6.  **Start the server:**
    ```bash
    npm start
    ```
    The API should now be running locally, typically on `http://localhost:5000`.

## 📖 How to Access the API

For a detailed, step-by-step tutorial on how to interact with the API endpoints (including example requests and responses using tools like Postman or Bruno), please refer to the comprehensive API Manual:

*(If you were to host the interactive manual, you'd put its live URL above. Otherwise, you can point users to the local `api_manual.html` file you generated, e.g., "Open `api_manual.html` in your browser for detailed instructions.")*
