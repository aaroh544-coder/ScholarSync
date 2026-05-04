# ScholarSync
The Master Specification Prompt for Antigravity
Role: Senior Full-Stack Developer & UI/UX Specialist.
Project Name: "ScholarSync: Personalized Study Guard."
Objective: Develop a study-scheduling application that begins with a mandatory onboarding setup to calibrate "Cognitive Alarms." The app ensures students are mentally active by requiring them to solve level-appropriate puzzles to dismiss study alarms.

1. Mandatory First-Run Onboarding (Post-Download Flow)
Upon the very first launch, the app must prevent access to the dashboard until the following "Initial Setup" is completed:

Step 1: "Welcome to ScholarSync. Let's calibrate your experience. Where are you currently studying?"

Options: [School] or [College].

Step 2 (Conditional):

If School: "Which grade are you in?" (Dropdown: Grade 1 to Grade 12).

If College: "Which year are you in?" (Dropdown: 1st Year, 2nd Year, 3rd Year, 4th Year, or Post-Grad).

Step 3: "Set your daily goal." (Input for hours of study).

Logic: These answers must be saved to localStorage to define the difficulty of the Alarm Puzzle Engine.

2. UI/UX Design: "The Academic Focus"
Theme: Professional, clean, and minimalist. Use a "Focus-First" layout with plenty of white space and soft, calming colors (Blues and Greys).

Dashboard: Displays the "Current Study Streak," the next upcoming alarm, and a quick-toggle list of all scheduled sessions.

3. Core Functional Modules
The Smart Scheduler:

Allows users to Create, Edit, and Delete study blocks.

Individual Toggles: Every scheduled session has an On/Off switch for easy daily adjustments.

Global Toggle: A "Holiday/Break Mode" switch to silence all alarms without losing the schedule data.

The Puzzle-Gated Alarm:

When a study block starts, a persistent alarm sounds.

The "Gate": A full-screen puzzle modal appears. The user cannot silence the alarm until the puzzle is solved.

Content Logic:

School Users: Receive puzzles based on their grade (e.g., basic math, vocabulary, or logic patterns).

College Users: Receive higher-level puzzles (e.g., algebraic equations, logical fallacies, or academic terminology).

The Streak System:

A visual counter on the dashboard tracking consecutive days the user has successfully solved their study alarms.

Streak Freeze: If the "Global Toggle" is on (Holiday Mode), the streak is paused rather than broken.

4. Technical Implementation Details
Framework: React.js or Vue.js with Tailwind CSS.

State Management: Create a UserContext to store the onboarding data (School/College and Grade/Year).

Alarm Logic: Use a background worker or a persistent setTimeout loop that checks the system clock against the user's schedule.

Component Structure:

OnboardingModal: Handles the "First-Run" questions.

ScheduleList: Renders the alarms with their individual toggle switches.

PuzzleEngine: A library of questions filtered by the UserContext data.

5. Final Instruction for AI
"Generate the complete code for this application. Prioritize a seamless transition from the Onboarding questions to the main Dashboard. Ensure the 'School vs. College' logic is deeply integrated into the puzzle difficulty and that the UI feels like a modern, professional productivity tool."

Why this is the "Final Version":
Strict Onboarding: It forces the AI to build the "First-Run" logic you asked for.

Logic-Gated Difficulty: It ensures the puzzles are actually useful for the specific age group.

Clean Code: By removing all "hacker/terminal" keywords, the code generated will be much easier to maintain and more professional for a student-focused app.
