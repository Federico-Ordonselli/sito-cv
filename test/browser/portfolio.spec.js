import { test, expect } from '@playwright/test';
import { getContent } from '../../src/data/content.js';

test('homepage renders, interactive demo works and layout stays within the viewport', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
  const response = await page.goto('/');
  expect(response.status()).toBe(200);
  expect(response.headers()['content-security-policy']).toContain("'nonce-");
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your next');
  await expect(page.locator('.featured-project')).toHaveCount(3);
  await page.getByRole('button', { name: 'Explore', exact: true }).click();
  await expect(page.locator('.preview-explore')).toBeVisible();
  await expect(page.locator('.explore-switcher strong')).toHaveText('Dolomites');
  await page.getByRole('button', { name: 'Next destination', exact: true }).click();
  await expect(page.locator('.explore-switcher strong')).toHaveText('Iceland');
  await page.getByRole('button', { name: 'Previous destination', exact: true }).click();
  await expect(page.locator('.explore-switcher strong')).toHaveText('Dolomites');
  await page.getByRole('button', { name: 'Mix', exact: true }).click();
  await expect(page.locator('.preview-mix')).toBeVisible();
  await page.getByRole('button', { name: 'Expedition', exact: true }).click();
  await expect(page.locator('.mix-location')).toContainText('Iceland');
  await page.getByRole('button', { name: /Details/ }).click();
  await expect(page.locator('#mix-trip-details')).toContainText('28 km');
  await expect(page.getByRole('button', { name: /Details/ })).toHaveAttribute('aria-expanded', 'true');
  await page.getByRole('button', { name: 'Compact preview' }).click();
  await expect(page.locator('.lab-canvas')).toHaveClass(/lab-compact/);
  await page.getByRole('button', { name: /Save this inspiration/ }).click();
  await expect(page.getByRole('status')).toContainText('Inspiration saved');
  await page.getByRole('button', { name: /Added to your ideas/ }).click();
  await expect(page.getByRole('status')).toBeEmpty();
  await page.getByRole('button', { name: 'Compact preview' }).click();
  for (const name of ['Explore', 'Mix', 'Minimal']) {
    await page.getByRole('button', { name, exact: true }).click();
    await page.locator('.interface-lab img').evaluateAll(images => Promise.all(images.map(img => img.decode())));
    await page.locator('.interface-lab').screenshot({ path: testInfo.outputPath(`demo-${name}.png`), animations: 'disabled' });
    await page.getByRole('button', { name: 'Compact preview' }).click();
    expect(await page.locator('.demo-template').evaluate(el => el.scrollWidth <= el.clientWidth + 1)).toBe(true);
    await page.locator('.interface-lab').screenshot({ path: testInfo.outputPath(`demo-${name}-compact.png`), animations: 'disabled' });
    await page.getByRole('button', { name: 'Compact preview' }).click();
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('homepage.png'), fullPage: true, animations: 'disabled' });
  await page.screenshot({ path: testInfo.outputPath('hero.png'), animations: 'disabled' });
  expect(errors).toEqual([]);
});

test('existing project cards, certificates and downloads survive migration', async ({ page, request }) => {
  const data = getContent('en');
  await page.goto('/projects');
  await expect(page.locator('.card')).toHaveCount(Object.values(data.projects).flat().length);
  for (const project of Object.values(data.projects).flat()) await expect(page.getByRole('heading', { name: project.title, exact: true })).toBeVisible();
  await page.goto('/hobbies');
  await expect(page.locator('.card')).toHaveCount(data.hobbies.length);
  await page.goto('/certifications');
  await expect(page.locator('.cert-card')).toHaveCount(data.certifications.flatMap(group => group.items).length);
  await page.locator('.cert-card').first().click();
  await expect(page.locator('iframe[title="CompTIA Security+ (ce)"]')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.locator('iframe')).toHaveCount(0);
  for (const path of ['/cv/Ordonselli_CV_IT.pdf', '/cv/Ordonselli_CV_EN.pdf', '/certs/comptia-security-plus.pdf']) {
    const response = await request.get(path);
    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/pdf');
  }
});

