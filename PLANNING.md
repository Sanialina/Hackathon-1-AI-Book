# Project Planning Document

## 📍 Goals
1.  **Democratize Robotics Education:** Make advanced humanoid robotics accessible to software engineers.
2.  **Immersive Experience:** Create a UI that inspires users and reflects the futuristic nature of the subject matter.
3.  **AI-First Learning:** Integrate AI not just as a tool, but as a core tutor within the reading experience.

## 📚 Scope
### Included (MVP)
*   **Public Landing Page:** High-conversion, 3D aesthetic presentation.
*   **Authentication Flow:** User segmentation based on experience (Software vs. Hardware background).
*   **Dashboard:** Progress tracking and module navigation.
*   **Reader Interface:** Clean, focused reading environment with simulated AI summaries.
*   **Chatbot Interface:** Floating UI for RAG-based Q&A.
*   **Localization:** UI toggle for Urdu translation.

### Excluded (Out of Scope for MVP)
*   Real-time hardware connection (WebSerial).
*   Browser-based physics simulation (Simulations are currently screenshots/videos).
*   User-to-user forums.
*   Payment processing for premium content.

## 📅 Development Phases
1.  **Phase 1: Architecture & Design (Completed)**
    *   Setup React + Tailwind.
    *   Define Design System (Glassmorphism, Neon accents).
    *   Implement Routing and Layouts.

2.  **Phase 2: Core Features (Completed)**
    *   Build Authentication UI.
    *   Develop Sidebar Navigation & Module Structure.
    *   Implement Reader View & Placeholders.

3.  **Phase 3: AI & Interactivity (In Progress)**
    *   Connect Chatbot UI to Gemini API.
    *   Implement "Explain this code" context actions.
    *   Refine Urdu translation mappings.

4.  **Phase 4: Content Injection (Future)**
    *   Replace placeholders with real technical chapters (ROS 2, URDF, RL).

## ✅ Success Criteria
*   Users can navigate from Landing -> Signup -> Dashboard -> Chapter without error.
*   The UI feels "premium" and responsive across devices.
*   The Chatbot UI opens/closes and accepts input.
*   The "Translate to Urdu" feature instantly toggles UI text.
