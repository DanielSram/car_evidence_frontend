describe('Seznam traktorů', function () {

  beforeEach(function () {
    browser.get('/');
  });

  it('should have <my-tractor-list>', function () {
    var tractorList = element(by.css('my-app my-tractor-list'));
    expect(home.isPresent()).toEqual(true);
    expect(home.getText()).toEqual("Seznam traktorů");
  });

});
