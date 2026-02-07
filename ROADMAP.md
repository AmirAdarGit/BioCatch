# Project Roadmap

## 🎨 CLIENT-SIDE TASKS

### Setup & Structure
- **Task 1.1:** Initialize React project (using Vite)
- **Task 1.2:** Set up project folder structure
- **Task 1.3:** Install required dependencies (React Router, UUID generator)
- **Task 1.4:** Create basic routing structure

### SDK Integration
- **Task 2.1:** Load the external SDK script (`https://bcdn-4ff4f23f.we-stats.com/scripts/4ff4f23f/4ff4f23f.js`)
- **Task 2.2:** Initialize SDK when app loads
- **Task 2.3:** Generate and manage CSID (Customer Session ID)
- **Task 2.4:** Implement `cdApi.setCustomerSessionId()` functionality
- **Task 2.5:** Implement `cdApi.changeContext()` for each screen/view

### UI Components & Pages
- **Task 3.1:** Create Home page component
- **Task 3.2:** Create Login page component
- **Task 3.3:** Create Account Overview page component
- **Task 3.4:** Create Make Payment page component
- **Task 3.5:** Implement Logout functionality
- **Task 3.6:** Add navigation between pages
- **Task 3.7:** Add basic styling (CSS)

### API Integration (Frontend)
- **Task 4.1:** Create API service/helper functions
- **Task 4.2:** Implement Login button → trigger "init" API call
- **Task 4.3:** Implement Make Payment button → trigger "getScore" API call
- **Task 4.4:** Handle API responses and display status
- **Task 4.5:** Add error handling for failed API calls
- **Task 4.6:** Add loading states for API calls

### Testing & Validation
- **Task 5.1:** Test SDK loading in browser DevTools
- **Task 5.2:** Verify CSID persistence during session
- **Task 5.3:** Verify context changes in console/network tab
- **Task 5.4:** Test complete user journey flow
- **Task 5.5:** Test CSID regeneration after logout

---

## 🖥️ SERVER-SIDE TASKS

### Setup & Structure
- **Task 1.1:** Initialize Node.js/Express project
- **Task 1.2:** Set up project folder structure
- **Task 1.3:** Install required dependencies (Express, CORS, body-parser)
- **Task 1.4:** Create server entry point (`server.js`)

### API Endpoints
- **Task 2.1:** Create POST `/api/init` endpoint
- **Task 2.2:** Create POST `/api/getScore` endpoint
- **Task 2.3:** Set up CORS to allow client requests
- **Task 2.4:** Add request body validation

### Business Logic
- **Task 3.1:** Implement init endpoint logic  
  - Receive CSID, activityType, uuid, brand, solution, iam  
  - Return mock response with attempt, id, request_id, status
- **Task 3.2:** Implement getScore endpoint logic  
  - Receive CSID and other parameters  
  - Return mock scoring response
- **Task 3.3:** Store/log received requests (optional, for debugging)
- **Task 3.4:** Generate random UUIDs for response fields

### Response Handling
- **Task 4.1:** Create response format for init (HTTP 200 with JSON)
- **Task 4.2:** Create response format for getScore (HTTP 200 with JSON)
- **Task 4.3:** Add proper HTTP status codes
- **Task 4.4:** Add response headers (Content-Type: application/json)

### Testing & Validation
- **Task 5.1:** Test endpoints with Postman/curl
- **Task 5.2:** Verify CORS configuration
- **Task 5.3:** Test with missing/invalid parameters
- **Task 5.4:** Add console logging for debugging
- **Task 5.5:** Test integration with frontend

### Deployment Preparation
- **Task 6.1:** Add environment variables (`.env` file)
- **Task 6.2:** Configure port settings
- **Task 6.3:** Add start scripts to `package.json`
- **Task 6.4:** Create basic health check endpoint

---

## 📦 INTEGRATION & DELIVERABLES

### Integration Testing
- **Task 1:** Run both client and server locally
- **Task 2:** Test complete flow: Home → Login → Account → Payment → Logout
- **Task 3:** Verify API calls in browser Network tab
- **Task 4:** Verify responses in console

### Documentation
- **Task 5:** Create README.md with:
  - Project overview
  - How to run client
  - How to run server
  - Architecture explanation
- **Task 6:** Take screenshots showing:
  - SDK loaded
  - CSID usage
  - Context changes
  - API requests & responses
- **Task 7:** Optional: Record short demo video

### GitHub
- **Task 8:** Create `.gitignore` file
- **Task 9:** Initialize Git repository
- **Task 10:** Push to GitHub
- **Task 11:** Add proper commit messages
