import { useEffect, useRef, useState } from 'react';
import { useScroll, useMotionValueEvent } from 'framer-motion';

export default function ImageSequence() {
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const frameCount = 75; // frames 00 to 74

  useEffect(() => {
    const loadedImages = [];
    let loadedCount = 0;
    
    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      const frameNum = i.toString().padStart(2, '0');
      img.src = `/sequnce/frame_${frameNum}_delay-0.066s.png`;
      
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          // Draw first frame once all are loaded
          drawFrame(0, loadedImages);
        }
      };
      // Fallback in case of error so it doesn't block indefinitely
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setImages(loadedImages);
          drawFrame(0, loadedImages);
        }
      };
      loadedImages.push(img);
    }
  }, []);

  const drawFrame = (index, imgs = images) => {
    if (!imgs[index] || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set internal resolution strictly to match displayed size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const img = imgs[index];
    if (!img.width) return; // Not fully loaded or error
    
    // Calculate dimensions for object-fit: cover
    const imgRatio = img.width / img.height;
    const canvasRatio = canvas.width / canvas.height;
    
    let drawWidth, drawHeight, offsetX, offsetY;
    
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      offsetX = 0;
      offsetY = (canvas.height - drawHeight) / 2;
    } else {
      drawWidth = canvas.height * imgRatio;
      drawHeight = canvas.height;
      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = 0;
    }
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    
    // Adding a dark overlay to blend with the dark theme and keep text readable
    ctx.fillStyle = 'rgba(10, 10, 26, 0.65)'; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const { scrollYProgress } = useScroll();
  
  // Update canvas when user scrolls
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (images.length === frameCount) {
      // mapping 0..1 to 0..74
      const frameIndex = Math.floor(latest * (frameCount - 1));
      drawFrame(frameIndex);
    }
  });

  // Redraw correctly when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (images.length === frameCount) {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollHeight > 0 ? Math.min(window.scrollY / scrollHeight, 1) : 0;
        const frameIndex = Math.floor(progress * (frameCount - 1));
        drawFrame(frameIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [images]);

  return (
    <canvas 
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0, // Make it visible above the body background
        pointerEvents: 'none'
      }}
    />
  );
}
