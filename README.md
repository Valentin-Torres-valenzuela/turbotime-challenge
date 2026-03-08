# Notes Taking App Challenge

A high-quality, full-stack Notes/To-Do application built with a modern tech stack, designed to match a professional Figma design pixel-perfectly.

## 🚀 Tech Stack

- **Frontend**: [Next.js 15+](https://nextjs.org/) with [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS v4](https://tailwindcss.com/), and [Framer Motion](https://www.framer.com/motion/).
- **Backend**: [Django 5.0+](https://www.djangoproject.com/) with [Django REST Framework](https://www.django-rest-framework.org/).
- **Authentication**: JWT (JSON Web Tokens) using [SimpleJWT](https://django-rest-framework-simplejwt.readthedocs.io/).
- **Database**: SQLite (Development-ready).
- **Icons**: [Lucide React](https://lucide.dev/).
- **Forms**: [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/).

## ✨ Features

- **JWT Authentication**: Secure login and registration.
- **Category Management**: User-defined categories with specific colors.
- **Note CRUD**: Create, read, update, and delete notes with a charming UI.
- **Filtering & Search**: Real-time filtering by category and keyword search.
- **Design Excellence**: Pixel-perfect implementation of the Figma design, including custom serif fonts and a warm, premium color palette.
- **Clean Code**: Adheres to SOLID and DRY principles, using reusable components and scalable constants.

## 🛠️ Installation & Setup

### Prerequisites

- Python 3.12+
- Node.js 20+
- npm

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # Windows
   .\venv\Scripts\activate
   # Linux/macOS
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install Django==5.0.6 djangorestframework==3.15.2 djangorestframework-simplejwt==5.3.1 django-cors-headers==4.4.0 django-filter==24.2 Pillow==10.4.0
   ```
4. Run migrations:
   ```bash
   python manage.py migrate
   ```
5. Start the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env.local` file (optional, defaults to http://127.0.0.1:8000/api/):
   ```bash
   NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api/
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Backend
To run the Django unit tests:
```bash
cd backend
.\venv\Scripts\python.exe manage.py test api
```

## 📐 Design Tokens

- **Main Background**: `#FDF7F0`
- **Primary Text**: `#2D2D2D`
- **Serif Font**: DM Serif Display
- **Sans-Serif Font**: Outfit
- **Category Colors**: Teal (#8EB6AD), Yellow (#FEE29C), Orange (#F8B182), Green (#CBD6B3).

## 🤖 How I used AI in this project

I leveraged AI as a high-velocity collaborator to focus on architecture and pixel-perfect implementation rather than boilerplate.

* **Brainstorming & Architecture:** Used **Gemini** to validate the ERD (Entity Relationship Diagram) and ensure the Django-Next.js communication followed REST best practices.
* **Schema & Seeders:** Automated the generation of complex **Zod schemas** and Python data seeders to populate the development environment with realistic notes and categories instantly.
* **Efficiency with "Antigravity":** Utilized AI-assisted coding tools to handle repetitive styling patterns in Tailwind CSS and generate component boilerplates, allowing more time for custom Framer Motion animations.
* **Strict Self-Correction:** Every AI-generated snippet was cross-referenced with **official documentation**  to avoid "God Functions," ensuring the use of custom hooks and keeping the logic decoupled and testable.