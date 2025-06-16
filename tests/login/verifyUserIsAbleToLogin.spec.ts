import test from '../../testFixtures/fixture';
import { expect } from '@playwright/test';
import fs from 'fs';

const testData = JSON.parse(fs.readFileSync(`./data/globalData.json`, `utf-8`))

import {
	orangeHRMBaseURL,
    orangeHRMMainScreenURL
} from '../../config'

test.describe(
	'@smoke: Login as a standard user',
	() => {
		test('Login to App as a standard user', async ({
			loginPage,
            mainPage
		},testInfo) => {
			await test.step(`Open the APP and check logo`, async () => {
				await loginPage.openApp()
				expect(await loginPage.getUrl()).toContain(orangeHRMBaseURL)
			})

			await test.step(`Enter User Name in username field`, async () => {
				await loginPage.enterUserName(testData.user_name);
			})

			await test.step(`Enter Password in Password field`, async () => {
				await loginPage.enterPassword(testData.password);
			})

			await test.step(`Click on Login Button `, async () => {
				await loginPage.clickOnLoginButton()
			})

			await test.step(`Verify the login is Successful `, async () => {
				await loginPage.waitForPageLoad()
			})

            await test.step(`Verify the Main Screen is Opened and Visible `, async () => {
				expect(await loginPage.getUrl()).toContain(orangeHRMMainScreenURL)
                await mainPage.verifyLogoVisibility()
			})

			await test.step(`Take Screenshot of the page loaded for future reference `, async ()=>{
				await testInfo.attach('LoginPage_',{
                    body: await loginPage.takeFullPageScreenShot('LoginPage_'),
                    contentType: 'image/png'
                })
			})
            
            await test.step(`Scenerio of this test case `, async ()=>{
                await testInfo.attach('Scenario Description', {
                    body: `
                    Feature: Login Functionality
					Scenario: User successfully logs in and verifies the main screen
                            Given the user opens the application
                            And the login page is displayed
                            When the user enters valid credentials (username and password)
                            And clicks the Login button
                            Then the login should be successful
                            And the main dashboard (home page) should be visible
                            And a full-page screenshot is captured for verification
            `
                })
            }) 
		}
		)
	}
)




