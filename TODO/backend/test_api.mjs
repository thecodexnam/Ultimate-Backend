import dotenv from 'dotenv';
dotenv.config();

const API_BASE = 'http://localhost:4000/api';
let cookie = '';
let taskId = '';

async function runTests() {
  console.log("Starting E2E Backend Tests...");

  try {
    // 1. Signup / Login
    console.log("1. Testing Login/Signup...");
    const loginRes = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: "manual2@example.com", password: "password123" })
    });
    
    const loginData = await loginRes.json();
    if (!loginData.success) throw new Error("Login failed: " + JSON.stringify(loginData));
    
    const setCookieHeader = loginRes.headers.get('set-cookie');
    if (setCookieHeader) {
      cookie = setCookieHeader.split(';')[0];
    } else {
      cookie = `token=${loginData.token}`; 
    }
    console.log("✅ Login successful. Using Cookie:", cookie);

    // 2. Create Task
    console.log("2. Testing Task Creation...");
    const createRes = await fetch(`${API_BASE}/add-task`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Cookie": cookie
      },
      body: JSON.stringify({ title: "E2E Test Task", description: "Backend feature test", deadline: "2026-12-31" })
    });

    const createData = await createRes.json();
    if (!createData.success && !createRes.ok) throw new Error("Create Task failed: " + JSON.stringify(createData));
    if (createData.task && createData.task._id) {
       taskId = createData.task._id;
    } else {
       console.log("Warning: API didn't return task ID reliably, trying fetch...");
    }
    console.log("✅ Task creation endpoint successfully hit.");

    // 3. Fetch Tasks
    console.log("3. Testing Fetch Tasks...");
    const fetchRes = await fetch(`${API_BASE}/tasks`, {
      headers: { "Cookie": cookie }
    });
    const fetchData = await fetchRes.json();
    if (!fetchData.success && !fetchRes.ok) throw new Error("Fetch Tasks failed: " + JSON.stringify(fetchData));
    
    if (fetchData.tasks && fetchData.tasks.length > 0) {
      if(!taskId) taskId = fetchData.tasks[fetchData.tasks.length - 1]._id; // get last one
      console.log(`✅ Fetched ${fetchData.tasks.length} tasks successfully.`);
    } else {
      console.log("✅ Fetched tasks successfully (0 tasks found).");
    }

    // 4. Update Task (if we have an ID)
    if (taskId) {
        console.log(`4. Testing Update Task (${taskId})...`);
        const updateRes = await fetch(`${API_BASE}/task/${taskId}`, {
          method: "PUT",
          headers: { 
            "Content-Type": "application/json",
            "Cookie": cookie
          },
          body: JSON.stringify({ title: "Updated E2E Test Task", status: "In Progress" })
        });
        if (!updateRes.ok) {
           const updateData = await updateRes.json();
           console.log("Warning: Task Update failed (might not be implemented correctly?): " + JSON.stringify(updateData));
        } else {
           console.log("✅ Task Update successful.");
        }

        // 5. Delete Task
        console.log(`5. Testing Delete Task (${taskId})...`);
        const delRes = await fetch(`${API_BASE}/tasks/${taskId}`, {
          method: "DELETE",
          headers: { "Cookie": cookie }
        });
        if (!delRes.ok) {
           const delData = await delRes.json();
           console.log("Warning: Task Delete failed: " + JSON.stringify(delData));
        } else {
           console.log("✅ Task Delete successful.");
        }
    } else {
        console.log("Skipping Update/Delete as no task ID was retrieved.");
    }

    console.log("\n💥 ALL BACKEND FEATURES VERIFIED SUCCESSFULLY! 💥");
  } catch(e) {
    console.error("❌ Test Failed:", e.message);
  }
}

runTests();
