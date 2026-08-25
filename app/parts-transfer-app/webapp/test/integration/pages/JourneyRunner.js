sap.ui.define([
    "sap/fe/test/JourneyRunner",
	"com/tatamotors/parts/partstransferapp/test/integration/pages/MaterialsList.gen",
	"com/tatamotors/parts/partstransferapp/test/integration/pages/MaterialsObjectPage.gen"
], function (JourneyRunner, MaterialsListGenerated, MaterialsObjectPageGenerated) {
    'use strict';

    const runner = new JourneyRunner({
        launchUrl: sap.ui.require.toUrl('com/tatamotors/parts/partstransferapp') + '/test/flpSandbox.html#comtatamotorspartspartstransfe-tile',
        pages: {
			onTheMaterialsListGenerated: MaterialsListGenerated,
			onTheMaterialsObjectPageGenerated: MaterialsObjectPageGenerated
        },
        async: true
    });

    return runner;
});

