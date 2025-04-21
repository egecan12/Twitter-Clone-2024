# Twitter Clone 2024

<div align="center">

[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg)](https://twitter-clone-2024.onrender.com)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)

A simplified Twitter clone built with Node.js, Express, MongoDB, and Pug. Designed for educational purposes with user registration, login, tweeting, and like/dislike functionality.

<div align="center">
  <img src="https://github.com/egecan12/Twitter-Clone-2024/assets/45043515/ec6dface-791b-4d02-97fd-cfcc368f62bf" alt="Twitter Clone Screenshot" width="720"/>
</div>

</div>

## ✨ Key Features

- 📝 Post tweets with real-time rendering
- ❤️ Like/Dislike system
- 👤 User registration and authentication
- 🛡️ Secure password hashing with Argon2
- 📦 Session handling via Express-Session
- 🌐 Server-side rendering with Pug
- 🗃️ MongoDB database integration
- 🧪 Built for learning and experimentation

## 🚀 Quick Start

Visit [Twitter Clone 2024](https://twitter-clone-2024.onrender.com) to try it out live.

## 🛠️ Technology Stack

- **Node.js** – JavaScript runtime environment
- **Express** – Web framework for building server-side logic
- **MongoDB** – NoSQL database for storing user data and posts
- **Mongoose** – ODM for MongoDB and Node.js
- **Pug** – Template engine for server-side rendering
- **Argon2** – Modern, secure password hashing
- **Express-Session** – Session management middleware
- **Body-Parser** – Middleware to parse incoming request bodies
- **Dotenv** – Loads environment variables from `.env`

## ⚙️ Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/egecan12/Twitter-Clone-2024.git
   cd Twitter-Clone-2024
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following contents:
   ```
   SESSION_SECRET=your_secret_key
   DB_URL=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the app**
   ```bash
   npm start
   ```

> The app will run on the port specified in your `.env` file. For deployment, set the host to `0.0.0.0`.

## 🤝 Contributing

Contributions are welcome!  
Please follow the steps below:

```bash
git checkout -b feature/AmazingFeature
git commit -m "Add some AmazingFeature"
git push origin feature/AmazingFeature
```

Then open a **Pull Request**. Please ensure your code follows the existing code style.

## 👨‍💻 Author

Egecan Kahyaoglu  
- [GitHub](https://github.com/egecan12)  
- [LinkedIn](Your-LinkedIn-URL)

## 📝 License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.

---

<div align="center">
Made with 🐦 and ❤️ by Egecan Kahyaoglu
</div>
