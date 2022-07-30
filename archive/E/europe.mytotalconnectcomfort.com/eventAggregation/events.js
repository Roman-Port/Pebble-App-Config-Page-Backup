
(function(signalR, definitions) {
    var events = {};
    $.each(definitions, function(index, defintion) {
        var type = defintion.namespace + "." + defintion.name;
        var closure = getClosure(window, defintion.namespace.split("."));
        var $class = closure[defintion.name] = function() {
        };
        
        if (defintion.generic) {
            $class.of = function() {
                return {
                    genericConstructor:  $class,
                    genericArguments: mapArgumentsToArray(arguments)
                };
            };
        }
        $class.type = type;
        $class.proxyEvent = true;
        events[type] = $class;
    });

    function getClosure(root, namespace) {
        if (namespace.length == 0) {
            return root;
        }
        var part = namespace[0];
        namespace.splice(0, 1);
        root[part] = root[part] || {};

        return getClosure(root[part], namespace);
    }
    
    function mapArgumentsToArray(genericArguments) {
        //SignalR does not like function argument arrays so we clone it
        return genericArguments != null ? $.map(genericArguments, function (value) {
            return value;
        }) : null;
    }

    signalR.getEvent = function(type) {
        return events[type];
    };

})(window.signalR = window.signalR || {},  [{"namespace":"Tcc.Web.Models.Events","name":"ComfortRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"ComfortDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"ComfortSaved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelConfigStartSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityDeleteDeviceSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecuritySystemDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SmsCodeActivated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityAccountContactsRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityAccountContactsSaved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPollingResponseRecieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelCancelConfigRequestSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelCommitConfigRequestSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecuritySetServiceChangeSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"PasswordResetVerificationCodeRequested","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"ForgotUsername","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GrantRemoteAccessViewModelRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SaveRemoteAccessSettingsResponse","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"PaymentStatusRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"QuickActionSet","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"ZoneUpdated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LocationSystemRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityAccountGsmDetailsSaved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityLocationDetailsRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityLoggedOut","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityLoggedIn","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityAccountGsmProvidersRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelInstalledDevicesRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelInitialisationSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityPanelStatusRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecuritySystemRegistered","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SecurityAccountRegisterViewModelRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"ResendActivationEmail","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"AccountInformationRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"EditAccessInfoUpdated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"EditAccessInfoRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GatewayMoveInfoRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GatewayMoved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"SharedLocationRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"EulaAccepted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"EulaDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"StatusRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserContractorDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserInfoUpdated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"PasswordResetEmailSent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GatewaysByLocationRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"FriendAccessToLocationGranted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"FriendAccessToLocationRemoved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"AccessToLocationRemoved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"FriendsLocationPermissionsRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"FriendCommentsUpdated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"TimeZonesRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LocationDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LocationEdited","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"NewLocation","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LocationRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LocationsRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"RequestFailure","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GatewayDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"AccountDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"FriendInvitationResent","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserFriendDeleted","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserFriendRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserFriendsRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserFriendCreated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserPasswordChanged","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserInfoFromPasswordResetKeyRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"PasswordReset","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"Activated","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"LoggedIn","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"Registered","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"UserInfoRetrieved","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"GatewayRegistered","generic":false},{"namespace":"Tcc.Web.Models.Events","name":"Event","generic":false}]);  