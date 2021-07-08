
const defaultObjects = {
    page: {
        page_title: "",
        page_body_text: "",
        page_category: "About",
        page_symbol: "star",
        page_order: 0
    },
    post: {
        blog_title: "",
        blog_text: "",
        blog_category: "Blog",
        blog_tags: []
    },
    support_ticket: {
        support_ticket_kind: 1,
        support_ticket_message: "",
        support_ticket_name: "",
        support_ticket_email: "",
        require_update: true,
        support_ticket_state: "pending",
        public_notes_text: "The ticket has been created and is awaiting an open staff member.",
        private_notes_text: ""
    },
    athlete: {
        preferred_name: "",
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        recruiting_personnel_id: 0,
        city: "",
        state: "",
        high_school_name: "",
        school_year: "12- Senior",
        height: 0,
        weight: 0,
        notes: "",
        application_process: {
            school_application: false,
            test_scores: false,
            transcripts: false,
            fafsa: false,
            scholarship_offer: false,
            visited_school: false,
            accepted_offer: false,
            classes_scheduled: false,
            housing_selected: false,
            financial_aid_accepted: false,
        },
    },
    team: {
        team_name: "",
        admissions_email_address: "",
        visit_reporting_address: "",
        visit_reporting_instructions: ""
    },
    visit: {
        visit_team_id: 0,
        visit_athlete_id: 0,
        visit_personnel_id: 0,
        time_options: [null, null, null],
        visit_status: "pending",
        reporting_address: "",
        reporting_instructions: "",
    },
    message: {
        message_team_id: 0,
        message_athlete_id: 0,
        message_personnel_id: 0,
        message_type: "outgoing",
        message_text: ""
    }

}


//Returns the above object directly
const defaultNewFields = (classKind) => {
    return defaultObjects[`${classKind}`]
}

//Returns the above object along with just the keys in a hash
const defaultNewObj = (classKind) => {
    const values = defaultNewFields(classKind)
    const fields = Object.keys(values)
    return { values, fields }
}

//Takes in an item, and returns the default object with the item's values imposed on top.
const defaultFullFields = (classKind, item) => {
    const defaultObj = defaultNewObj(classKind);

    const formFields = {}

    defaultObj.fields.forEach((key) => {
        formFields[key] = item[key] ? item[key] : defaultObj.values[key]
    });

    return formFields
}

export default { defaultNewFields, defaultNewObj, defaultFullFields }