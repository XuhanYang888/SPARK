// pdf_buttons.js - Handle PDF button switching functionality

document.addEventListener('DOMContentLoaded', function() {
  // Get all PDF buttons and content sections
  const pdfButtons = document.querySelectorAll('.pdf-btn');
  const pdfContents = document.querySelectorAll('.pdf-content');
  
  // Add click event listeners to each button
  pdfButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Get the target PDF ID from data attribute
      const targetPdf = this.getAttribute('data-pdf');
      
      // Remove active class from all buttons
      pdfButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Hide all PDF content sections
      pdfContents.forEach(content => {
        content.style.display = 'none';
      });
      
      // Show the target PDF content
      const targetContent = document.getElementById(`pdf-${targetPdf}`);
      if (targetContent) {
        targetContent.style.display = 'block';
      }
    });
  });
});