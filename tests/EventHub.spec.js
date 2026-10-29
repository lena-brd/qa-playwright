import { test, expect } from '@playwright/test';

test('Create an event and book an event', async ({ page }) => {
  await page.goto('https://eventhub.rahulshettyacademy.com/');
  await page.getByPlaceholder('you@email.com').fill(process.env.HUB_EMAIL);
  await page.getByPlaceholder('••••••').fill(process.env.HUB_PASSWORD);
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.getByTestId('nav-events').click();
  await page.waitForLoadState('networkidle');
  await page.getByRole('button', { name: 'Add New Event' }).click();
  await page.getByPlaceholder('Event title').fill('Christmas Markets Opening');
  await page.getByPlaceholder('Describe the event…').fill('The first holiday market stalls open on major public spaces');
  await page.getByRole('combobox', { name: 'Category' }).selectOption('Festival');
  await page.getByPlaceholder('e.g. Bangalore').fill('Prague');
  await page.getByPlaceholder('Venue name & address').fill('Old Town Square, Peace Square, and Republic Square');
  await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2027-08-27T12:43');
  await page.locator('[id="price-($)"]').fill('50');
  await page.locator('#total-seats').fill('500');
  await page.getByTestId('add-event-btn').click();
  await page.waitForLoadState('networkidle');

  await page.getByTestId('nav-events').click();
  await page.getByRole('link', { name: 'Christmas Markets Opening' }).click();
  await page.waitForLoadState('networkidle');
  await page.getByPlaceholder('Your full name').fill('Jane Doe');
  await page.getByPlaceholder('you@email.com').fill(process.env.HUB_TEST_EMAIL);
  await page.getByPlaceholder('+91 98765 43210').fill('919876543210');
  await page.getByRole('button', { name: 'Confirm Booking' }).click();
  await expect(page.locator('.text-center h3')).toHaveText('Booking Confirmed! 🎉');
  const bookingRef = await page.locator('.booking-ref').first().textContent();
  console.log(bookingRef);
  await page.getByRole('button', { name: 'View My Bookings' }).click();
  await page.getByTestId('booking-card').first().waitFor();
  await expect(page.getByTestId('booking-card').first()).toContainText(bookingRef);
  await page.getByTestId('booking-card').first().getByRole('button', { name: 'View Details' }).click();
  await page.getByTestId('check-refund-btn').click();
  await page.waitForLoadState('load');
  await expect(page.getByTestId('refund-result')).toHaveText('Eligible for refund. Single-ticket bookings qualify for a full refund.');
});
