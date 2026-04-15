/\*\*

- Image Optimization Best Practices
- Implement these to further improve performance
  \*/

// 1. LAZY LOAD IMAGES
// In your components, use native lazy loading:
// <img loading="lazy" src="image.jpg" alt="description" />

// 2. USE NEXT-GEN FORMATS
// Convert images to WebP with fallback:
// <picture>
// <source srcSet="image.webp" type="image/webp" />
// <img src="image.jpg" alt="description" />
// </picture>

// 3. RESPONSIVE IMAGES WITH SRCSET
// Serve different sizes for different devices:
// <img
// srcSet="small.jpg 480w, medium.jpg 768w, large.jpg 1440w"
// sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
// src="large.jpg"
// alt="description"
// />

// 4. USE IMAGE CDN
// Optimize delivery and transform on-the-fly:
// Example: Cloudinary, Imgix, Vercel Image Optimization
// <img src="https://mycdn.com/image.jpg?w=400&h=300&fit=cover" />

// 5. COMPONENT EXAMPLE: OptimizedImage.tsx
import React from "react";

interface OptimizedImageProps {
src: string;
alt: string;
width?: number;
height?: number;
placeholder?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
src,
alt,
width,
height,
placeholder,
}) => {
return (
<picture>
{/_ Next-gen format with CDN transform _/}
<source
srcSet={`${src}?fm=webp&w=${width || 800}&h=${height || 600}&fit=cover`}
type="image/webp"
/>

      {/* Fallback */}
      <img
        src={`${src}?w=${width || 800}&h=${height || 600}&fit=cover`}
        alt={alt}
        width={width}
        height={height}
        loading="lazy"
        decoding="async"
        style={{
          aspectRatio: width && height ? `${width}/${height}` : "auto",
          objectFit: "cover",
        }}
      />
    </picture>

);
};

// 6. SPLINE 3D OPTIMIZATION
// If using @splinetool/react-spline (Hero component):
// - Load with Suspense and fallback
// - Reduce polygon count in Spline project
// - Use lower LOD for mobile
// - Implement intersection observer to pause when off-screen

interface OptimizedSplineProps {
scene: string;
}

export const OptimizedSpline: React.FC<OptimizedSplineProps> = ({
scene,
}) => {
const [isVisible, setIsVisible] = React.useState(false);
const ref = React.useRef<HTMLDivElement>(null);

React.useEffect(() => {
const observer = new IntersectionObserver(([entry]) => {
setIsVisible(entry.isIntersecting);
});

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();

}, []);

if (!isVisible) {
return <div ref={ref} className="w-full h-full bg-secondary/30" />;
}

return (
<div ref={ref}>
<React.Suspense
fallback={<div className="w-full h-full bg-secondary/30" />} >
{/_ Spline component with lazy loading _/}
</React.Suspense>
</div>
);
};

// 7. PERFORMANCE METRICS FOR IMAGES
// Measure using Web Vitals:
// - Largest Contentful Paint (LCP) - Should be < 2.5s
// - Cumulative Layout Shift (CLS) - Should be < 0.1
// - First Input Delay (FID) - Should be < 100ms

// 8. USING WITH VITE
// Vite automatically optimizes images during build:
// import image from "./image.jpg?url";
// No extra config needed!

// 9. COMPRESSION TOOLS
// Before uploading images:
// - TinyPNG/TinyJPG - Lossless compression
// - ImageOptim - Batch processing
// - Squoosh - Web-based tool
// - ffmpeg - For video frame extraction

// 10. CHECKLIST
/_
✅ All images have alt text
✅ Images use srcSet for responsive sizes
✅ Images are compressed (< 100KB for thumbnails)
✅ Large images are lazy loaded
✅ Using WebP format with fallback
✅ Images have proper aspect ratio to prevent CLS
✅ No unnecessary images in critical path
✅ SVGs are inlined for icons
✅ Background images are optimized
✅ Spline scene is optimized
_/
