import { expect } from '@playwright/test'
import fs from 'fs'
import path from 'path'
import os from 'os'
import { screenShots } from '../config'

class BasePage {
	constructor(page) {
		this.page = page
	}

	async open(url) {
		return await this.page.goto(url)
	}

	async getUrl() {
		return this.page.url()
	}

	async waitForPageLoad() {
		return await this.page.waitForLoadState('domcontentloaded')
	}

	async takeFullPageScreenShot(imgName) {
		const dateTime = await this.getCurrentDateTime();
		return await this.page.screenshot({
			path: screenShots + imgName + dateTime + ".png",
			fullPage: true,
		});
	}

	getCurrentDateTime() {
		const currentDate = new Date();
		const formattedDate = currentDate.toISOString().slice(0, 10).replace(/-/g, '') +
			'_' +
			currentDate.getHours().toString().padStart(2, '0') +
			currentDate.getMinutes().toString().padStart(2, '0') +
			currentDate.getSeconds().toString().padStart(2, '0');
		return formattedDate;
	}

	async waitAndClick(selector) {
		return await this.page.click(selector)
	}

	async inputText(selector, text) {
		// Wait for the input field to be visible and interactable
		await this.page.waitForSelector(selector, { visible: true });

		// Clear any existing text in the input field
		await this.page.$eval(selector, el => el.value = '');

		// Type the new text into the input field
		await this.page.type(selector, text);
	}

	delay(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
}

export default BasePage