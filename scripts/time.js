document.addEventListener('DOMContentLoaded', function() {
    if(mobile) {
        return;
    }
    const clock = document.getElementById('time');
    
    function updateClock() {
        const now = new Date();
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        const day = days[now.getDay()];
        const date = now.getDate();
        const month = months[now.getMonth()];
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const formattedTime = `${day} ${date} ${month} ${hours}:${minutes}:${seconds}`;
        clock.innerHTML = formattedTime;
    }
    
    setInterval(updateClock, 1000);
    updateClock();
});