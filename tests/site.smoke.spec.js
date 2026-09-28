import { expect, test } from '@playwright/test'

const publicRoutes = [
  ['/', 'Bear Mechanical | Building What Comes Next'],
  ['/about', 'About | Bear Mechanical'],
  ['/team', 'Meet the Team | Bear Mechanical'],
  ['/culture', 'Culture & Values | Bear Mechanical'],
  ['/awards', 'Awards | Bear Mechanical'],
  ['/safety', 'Safety | Bear Mechanical'],
  ['/services', 'Services | Bear Mechanical'],
  ['/projects', 'Projects | Bear Mechanical'],
  ['/careers', 'Careers | Bear Mechanical'],
  ['/contact', 'Contact | Bear Mechanical'],
]

const validContact = {
  firstName: 'Ada',
  lastName: 'Lovelace',
  email: 'ada@example.test',
  message: 'Please contact me about a project.',
}

async function fillValidContactForm(page) {
  await page.getByLabel('FIRST NAME').fill(validContact.firstName)
  await page.getByLabel('LAST NAME').fill(validContact.lastName)
  await page.getByLabel('EMAIL').fill(validContact.email)
  await page.getByLabel('MESSAGE').fill(validContact.message)
}

test.describe('public-site smoke', () => {
  test('loads every public route and supports a direct refresh', async ({ page }) => {
    for (const [path, title] of publicRoutes) {
      await page.goto(path)
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page).toHaveTitle(title)
      await page.reload()
      await expect(page.locator('main h1')).toBeVisible()
      await expect(page).toHaveTitle(title)
    }
  })

  test('keeps the four service anchors addressable and visible', async ({ page }) => {
    for (const id of ['mechanical', 'electrical', 'plumbing', 'automation']) {
      await page.goto(`/services#${id}`)
      const target = page.locator(`#${id}`)
      await expect(target).toBeVisible()
      await expect(target).toHaveAttribute('tabindex', '-1')
      await expect(page).toHaveURL(new RegExp(`/services#${id}$`))
    }
  })

  test('opens and closes the mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 })
    await page.goto('/')

    const menuButton = page.locator('#menuButton')
    await menuButton.click()
    await expect(menuButton).toHaveAttribute('aria-expanded', 'true')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false')
    await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeHidden()
  })

  test('presents career rows as informational content, not fake links', async ({ page }) => {
    await page.goto('/careers')

    const rows = page.locator('.job')
    await expect(rows).toHaveCount(4)
    await expect(rows.locator('a, button, [tabindex], .job-arrow')).toHaveCount(0)
  })

  test('shows contact validation without making a network request', async ({ page }) => {
    let contactRequests = 0
    await page.route('**/api/contact', async (route) => {
      contactRequests += 1
      await route.fulfill({ status: 202, contentType: 'application/json', body: '{"status":"accepted"}' })
    })
    await page.goto('/contact')
    await page.getByRole('button', { name: /send message/i }).click()

    await expect(page.locator('#formMessage')).toHaveAttribute('data-status', 'validation-error')
    await expect(page.locator('#firstName-error')).toBeVisible()
    expect(contactRequests).toBe(0)
  })

  test('shows contact success using a mocked same-origin response', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({
      status: 202,
      contentType: 'application/json',
      body: '{"status":"accepted"}',
    }))
    await page.goto('/contact')
    await fillValidContactForm(page)
    await page.getByRole('button', { name: /send message/i }).click()

    await expect(page.locator('#formMessage')).toHaveAttribute('data-status', 'success')
    await expect(page.locator('#formMessage')).toContainText('received')
  })

  test('shows contact delivery failure using a mocked same-origin response', async ({ page }) => {
    await page.route('**/api/contact', (route) => route.fulfill({
      status: 502,
      contentType: 'application/json',
      body: '{"error":"delivery_failed"}',
    }))
    await page.goto('/contact')
    await fillValidContactForm(page)
    await page.getByRole('button', { name: /send message/i }).click()

    await expect(page.locator('#formMessage')).toHaveAttribute('data-status', 'service-failure')
    await expect(page.locator('#formMessage')).toContainText('could not send')
  })
})
