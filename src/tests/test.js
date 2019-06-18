const { Builder, By, Key, until } = require('selenium-webdriver')

const WEB_URL = 'http://localhost:3000'
const DRIVER_SLEEP_IS_ENABLE = true
const BROWSER_TYPE = 'chrome'

const testBasicFunctionality = async () => {
  const driver = await new Builder().forBrowser(BROWSER_TYPE).build()
  try {
    await driver.get(WEB_URL)
    await driver.findElement(By.className('city-text-input')).sendKeys('toronto', Key.RETURN)
    const tableWebElem = driver.findElement(By.className('table'))
    await driver.wait(until.elementIsVisible(tableWebElem), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('SUCCESS: testBasicFunctionality')
    await driver.quit()
  }
}

const testChangingPages = async () => {
  const driver = await new Builder().forBrowser(BROWSER_TYPE).build()
  try {
    await driver.get(WEB_URL)
    await driver.findElement(By.className('city-text-input')).sendKeys('toronto', Key.RETURN)
    const tableWebElem = driver.findElement(By.className('table'))
    await driver.wait(until.elementIsVisible(tableWebElem), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 1'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 2'), 1000)
    await driver.findElement(By.className('page-control-button prev')).click()
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 1'), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('SUCCESS: testChangingPages')
    await driver.quit()
  }
}

const testPrevAndNextButtonDisabled = async () => {
  const driver = await new Builder().forBrowser(BROWSER_TYPE).build()
  try {
    await driver.get(WEB_URL)
    await driver.findElement(By.className('city-text-input')).sendKeys('toronto', Key.RETURN)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    const tableWebElem = driver.findElement(By.className('table'))
    await driver.wait(until.elementIsVisible(tableWebElem), 1000)
    let isPrevButtonEnabled = await driver.findElement(By.className('page-control-button prev')).isEnabled()
    if (isPrevButtonEnabled)
      throw new Error('Prev button should not be enabled when there is no page to go back to')
    await driver.findElement(By.className('city-text-input')).sendKeys(Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE, Key.BACK_SPACE)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.findElement(By.className('city-text-input')).sendKeys('no city what so ever', Key.RETURN)
    await driver.sleep(1000)
    isPrevButtonEnabled = await driver.findElement(By.className('page-control-button prev')).isEnabled()
    let isNextButtonEnabled = await driver.findElement(By.className('page-control-button next')).isEnabled()
    if (isPrevButtonEnabled || isNextButtonEnabled)
      throw new Error('Prev or next button should not be enabled when there is no page to go to')
  } catch (e) {
    console.log(e)
  } finally {
    console.log('SUCCESS: testPrevAndNextButtonDisabled')
    await driver.quit()
  }
}

const testUpdateNumRows = async () => {
  const driver = await new Builder().forBrowser(BROWSER_TYPE).build()
  try {
    await driver.get(WEB_URL)
    await driver.findElement(By.className('city-text-input')).sendKeys('toronto', Key.RETURN)
    const tableWebElem = driver.findElement(By.className('table'))
    await driver.wait(until.elementIsVisible(tableWebElem), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 1'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 2'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 3'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 4'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 5'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 6'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 7'), 1000)
    await driver.findElement(By.className('page-control-button next')).click()
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    await driver.findElement(By.className('each-row-value hundred')).click()
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 4 of 4'), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
    let isNextButtonEnabled = await driver.findElement(By.className('page-control-button next')).isEnabled()
    if (isNextButtonEnabled)
      throw new Error('Next button should not be enabled when there is no page to go to')
    await driver.findElement(By.className('each-row-value five')).click()
    await driver.wait(until.elementTextContains(driver.findElement(By.className('page-num-info')), 'Page 4 of 65'), 1000)
    DRIVER_SLEEP_IS_ENABLE && await driver.sleep(1000)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('SUCCESS: testUpdateNumRows')
    await driver.quit()
  }
}


const runAllTests = async () => {
  await testBasicFunctionality()
  await testChangingPages()
  await testPrevAndNextButtonDisabled()
  await testUpdateNumRows()
}
runAllTests()