

describe("My Health", () => {
  it("can find search results",  () => {
    
    browser.url("https://www.lambdatest.com/");
    
    
     browser.pause(2000);

     setTimeout(function () {
      console.log("taking screenshot ...")
      browser.execute("smartui.takeScreenshot").then(out => {
        console.log("RESPONSE :", out)
        return
      });
    },);
});
});
