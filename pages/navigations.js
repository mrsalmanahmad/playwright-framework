import BasePage from './basePage'
import { orangeHRMBaseURL, orangeHRMMainScreenURL } from '../config'
import fs from 'fs'

const testData = JSON.parse(fs.readFileSync(`./data/globalData.json`, `utf-8`))

class Navigations extends BasePage {
	constructor(page) {
		super(page)
	}

    async navigateToMainScreen(){
        await this.goto(orangeHRMMainScreenURL)
    }

}
export default Navigations