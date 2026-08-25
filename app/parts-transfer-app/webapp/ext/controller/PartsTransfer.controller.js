
sap.ui.define([
    "sap/m/MessageBox"
], function (MessageBox) {
    "use strict";
 
    return {
 
        onInit: function () {
            console.log("PartsTransfer controller loaded");
        },
 
        onRecommendTransfer: function () {
            console.log("Recommend Transfer clicked");
 
            MessageBox.information(
                "Recommend Transfer button is working."
            );
        }
 
    };
});
 