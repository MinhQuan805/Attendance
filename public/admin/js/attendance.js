document.addEventListener('DOMContentLoaded', function() {
  console.log('Attendance.js loaded');
  
  document.querySelectorAll('.attendance-cell').forEach(cell => {
    console.log('Found attendance cell:', cell);
    
    cell.addEventListener('click', async function() {
      console.log('Cell clicked:', this);
      
      const studentId = this.dataset.student;
      const courseId = this.dataset.course;
      const index = this.dataset.index;
      const currentStatus = this.dataset.status;
      
      console.log('Data:', { studentId, courseId, index, currentStatus });

      try {
        // Gửi request lên server
        const res = await fetch('/admin/update', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({studentId, courseId, index, currentStatus})
        });
        
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        
        const data = await res.json();
        console.log('Response data:', data);
        
        if (data.success) {
          this.textContent = data.newStatus;
          this.dataset.status = data.newStatus === 'Vắng' ? 'Absent' : 'Empty';
          if (data.newStatus === 'Vắng') {
            this.style.background = '#f8d7da';
          } 
          else {
            this.style.background = '';
          }
        }
        else {
          console.error('Server returned error:', data);
        }
      } catch (error) {
        console.error('Error updating attendance:', error);
        alert('Có lỗi xảy ra khi cập nhật điểm danh: ' + error.message);
      }
    });
  });
});
