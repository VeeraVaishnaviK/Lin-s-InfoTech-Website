import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/client-portal/'],
        },
        sitemap: 'https://linsinfotech.in/sitemap.xml',
    };
}
