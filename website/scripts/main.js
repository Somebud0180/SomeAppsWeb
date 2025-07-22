// This file is intentionally left blank.

// Screenshot enlargement functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneImage = document.querySelector('.phone-image');
    
    if (phoneImage) {
        phoneImage.style.cursor = 'pointer';
        phoneImage.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
        
        let isEnlarged = false;
        let overlay = null;
        
        phoneImage.addEventListener('click', function() {
            if (!isEnlarged) {
                // Create overlay background
                overlay = document.createElement('div');
                overlay.className = 'image-overlay';
                overlay.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.7);
                    backdrop-filter: blur(5px);
                    z-index: 999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                document.body.appendChild(overlay);
                
                // Trigger opacity transition
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // Enlarge the image
                phoneImage.style.transform = 'scale(1.8)';
                phoneImage.style.zIndex = '1000';
                phoneImage.style.position = 'relative';
                isEnlarged = true;
                
                // Close on overlay click
                overlay.addEventListener('click', closeEnlarged);
            } else {
                closeEnlarged();
            }
        });
        
        function closeEnlarged() {
            if (overlay) {
                overlay.style.opacity = '0';
                setTimeout(() => {
                    if (overlay && overlay.parentNode) {
                        overlay.parentNode.removeChild(overlay);
                    }
                    overlay = null;
                }, 300);
            }
            
            // Return to normal size
            phoneImage.style.transform = 'scale(1)';
            phoneImage.style.zIndex = '1';
            phoneImage.style.position = 'static';
            isEnlarged = false;
        }
    }
});