document.getElementById('reservationForm').addEventListener('submit', function(e) {
  e.preventDefault();

  const university = document.getElementById('university').value;
  const studentName = document.getElementById('studentName').value;
  const phone = document.getElementById('phone').value;
  const payment = document.getElementById('payment').value;
  const track = document.getElementById('track').value;
  const pickupPoint = document.getElementById('pickupPoint').value;

  // Basic validation
  if (!university || !studentName || !phone || !payment || !track || !pickupPoint) {
    alert('Please fill in all required fields.');
    return;
  }

  // Show success message
  alert('Reservation submitted successfully!\n\n' +
    'University: ' + university + '\n' +
    'Student Name: ' + studentName + '\n' +
    'Phone: ' + phone + '\n' +
    'Payment Type: ' + payment + '\n' +
    'Track: ' + track + '\n' +
    'Pickup Point: ' + pickupPoint);

  // In a real app, this data would be sent to a server or saved to a spreadsheet
  console.log('Reservation data:', {
    university, studentName, phone, payment, track, pickupPoint
  });
});

// Track selection enables pickup point selection
document.getElementById('track').addEventListener('change', function() {
  const pickupPointGroup = document.getElementById('pickupPointGroup');
  if (this.value) {
    pickupPointGroup.style.display = 'block';
  } else {
    pickupPointGroup.style.display = 'none';
  }
});

// Initialize pickup points based on track (sample data)
const pickupPoints = {
  'track-a': ['Suez Station', 'Downtown', 'University City'],
  'track-b': ['Galala Gate', 'New Suez', 'City Center']
};

document.getElementById('track').addEventListener('change', function() {
  const pickupPointSelect = document.getElementById('pickupPoint');
  pickupPointSelect.innerHTML = '<option value="" disabled selected>Select pickup point</option>';

  if (this.value && pickupPoints[this.value]) {
    pickupPoints[this.value].forEach(point => {
      const option = document.createElement('option');
      option.value = point;
      option.textContent = point;
      pickupPointSelect.appendChild(option);
    });
    document.getElementById('pickupPointGroup').style.display = 'block';
  } else {
    document.getElementById('pickupPointGroup').style.display = 'none';
  }
});

// Admin sign-in functionality
const ADMIN_PASSWORD = 'azha2026-admin';

document.getElementById('adminForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const password = document.getElementById('adminPassword').value;

  if (password === ADMIN_PASSWORD) {
    showAdminSheet();
  } else {
    alert('Incorrect admin password. Please try again.');
    document.getElementById('adminPassword').focus();
  }
});

// Admin sign-in button click
document.getElementById('adminSigninBtn').addEventListener('click', function() {
  document.getElementById('adminPassword').focus();
});

// Show admin data sheet
function showAdminSheet() {
  const adminSection = document.getElementById('admin');
  adminSection.style.display = 'block';

  // Hide the sign-in button and show signed-in state
  document.getElementById('adminSigninBtn').style.display = 'none';

  // Create the data sheet if not already created
  createAdminSheet();
}

