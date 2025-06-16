import { test as fixture } from '@playwright/test'
import LoginPage from '../pages/loginPage'
import MainPage from '../pages/mianPage'

const test = fixture.extend({
	loginPage: async ({ page }, use) => {
		await use(new LoginPage(page))
	},

	mainPage: async ({ page }, use) => {
		await use(new MainPage(page))
	}
})

export default test