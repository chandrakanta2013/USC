var app = angular.module('defaultServices', []);

app.factory('encodeURL', function() {
    return {
        encode: function(array) {
            var r = '';
            for (var i in array) {
                r += encodeURIComponent(i) + '=' + encodeURIComponent(array[i]) + '&';
            }
            r = r.slice(0, -1);
            return r;
        },
        serialize: function(obj, prefix) {
            var str = [];
            for (var p in obj) {
                if (obj.hasOwnProperty(p)) {
                    if (_.isArray(obj[p])) {
                        _.each(obj[p], function(arrayData) {
                            if (_.isObject(arrayData)) {
                                str.push(encodeURIComponent(p) + "%3D" + encodeURIComponent(JSON.stringify(arrayData)));
                            } else {
                                str.push(encodeURIComponent(p) + "%3D" + encodeURIComponent(arrayData));
                            }
                        });
                    } else if (_.isObject(obj[p])) {
                        str.push(encodeURIComponent(p) + "%3D" + encodeURIComponent(JSON.stringify(obj[p])));
                    } else if (_.isNull(obj[p]) || _.isUndefined(obj[p])) {

                    } else {
                        str.push(encodeURIComponent(p) + "%3D" + encodeURIComponent(obj[p]));
                    }
                }
            }
            return str.join("%26");
        }
    };
});

app.factory('browserService', ["$window", function($window) {
    var uaMatch = function(ua) {
        ua = ua.toLowerCase();

        var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
        /(webkit)[ \/]([\w.]+)/.exec(ua) ||
        /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
        /(msie) ([\w.]+)/.exec(ua) ||
        ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

        return {
            browser: match[1] || "",
            version: match[2] || "0"
        };
    };
    var matched = uaMatch($window.navigator.userAgent);
    var browser = {};

    if (matched.browser) {
        browser[matched.browser] = true;
        browser.version = matched.version;
    }

    // Chrome is Webkit, but Webkit is also Safari.
    if (browser.chrome) {
        browser.webkit = true;
    } else if (browser.webkit) {
        browser.safari = true;
    }

    return browser;
}]);

app.factory('resourceinterceptor', ["$q", "browserService", "encodeURL", function($q, browserService, encodeURL) {
    return {
        // optional method
        'request': function(config) {
            // do something on success
            if (config.url.search('php54.indianic.com/healthcareiq/api') != -1) {
                if (browserService.msie && browserService.version === '9.0' || browserService.version === '8.0' && config.method == "GET") {
                    var querystring = encodeURL.serialize(config.params);
                    var encodedurl = '_quantum_proxy.php?q=' + encodeURIComponent(config.url);
                    if (querystring !== "") {
                        encodedurl += "%3F" + querystring;
                    }
                    config.params = {};
                    config.url = encodedurl;
                } else if (browserService.msie && browserService.version === '9.0' || browserService.version === '8.0' && config.method != "POST") {
                    var encodedurl = '_quantum_proxy.php?q=' + encodeURIComponent(config.url);
                    config.url = encodedurl;
                } else if (browserService.msie && browserService.version === '9.0' || browserService.version === '8.0' && config.method != "PUT") {
                    var encodedurl = '_quantum_proxy.php?q=' + encodeURIComponent(config.url);
                    config.url = encodedurl;
                }
            }
            return config;
        },
        // optional method
        'requestError': function(rejection) {
            // do something on error

            return $q.reject(rejection);
        },
        // optional method
        'response': function(response) {
            // do something on success
            return response;
        },
        // optional method
        'responseError': function(rejection) {
            // do something on error
            return $q.reject(rejection);
        }
    };
}]);

app.factory('resourceUrl', ["browserService", function(browserService) {
    return {

        proxify: function(url) {
            //                    return (browserService.msie && browserService.version === '9.0' || browserService.version === '8.0' )
            return (true) ? '_quantum_proxy.php?q=' + encodeURIComponent(url) : url;
        }
    };
}]);

app.factory('MetaInformation', [function() {
    var metaDescription = '';
    var metaKeyword = '';
    var metaTitle = '';
    return {
        metaDescription: function() {
            return metaDescription;
        },
        metaKeyword: function() {
            return metaKeyword;
        },
        metaTitle: function() {
            return metaTitle;
        },
        reset: function() {
            metaDescription = '';
            metaKeyword = '';
            metaTitle = '';
        },
        setMetaTitle: function(newMetaTitle) {
            metaTitle = newMetaTitle;
        },
        setMetaDescription: function(newMetaDescription) {
            metaDescription = newMetaDescription;
        },
        setMetaKeyword: function(newKeyword) {
            metaKeyword = newKeyword;

        }
    };
}]);

