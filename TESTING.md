# 🧪 Performance Testing & Verification Guide

## Immediate Testing Steps

### 1. **Clear Browser Cache & Refresh**

```bash
# Hard refresh to clear cache
Ctrl+Shift+R (Windows/Linux)
Cmd+Shift+R (Mac)
```

### 2. **Check DevTools Performance Tab**

1. Open DevTools (F12)
2. Go to **Performance** tab
3. Click **Record** button
4. Scroll down your website for 5 seconds
5. Click **Stop**
6. Analyze the graphs:
   - **Blue bars** = Rendering
   - **Green bars** = Painting
   - **Yellow/Red bars** = Heavy JavaScript

**Expected Results:**

- Most bars should be **green** (fast paint)
- FPS counter should show **59-60fps**
- No **red** or **long yellow** bars
- No jank or stuttering

---

## 3. **FPS Counter Testing**

### Method A: Chrome DevTools

1. DevTools → **More Tools** → **Rendering**
2. Check **FPS counter**
3. Scroll and observe
4. Should stay **60fps** consistently

### Method B: Firefox DevTools

1. DevTools → **Performance** → **Settings**
2. Enable **Show platform data**
3. Record scroll session
4. View Frame rate in graph

---

## 4. **Lighthouse Audit**

### Run Full Audit

1. DevTools → **Lighthouse** tab
2. Select **Desktop** or **Mobile**
3. Categories: Select all
4. Click **Analyze page load**

### Check These Metrics:

| Metric          | Target  | Why                      |
| --------------- | ------- | ------------------------ |
| **LCP**         | < 2.5s  | Largest Contentful Paint |
| **FID**         | < 100ms | First Input Delay        |
| **CLS**         | < 0.1   | Cumulative Layout Shift  |
| **Performance** | > 90    | Overall score            |

---

## 5. **Mobile Testing**

### Test on Real Device

1. Connect phone to computer
2. Enable USB Debugging
3. Go to `chrome://inspect` in Chrome
4. Select device and inspect
5. DevTools → Performance tab
6. Scroll and record

### Expected Behavior:

- ✅ Smooth scrolling on mid-range phones (iPhone SE, Pixel 4a)
- ✅ 50-60fps even with animations
- ✅ No stuttering or lag

---

## 6. **Scroll Performance Specific Tests**

### A. Scroll Reveal Animation Test

```javascript
// In browser console, run this to profile scroll reveals:
performance.mark("scroll-start");
// Scroll down slowly, watching animations trigger
performance.mark("scroll-end");
performance.measure("scroll-animation", "scroll-start", "scroll-end");
console.log(performance.getEntriesByName("scroll-animation"));
```

### B. Custom Cursor Performance Test

1. Move cursor around rapidly
2. Hover over links/buttons
3. Check if cursor follows smoothly
4. No lag or delay should be visible

### C. Spline 3D Performance Test

1. Go to Hero section
2. Observe initial load time (should be < 2s)
3. Scroll past and back
4. Should remain smooth

---

## 7. **Network Tab Testing**

### Check Asset Loading

1. DevTools → **Network** tab
2. Reload page
3. Look for:
   - ✅ Images have "lazy" loading
   - ✅ No large uncompressed assets
   - ✅ Total size < 5MB
   - ✅ LCP asset loads early

---

## 8. **Automated Performance Test**

Create `test/performance.test.ts`:

```typescript
import { test, expect, Page } from "@playwright/test";

test("scroll performance should be smooth", async ({ page }) => {
  await page.goto("http://localhost:5173");

  // Wait for page to fully load
  await page.waitForLoadState("networkidle");

  // Measure scroll performance
  const scrollMetrics = await page.evaluate(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const countFrames = () => {
      frameCount++;
      if (performance.now() - lastTime < 1000) {
        requestAnimationFrame(countFrames);
      }
    };

    requestAnimationFrame(countFrames);
    window.scrollBy(0, 1000);

    return { frameCount };
  });

  // FPS should be > 50 during scroll
  expect(scrollMetrics.frameCount).toBeGreaterThan(50);
});
```

