

describe("My Health", () => {

  
  //let url_replaced = url.replace('https://', '')

  it('can find search results for' , async () => {


    await browser.url("https://www.lambdatest.com/");

    await browser.pause(8000);
    
    console.log("taking screenshot ...")
    await browser.execute("smartui.takeScreenshot").then(out => { //full page screenshot is not supported on Firefox or Egde
      console.log("RESPONSE :", out)
      return
    });

  });

});
