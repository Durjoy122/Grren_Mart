import React from 'react';
import { FaFacebook, FaInstagram, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-white py-10 mt-25">
            <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
                
                {/* Quick Links */}
                <div className="flex flex-wrap justify-center md:justify-start gap-6">
                <a href="/about" className="hover:text-green-300 transition-colors">About</a>
                <a href="/contact" className="hover:text-green-300 transition-colors">Contact</a>
                <a href="/privacy" className="hover:text-green-300 transition-colors">Privacy Policy</a>
                </div>

                {/* Social Icons */}
                <div className="flex gap-5 text-xl">
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                    <FaInstagram />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                    <FaFacebook />
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-green-300">
                    <FaPinterest />
                </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-center text-sm text-gray-300 mt-4">
                © 2025 <span className="font-semibold text-white">GreenNest</span>. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;