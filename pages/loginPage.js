import BasePage from './basePage'
import { orangeHRMBaseURL } from '../config'
import fs from 'fs'
import {
	username,
	password,
	loginButton,
} from '../pageobjects/loginPage'

const testData = JSON.parse(fs.readFileSync(`./data/globalData.json`, `utf-8`))

class LoginPage extends BasePage {
	constructor(page) {
		super(page)
	}

	async openApp() {
		await super.open(orangeHRMBaseURL)
		return await super.waitForPageLoad()
	}

	async usernameFieldVisible() {
		return await this.isElementVisible(username, testData.notVisible)
	}

	async passwordFieldVisible() {
		return await this.isElementVisible(password, testData.notVisible)
	}

	async loginButtonIsEnabled() {
		return await this.isElementEnabled(loginButton, testData.notVisible)
	}

	async enterUserName(userNameValue){
		await this.waitAndClick(username)
		return await this.inputText(username, userNameValue)
	}

	async enterPassword(passwordValue){
		await this.waitAndClick(password)
		return await this.inputText(password, passwordValue)
	}

	async clickOnLoginButton(){
		return await this.waitAndClick(loginButton)
	}
}
export default LoginPage