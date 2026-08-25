
sap.ui.define([
    "sap/m/MessageBox",
    "sap/m/Input",
    "sap/m/Dialog",
    "sap/m/Button"
], function (MessageBox, Input, Dialog, Button) {
    "use strict";
 
    return {
 
        onInit: function () {
            console.log("PartsTransfer controller loaded");
        },
 
       onRecommendTransfer: function (oContext, aSelectedContexts) {
 
    if (!aSelectedContexts || aSelectedContexts.length === 0) {
        MessageBox.warning(
            "Please select a material first."
        );
        return;
    }
 
    
 
    const oInput = new Input({
        placeholder: "Example: P001"
    });
 
    const oDialog = new Dialog({
        title: "Destination Plant",
        content: oInput,
        beginButton: new Button({
            text: "Continue",
            press: function () {
 
                const sPlantId = oInput.getValue().trim();
 
                // if (!sPlantId) {
                //     MessageBox.warning(
                //         "Please enter a destination plant."
                //     );
                //     return;
                // }
 
                // console.log("Material ID:", oMaterial.materialId);
                // console.log("Destination Plant:", sPlantId);
 
                // oDialog.close();
 
                // MessageBox.information(
                //     "Material: " +
                //     oMaterial.materialId +
                //     "\nDestination Plant: " +
                //     sPlantId
                // );
                const oMaterialContext = aSelectedContexts[0];
                const oMaterial = oMaterialContext.getObject();
                const oModel = oMaterialContext.getModel();
 
console.log("Calling recommendTransfer...");
console.log("Material ID:", oMaterial.materialId);
console.log("Destination Plant:", sPlantId);
 
const oOperation = oModel.bindContext(
    "/recommendTransfer(...)"
);
 
oOperation.setParameter(
    "materialId",
    oMaterial.materialId
);
 
oOperation.setParameter(
    "plantId",
    sPlantId
);
 
oOperation.execute()
    .then(function () {
 
        const oResult = oOperation.getBoundContext().getObject();
 
        console.log("Transfer recommendation:", oResult);
 
        oDialog.close();
 
        MessageBox.success(
            "Transfer recommendation received.\n\n" +
            "From: " + oResult.sourcePlant + "\n" +
            "To: " + oResult.destinationPlant + "\n" +
            "Quantity: " + oResult.recommendedTransferQty
        );
    })
    .catch(function (oError) {
 
        console.error(
            "recommendTransfer failed:",
            oError
        );
 
        MessageBox.error(
            "Transfer recommendation failed.\n\n" +
            oError.message
        );
    });
 
            }
        }),
        endButton: new Button({
            text: "Cancel",
            press: function () {
                oDialog.close();
            }
        }),
        afterClose: function () {
            oDialog.destroy();
        }
    });
 
    oDialog.open();
}
 
    };
});
 