test('language persists between routes and after reload', async ({ page }, testInfo) => {
  await page.goto('/');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your next');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('button', { name: 'Italiano', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Il tuo prossimo');
  await page.getByRole('navigation').getByRole('link', { name: 'Chi sono', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chi sono');
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'it');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Chi sono');
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Il tuo prossimo');
  if (testInfo.project.name === 'mobile') await page.getByRole('button', { name: 'Apri menu' }).click();
  await page.getByRole('button', { name: 'English', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Your next');
});

test('project anchors, technology routes, old hash URLs and missing pages work', async ({ page }) => {
  await page.goto('/');
  await page.locator('.featured-project').first().click();
  await expect(page).toHaveURL(/\/projects#runebog-gm$/);
  await expect(page.locator('#runebog-gm')).toBeInViewport();
  await page.goto('/');
  await page.locator('.expertise-row').first().click();
  await expect(page).toHaveURL(/\/competenze\/frontend$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Interfaces that feel right.');
  for (const slug of ['integrazioni', 'backend']) {
    const response = await page.goto('/competenze/' + slug);
    expect(response.status()).toBe(200);
    await expect(page.locator('.detail-projects > div')).not.toHaveCount(0);
  }
  await page.goto('/#/certifications');
  await expect(page).toHaveURL(/\/certifications$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Certifications');
  const missing = await page.goto('/competenze/missing');
  expect(missing.status()).toBe(404);
  await expect(page.getByRole('link', { name: /Back to the homepage/ })).toBeVisible();
});

test('Matchday case study is linked from the homepage and project card', async ({ page }, testInfo) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/');
  await page.locator('.featured-project').nth(2).click();
  await expect(page).toHaveURL(/\/projects\/matchday$/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Matchday');
  await expect(page.getByRole('link', { name: /Source code on GitLab/ })).toHaveAttribute('href', 'https://gitlab.com/Federico-Ordonselli/matchday');
  await expect(page.getByRole('link', { name: /Open the demo/ })).toHaveAttribute('href', 'https://matchday-web-plum.vercel.app/');
  const shots = page.locator('.case-shots img');
  await expect(shots).toHaveCount(3);
  await shots.last().scrollIntoViewIfNeeded();
  await shots.evaluateAll(images => Promise.all(images.map(img => img.decode())));
  expect(await shots.evaluateAll(images => images.every(img => img.naturalWidth > 0))).toBe(true);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
  await page.screenshot({ path: testInfo.outputPath('matchday.png'), fullPage: true, animations: 'disabled' });
  await page.goto('/projects');
  await page.locator('#matchday').click();
  await expect(page).toHaveURL(/\/projects\/matchday$/);
  const missing = await page.goto('/projects/missing');
  expect(missing.status()).toBe(404);
  expect(errors).toEqual([]);
});

test('mobile menu supports dismissal and narrow screens do not overflow', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== 'mobile');
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Open menu' });
  await menu.click();
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('navigation')).toBeHidden();
  await expect(menu).toBeFocused();
  for (const width of [320, 390, 768]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  }
  await page.emulateMedia({ reducedMotion: 'reduce' });
  expect(await page.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior)).toBe('auto');
});

test('toolkit scrolls, emphasises the centre and supports pause and reduced motion', async ({ page }, testInfo) => {
  await page.goto('/');
  const viewport = page.locator('.toolkit-viewport');
  const track = page.locator('.toolkit-track');
  await viewport.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(viewport).toHaveAttribute('data-animated', 'true');
  await expect(page.getByRole('img', { name: 'WordPress', exact: true })).toHaveCount(1);
  await expect(page.getByRole('img', { name: 'NeonDB', exact: true })).toHaveCount(1);
  const transform = await track.evaluate(el => el.style.transform);
  await expect.poll(() => track.evaluate(el => el.style.transform)).not.toBe(transform);

  await page.getByRole('button', { name: 'Pause toolkit scrolling' }).click();
  await expect(page.getByRole('button', { name: 'Resume toolkit scrolling' })).toBeVisible();
  const stopped = await track.evaluate(el => el.style.transform);
  // Observe several animation frames: pause must stop the track, not only change the control.
  const later = await track.evaluate(el => new Promise(resolve => {
    let frames = 0;
    function sample() {
      if (++frames === 8) resolve(el.style.transform);
      else requestAnimationFrame(sample);
    }
    requestAnimationFrame(sample);
  }));
  expect(later).toBe(stopped);
  const sizes = await viewport.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return [...el.querySelectorAll('.toolkit-icon')].map(icon => {
      const rect = icon.getBoundingClientRect();
      return { distance: Math.abs(rect.x + rect.width / 2 - (bounds.x + bounds.width / 2)), size: rect.width };
    }).sort((a, b) => a.distance - b.distance);
  });
  expect(sizes[0].size).toBeGreaterThan(sizes.find(item => item.distance > 150).size * 1.1);
  await page.getByRole('button', { name: 'Resume toolkit scrolling' }).click();
  await expect.poll(() => track.evaluate(el => el.style.transform)).not.toBe(stopped);

  // Select a visible icon, including either copy of the seamless loop.
  const choiceIndex = await viewport.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    return [...el.querySelectorAll('.toolkit-choice')].findIndex(button => {
      const box = button.getBoundingClientRect();
      return box.left > bounds.left + 10 && box.right < bounds.right - 10;
    });
  });
  const choice = viewport.locator('.toolkit-choice').nth(choiceIndex);
  const selectedName = await choice.locator('.toolkit-label').textContent();
  // A real tap/click can target the moving ribbon; locator.click waits for it to stop.
  const box = await choice.boundingBox();
  if (testInfo.project.name === 'mobile') await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  else await page.mouse.click(box.x + box.width / 2, box.y + box.height / 2);
  await expect(page.getByRole('button', { name: 'Resume toolkit scrolling' })).toBeVisible();
  const centreName = () => viewport.evaluate(el => {
    const bounds = el.getBoundingClientRect();
    const choices = [...el.querySelectorAll('.toolkit-choice')].map(button => {
      const box = button.getBoundingClientRect();
      return { distance: Math.abs(box.left + box.width / 2 - (bounds.left + bounds.width / 2)), button };
    }).sort((a, b) => a.distance - b.distance);
    return { name: choices[0].button.textContent, distance: choices[0].distance };
  });
  await expect.poll(async () => (await centreName()).distance).toBeLessThan(1);
  expect((await centreName()).name).toBe(selectedName);
  await expect(choice.locator('.toolkit-label')).toHaveCSS('opacity', '1');
  await page.getByRole('button', { name: 'Next technology', exact: true }).click();
  await expect.poll(async () => (await centreName()).name).not.toBe(selectedName);
  await expect.poll(async () => (await centreName()).distance).toBeLessThan(1);
  await page.getByRole('button', { name: 'Previous technology', exact: true }).click();
  await expect.poll(async () => (await centreName()).name).toBe(selectedName);
  await expect.poll(async () => (await centreName()).distance).toBeLessThan(1);

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(viewport).toHaveAttribute('data-animated', 'false');
  await expect(page.locator('.toolkit-controls')).toBeHidden();
  expect(await track.evaluate(el => el.style.transform)).toBe('');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await expect(page.getByRole('img', { name: 'Git', exact: true })).toBeVisible();
});
