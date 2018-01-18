var questionJson = [{
        title: '',
        heading: 'Required Courses',
        que: 'Required courses (60 units) are prefilled for you. They are fixed and cannot be moved. Let’s begin.',
        type: 'text',
        removeClass: 'defaultselect',
        enableNext: true
    },
    {
        title: 'Q1',
        heading: 'Industry Focus',
        que: 'After graduation, which of the following are you interested in pursuing? ',
        type: 'radio',
        options: [{
                optn: 'Accounting',
                dargData: [{
                        data: { title: "ACCT 462", desc: "Detecting Fraudulent Financial Reporting", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "ACCT 473", desc: "Financial Statement Auditing", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "ACCT 474", desc: "Tax Issues for Business", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }

                    }
                ],
                summer: [
                    { title: "Global Leader Program", desc: "Beijing and Shanghai, China" },
                    { title: "Summer Leadership Program", desc: "PWC" },
                    { title: "Deal Advisory Internship", desc: "Ernst & Young" },
                    { title: "International Exchange Program", desc: "Paris, France" }
                ],
                content: "National Tax Case Study Competition"
            },
            {
                optn: 'Consulting',
                dargData: [{
                        data: { title: "MOR 462", desc: "Management Consulting", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "DSO 431", desc: "Foundation of Digital Business Innovation", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "DSO 433", desc: "Business Process Design", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    }
                ],
                summer: [
                    { title: "Learning about International Commerce", desc: "Hong Kong" },
                    { title: "Associate Consultant Internship", desc: "Capgemini Consulting" },
                    { title: "Consulting Summer Analyst", desc: "Accenture" },
                    { title: "ExCel (International Experiential Corporate Learning Program)", desc: "Milan, Italy" }
                ],
                content: "Consulting Project for Frito Lay with the Center for Global Supply Chain Management "
            },
            {
                optn: 'Entrepreneurship',
                dargData: [{
                        data: { title: "BAEP 450", desc: "Fundamentals of Entrepreneurship", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "BAEP 491", desc: "Social Entrepreneurship", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "BAEP 453", desc: "Venture Managemen", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    }
                ],
                summer: [
                    { title: "Learning about International Commerce", desc: "Buenos Aires, Argentina" },
                    { title: "Winslow-Maxwell Global Summer Internship", desc: "Sydney, Australia" },
                    { title: "Global Brigades @ Marshall", desc: "Panama" },
                    { title: "Art/Design Spring and Summer Internship", desc: "Universal Creative" }
                ],
                content: "Undergraduate Scholars Mentoring Program with the Brittingham Social Enterprise Lab"
            },
            {
                optn: 'Finance',
                dargData: [{
                        data: { title: "FBE 453", desc: "Advanced Practicum in Investment Management", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "FBE 458", desc: " Law and Finance", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "FBE 460", desc: " Mergers, Acquisitions and Restructuring", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    }
                ],
                summer: [
                    { title: "Global Leader Program", desc: "Beijing and Shanghai, China" },
                    { title: "Private Wealth Internship", desc: "Merrill Lynch" },
                    { title: "Corporate Finance Internship", desc: "FTI Consulting" },
                    { title: "International Exchange Program", desc: "Madrid, Spain" }
                ],
                content: "Marshall’s International Case Competition"
            },
            {
                optn: 'Marketing',
                dargData: [{
                        data: { title: "MKT 450", desc: "Consumer Behavior and Marketing", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "MKT 405", desc: "Advertising and Promotion Management", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "MKT 465", desc: "Global Marketing Management", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    }
                ],
                summer: [
                    { title: "Global Leader Program", desc: "Beijing and Shanghai, China" },
                    { title: "Social Media Marketing Internship", desc: "Disney" },
                    { title: "Product and Promotion Internship", desc: "Target" },
                    { title: "International Exchange Program", desc: "Paris, France" }
                ],
                content: "Future of Media Research Project with the Institute for Communication Technology Managemen"
            },
            {
                optn: 'Real Estate',
                dargData: [{
                        data: { title: "FBE 391", desc: "Real Estate Finance and Investments", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '0px'
                        }
                    },
                    {
                        data: { title: "FBE 466", desc: "Real Estate Feasibility Studies", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    },
                    {
                        data: { title: "FBE 489", desc: "Real Estate Capital Markets", points: 4 },
                        class: 'purple rmvBorder',
                        draggable: true,
                        droppable: false,
                        fixed: false,
                        year: 'senior',
                        stylecss: {
                            marginLeft: '-60px'
                        }
                    }
                ],
                summer: [
                    { title: "Learning about International Commerce", desc: "Tokyo, Japan" },
                    { title: "Real Estate Banking Internship", desc: "PNC Financial Services" },
                    { title: "Summer Real Estate Intern", desc: "JLL" },
                    { title: "International Exchange Program", desc: "Brussels, Belgium" }
                ],
                content: "International Real Estate Case Competition"
            }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false,
    },
    {
        enableNext: true,
        showQueBlocks: true,
        heading: "Industry Focus",
        // que: "You’ve selected [Accounting] as your focus in Business Administration.",
        // content1: "You will have opportunity to participate in Academic Project, [Deloitte FanTAXtic National Tax Case Study Competition]",
        content2: "Please drag these upper division business electives to Senior year.",
        confirm: true,
        queData: [],

    },
    {
        title: 'Q2',
        heading: 'Calculus',
        que: 'Have you taken or will you take:',
        type: 'radio',
        options: [
            { optn: 'AP Calculus exam? (Score of 4 or 5 only)', points: 4, course: 'AP' },
            { optn: 'IB Mathematics Higher Level-exam (Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'A-Level Mathematics exam (Score of A*, A, or B)', points: 4, course: 'A-Level' },
            { optn: 'None', points: 0, ques: 0 }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false,
    },
    {
        title: 'GE-intro',
        heading: 'General Education Courses',
        que: 'All students at USC are required to satisfy the university’s liberal arts core requirements, the General Education courses.  Incoming students can waive certain GE classes with select AP, IB, and A-Level exam scores.',
        type: 'text',
        enableNext: true
    },
    {
        title: 'Q3',
        heading: 'GE Category A',
        que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
        type: 'radio',
        options: [
            { optn: 'AP Art History (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'IB Dance (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Film (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Music (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Theater (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Visual Arts (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'A-Level Art & Design (Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'A-Level Music (Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'None', points: 0, ques: 1 }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: 'Q4',
        heading: 'GE Category D',
        que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
        type: 'radio',
        options: [
            { optn: 'AP Biology(Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'IB Biology(Score of 5,6 or 7)', points: 4, course: 'IB' },
            { optn: 'A-Level Biology(Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'A-Level Marine Science(Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'None', points: 0, ques: 2 }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: 'Q5',
        heading: 'GE Category E',
        que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
        type: 'radio',
        options: [
            { optn: 'AP Chemistry (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'AP Physics 1 (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'AP Physics 2 (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'AP Physics B (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: "AP Physics (C-Electricity/Magnetism) (Score of 4 or 5)", points: 4, course: 'AP' },
            { optn: "AP Physics (C-Mechanics) (Score of 4 or 5)", points: 4, course: 'AP' },
            { optn: 'IB Chemistry (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Physics (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'A-Level Chemistry (Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'A-Level Physics  (Score of A*, A, or B)', points: 4, course: 'A-level' },
            { optn: 'None', points: 0, ques: 3 }
        ],
        points: 4,
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: 'Q6',
        heading: 'GE Category G',
        que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
        type: 'radio',
        options: [
            { optn: 'IB Global Politics', points: 4, course: 'IB' },
            { optn: 'IB Asia and Oceania (Higher Level; Score of 5,6 or 7)', points: 4, course: 'IB' },
            { optn: 'IB History of Africa (Higher Level; Score of 4 or 5)', points: 4, course: 'IB' },
            { optn: 'IB History of Americas (Higher Level; Score of 4 or 5)', points: 4, course: 'IB' },
            { optn: 'A-Level History (Score of A*, A, or B)', points: 4, course: 'A-Level' },
            { optn: 'None', points: 0, ques: 4 }
        ],
        points: 4,
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: 'Q7',
        heading: 'GE Category H',
        que: 'Have you taken or will you take one of the following exams, with its corresponding score?',
        type: 'radio',
        options: [
            { optn: 'AP European History (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'AP US History (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'AP World History (Score of 4 or 5)', points: 4, course: 'AP' },
            { optn: 'IB History of Europe & Islamic World (Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'IB Europe and the Middle East (Higher Level; Score of 5, 6, or 7)', points: 4, course: 'IB' },
            { optn: 'A-Level Classical Studies (Score of A*, A, or B)', points: 4, course: 'A-Level' },
            { optn: 'A-Level Divinity (Score of A*, A, or B)', points: 4, course: 'A-Level' },
            { optn: 'A-Level Islamic Studies (Score of A*, A, or B)', points: 4, course: 'A-Level' },
            { optn: 'None', points: 0, ques: 5 }
        ],
        points: 4,
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: 'Q8',
        heading: 'Progressive Degree',
        que: 'Nice! You have (x amount) of credits. Now you have the following options:',
        type: 'radio',
        options: [{
                optn: 'Add on a Progressive Degree and graduate within 4 years with a Master Degree',
                optionType: 'Progressive',
                showoptn: false,
                suboptn: [
                    { optn: 'Master in Accounting (Accounting)' },
                    { optn: 'SAP Graduate Certificate (Consulting)' },
                    { optn: 'Master of Science in Social Entrepreneurship (Entrepreneurship)' },
                    { optn: 'Master of Science in Finance (Finance)' },
                    { optn: 'Master of Science in Marketing (Marketing)' },
                    { optn: 'Master of Construction Management (Real Estate)' }
                ]
            },
            { optn: 'Get Undergraduate Degree early and start your career', optionType: 'Undergraduate' },
            { optn: 'Explore minors outside of business at USC', optionType: 'business' }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        title: '',
        heading: 'Progressive Degree',
        que: 'We’ve rearranged your grid ',
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        autoMove: true,
        enableNext: true
    },
    {
        title: 'Q9',
        heading: 'Minor',
        que: 'Now It’s time to use your bank credits!',
        subcontent: 'In total, USC offers over 150 different minor programs for undergraduate students.  The minors below represent some of the most popular minor programs amongst USC Marshall students.',
        content1: 'Select 1 minor program, or 2 minor programs if you have 40+ elective credits in the bank.',
        link: '*You will be qualified for ',
        type: 'checkbox',
        options: [
            { optn: 'Philosophy (20 units of free electives needed)*', name: 'Philosophy Minor', points: '20', ques: 'minor' },
            { optn: 'Real Estate Development (24 units of free electives needed)', name: 'Real Estate Development Minor', points: '24', ques: 'minor' },
            { optn: 'Cinematic Arts (24 units of free electives needed)*', name: 'Cinematic Arts Minor', points: '24', ques: 'minor' },
            { optn: 'Music Industry (20 units of free electives needed)', name: 'Music Industry Minor', points: '20', ques: 'minor' },
            { optn: 'Political Science (20 units of free electives needed)', name: 'Political Science Minor', points: '20', ques: 'minor' },
            { optn: 'Sports Media Studies ( 24 units of free electives needed)*', name: 'Sports Media Studies Minor', points: '24', ques: 'minor' },
            { optn: 'None', points: '0', ques: 'minor' }
        ],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        heading: 'Minor',
        enableNext: true,
        showQueBlocks: true,
        headingText: "Drag and Drop.",
        queData: []
    },
    {
        title: 'Q10',
        heading: 'Free Electives',
        enableNext: true,
        showQueBlocks: true,
        headingText: "You have elective credits left. Drag and drop to the grid",
        nextBlock: 'afterQ5',
        queData: []
    },
    {
        title: 'Q11',
        heading: 'Extracurricular Activities',
        que: 'Please select all the programs that you are interested in participating and drag them to all four Summers.',
        type: 'checkbox',
        options: [{
            subTitle: 'Internship',
            options: [
                { optn: 'Summer Leadership Program at PWC' },
                { optn: 'Deal Advisory Summer Internship at Ernst & Young' },
            ],
        }, {
            subTitle: 'International Experiences',
            options: [
                { optn: 'Global Leadership Program (GLP) in Beijing and Shanghai, China' },
                { optn: 'International Exchange Program (IEP) in Paris, France You will be qualified for Global Scholar' },
            ],
        }],
        successMsg: 'You’ve saved 4 free elective credits in your bank for your minor(s)',
        enableNext: false
    },
    {
        enableNext: true,
        showQueBlocks: true,
        headingText: "Drag and Drop",
        nextBlock: 'afterQ5',
        queData: []
    },
]



var dragBox = [{
        headingText: "You have selected the following focus in the Marshall School of Business. Please drag the blocks and drop them into open spaces in the junior and senior years",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'MATH 118',
                desc: 'Fund. Principle of the Calculus',
                points: '4'
            },
            class: 'brown rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }, {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE A',
                desc: '',
                points: '4'
            },
            class: 'orange rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }, {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE D',
                desc: '',
                points: '4'
            },
            class: 'orange rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    },
    {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE E',
                desc: '',
                points: '4'
            },
            class: 'orange rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    },
    {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE G',
                desc: '',
                points: '4'
            },
            class: 'orange rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    },
    {
        headingText: "Please drag the block and drop it into space depending on when you wish to take it",
        enableNext: true,
        showQueBlocks: true,
        queData: [{
            data: {
                title: 'GE H',
                desc: '',
                points: '4'
            },
            class: 'orange rmvBorder',
            draggable: true,
            droppable: false,
            fixed: false
        }]
    }
]







//==============================JSON Array For Grid Data======================================================//
var gridBlock = [{
        data: {
            title: 'WRIT 150',
            desc: 'Writing and Critical Reasoning',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'freshman'
    }, {
        data: {
            title: 'ECON 351x',
            desc: 'Microeconomics for Business',
            points: '4'
        },
        class: 'pink',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'freshman'
    }, {
        data: {
            title: 'ECON 352x',
            desc: 'Microeconomics for Business',
            points: '4'
        },
        class: 'pink',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'sophomore'
    }, {
        data: {
            title: 'BUAD 307',
            desc: 'Marketing Fundamentals',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'sophomore'
    }, {
        data: {
            title: 'BUAD 311',
            desc: 'Operations Management',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'junior'
    }, {
        data: {
            title: 'BUAD 497',
            desc: 'Strategic Management',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'junior'
    }, {
        data: {
            title: 'BUAD 425',
            desc: 'Data Analysis for Decision Making',
            points: '2'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: {
            title: 'GESM',
            desc: 'Social Issues',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'freshman'
    }, {
        data: {
            title: 'BUAD 310',
            desc: 'Applied Business Statistics',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'freshman'
    }, {
        data: {
            title: 'BUAD 280',
            desc: 'Accounting I',
            points: '3'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'sophomore'
    }, {
        data: {
            title: 'BUAD 281',
            desc: 'Accounting II',
            points: '3'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'sophomore'
    }, {
        data: {
            title: 'BUAD 306',
            desc: 'Business Finance',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'junior'
    }, {
        data: {
            title: 'WRIT 340',
            desc: 'Advanced Writing for Business',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'junior'
    }, {
        data: {
            title: 'GE - C',
            desc: '',
            points: '4'
        },
        class: 'orange',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'freshman'
    }, {
        data: {
            title: 'BUAD 304',
            desc: 'Leading Organizations',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'freshman'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'sophomore'
    }, {
        data: {
            title: 'BUAD 302',
            desc: 'Communication Strategy in Business',
            points: '4'
        },
        class: 'red',
        draggable: false,
        droppable: false,
        fixed: true,
        year: 'sophomore'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        year: 'freshman'
    },
    {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'freshman'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'sophomore'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'sophomore'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false,
        year: 'freshman'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'freshman'
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false,
        year: 'sophomore'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'sophomore'
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false,
        year: 'junior'
    }, {
        data: 'blank',
        class: 'gray',
        draggable: false,
        droppable: true,
        fixed: false,
        year: 'senior'
    }, {
        data: 'blank',
        class: 'cross',
        draggable: false,
        droppable: false,
        fixed: false,
        year: 'senior'
    }
]

//defaultselect

// $scope.signout = function() {
//     location.href = path[0] + "index.html"
// };