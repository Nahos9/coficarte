pm.test('UpdateAgencyId', function(){
    var jsonData = pm.response.json();
    pm.environment.set("bearerToken", jsonData.data.userToken);
})
