sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'reports/test/integration/FirstJourney',
		'reports/test/integration/pages/ReportsList',
		'reports/test/integration/pages/ReportsObjectPage',
		'reports/test/integration/pages/ReportFieldsObjectPage'
    ],
    function(JourneyRunner, opaJourney, ReportsList, ReportsObjectPage, ReportFieldsObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('reports') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
					onTheReportsList: ReportsList,
					onTheReportsObjectPage: ReportsObjectPage,
					onTheReportFieldsObjectPage: ReportFieldsObjectPage
                }
            },
            opaJourney.run
        );
    }
);