# System Architecture

## 🏗 High-Level Overview
The platform is built as a Single Page Application (SPA) designed for performance and interactivity. It mimics the feel of a native desktop application through the use of persistent layouts and smooth transitions.

## 💻 Frontend Layer
*   **Framework:** React 19
*   **Build Tool:** Vite (implied environment)
*   **Styling:** Tailwind CSS with custom configuration for colors (`brand-primary`, `brand-dark`) and animations (`float`, `pulse`).
*   **Icons:** Lucide React for consistent vector iconography.
*   **State Management:** React `useState` and `useEffect` for local UI state (Auth status, Language toggle, Navigation).

## 🧩 Component Structure
1.  **`App.tsx`:** The root orchestrator. Handles Routing (React Router) and global layout state.
2.  **`Navbar`:** Persistent top navigation. Handles Auth state display.
3.  **`Dashboard`:** The core protected view.
    *   **`Sidebar`:** Renders `BOOK_MODULES` recursively.
    *   **`Reader`:** Renders active chapter content.
    *   **`Chatbot`:** Floating widget for AI interaction.
4.  **`GlassCard` / `GlassButton`:** Reusable UI atoms implementing the glassmorphism design system.

## 🤖 AI Integration Layer
*   **Pattern:** RAG (Retrieval-Augmented Generation) - *Conceptual*.
*   **Interface:** The `Chatbot` component acts as the client interface.
*   **Model:** Google Gemini API.
*   **Flow:** User Query -> App Context (Current Chapter) -> API -> Streamed Response.

## 📂 Data Model
*   **Static Content:** Modules and Chapters are currently defined in `constants.ts` for speed and reliability during the hackathon phase.
*   **User Profile:** Defined in `types.ts` (`User`, `background` experience).

## 🔐 Security
*   **Authentication:** Currently simulated via local state for demonstration purposes.
*   **Route Protection:** Conditional rendering in `App.tsx` redirects unauthenticated users to the Login page.
