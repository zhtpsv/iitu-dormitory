# 🏢 IITU Dormitory — Student Housing Management System

A web-based information system designed to automate student dormitory check-in, room/bed allocation, and housing management.


## 📋 Project Evaluation Criteria

### 1. Scope of Application
The system is designed for implementation at International IT University (IITU) and other higher education institutions across Kazakhstan. Primary user roles include:
* **Students:** Online application submission, interactive floor/room/bed selection, digital QR pass (SmartDorm Pass), and maintenance request dispatching.
* **Administration / Dorm Supervisors:** Real-time room inventory management, application approvals, analytics, and operational dashboards.
* **Parents:** Real-time residency status monitoring and fee payments via a dedicated Parent Pass token.

### 2. Problem Statement
* Over-reliance on manual paper forms and unintegrated Google Sheets.
* Lack of transparency in room allocation and specific bed assignments.
* Long queues and heavy administrative workload during peak check-in periods.
* Inefficient communication channels for handling maintenance issues (e.g., plumbing or electrical repairs).

### 3. Competitor Analysis
* **Enterprise Foreign Alternatives (StarRez, eRezLife):** Overly complex, expensive, and not adapted to Kazakhstani university regulations.
* **Local Solutions:** Often limited to simple online forms without real-time database synchronization or interactive room mapping.
* **Competitive Edge:** Full adaptation to local university workflows, bilingual interface support, cost-effectiveness, and interactive bed selection.

### 4. Risk Assessment
* High server load spikes during the initial days of housing application submission.
* User errors during personal data input.
* Initial learning curve for administrative staff adopting the new digital workflow.

### 5. Proposed Solution
An integrated web ecosystem that provides:
* A student portal featuring an interactive floor plan and bed reservation engine.
* An admin dashboard displaying occupancy analytics, debt tracking, and room status management.
* SmartDorm Pass (QR code authentication) and an integrated Helpdesk system for maintenance requests.


## 🛠 Technology Stack
* **Frontend:** React, TypeScript, React Router DOM
* **Styling & UI:** CSS Modules / Tailwind CSS / Bootstrap
* **Mock Data:** Structured JSON mock data demonstrating all core user workflows


## 📑 Getting Started

1. Clone the repository:
   ```bash
   git clone [https://github.com/zhtpsv/iitu-dormitory.git]

# 🌐 Live Demo
🔗 <a href="https://iitu-dormitory.vercel.app" target="_blank" rel="noopener noreferrer">Открыть рабочий сайт (в новом окне)</a>
