import { useEffect, useRef } from 'react';

const RainCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

  interface Drop {
    x: number;
    y: number;
    speed: number;
  }    
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Verificar si canvas es null antes de continuar
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let requestId: number;

    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    const drops: Drop[] = [];

    function createDrop() {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const speed = 1 + Math.random() * 2; // Velocidad de la gota
      drops.push({ x, y, speed });
    }

    function updateDrops() {
      drops.forEach(drop => {
        drop.y += drop.speed;
        if (drop.y > height) {
          drop.y = 0;
        }
      });
    }

    function drawDrops() {
        if (!ctx) return; // Guard clause para ctx
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = 'blue'; // Color de las gotas
      drops.forEach(drop => {
        ctx.beginPath();
        ctx.arc(drop.x, drop.y, 2, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function animate() {
      updateDrops();
      drawDrops();
      requestId = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(requestId);
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default RainCanvas;