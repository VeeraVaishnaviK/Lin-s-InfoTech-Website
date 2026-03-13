export const ENDPOINTS = {
    // Auth
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh',

    // Leads
    LEADS: '/api/leads',
    LEAD_BY_ID: (id: string) => `/api/leads/${id}`,
    LEAD_SCORE: (id: string) => `/api/leads/${id}/score`,

    // Contact
    CONTACT: '/api/contact',

    // Projects
    PROJECTS: '/api/projects',
    PROJECT_BY_ID: (id: string) => `/api/projects/${id}`,
    MY_PROJECT: '/api/projects/my',

    // Blog
    BLOG: '/api/blog',
    BLOG_BY_SLUG: (slug: string) => `/api/blog/${slug}`,

    // Invoices
    INVOICES: '/api/invoices',
    INVOICE_BY_ID: (id: string) => `/api/invoices/${id}`,
    INVOICE_PDF: (id: string) => `/api/invoices/${id}/download`,

    // Consultations
    CONSULTATIONS: '/api/consultations',

    // AI Services
    AI_CHATBOT: '/api/ai/chatbot',
    AI_ESTIMATOR: '/api/ai/estimator',
    AI_PROPOSAL: '/api/ai/proposal',
    AI_ANALYZER: '/api/ai/analyzer',
    AI_VALIDATOR: '/api/ai/validator',
};
