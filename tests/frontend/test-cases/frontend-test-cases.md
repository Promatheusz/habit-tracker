# Frontend Manual Test Cases

## TC-001 Dashboard Loading

Description:
Verify that the main dashboard loads correctly after opening the application.

Steps:

1. Start the application using Docker Compose.
2. Open http://localhost:3000.
3. Wait for the page to load.

Expected Result:
Dashboard is displayed without errors and all main UI sections are visible.

Priority:
High

---

## TC-002 Sidebar Visibility

Description:
Verify that the sidebar is displayed correctly on desktop devices.

Steps:

1. Open the application in desktop view.
2. Check the left side of the screen.

Expected Result:
Sidebar is visible and all navigation elements are displayed correctly.

Priority:
High

---

## TC-003 XP Progress Bar Display

Description:
Verify that the XP progress bar is rendered correctly.

Steps:

1. Open the dashboard.
2. Locate the XP section.

Expected Result:
Progress bar is visible and displays current XP progress.

Priority:
High

---

## TC-004 Task List Rendering

Description:
Verify that all tasks are displayed correctly.

Steps:

1. Open the dashboard.
2. Locate the task section.

Expected Result:
Task cards are displayed with proper titles and XP rewards.

Priority:
High

---

## TC-005 Task Completion Interaction

Description:
Verify that task completion functionality works correctly.

Steps:

1. Click the Complete button on a task.

Expected Result:
Task status changes to completed and UI updates correctly.

Priority:
High

---

## TC-006 Responsive Layout – Mobile

Description:
Verify that the application remains usable on mobile devices.

Steps:

1. Open browser developer tools.
2. Switch to mobile view (e.g. iPhone 12).
3. Refresh the page.

Expected Result:
No horizontal scrolling occurs and all content remains accessible.

Priority:
High

---

## TC-007 Responsive Layout – Tablet

Description:
Verify that the application layout adapts correctly to tablet screens.

Steps:

1. Switch to tablet view (e.g. iPad).
2. Inspect all major sections.

Expected Result:
Layout remains readable and properly aligned.

Priority:
Medium

---

## TC-008 Visual Consistency

Description:
Verify that styling is applied correctly.

Steps:

1. Review all visible UI components.

Expected Result:
Colors, spacing, typography and component alignment are consistent.

Priority:
Medium

---

## TC-009 Browser Console Validation

Description:
Verify that no frontend runtime errors occur.

Steps:

1. Open browser developer tools.
2. Navigate to Console tab.
3. Refresh the application.

Expected Result:
No critical JavaScript errors are present.

Priority:
High

---

## TC-010 Navigation Stability

Description:
Verify that all navigation elements respond correctly to user interaction.

Steps:

1. Click available navigation elements.
2. Observe UI behavior.

Expected Result:
Navigation elements respond without causing errors or layout issues.

Priority:
Medium
