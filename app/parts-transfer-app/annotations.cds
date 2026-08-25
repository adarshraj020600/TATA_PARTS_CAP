using PartsAvailabilityService as service from '../../srv/parts-service';
annotate service.Materials with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : 'materialId',
                Value : materialId,
            },
            {
                $Type : 'UI.DataField',
                Label : 'description',
                Value : description,
            },
            {
                $Type : 'UI.DataField',
                Label : 'materialType',
                Value : materialType,
            },
            {
                $Type : 'UI.DataField',
                Label : 'unit',
                Value : unit,
            },
            {
                $Type : 'UI.DataField',
                Label : 'safetyStock',
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
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'materialId',
            Value : materialId,
        },
        {
            $Type : 'UI.DataField',
            Label : 'description',
            Value : description,
        },
        {
            $Type : 'UI.DataField',
            Label : 'materialType',
            Value : materialType,
        },
        {
            $Type : 'UI.DataField',
            Label : 'unit',
            Value : unit,
        },
        {
            $Type : 'UI.DataField',
            Label : 'safetyStock',
            Value : safetyStock,
        },
    ],
);

