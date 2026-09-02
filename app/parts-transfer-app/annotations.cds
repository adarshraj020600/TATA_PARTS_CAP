using PartsAvailabilityService as service from '../../srv/parts-service';
annotate service.Materials with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'Material ID',
                Value : materialId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Description',
                Value : description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Material Type',
                Value : materialType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Unit',
                Value : unit,
            },
            {
                $Type : 'UI.DataField',
                Label : 'Safety Stock',
                Value : safetyStock,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
        {
        $Type : 'UI.ReferenceFacet',
        ID : 'PlantStockFacet',
        Label : 'Plant Stock Availability',
        Target : 'stocks/@UI.LineItem',
    },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Material ID',
            Value : materialId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Description',
            Value : description,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Material Type',
            Value : materialType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Unit',
            Value : unit,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Safety Stock',
            Value : safetyStock,
        },
    ],
);
annotate service.Stocks with @(
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'Plant',
            Value : plant.plantId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Plant Name',
            Value : plant.plantName,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Location',
            Value : plant.location,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Available Qty',
            Value : availableQty,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Safety Stock',
            Value : safetyStock,
        },
        {
            $Type : 'UI.DataField',
            Label : 'Status',
            Value : stockStatus,
            Criticality : stockCriticality,
            ![@UI.Importance] : #High,
        },
    ],
);
 