app.service('resourceService', ['$cookies', '$cookieStore', '$http', '$state', 'resourceUrl', 'browserService', function($cookies, $cookieStore, $http, $state, resourceUrl, browserService) {
    var resourceService = {};
    return resourceService;
}]);

// app.factory('XmlToJson', [function() {
//     var x2js = new X2JS();
//     return {
//         toJSON: function(xml) {
//             return x2js.xml_str2json(xml);
//         }
//     };
// }]);

app.service(
    "trafficCop",
    function setupService() {
        var total = {
            all: 0,
            get: 0,
            post: 0,
            delete: 0,
            put: 0,
            head: 0
        };

        var pending = {
            all: 0,
            get: 0,
            post: 0,
            delete: 0,
            put: 0,
            head: 0
        };

        return {
            pending: pending,
            total: total,
            endRequest: endRequest,
            startRequest: startRequest,
        };

        function endRequest(httpMethod) {
            httpMethod = normalizedHttpMethod(httpMethod);
            pending.all--;
            pending[httpMethod]--;
            if (pending[httpMethod] < 0) {
                redistributePendingCounts(httpMethod);
            }
        }

        function startRequest(httpMethod) {
            // console.log(httpMethod,'httpMethod')
            httpMethod = normalizedHttpMethod(httpMethod);
            total.all++;
            total[httpMethod]++;
            pending.all++;
            pending[httpMethod]++;

        }

        function normalizedHttpMethod(httpMethod) {
            httpMethod = (httpMethod || "").toLowerCase();
            switch (httpMethod) {
                case "get":
                case "post":
                case "delete":
                case "put":
                case "head":
                return (httpMethod);

            }
            return ("get");
        }

        function redistributePendingCounts(negativeMethod) {
            var overflow = Math.abs(pending[negativeMethod]);
            pending[negativeMethod] = 0;

            var methods = ["get", "post", "delete", "put", "head"];

            for (var i = 0; i < methods.length; i++) {
                var method = methods[i];
                if (overflow && pending[method]) {
                    pending[method] -= overflow;
                    if (pending[method] < 0) {
                        overflow = Math.abs(pending[method]);
                        pending[method] = 0;
                    } else {
                        overflow = 0;
                    }
                }
            }
        }
    }
    );

app.service('interceptHttp', ['$rootScope','$q', 'trafficCop', function($rootScope,$q, trafficCop) {
    var extractMethod = function(response) {
        try {
            return (response.config.method);
        } catch (error) {
            return ("get");
        }
    };
    return {
        request: function(config) { 
            if(config.url.indexOf('/negotiation_notification') == -1){
                trafficCop.startRequest(config.method);
            }
            return (config);
        },
        requestError: function(rejection) {
            if(rejection.config.url.indexOf('/negotiation_notification') == -1){
                trafficCop.startRequest("get");
            }
            return ($q.reject(rejection));
        },
        response: function(response) {
            if(response.data.code==401){
               $rootScope.logoutFunctn();
            }
            if(response.config.url.indexOf('/negotiation_notification') == -1){
                trafficCop.endRequest(extractMethod(response));
            }
            return (response);
        },
        responseError: function(response) {
            if(response.config.url.indexOf('/negotiation_notification') == -1){
                trafficCop.endRequest(extractMethod(response));
            }
            return ($q.reject(response));
        }
    };
}]);

app.service('sceTrustHtml', ['$sce', function($sce) {
    return {
        checkText: function(data) {
            return $sce.trustAsHtml(data);
        }
    };
}]);

app.factory('onlineStatus', ['$sce', '$window', function($sce, $window) {

    return {
        checkStatus: function() {
            return $window.navigator.onLine;
        }
    };
}]);

app.factory('mainCategory', ["$http", "GLOBALS", "authService", "$q", function($http, GLOBALS, authService, $q) {
    var factory = {};
    var deferred = $q.defer();

    factory.getMainCategory = function() {
        $http({
            url: GLOBALS.API_URL1 + 'get_main_category?',
            method: 'GET',
            cache: false,
            params: '',
            headers: {}
        })
        .then(function(success) {
            deferred.resolve(success.data.data);
        }, function(error) {});
        return deferred.promise;
    };

    return factory;
}]);

