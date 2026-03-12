import React from "react";
import Link from "next/link";
import { Bot, Youtube, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="relative mt-20 border-t border-white/10 pt-20 pb-10 overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Column */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                                <Bot className="text-white w-6 h-6" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-white">
                                Lin's <span className="text-primary">InfoTech</span>
                            </span>
                        </Link>
                        <p className="text-white/60 leading-relaxed text-sm">
                            Empowering startups and enterprises with high-end AI solutions, Web
                            development, and innovative automation systems.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <Youtube className="w-5 h-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
                            <Twitter className="w-5 h-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
                            <Linkedin className="w-5 h-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
                            <Github className="w-5 h-5 text-white/40 hover:text-primary cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Services Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Services</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="hover:text-primary transition-colors cursor-pointer">AI Development</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Web Solutions</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Mobile Apps</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Automation</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Cloud Migration</li>
                        </ul>
                    </div>

                    {/* Quick Links Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Company</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="hover:text-primary transition-colors cursor-pointer">About Us</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Our Process</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Client Stories</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Careers</li>
                            <li className="hover:text-primary transition-colors cursor-pointer">Contact</li>
                        </ul>
                    </div>

                    {/* Contact Column */}
                    <div>
                        <h4 className="text-white font-bold mb-6">Get in Touch</h4>
                        <ul className="space-y-4 text-sm text-white/60">
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary" />
                                <span>hello@linsinfotech.io</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <MapPin className="w-4 h-4 text-primary" />
                                <span>San Francisco, CA</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-white/40">
                    <p>© 2026 Lin's InfoTech Agency. All rights reserved.</p>
                    <div className="flex items-center gap-6">
                        <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
                        <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
