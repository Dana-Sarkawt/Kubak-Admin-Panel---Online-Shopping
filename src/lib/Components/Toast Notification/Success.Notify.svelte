<script>
 
 

function showNotification() {
  const toast = document.getElementById('toast');
  // @ts-ignore
  toast.classList.remove('hidden');

  // Hide the toast after a few seconds (e.g., 3000 milliseconds)
  setTimeout(() => {
    // @ts-ignore
    toast.classList.add('hidden');
  }, 3000);
}
  </script>
  
  <div class="popup" id="updatePopup">
    <!-- Your update item form goes here -->
    <button on:click={showNotification} class="bg-blue-500 text-white px-4 py-2 rounded">Update Item</button>
  </div>
  <div id="toast" class="hidden fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded">Item updated successfully!</div>