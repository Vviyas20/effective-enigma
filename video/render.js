// Render ospra-film.html to video, frame by frame.
// Usage: node render.js [fps] [outDir] [--stills t1,t2,...]
const path = require('path');
const { spawn } = require('child_process');
const { chromium } = require(path.join(require('child_process').execSync('npm root -g').toString().trim(), 'playwright'));

const args = process.argv.slice(2);
const stillsArg = args.indexOf('--stills');
const stills = stillsArg >= 0 ? args[stillsArg + 1].split(',').map(Number) : null;
const fps = Number(args[0]) || 30;
const outDir = args[1] || path.join(__dirname, 'dist');
const FFMPEG = process.env.FFMPEG || 'ffmpeg';

(async () => {
  require('fs').mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(__dirname, 'ospra-film.html') + '?capture');
  await page.evaluate(async () => {
    await Promise.all(['400 20px "Instrument Serif"', 'italic 400 20px "Instrument Serif"', '500 20px Inter', '600 20px Inter', '400 20px "DM Mono"'].map(f => document.fonts.load(f)));
    await document.fonts.ready;
    const missing = ['Instrument Serif', 'Inter', 'DM Mono'].filter(f => !document.fonts.check(`20px "${f}"`));
    if (missing.length) throw new Error('fonts not loaded: ' + missing);
  });
  await page.waitForTimeout(500);

  if (stills) {
    for (const t of stills) {
      await page.evaluate(t => window.OSPRA_FILM.render(t), t);
      await page.screenshot({ path: path.join(outDir, `still-${t}.jpg`), type: 'jpeg', quality: 90 });
    }
    await browser.close();
    return;
  }

  const total = await page.evaluate(() => window.OSPRA_FILM.TOTAL);
  const frames = Math.round(total * fps);
  const master = path.join(outDir, 'ospra-film.mp4');
  const ff = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', master], { stdio: ['pipe', 'inherit', 'inherit'] });

  for (let i = 0; i < frames; i++) {
    await page.evaluate(t => window.OSPRA_FILM.render(t), i / fps);
    const buf = await page.screenshot({ type: 'jpeg', quality: 95 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % (fps * 5) === 0) console.log(`frame ${i}/${frames}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
  console.log('wrote', master);
})();