Run with: `npm run test`

---

## 9. **Visual Regression Testing**

### Ensure No Styling Breaks

1. Take screenshot baseline:

```bash
npx playwright codegen http://localhost:5173
```

2. Compare after optimization:

```bash
npm run test
```

---

## 10. **Memory Leak Testing**

### Check for Memory Issues

1. DevTools → **Memory** tab
2. Take heap snapshot (baseline)
3. Scroll page up and down 10 times
4. Take another snapshot
5. Compare:
   - ✅ Memory should not accumulate
   - ✅ No unbounded growth
   - ✅ GC should clean up properly

---

## 11. **CPU Usage Testing**

### Monitor CPU during Scroll

1. DevTools → **Performance** tab
2. Record scroll
3. Check **Main Thread** graph:
   - ✅ Should mostly be idle
   - ✅ Small spikes only (< 50ms tasks)
   - ✅ No sustained high usage

---

## 12. **Common Issues & Fixes**

### Issue: Still Seeing Lag

**Diagnosis:**

1. Disable CustomCursor:
   ```tsx
   {
     /* <CustomCursor /> */
   }
   ```
2. If smooth: Cursor needs optimization
3. If still laggy: Check Spline or other heavy components

**Fix:**

- Reduce spring stiffness in cursor
- Lower Spline polygon count
- Enable GPU acceleration on all animated elements

### Issue: Scroll Feels Sluggish

**Diagnosis:**

1. Check if Lenis initialized correctly
2. Verify `duration: 1.2` is set
3. Check for scroll hijacking scripts

**Fix:**

```tsx
const lenis = new Lenis({
  duration: 1.2,
  smoothWheel: true,
  wheelMultiplier: 1,
});
```

### Issue: Animations Stutter on Mobile

**Diagnosis:**

1. Check if will-change is set
2. Verify transform is used (not top/left)
3. Check for inline styles causing thrashing

**Fix:**

- Use `will-change: transform, opacity` (sparingly)
- Use `transform: translate3d()` for GPU accel
- Profile with Android DevTools

---

## 13. **Production Deployment Check**

Before deploying to production:

```bash
# 1. Build for production
npm run build

# 2. Preview build locally
npm run preview

# 3. Run Lighthouse on production build
# (should match development performance)

# 4. Test on slower network
# DevTools → Network → Throttle: "Slow 4G"

# 5. Test on slow CPU
# DevTools → Performance → Throttle: "6x slowdown"
```

---

## 14. **Monitoring in Production**

### Use Web Vitals Library

```typescript
import { getCLS, getFID, getFCP, getLCP } from "web-vitals";

getCLS(console.log); // Layout shifts
getFID(console.log); // First interaction delay
getFCP(console.log); // First paint
getLCP(console.log); // Largest content paint
```

### Send to Analytics

```typescript
import { getCLS, getFID, getLCP } from "web-vitals";

getCLS((metric) => analytics.track("CLS", metric));
getFID((metric) => analytics.track("FID", metric));
getLCP((metric) => analytics.track("LCP", metric));
```

---

## 📊 Success Criteria

| Metric            | Before     | After   | Target       |
| ----------------- | ---------- | ------- | ------------ |
| Scroll FPS        | 45-50      | 59-60   | ✅ 60fps     |
| Scroll Delay      | Noticeable | None    | ✅ Instant   |
| LCP               | 3.5s       | < 2.5s  | ✅ Green     |
| CLS               | 0.15       | < 0.1   | ✅ Good      |
| FID               | 150ms      | < 100ms | ✅ Good      |
| Performance Score | 65         | > 90    | ✅ Excellent |

---

## ✅ Final Checklist

- [ ] Scroll feels buttery smooth (60fps)
- [ ] No jank or stuttering
- [ ] Custom cursor visible and responsive
- [ ] Animations play smoothly
- [ ] Mobile performance is good
- [ ] No console errors
- [ ] Lighthouse score > 90
- [ ] LCP < 2.5s
- [ ] CLS < 0.1
- [ ] Ready for production
