using {
    cuid,
    managed
} from '@sap/cds/common';

namespace pwc.hand.ai2report;

/**
 * Represents a chat session containing multiple messages.
 */
entity Chats : cuid, managed {
    title   : String; // Title of chat
    records : Composition of many Records
                  on records.chat = $self; // Composition of messages within the chat
}

/**
 * Represents a record in a chat.
 */
entity Records : cuid, managed {
    chat      : Association to Chats; // Reference to the associated chat
    role      : String; // user, assistant
    prompt    : LargeString; //prompt
    content   : LargeString; // message content
    isAdopted : Boolean; // Indicates if the record was adopted
}

/**
 * Represents a report generated for a message.
 */
entity Reports : cuid, managed {
    record             : Association to Records; // Reference to the associated message
    isProgramGenerated : Boolean; // Indicates if the report was generated programmatically
    isPCLGenerated     : Boolean; // Indicates if the report contains PCL (PostScript Control Language) content
    ProjectId          : String(32); // Identifier of the project associated with the report
    Text               : String(255); // Summary or textual description of the report
    DevClass           : String(30); // Development class related to the report
    TrKorr             : String(20); // Transport request number for the report
    jsonPCL            : LargeString; // JSON string containing PCL or structured data for the report
    fields             : Association to many ReportFields
                             on fields.report = $self; // Composition of report fields for detailed data
}

/**
 * Represents a field within a report, providing metadata and behavior settings.
 */
entity ReportFields : cuid, managed {
    report       : Association to Reports; // Reference to the associated report
    category     : String(100); // Category of the field (e.g., input, output)
    TabFdPos     : Integer; // Position of the field in a tabular layout
    ParamText    : String(255); // Parameter description or explanation
    FieldType    : String(20); // Type of the field (e.g., text, number)
    Display      : String(1); // Indicates if the field is visible in the report
    Enterable    : String(1); // Indicates if the field is editable
    Obligatory   : String(1); // Indicates if the field is mandatory
    ValueHelp    : String(1); // Indicates if the field supports value help or search
    ToEntityText : String(60); // Textual description of the related entity
    ToEntity     : String(30); // Name of the related entity
    ToFieldText  : String(60); // Textual description of the related field
    ToField      : String(30); // Name of the related field
}

/**
 * Represents a parameter with a key-value pair and its description.
 */
entity Parameters : managed {
    key name        : String(60); // Parameter key or name
        value       : LargeString; // Parameter value
        description : String(1000); // Description of the parameter
}
