const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function retreiveIPData(ip) {

    // Synchronous database opening
    const fs = require('fs');
    const Reader = require('@maxmind/geoip2-node').Reader;
    
    const dbBuffer = fs.readFileSync('maxmind-database.mmdb');
    
    // This reader object should be reused across lookups as creation of it is
    // expensive.
    const reader1 = Reader.openBuffer(dbBuffer);
    
    let CityResponse = reader1.city(ip);
    
    console.log("Logging ip data into array")
    let cityResponseCompiled = {"CityConfidence": CityResponse.city.confidence, "CityGeoNameId": CityResponse.city.geonameId, "CityNames": CityResponse.city.names, "ContinentCode": CityResponse.continent.code, "ContinentGeoNameId": CityResponse.continent.geonameId, "ContinentNames": CityResponse.continent.names, "CountryConfidence": CityResponse.country.confidence, "CountryGeoNameId": CityResponse.country.geonameId, "CountryIsInEU": CityResponse.country.isInEuropeanUnion, "CountryISOCode": CityResponse.country.isoCode, "CountryNames": CityResponse.country.names, "LocationAccuracyRadius": CityResponse.location.accuracyRadius, "LocationAverageIncome": CityResponse.location.averageIncome, "LocationLatitude": CityResponse.location.latitude, "LocationLongitude": CityResponse.location.longitude,  "LocationMetroCode": CityResponse.location.metroCode, "LocationPopulationDensity": CityResponse.location.populationDensity, "LocationTimeZone": CityResponse.location.timeZone,  "PostalCode": CityResponse.postal.code, "PostalConfidence": CityResponse.postal.confidence, "RegisteredCountryGeoNameId": CityResponse.registeredCountry.geonameId, "RegisteredCountryIsInEU": CityResponse.registeredCountry.isInEuropeanUnion, "RegisteredCountryISOCode": CityResponse.registeredCountry.isoCode, "RegisteredCountryNames": CityResponse.registeredCountry.names, "RegisteredCountryIsInEU": CityResponse.registeredCountry.isInEuropeanUnion,"RegisteredCountryISOCode": CityResponse.registeredCountry.isoCode,"RegisteredCountryNames": CityResponse.registeredCountry.names,"TraitsAutonomousSystemNumber": CityResponse.traits.autonomousSystemNumber,"TraitsAutonomousSystemOrganization": CityResponse.traits.autonomousSystemOrganization,"TraitsConnectionType": CityResponse.traits.connectionType,"TraitsDomain": CityResponse.traits.domain,"TraitsIPAddress": CityResponse.traits.ipAddress,"TraitsIsAnonymous": CityResponse.traits.isAnonymous,"TraitsIsAnonymousProxy": CityResponse.traits.isAnonymousProxy,"TraitsIsAnonymousVPN": CityResponse.traits.isAnonymousVpn,"TraitsIsHostingProvider": CityResponse.traits.isHostingProvider,"TraitsIsLegitimateProxy": CityResponse.traits.isLegitimateProxy,"TraitsIsPublicProxy": CityResponse.traits.isPublicProxy,"TraitsIsResidentalProxy": CityResponse.traits.isResidentialProxy,"TraitsIsSatelliteProvider": CityResponse.traits.isSatelliteProvider, "TraitsIsTorExitNode": CityResponse.traits.isTorExitNode,"TraitsISP": CityResponse.traits.isp, "TraitsMobileCountryCode": CityResponse.traits.mobileCountryCode, "TraitsMobileNetworkCode": CityResponse.traits.mobileNetworkCode,"TraitsNetwork": CityResponse.traits.network,"TraitsOrganization": CityResponse.traits.organization,"TraitsStaticIpScore": CityResponse.traits.staticIpScore,"TraitsUserCount": CityResponse.traits.userCount,"TraitsUserType": CityResponse.traits.userType}

    console.log(cityResponseCompiled)
    
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();
  
  today = mm + '/' + dd + '/' + yyyy;

fs.appendFile('ipInfoData.txt', today + ":\n\n" + JSON.stringify(cityResponseCompiled) + "\n\n END OF LOG\n", function (err) {
  if (err) throw err;
  console.log('Saved ip data to file ipInfoData.txt complete!');
});

}

rl.question('Please enter the ip address to receive info for: ', function (ip) {
    retreiveIPData(`${ip}`)
    rl.close(); 
  });