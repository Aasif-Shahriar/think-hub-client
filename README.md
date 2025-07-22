# 🗨️ Thinkhub - A Modern Developer Forum

## 🚀 Live Site

🔗 https://think-hub.netlify.app/

---

## 📖 Project Overview

**ThinkHub** is a full-stack, interactive developer forum built with the **MERN Stack** (MongoDB, Express.js, React, Node.js) and **Firebase** for authentication and user management. It allows users to share posts, comment, vote, and interact through a clean, responsive interface — all while maintaining a secure and scalable admin panel for moderation and control.

---

## 🔑 Key Features

### 🌐 General User
- 🔐 User Authentication (Email/Password & Google Login)
- 🧑 Browse Posts and Read Comments
- 🔎 Tag-based Search with Backend Filtering
- 🗳️ Vote on Posts (Upvote / Downvote with restrictions)
- 🏷️ Explore Tags & Popular Topics
- 📤 Social Share Buttons via React Share
- 📢 Real-time Announcements with Notification Badge
- 🔁 Pagination & Sorting by Popularity or Recency

### 🧑‍💻 Authenticated User
- 🪪 Earn Bronze Badge on Signup, Upgrade to Gold with Membership
- 🖼️ Create Posts (Limited to 5 without membership)
- 💬 Add Comments on Posts
- 🚩 Report Comments with Specific Feedback
- ✏️ Manage Own Posts & Comments (Delete if needed)
- 🛡️ Vote Restriction (Can't Upvote & Downvote same post)
- 📜 Customize "About Me" Section on Profile

### 🧑‍🏫 Admin Dashboard
- 👥 Manage All Users (Promote to Admin, Search by Name)
- 🚨 Moderate Reported Comments:
  - View reported comments with feedback
  - Dismiss reports (marks comment as reviewed without deletion)
  - Delete violating comments directly
- 📣 Post and Manage Announcements
- 📊 Admin Profile with Analytics (Pie Chart on user roles, membership, etc.)
- ➕ Add New Tags Dynamically for Post Categorization

---

## 🧩 Comment Reporting & Moderation System

Users can report any comment by selecting a reason (e.g., Spam, Offensive, Irrelevant). These reports are reviewed by Admins through the dashboard. Admins have the option to:
- **Dismiss** the report: Marks the comment as reviewed without deleting it.
- **Delete** the comment: Removes the comment and the associated report from the system.

This helps maintain content quality and allows transparent moderation.

---

## 🛡️ Authentication & Security

- 🔐 Firebase Authentication (Email/Password + Google)
- 🔒 Secure JWT (HttpOnly Cookies) for session handling
- 🧾 Firebase Admin SDK to validate tokens on backend
- 🧪 Route protection (for both users and admin)
- 🛡️ Role-based Access Control
- 🧼 CORS, Helmet, and Environment Security

---

## 📱 Responsive Design

Fully optimized for:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

---

## 🛠️ Technologies Used

### Frontend
- **React**
- **TailwindCSS + DaisyUI**
- **React Router**
- **React Hook Form**
- **Firebase Authentication**
- **@tanstack/react-query**
- **Axios (with secure interceptors)**
- **React Icons**
- **React Share**
- **Recharts**
- **React Select**

### Backend
- **Node.js + Express.js**
- **MongoDB**
- **Firebase Admin SDK**
- **JWT (HttpOnly cookie-based auth)**
- **CORS & Helmet for security**

---

## 📁 Folder Structure