app.factory('errorMsgFactory', [function() {
    var factory = {};
    factory.getErrorMessage = function(error, fieldname) {
        var message;
        if (angular.isDefined(error)) {
            if (error.required) {
                var required= validationMessage.ERROR.REQUIRED;
                if (fieldname == "email") {
                    message =required.Email;
                } else if (fieldname == "firstName") {
                    message =required.FirstName;
                } else if (fieldname == "lastName") {
                    message =required.LastName;
                } else if (fieldname == "companyName") {
                    message =required.CompanyName;
                } else if (fieldname == "password") {
                    message =required.Password;
                }else if (fieldname == "confirmPassword") {
                    message =required.ConfirmPassword;
                }else if (fieldname == "oldPassword") {
                    message =required.OldPassword;
                }else if (fieldname == "newPassword") {
                    message =required.NewPassword;
                }else if (fieldname == "insurance_Obj") {
                    message =required.insurance_Obj;
                } else if (fieldname == "useragree") {
                    message =required.UserAgree;
                } else if (fieldname == "projectType"){
                    message = required.projectType;
                } else if (fieldname == "industry"){
                    message = required.industry;
                } else if (fieldname == "subIndustry"){
                    message = required.subIndustry;
                } else if (fieldname == "projectTitle"){
                    message = required.projectTitle;
                } else if (fieldname == "deliverables"){
                    message = required.deliverables;
                } else if (fieldname == "experienceLevel"){
                    message = required.experienceLevel;
                }  else if (fieldname == "indSpecExperience"){
                    message = required.indSpecExperience;
                }
                else if (fieldname == "username"){
                    message = required.username;
                }
                else if (fieldname == "gender"){
                    message = required.gender;
                }else if (fieldname == "patientcity"){
                    message = required.patientcity;
                }else if (fieldname == "insured_city"){
                    message = required.insured_city;
                }else if (fieldname == "patientstate"){
                    message = required.patientstate;
                }else if (fieldname == "insured_state"){
                    message = required.insured_state;
                }else if (fieldname == "patientzip"){
                    message = required.patientzip;
                }else if (fieldname == "reasonForVisit"){
                    message = required.reasonForVisit;
                }else if (fieldname == "relationship_to_patient"){
                    message = required.relationship_to_patient;
                }else if (fieldname == "customer_service_number"){
                    message = required.customer_service_number;
                }else if (fieldname == "zipcode"){
                    message = required.zipcode;
                }


                //EXPERT EDIT PROFILE FIELDS
                else if (fieldname == "honorific"){
                    message = required.Honorific;
                }else if (fieldname == "fullName"){
                    message = required.FullName;
                }else if (fieldname == "countryCode"){
                    message = required.CountryCode;
                } else if (fieldname == "contactNo"){
                    message = required.ContactNo;
                }else if (fieldname == "summary"){
                    message = required.Summary;
                }else if (fieldname == "resume"){
                    message = required.Resume;
                }else if (fieldname == "country"){
                    message = required.Country;
                }else if (fieldname == "position"){
                    message = required.Position;
                }else if (fieldname == "location"){
                    message = required.Location;
                }else if (fieldname == "tpYear"){
                    message = required.tpYear;
                }else if (fieldname == "tpMonth"){
                    message = required.tpMonth;
                }else if (fieldname == "description"){
                    message = required.Description;
                }else if (fieldname == "school"){
                    message = required.School;
                }else if (fieldname == "gradYear"){
                    message = required.gradYear;
                }else if (fieldname == "degree"){
                    message = required.Degree;
                }else if (fieldname == "studyField"){
                    message = required.StudyField;
                }else if (fieldname == "language"){
                    message = required.Language;
                }else if (fieldname == "langProf"){
                    message = required.langProf;
                }else if (fieldname == "totalWorkExp"){
                    message = required.totalWorkExp;
                }else if (fieldname == "consultExp"){
                    message = required.consultExp;
                }else if (fieldname == "indExp"){
                    message = required.indExp;
                }else if (fieldname == "indExpYear"){
                    message = required.year;
                }else if (fieldname == "subIndExp"){
                    message = required.subIndExp;
                }else if (fieldname == "subIndExpYear"){
                    message = required.year;
                }else if (fieldname == "skills"){
                    message = required.Skills;
                }else if (fieldname == "name"){
                    message = required.Name;
                }else if (fieldname == "comments"){
                    message = required.Comments;
                }else if (fieldname == "options"){
                    message = required.Options;
                }else if (fieldname == "phonenumber"){
                    message = required.PhoneNumber;
                }else if (fieldname == "insured_phone"){
                    message = required.insured_phone;
                }else if (fieldname == "patient_firstname"){
                    message = required.patient_firstname;
                }else if (fieldname == "patient_lastname"){
                    message = required.patient_lastname;
                }else if (fieldname == "insured_firstname"){
                    message = required.insured_firstname;
                }else if (fieldname == "insured_lastname"){
                    message = required.insured_lastname;
                }else if (fieldname == "insured_email_address"){
                    message = required.insured_email_address;
                }

            } else if (error.pattern) {
                var pattern= validationMessage.ERROR.PATTERN;
                if (fieldname == "phonenumber") {
                    message = pattern.PhoneNumber;
                } else if (fieldname == "age") {
                    message = pattern.Age;
                } else if (fieldname == "email") {
                    message = pattern.Email;
                } else if (fieldname == "password" || fieldname == "oldPassword" || fieldname == "newPassword") {
                    message = pattern.Password;
                }
            } else if (error.maxlength) {
               var maxlength= validationMessage.ERROR.MAXLENGTH;
               if (fieldname == "phonenumber") {
                message = maxlength.PhoneNumber;
            } else if (fieldname == "password" || fieldname == "confirmPassword") {
                message = maxlength.Password;
            } else if (fieldname == "oldPassword") {
                message = maxlength.Password;
            } else if (fieldname == "newPassword") {
                message = maxlength.Password;
            } else if (fieldname == "distance") {
                message = maxlength.Distance;
            }
        } else if (error.minlength) {
           var minlength= validationMessage.ERROR.MINLENGTH;
           if (fieldname == "phonenumber") {
            message = minlength.PhoneNumber;
        } else if (fieldname == "password") {
            message = minlength.Password;
        } else if (fieldname == "oldPassword") {
            message = minlength.Password;

        } else if (fieldname == "newPassword") {
            message = minlength.Password;
        } 
        else if (fieldname == "name") {
            message = minlength.name;
        } 
        
        else if (fieldname == "pinno") {
            message = minlength.PinNo;
        }else if (fieldname == "patient_firstname") {
            message = minlength.patient_firstname;
        }else if (fieldname == "patient_lastname") {
            message = minlength.patient_lastname;
        }else if (fieldname == "insured_phone") {
            message = minlength.insured_phone;
        }else if (fieldname == "insured_firstname") {
            message = minlength.insured_firstname;
        }else if (fieldname == "insured_lastname") {
            message = minlength.insured_lastname;
        }else if (fieldname == "customer_service_number") {
            message = minlength.customer_service_number;
        }
        else if (fieldname == "insurance_Obj") {
            message = minlength.insurance_Obj;
        }
    } else if (error.email) {
        message = validationMessage.ERROR.PATTERN.Email;
    } 
}
return message;
}
return factory;
}]);

