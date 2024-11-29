using ChatService from '../../srv/chat/chat-service';

annotate ChatService.Reports with @odata.draft.enabled;

annotate ChatService.Reports {
    isPCLGenerated @Common.Label: '{i18n>isPCLGenerated}';
    isProgramGenerated @Common.Label: '{i18n>isProgramGenerated}';
};

annotate ChatService.ReportFields {
    Display @Common : {
        ValueListWithFixedValues,
        ValueList: {
            CollectionPath: 'SingleCheck',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterInOut',
                    LocalDataProperty: 'Display',
                    ValueListProperty: 'check'
                }
            ]
        }
    };
    Enterable @Common : {
        ValueListWithFixedValues,
        ValueList: {
            CollectionPath: 'SingleCheck',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterInOut',
                    LocalDataProperty: 'Enterable',
                    ValueListProperty: 'check'
                }
            ]
        }
    };
    Obligatory @Common : {
        ValueListWithFixedValues,
        ValueList: {
            CollectionPath: 'SingleCheck',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterInOut',
                    LocalDataProperty: 'Obligatory',
                    ValueListProperty: 'check'
                }
            ]
        }
    };
    ValueHelp @Common : {
        ValueListWithFixedValues,
        ValueList: {
            CollectionPath: 'SingleCheck',
            Parameters: [
                {
                    $Type: 'Common.ValueListParameterInOut',
                    LocalDataProperty: 'ValueHelp',
                    ValueListProperty: 'check'
                }
            ]
        }
    };
} 


annotate ChatService.Reports with @UI: {
    SelectionFields  : [
        isPCLGenerated,
        isProgramGenerated,
    ],
    Facets        : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'idIdentification',
            Label : '{i18n>Basic}',
            Target: '@UI.Identification'
        },

        {
            ID    : 'Fields',
            Target: 'fields/@UI.LineItem',
            $Type : 'UI.ReferenceFacet',
            Label : '{i18n>Fields}',
        },
    ],
    LineItem      : [
        {
            $Type: 'UI.DataField',
            Value: ID,
            Label: '{i18n>ID}',
        },
        {
            $Type: 'UI.DataField',
            Value: Text,
            Label: '{i18n>Text}',
        },
        {
            $Type: 'UI.DataField',
            Value: ProjectId,
            Label: '{i18n>ProjectId}',
        },
        {
            $Type: 'UI.DataField',
            Value: DevClass,
            Label: '{i18n>DevClass}',
        },
        {
            $Type: 'UI.DataField',
            Value: TrKorr,
            Label: '{i18n>TrKorr}',
        },
        {
            $Type: 'UI.DataField',
            Value: isPCLGenerated,
            Label: '{i18n>isPCLGenerated}',
        },
        {
            $Type: 'UI.DataField',
            Value: isProgramGenerated,
            Label: '{i18n>isProgramGenerated}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.generatePCL',
            Label : '{i18n>GeneratePCL}'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.generateProgram',
            Label : '{i18n>GenerateProgram}'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.verify',
            Label : '{i18n>Verify}'
        },
    ],
    Identification: [
        {
            $Type: 'UI.DataField',
            Value: Text,
            Label: '{i18n>Text}',
        },
        {
            $Type: 'UI.DataField',
            Value: ProjectId,
            Label: '{i18n>ProjectId}',
        },
        {
            $Type: 'UI.DataField',
            Value: DevClass,
            Label: '{i18n>DevClass}',
        },
        {
            $Type: 'UI.DataField',
            Value: TrKorr,
            Label: '{i18n>TrKorr}',
        },
        {
            $Type: 'UI.DataField',
            Value: isPCLGenerated,
            Label: '{i18n>isPCLGenerated}',
        },
        {
            $Type: 'UI.DataField',
            Value: isProgramGenerated,
            Label: '{i18n>isProgramGenerated}',
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.generatePCL',
            Label : '{i18n>GeneratePCL}'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.generateProgram',
            Label : '{i18n>GenerateProgram}'
        },
        {
            $Type : 'UI.DataFieldForAction',
            Action: 'ChatService.verify',
            Label : '{i18n>Verify}'
        }
    ],
};

annotate ChatService.ReportFields with @UI: {

    Facets        : [
        {
            $Type : 'UI.ReferenceFacet',
            ID    : 'idIdentification',
            Label : '{i18n>Basic}',
            Target: '@UI.Identification'
        }
    ],

    Identification: [
        {
            $Type: 'UI.DataField',
            Value: category,
            Label: '{i18n>Category}',
        },
        {
            $Type: 'UI.DataField',
            Value: TabFdPos,
            Label: '{i18n>Position}',
        },
        {
            $Type: 'UI.DataField',
            Value: ParamText,
            Label: '{i18n>ParameterText}',
        },
        {
            $Type: 'UI.DataField',
            Value: Display,
            Label: '{i18n>Display}',
        },
        {
            $Type: 'UI.DataField',
            Value: Enterable,
            Label: '{i18n>Enterable}',
        },
        {
            $Type: 'UI.DataField',
            Value: Obligatory,
            Label: '{i18n>Obligatory}',
        },
        {
            $Type: 'UI.DataField',
            Value: ValueHelp,
            Label: '{i18n>ValueHelp}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToEntityText,
            Label: '{i18n>ToEntityText}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToEntity,
            Label: '{i18n>ToEntity}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToFieldText,
            Label: '{i18n>ToFieldText}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToField,
            Label: '{i18n>ToField}',
        }
    ],
    LineItem: 
    [
        {
            $Type: 'UI.DataField',
            Value: category,
            Label: '{i18n>Category}',
        },
        {
            $Type: 'UI.DataField',
            Value: TabFdPos,
            Label: '{i18n>Position}',
        },
        {
            $Type: 'UI.DataField',
            Value: ParamText,
            Label: '{i18n>ParameterText}',
        },
        {
            $Type: 'UI.DataField',
            Value: FieldType,
            Label: '{i18n>FieldType}',
        },
        {
            $Type: 'UI.DataField',
            Value: Display,
            Label: '{i18n>Display}',
        },
        {
            $Type: 'UI.DataField',
            Value: Enterable,
            Label: '{i18n>Enterable}',
        },
        {
            $Type: 'UI.DataField',
            Value: Obligatory,
            Label: '{i18n>Obligatory}',
        },
        {
            $Type: 'UI.DataField',
            Value: ValueHelp,
            Label: '{i18n>ValueHelp}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToEntityText,
            Label: '{i18n>ToEntityText}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToEntity,
            Label: '{i18n>ToEntity}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToFieldText,
            Label: '{i18n>ToFieldText}',
        },
        {
            $Type: 'UI.DataField',
            Value: ToField,
            Label: '{i18n>ToField}',
        }
    ],

};
