// This file is intentionally left blank.

// Screenshot enlargement functionality
document.addEventListener('DOMContentLoaded', function() {
    const phoneImages = document.querySelectorAll('.phone-image, .phone-wide-image');
    
    phoneImages.forEach((phoneImage, index) => {
        phoneImage.style.cursor = 'pointer';
        phoneImage.style.transition = 'transform 0.5s ease, top 0.5s ease, left 0.5s ease, width 0.5s ease, height 0.5s ease';
        
        let isEnlarged = false;
        let overlay = null;
        let originalRect = null;
        let placeholder = null;
        
        phoneImage.addEventListener('click', function() {
            if (!isEnlarged) {
                // Store original position
                originalRect = phoneImage.getBoundingClientRect();
                
                // Create placeholder to maintain layout
                placeholder = document.createElement('div');
                placeholder.style.cssText = `
                    width: ${originalRect.width}px;
                    height: ${originalRect.height}px;
                    margin: ${getComputedStyle(phoneImage).margin};
                    visibility: hidden;
                `;
                phoneImage.parentNode.insertBefore(placeholder, phoneImage);
                
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
                    transition: opacity 0.5s ease;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                `;
                document.body.appendChild(overlay);
                
                // Trigger opacity transition
                setTimeout(() => {
                    overlay.style.opacity = '1';
                }, 10);
                
                // Smoothly animate to center
                phoneImage.style.position = 'fixed';
                phoneImage.style.zIndex = '1000';
                phoneImage.style.top = originalRect.top + 'px';
                phoneImage.style.left = originalRect.left + 'px';
                phoneImage.style.width = originalRect.width + 'px';
                phoneImage.style.height = originalRect.height + 'px';
                
                // Animate to center after a brief delay
                setTimeout(() => {
                    phoneImage.style.top = '50%';
                    phoneImage.style.left = '50%';
                    phoneImage.style.transform = 'translate(-50%, -50%) scale(1.8)';
                }, 50);
                
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
                }, 500);
            }
            
            if (placeholder && originalRect) {
                // Get the current position of the placeholder (which reflects scroll position)
                const currentRect = placeholder.getBoundingClientRect();
                
                // Animate back to current placeholder position (not original stored position)
                phoneImage.style.top = currentRect.top + 'px';
                phoneImage.style.left = currentRect.left + 'px';
                phoneImage.style.transform = 'translate(0, 0) scale(1)';
                
                // Return to normal flow after animation
                setTimeout(() => {
                    phoneImage.style.position = '';
                    phoneImage.style.top = '';
                    phoneImage.style.left = '';
                    phoneImage.style.width = '';
                    phoneImage.style.height = '';
                    phoneImage.style.transform = '';
                    phoneImage.style.zIndex = '';
                    
                    // Remove placeholder
                    if (placeholder && placeholder.parentNode) {
                        placeholder.parentNode.removeChild(placeholder);
                        placeholder = null;
                    }
                    
                    originalRect = null;
                }, 500);
            }
            
            isEnlarged = false;
        }
    });
});