app.factory('googleLocation', ["$timeout",function($timeout) {
    var factory = {};
    return {
        myLocation : function() {
           
            var placeSearch, autocomplete;
              var componentForm ={
                street_number: 'short_name',
                route: 'long_name',
                locality: 'long_name',
                administrative_area_level_1: 'short_name',
                country: 'long_name',
                postal_code: 'short_name'
              };
               
                  function initAutocomplete(){
                    $timeout(function() {
                        console.log(document.getElementById('autocomplete'),"id")
                        // Create the autocomplete object, restricting the search to geographical location types.
                        autocomplete = new google.maps.places.Autocomplete(
                            (document.getElementById('autocomplete')), {types:['geocode']} //(input,options)
                        );

                        // When the user selects an address from the dropdown, populate the address fields in the form.
                        autocomplete.addListener('place_changed', fillInAddress);
                        // var map = new google.maps.Map(document.getElementById('map'), {
                        //       center: {lat:20.5937, lng:78.962},
                        //       scrollwheel: false,
                        //       zoom: 5
                        // });

                    }, 3000);
                  }

                initAutocomplete()

                function fillInAddress(){
                 $timeout(function() {
                    // Get the place details from the autocomplete object.
                    var place = autocomplete.getPlace();
                    console.log(place,"place");
                    // console.log(place.address_components[7],"zipcode");
                    // Get each component of the address from the place details and fill the corresponding field on the form.
                    for (var i = 0; i < place.address_components.length; i++) {
                      var addressType = place.address_components[i].types[0];
                      console.log(addressType,"addressType")
                      if (componentForm[addressType]) {
                        var val = place.address_components[i][componentForm[addressType]];
                        console.log(place.address_components[7].short_name,"zipcode");

                        // document.getElementById(addressType).value = val;
                      }
                    }
                    // var selectedGeolocation = [{
                    //       lat: place.geometry.location.lat(),
                    //       lng: place.geometry.location.lng()
                    //     }];
                    //calling the showMap function
                    // showMap(selectedGeolocation);
                    console.log(componentForm,"componentForm");
                    }, 1000);
                }
            }
        };
}]);