// Create the admin data sheet
function createAdminSheet() {
  const container = document.querySelector('#admin .container');

  // Sample existing reservation data
  const existingData = [
    { student: 'Ahmed Hassan', university: 'Galala', pickup: 'Suez Station', status: 'Morning: Picked Up', returnStatus: 'Return: Not Returned', notes: 'First trip' },
    { student: 'Maryam Salah', university: 'Badr', pickup: 'Downtown', status: 'Morning: Picked Up', returnStatus: 'Return: Not Returned', notes: 'Subscribed student' },
    { student: 'Mohamed Ali', university: 'Russian', pickup: 'Galala Gate', status: 'Morning: Picked Up', returnStatus: 'Return: Not Returned', notes: 'New student' }
  ];

  const html = `
    <div class="admin-header">
      <h3>Reservation Data Sheet</h3>
      <button class="btn-small" onclick="window.print()">Print</button>
      <button class="btn-small" onclick="exportToCSV()">Export CSV</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Student Name</th>
          <th>University</th>
          <th>Track</th>
          <th>Pickup Point</th>
          <th>Morning Status</th>
          <th>Return Status</th>
          <th>Notes</th>
        </tr>
      </thead>
      <tbody>
  `;

  existingData.forEach(row => {
    html += `
      <tr>
        <td>${row.student}</td>
        <td>${row.university}</td>
        <td></td>
        <td>${row.pickup}</td>
        <td>${row.status}</td>
        <td>${row.returnStatus}</td>
        <td>${row.notes}</td>
      </tr>
    `;
  });

  html += `
      </tbody>
    </table>
    <h4>Add New Entry</h4>
    <form id="addEntryForm">
      <div class="form-group">
        <input type="text" id="newStudent" placeholder="Student name" required>
      </div>
      <div class="form-group">
        <select id="newUniversity" required>
        <option value="" disabled selected>University</option>
        <option value="galala">Galala University</option>
        <option value="badr">Badr University</option>
        <option value="russian">Russian University</option>
        <option value="suez">Suez University</option>
        </select>
      </div>
      <div class="form-group">
        <select id="newTrack" required>
        <option value="" disabled selected>Track</option>
        <option value="track-a">Track A</option>
        <option value="track-b">Track B</option>
        </select>
      </div>
      <div class="form-group">
        <select id="newPickup" required>
        <option value="" disabled selected>Pickup Point</option>
        </select>
      </div>
      <div class="form-group">
        <input type="text" id="newStatus" placeholder="Morning status (e.g., Picked Up)" required>
      </div>
      <div class="form-group">
        <input type="text" id="newReturnStatus" placeholder="Return status (e.g., Not Returned)" required>
      </div>
      <div class="form-group">
        <input type="text" id="newNotes" placeholder="Notes">
      </div>
      <button type="submit" class="btn">Add Entry</button>
    </form>
  `;

  container.innerHTML = html;

  // Setup pickup points based on track selection
  const pickupPoints = {
    'track-a': ['Suez Station', 'Downtown', 'University City'],
    'track-b': ['Galala Gate', 'New Suez', 'City Center']
  };

  const newTrackSelect = document.getElementById('newTrack');
  const newPickupSelect = document.getElementById('newPickup');

  newTrackSelect.addEventListener('change', function() {
    newPickupSelect.innerHTML = '<option value="" disabled selected>Pickup Point</option>';
    if (this.value && pickupPoints[this.value]) {
      pickupPoints[this.value].forEach(point => {
        const option = document.createElement('option');
        option.value = point;
        option.textContent = point;
        newPickupSelect.appendChild(option);
      });
    }
  });

  // Handle adding new entry
  document.getElementById('addEntryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const newStudent = document.getElementById('newStudent').value;
    const newUniversity = document.getElementById('newUniversity').value;
    const newTrack = document.getElementById('newTrack').value;
    const newPickup = document.getElementById('newPickup').value;
    const newStatus = document.getElementById('newStatus').value;
    const newReturnStatus = document.getElementById('newReturnStatus').value;
    const newNotes = document.getElementById('newNotes').value;

    if (newStudent && newUniversity && newTrack && newPickup && newStatus && newReturnStatus) {
      const newRow = [
        newStudent, newUniversity, newTrack, newPickup,
        `Morning: ${newStatus}`, `Return: ${newReturnStatus}`, newNotes || '-'
      ];

      const tbody = container.querySelector('tbody');
      const tr = document.createElement('tr');
      newRow.forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        tr.appendChild(td);
      });
      tbody.appendChild(tr);

      // Clear form
      document.getElementById('addEntryForm').reset();
      newPickupSelect.innerHTML = '<option value="" disabled selected>Pickup Point</option>';

      alert('New reservation entry added successfully!');
    } else {
      alert('Please fill in all required fields.');
    }
  });

  // CSV Export function
  window.exportToCSV = function() {
    const rows = container.querySelectorAll('tbody tr');
    let csv = 'Student Name,University,Track,Pickup Point,Morning Status,Return Status,Notes\n';

    rows.forEach(row => {
      const cells = row.querySelectorAll('td');
      const cellData = Array.from(cells).map(cell => {
        return `"${cell.textContent.replace(/"/g, '""')}"`;
      });
      csv += cellData.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'azha-reservations.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
}