import BasePage from './basePage'
import { orangeHRMMainScreenURL } from '../config'
import {
	logoSelector
} from '../pageobjects/mainPage'

class MainPage extends BasePage {
	constructor(page) {
		super(page)
	}

    async navigateToMainScreen(){
        await this.goto(orangeHRMMainScreenURL)
    }

    async verifyLogoVisibility() {
        await this.page.waitForSelector(logoSelector, { state: 'visible' });
        return await this.page.isVisible(logoSelector);
    }
    
}
export default MainPage